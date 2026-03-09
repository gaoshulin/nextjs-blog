import "./globals.css";
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })



export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
