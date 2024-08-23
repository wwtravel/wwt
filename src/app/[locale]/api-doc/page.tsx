import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container pt-[10rem]">
      <ReactSwagger spec={spec} />
    </section>
  );
}