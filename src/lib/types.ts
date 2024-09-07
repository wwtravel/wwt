import { z } from "zod";

export const PostUserSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(1, {
            message: "Firstname must be at least at leat 1 character"
        }).max(50, {
            message: "Firstname must be at most 100 characters"
        }),
    lastname: z.string().trim().min(1).max(50),
    email: z.string().trim().min(1).max(50).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    lang: z.enum(["fr", "en", "ro", "ru"]),
});

export const PatchUserSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(1, {
            message: "Firstname must be at least at leat 1 character"
        }).max(50, {
            message: "Firstname must be at most 50 characters"
        }),
    lastname: z.string().trim().min(1).max(50),
    email: z.string().trim().min(1).max(50).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    dob: z.string().date().optional(),
    phone_number: z.string().min(7).max(15).optional(),
});

export interface WelcomeEmailProps {
    email: string,
    password: string,
    lang: string,
    link: string | undefined
}

export interface ResetPasswordProps {
    email: string,
    link: string,
    lang: string
}

export interface OrderConfirmationProps {
    id: string,
    departureDate: string,
    arrivalDate: string,
    departureAdress: string,
    arrivalAdress: string,
    passangers: Passanger[],
    contactDetails: {
        name: string,
        phone_number: string
    },
    lang: string,

}

export interface Passanger {
    firstname: string,
    lastname: string,
    price: {
        currency: string,
        value: number
    }
}

export const PostPriceSchema = z.object({
    from: z
        .string()
        .trim()
        .min(1, {
            message: "Start destination must be at least at leat 1 character"
        }).max(50, {
            message: "Start destination must be at least at most 100 characters"
        }),
    to: z
        .string()
        .trim()
        .min(1, {
            message: "End destination must be at least at leat 1 character"
        }).max(50, {
            message: "End destination must be at least at most 100 characters"
        }),
    price_sheet: z.object({
        adult: z.number(),
        student: z.number(),
        child: z.number(),
    })
});

export const PatchPriceSchema = z.object({
    id: z.string(),
    from: z
        .string()
        .trim()
        .min(1, {
            message: "Start destination must be at least at leat 1 character"
        }).max(50, {
            message: "Start destination must be at least at most 100 characters"
        }),
    to: z
        .string()
        .trim()
        .min(1, {
            message: "End destination must be at least at leat 1 character"
        }).max(50, {
            message: "End destination must be at least at most 100 characters"
        }),
    price_sheet: z.object({
        adult: z.number(),
        student: z.number(),
        child: z.number(),
    })
});

export const PatchTravelSchema = z.object({
    id: z.string(),
    departure: z.string().datetime().optional(),
    reserved_seats: z.number().optional(),
    route_id: z.string()
})

const PostTravelSchema = z.object({
    departure: z.string().datetime(),
    route_id: z.string()
})

export const PostTravelsSchema = z.array(PostTravelSchema);

const stop = z.object({
    city: z.string(),
    label: z.object({
        en: z.string(),
        ro: z.string(),
        fr: z.string(),
        ru: z.string(),
    })
})

export const OrderSchema = z.object({
    travel_id: z.string(),
    passengers: z.array(
        z.object({
            firstname: z
                .string()
                .trim()
                .min(1, {
                    message: "Firstname must be at least at leat 1 character"
                }).max(50, {
                    message: "Firstname must be at least at most 100 characters"
                }),
            lastname: z
                .string()
                .trim()
                .min(1, {
                    message: "Lastname must be at least at leat 1 character"
                }).max(50, {
                    message: "Lastname must be at least at most 100 characters"
                }),
            price: z.object({
                currency: z.enum(["MDL", "CHF", "EUR"]),
                value: z.number()
            })
        })
    ),
    user_id: z.string().optional(),
    contact_details: z.object({
        phone_number: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/g),
        email: z.string().trim().min(1).max(50).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    }),
    lang: z.enum(["fr", "en", "ro", "ru"]),
    departure_place: stop,
    arrival_place: stop,
    arrival_date: z.string().datetime(),
    departure_date: z.string().datetime()
})

export const ResetPasswordSchema = z.object({
    email: z.string().trim().min(1).max(50).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    lang: z.enum(["fr", "en", "ro", "ru"])
})

export const SearchSchema = z.object({
    departure_city: z.string().min(1).max(50),
    arrival_city: z.string().min(1).max(50),
    departure_date: z.string().date(),
    return_date: z.string().date().optional(),
})