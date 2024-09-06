
import { NavBar, NotFoundContent } from "@/components"


export default function NotFound({ params: { locale } }: { params: { locale: "ro" | "ru" | "en" | "fr" } }) {

  return (
    <div className="">
      <NavBar />
      <NotFoundContent />
    </div>
  )
}