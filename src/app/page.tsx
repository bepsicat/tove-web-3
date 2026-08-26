import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { homeStructuredData } from "@/lib/site";

const About = dynamic(() => import("@/components/sections/About"));
const Menu = dynamic(() => import("@/components/sections/Menu"));
const Booking = dynamic(() => import("@/components/sections/Booking"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <main>
        <Hero />
        <About />
        <Menu />
        <Booking />
        <Footer />
      </main>
    </>
  );
}
