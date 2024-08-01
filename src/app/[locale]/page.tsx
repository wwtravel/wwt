import { Destinations, Header, Services } from "@/components";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Destinations />
      <div className="px-[12rem]">
        <Services />
      </div>
    </div>
  )
}