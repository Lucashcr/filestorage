import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ToastContainerProvider from "@/components/layout/toast-provider";

const ubuntuBold = localFont({
  src: "../fonts/Ubuntu-Bold.ttf",
  variable: "--font-ubuntu-bold",
  weight: "700",
});
const ubuntuBoldItalic = localFont({
  src: "../fonts/Ubuntu-BoldItalic.ttf",
  variable: "--font-ubuntu-bold-italic",
  weight: "700",
});
const ubuntuItalic = localFont({
  src: "../fonts/Ubuntu-Italic.ttf",
  variable: "--font-ubuntu-italic",
  weight: "400",
});
const ubuntuLight = localFont({
  src: "../fonts/Ubuntu-Light.ttf",
  variable: "--font-ubuntu-light",
  weight: "300",
});
const ubuntuLightItalic = localFont({
  src: "../fonts/Ubuntu-LightItalic.ttf",
  variable: "--font-ubuntu-light-italic",
  weight: "300",
});
const ubuntuMedium = localFont({
  src: "../fonts/Ubuntu-Medium.ttf",
  variable: "--font-ubuntu-medium",
  weight: "500",
});
const ubuntuMediumItalic = localFont({
  src: "../fonts/Ubuntu-MediumItalic.ttf",
  variable: "--font-ubuntu-medium-italic",
  weight: "500",
});
const ubuntuRegular = localFont({
  src: "../fonts/Ubuntu-Regular.ttf",
  variable: "--font-ubuntu-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "FileStorage",
  description: "A simple file storage service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${ubuntuBold.variable} ${ubuntuBoldItalic.variable} ${ubuntuItalic.variable} ${ubuntuLight.variable} ${ubuntuLightItalic.variable} ${ubuntuMedium.variable} ${ubuntuMediumItalic.variable} ${ubuntuRegular.variable} antialiased font-[family-name:var(--font-ubuntu-regular)] min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex flex-col items-center flex-grow max-w-[1400px] self-center m-8">
          {children}
        </main>
        <Footer />
        <ToastContainerProvider />
      </body>
    </html>
  );
}
