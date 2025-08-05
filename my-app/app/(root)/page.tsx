import { HeroParallax } from "@/components/ui/hero-parallax";
import ZohoHero from "@/components/ui/ZohoHero";
import CustomerLogo from "@/components/ui/CustomerLogo";
import InfoSection from "@/components/ui/InfoSection";
import ProfessionalHero from "@/components/ui/ZohoHero";


// Your custom products data
const products = [
    {
        title: "Zoho Books",
        link: "/projects/ecommerce",
        thumbnail: "/product/zohoBooks.png",
    },
    {
        title: "Zoho Catalyst",
        link: "/projects/banking",
        thumbnail: "/product/zohoCatalyst.png",
    },
    {
        title: "Zoho Creator",
        link: "/projects/social",
        thumbnail: "/product/zohoCreator.png",
    },
    {
        title: "Zoho CRM",
        link: "/projects/analytics",
        thumbnail: "/product/zohoCRM.png",
    },
    {
        title: "Zoho Forms",
        link: "/projects/healthcare",
        thumbnail: "/product/zohoForms.png",
    },
    {
        title: "Zoho Inventory",
        link: "/projects/lms",
        thumbnail: "/product/zohoInventory.png",
    },
    {
        title: "Zoho Mail",
        link: "/projects/realestate",
        thumbnail: "/product/zohoMail.png",
    },
    {
        title: "Zoho One",
        link: "/projects/food",
        thumbnail: "/product/zohoOne.png",
    },
    {
        title: "Zoho Page Sense",
        link: "/projects/travel",
        thumbnail: "/product/zohoPageSense.png",
    },
    {
        title: "Fitness Tracking App",
        link: "/projects/fitness",
        thumbnail: "/product/zohoPeople.png",
    },


];

export default function HomePage() {
    return (
        <div className="w-full">
            <ProfessionalHero/>
            <CustomerLogo/>
            <HeroParallax products={products} />
            <InfoSection/>
        </div>
    );
}