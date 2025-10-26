// app/layout.tsx
"use client"

import "./globals.css";
import Script from "next/script";
import { AuthProvider } from './Context/AuthContext';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isLogin = pathname?.startsWith('/login');
    const isSignup = pathname?.startsWith('/signup');
    const isResetPassword = pathname?.startsWith('/reset-password');
    const isForgotPassword = pathname?.startsWith('/forgot-password');

    if (isDashboard) {
        // Dashboard pages - no navbar/footer
        return <>{children}</>;
    }
    if (isForgotPassword) {
        // Dashboard pages - no navbar/footer
        return <>{children}</>;
    }

    if (isLogin) {

        return <>{children}</>;
    }

    if (isSignup) {

        return <>{children}</>;
    }
    if (isResetPassword) {

        return <>{children}</>;
    }

    // Public pages - with navbar/footer
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
        </AuthProvider>

        <div id='zsiqwidget' className="relative"></div>

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