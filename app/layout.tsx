import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub – personal notes app",
  description: "NoteHub is a simple and efficient application for managing personal notes. It helps keep your thoughts organized and accessible in one place, with support for keyword search and structured organization.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <div id="modal-root"></div>

        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}