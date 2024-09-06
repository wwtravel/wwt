//import { Destinations, Features, Footer, Header, NavBar, Services, Testimonials } from "@/components";
import { Metadata } from "next";

const NavBar = dynamic(() => import('@/components/NavBarComponents/NavBar'));
const Header = dynamic(() => import('@/components/HomePageComponents/Header/Header'));
const Destinations = dynamic(() => import('@/components/HomePageComponents/Destinations/Destinations'));
const Services = dynamic(() => import('@/components/HomePageComponents/ServicesSection/Services'));
const Testimonials = dynamic(() => import('@/components/AboutPageComponents/Testimonials/Testimonials'));
const Features = dynamic(() => import('@/components/HomePageComponents/Features/Features'));
const Footer = dynamic(() => import('@/components/FooterComponents/Footer'));

import { getTranslations } from 'next-intl/server';
import dynamic from "next/dynamic";

export async function generateMetadata({params: {locale}} : {params: {locale: string}}) : Promise<Metadata> {
    const t = await getTranslations({locale, namespace: 'PageTitles'});

    return {
      title: t('home')
    };
  }

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Header />
      <Destinations />
      <Services />
      <Testimonials />
      <Features />
      <Footer />
    </div>
  )
}