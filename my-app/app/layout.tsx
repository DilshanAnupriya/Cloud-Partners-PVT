"use client"

import "./globals.css";
import Navbar from "@/components/ui/NavBar";
import Script from "next/script";
import Footer from "@/components/ui/Footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <Navbar />
                {children}
            </main>
            <Footer/>
        </div>

        {/* The Zoho widget will render into this div */}
        <div id='zsiqwidget' className="relative"></div>

        {/* Zoho SalesIQ Scripts */}
        <Script
            id="zoho-salesiq-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: `window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`
            }}
        />

        <Script
            id="zsiqscript"
            src="https://salesiq.zohopublic.com/widget?wc=siqd0aa83c69dffd1139da78d07defe6dacc6b13204f0cd92dbe16fae95f339eb65"
            strategy="afterInteractive"
        />
        </body>
        </html>
    );
}