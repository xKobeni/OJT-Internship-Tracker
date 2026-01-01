import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./context/DataContext";
import { ToastProvider } from "./context/ToastContext";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OJT / Internship Tracker",
  description: "Track your internship applications and daily OJT progress with hours calculation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <DataProvider>
          <ToastProvider>
            <Navigation />
            {children}
          </ToastProvider>
        </DataProvider>
      </body>
    </html>
  );
}
