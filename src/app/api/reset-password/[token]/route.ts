import { handlePrismaError } from "@/lib/bd-utils";
import { prisma } from "@/utils/prisma";
import { render } from "@react-email/components";
import crypto from "crypto";
import { hash } from "bcrypt";
import nodemailer from 'nodemailer';
import ResetPassword from "@/components/emails/ResetPassword";

import { notFound } from 'next/navigation';
import { NextResponse } from "next/server";

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
    ["en", "PASSWORD RESET | World Wide Travel"],
    ["ro", "RESTABILIRE PAROLĂ | World Wide Travel"],
    ["fr", "RÉINITIALISATION DU MOT DE PASSE | World Wide Travel"],
    ["ru", "ВОССТАНОВЛЕНИЕ ПАРОЛЯ | World Wide Travel"]
])

export async function GET (request: Request, {params}: {params: {token: string}}) {
    let token = null;
    try {
        token = await prisma.token.findUnique({
            where: {
                id: params.token
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    if (!token) return Response.json({ msg: "Token not found" }, {status: 500});
    //if (!token) return notFound();

    const password = crypto.randomBytes(3).toString('hex');
    const hashedPassword = await hash(password, 10);

    try {
        await prisma.user.update({
            where: {
                email: token.email
            },
            data: {
                password: hashedPassword
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }
    
    const emailHtml = render(ResetPassword({details: {email: token.email, lang: token.lang, password: password, link: process.env.URL}}))

    const data = {
        to: token.email, 
        subject: subjectLang.get(token.lang),
        html: emailHtml
    }

    const transporter = nodemailer.createTransport(mailConfig);
    await transporter.sendMail(data);

    try {
        await prisma.token.delete({
            where: {
                id: params.token
            }
        })
    } catch (e) {
        if (e) {
            return handlePrismaError(e);
        }
    }

    return Response.json({ msg: "Password successfully changed!" }, {status: 201});
    //const redirectUrl = `/reset-successful/${params.token}`;
    //NextResponse.redirect(new URL(redirectUrl, request.url));
}