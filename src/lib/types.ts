import { z } from "zod";

export const PostUserSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(1, {
            message: "Firstname must be at least at leat 1 character"
        }).max(50, {
            message: "Firstname must be at least at most 100 characters"
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
            message: "Firstname must be at least at most 100 characters"
        }),
    lastname: z.string().trim().min(1).max(50),
    email: z.string().trim().min(1).max(50).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
    dob: z.string().date().optional(),
    phone_number: z.string().optional(),
});

export interface WelcomeEmailProps {
    email: string,
    password: string,
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