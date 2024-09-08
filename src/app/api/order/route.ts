import { OrderSchema, ResetPasswordSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma"
import { render } from "@react-email/components";
import nodemailer from 'nodemailer';
import { checkAvailableSeats, handlePrismaError } from "@/lib/bd-utils";
import { auth } from "@/lib/auth";
import OrderConfirmation from "@/components/emails/OrderConfirmation";
import crypto from "crypto";

const mailConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "studiomodvis@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    }
};

interface Place {
    city: string,
    label: Label
}

interface Label {
    en: string,
    ro: string,
    fr: string,
    ru: string,
}

const subjectLang = new Map([
    ["en", "ORDER CONFIRMATION | World Wide Travel"],
    ["ro", "CONFIRMARE COMANDĂ | World Wide Travel"],
    ["fr", "CONFIRMATION DE COMMANDE | World Wide Travel"],
    ["ru", "ПОДТВЕРЖДЕНИЕ ЗАКАЗА | World Wide Travel"]
])

const daysOfTheWeek = new Map([
    ["en", ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]],
    ["ro", ["LUNI", "MARȚI", "MIERCURI", "JOI", "VINERI", "SÂMBĂTĂ", "DUMINICĂ"]],
    ["fr", ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"]],
    ["ru", ["ПОНЕДЕЛЬНИК", "ВТОРНИК", "СРЕДА", "ЧЕТВЕРГ", "ПЯТНИЦА", "СУБОТА", "ВОСКРЕСЕНЬЕ"]]
]);

const streetLang = new Map([
    ["en", "At the request of passengers"],
    ["ro", "După solicitarea pasagerilor"],
    ["fr", "À la demande du passager"],
    ["ru", "По запросу пассажира"]
])

const convertDate = ({date, lang}: {date: Date, lang: string}) => {
    const weekNames = daysOfTheWeek.get(lang);
    const dayOfWeek = weekNames !== undefined && weekNames[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${dayOfWeek} - ${day}.${month}.${year} - ${hours}:${minutes}`;
}

const convertAddress = ({place, lang}: {place: Place, lang: keyof Label}) => {
    let street = streetLang.get(lang);
    if (place.city === 'chisinau') {
        street = 'Tighina 2/2';
    } 

    return `${street}, ${place.label[lang]}`
}

const getCurrency = async ({currencyTitle}: {currencyTitle: string}) => {
    let currency = null;

    try {
        currency = await prisma.currency.findUnique({
            where: {
                title: currencyTitle
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!currency) return Response.json({ msg: "Currency not found!"}, {status: 400});

    return currency;
}

export async function POST (request: Request) {
    const result = OrderSchema.safeParse(await request.json());

    if (!result.success) {
        let errorMessage = "";

        result.error.issues.forEach((issue) => {
            errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ", ";
        });


        return Response.json({ msg: errorMessage }, {status: 400})
    }

    let seatCheck = await checkAvailableSeats({travel_id: result.data.travel_id});

    if (seatCheck instanceof Response) return seatCheck;

    let currency = await getCurrency({currencyTitle: result.data.passengers[0].price.currency});

    if (currency instanceof Response) return currency; 

    for (const passanger of result.data.passengers) {
        passanger.price.value = Number((passanger.price.value * currency.value).toFixed(0))
    }

    let order = null;

    try {
        order = await prisma.order.create({
            data: {
                public_id: crypto.randomBytes(3).toString('hex'),
                departure_place: result.data.departure_place,
                arrival_place: result.data.arrival_place,
                departure_date: result.data.departure_date,
                arrival_date: result.data.arrival_date,
                travel_id: result.data.travel_id,
                passengers: result.data.passengers,
                user_id: result.data.user_id,
                contact_details: result.data.contact_details
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!order) return Response.json({ msg: "Order could not be created!"}, {status: 400});

    const emailHtml = render(OrderConfirmation({details : {
        id: order.public_id,
        departureDate: convertDate({date: new Date(result.data.departure_date), lang: result.data.lang}),
        arrivalDate: convertDate({date: new Date(result.data.arrival_date), lang: result.data.lang}),
        departureAdress: convertAddress({place: result.data.departure_place, lang: result.data.lang}),
        arrivalAdress: convertAddress({place: result.data.arrival_place, lang: result.data.lang}),
        contactDetails: {
            name: result.data.passengers[0].firstname + " " + result.data.passengers[0].lastname,
            phone_number: result.data.contact_details.phone_number
        },
        passangers: result.data.passengers,
        lang: result.data.lang
    }}))

    const data = {
        to: result.data.contact_details.email, 
        subject: subjectLang.get(result.data.lang),
        html: emailHtml
    }

    const transporter = nodemailer.createTransport(mailConfig);
    await transporter.sendMail(data);

    return Response.json({ msg: "Order succesfully created!" }, {status: 201});
}

export async function GET () {
    const session = await auth();

    // if (!session) {
    //     return Response.json({ msg: "You must be logged in!"}, {status: 401});
    // }

    // if (!session.user?.email) {
    //     return Response.json({ msg: "Email not found in session!"}, {status: 400});
    // }

    let orders = null;
    try {
        orders = await prisma.order.findMany({
            include: {
                travel: {
                    select: {
                        route_id: true
                    }
                }
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!orders) return Response.json({ msg: "Orders not found!"}, {status: 400});

    return Response.json(orders, {status: 201});
}