import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider'
import Toast from '@/components/Toast'
import LoadingProvider from '@/components/LoadingProvider'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Swipdev ✨",
  description: "Swipe right to find your dream developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider>
          <LoadingProvider>
            {children}
            <Toast />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
