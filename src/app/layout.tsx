import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import { TrackerProvider } from "../components/TrackerProvider";

export const metadata: Metadata = {
  title: "Gianluca Fornaciari",
  description: "Personal Page of Mr. Gianluca Fornaciari",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased font-lato">
        {/*<TrackerProvider>*/}
          <Navbar />
          {children}
          <Footer />
        {/*</TrackerProvider>*/}
      </body>
    </html>
  );
}
