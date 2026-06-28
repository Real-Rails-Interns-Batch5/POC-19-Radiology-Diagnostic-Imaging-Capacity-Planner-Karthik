import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Radiology & Diagnostic Imaging Capacity Planner",
  description: "Healthcare intelligence dashboard monitoring MRI/CT scanner availability, utilization, equipment age, and patient wait times across Gulf region hospitals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-[#030712] overflow-y-auto`}
    >
      <body className="bg-[#030712] overflow-y-auto">{children}</body>
    </html>
  );
}
