import { site } from "../data/data";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <>
      <Header name={site.name} nav={site.nav} cv={site.cv} />
      <main>
        <p>{site.name}</p>
      </main>
    </>
  );
}
