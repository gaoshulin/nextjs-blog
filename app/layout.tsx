import "./globals.css";
import { Geist } from 'next/font/google'
import type { Metadata } from "next";

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Next.js Blog",
  description: "A blog about Next.js",
}


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
