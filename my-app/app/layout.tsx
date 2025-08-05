"use client"

import "./globals.css";
import Navbar from "@/components/ui/NavBar";
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body>
        <main >
            <Navbar/>
            {children}
        </main>
        </body>
        </html>
    );
}