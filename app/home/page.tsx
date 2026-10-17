import { site } from "../data/data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function HomePage() {
  return (
    <>
      <Header name={site.name} nav={site.nav} cv={site.cv} />
      <main>
        <Hero {...site.hero} />
        <Projects {...site.projects} />
      </main>
    </>
  );
}
