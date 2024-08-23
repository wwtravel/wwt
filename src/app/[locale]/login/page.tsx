'use client'

import { signOut, signIn } from "next-auth/react";
import router from "next/router";

export default async function Page() {

  const onSignIn = async () => {
    try {
      const response: any = await signIn("credentials", {
        email: "tudorcebotarenco@gmail.com",
        password: "b0b4f1",
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/");
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };

  const onSignOut = async () => {
    signOut()
  };

  return (
    <div className="pt-[10rem]">
      <button onClick={onSignIn}>Sign in</button>
      <button onClick={onSignOut}>Sign out</button>
    </div>
  )
}