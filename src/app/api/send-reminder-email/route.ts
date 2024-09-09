import TripReminder from "@/components/emails/TripReminder";
import { handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";
import { render } from "@react-email/components";
import nodemailer from 'nodemailer';

const mailConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
};


const subjectLang = new Map([
    ["en", "TRIP REMINDER | World Wide Travel"],
    ["ro", "REAMINTIRE DE CĂLĂTORIE | World Wide Travel"],
    ["fr", "RAPPEL DE VOYAGE | World Wide Travel"],
    ["ru", "НАПОМИНАНИЕ О ПОЕЗДКЕ | World Wide Travel"]
])

export async function GET () {
    let emails = null;

    const startTime = new Date();
    startTime.setHours(0, 0, 0);

    const endTime = new Date();
    endTime.setHours(23, 59, 59);

    try {
        emails = await prisma.reminderEmail.findMany({
            where: {
                AND: [
                    {
                        send_date: {
                            gte: startTime
                        }
                    },
                    {
                        send_date: {
                            lte: endTime
                        }
                    },
                ]
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!emails) return Response.json({ msg: "Emails not found!"}, {status: 400});

    for (const email of emails) {
        const emailHtml = render(TripReminder({details: {
            id: email.id,
            arrivalAdress: email.arrival_place,
            arrivalDate: email.arrival_date,
            contactDetails: email.contact_details,
            departureAdress: email.departure_place,
            departureDate: email.departure_date,
            passangers: email.passengers,
            lang: email.lang
        }}));
    
        const data = {
            to: email.contact_email, 
            subject: subjectLang.get(email.lang),
            html: emailHtml
        }
    
        const transporter = nodemailer.createTransport(mailConfig);
        await transporter.sendMail(data);
    }

    try {
        await prisma.reminderEmail.deleteMany({
            where: {
                AND: [
                    {
                        send_date: {
                            gte: startTime
                        }
                    },
                    {
                        send_date: {
                            lte: endTime
                        }
                    },
                ]
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    try {
        await prisma.token.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        });
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({msg: "Deleted expired dates!"}, {status: 200});
}