import { HeroParallax } from "@/components/ui/hero-parallax";
import CustomerLogo from "@/components/ui/CustomerLogo";
import InfoSection from "@/components/ui/InfoSection";
import ProfessionalHero from "@/components/ui/ZohoHero";
import ModernZohoHero from "@/components/ui/ModernZohoHero";
import GeminiSection from "@/components/ui/GeminiSection";


// Your custom products data
const products = [
    {
        title: "Zoho Books",
        link: "/projects/ecommerce",
        thumbnail: "/Pimages/zohoBooks.png",
    },
    {
        title: "Zoho Catalyst",
        link: "/projects/banking",
        thumbnail: "/Pimages/zohoCatalyst.png",
    },
    {
        title: "Zoho Creator",
        link: "/projects/social",
        thumbnail: "/Pimages/zohoCreator.png",
    },
    {
        title: "Zoho CRM",
        link: "/projects/analytics",
        thumbnail: "/Pimages/zohoCRM.png",
    },
    {
        title: "Zoho Forms",
        link: "/projects/healthcare",
        thumbnail: "/Pimages/zohoForms.png",
    },
    {
        title: "Zoho Inventory",
        link: "/projects/lms",
        thumbnail: "/Pimages/zohoInventory.png",
    },
    {
        title: "Zoho Mail",
        link: "/projects/realestate",
        thumbnail: "/Pimages/zohoMail.png",
    },
    {
        title: "Zoho One",
        link: "/projects/food",
        thumbnail: "/Pimages/zohoOne.png",
    },
    {
        title: "Zoho Page Sense",
        link: "/projects/travel",
        thumbnail: "/Pimages/zohoPageSense.png",
    },
    {
        title: "Fitness Tracking App",
        link: "/projects/fitness",
        thumbnail: "/Pimages/zohoPeople.png",
    },


];

export default function HomePage() {
    return (
        <div className="w-full">
            <ModernZohoHero/>
            <CustomerLogo/>
            <GeminiSection/>
            <HeroParallax products={products} />
            <InfoSection/>
        </div>
    );
}