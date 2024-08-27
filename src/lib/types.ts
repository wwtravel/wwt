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
    departure: z.string().datetime(),
    route_id: z.string()
})

const PostTravelSchema = z.object({
    departure: z.string().datetime(),
    route_id: z.string()
})

export const PostTravelsSchema = z.array(PostTravelSchema);

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
            price: z.number()
        })
    ),
    user_id: z.string().optional(),
    contact_details: z.object({
        phone_number: z.string(),
        email: z.string().trim().min(1).max(50).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
        notes: z.string().optional()
    }),
    lang: z.enum(["fr", "en", "ro", "ru"])
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