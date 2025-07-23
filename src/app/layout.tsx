import type { Metadata } from "next";
import { Poppins, Roboto, Oregano } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Welcome to Weather App",
  description: "A simple weather app built with Next.js and Tailwind CSS",
};
const oregano = Oregano({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-oregano",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${oregano.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
