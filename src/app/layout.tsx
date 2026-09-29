import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Porsche 911 GT3 RS — The Architecture of Velocity",
  description:
    "An interactive scrollytelling experience deconstructing the aerodynamic mastery, naturally aspirated 4.0L flat-six engine, and Manthey Racing engineering of the Porsche 911 GT3 RS in Oak Green Metallic Neo.",
  keywords: [
    "Porsche",
    "911 GT3 RS",
    "Manthey Racing",
    "Scrollytelling",
    "Aerodynamics Deconstructed",
    "Oak Green Metallic Neo",
    "Motorsport",
  ],
  authors: [{ name: "Porsche AG Engineering" }],
  openGraph: {
    title: "Porsche 911 GT3 RS — The Architecture of Velocity",
    description: "Interactive aerodynamic disassembly and engineering experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0a0a0c] text-[#ededed] min-h-screen antialiased selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
