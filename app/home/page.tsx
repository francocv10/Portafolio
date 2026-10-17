import { site } from "../data/data";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <Header name={site.name} nav={site.nav} cv={site.cv} />
      <main>
        <Hero {...site.hero} />
      </main>
    </>
  );
}
