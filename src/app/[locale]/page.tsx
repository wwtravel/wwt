import { Destinations, Header } from "@/components";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="px-[12rem]">
        <Destinations />
      </div>
    </div>
  )
}