import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "./components/Navbar";
import SmoothScrolling from "./components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata = {
  title: "Namo Dhaker — Full-stack Developer",
  description:
    "Full-stack developer building interactive, responsive web applications. Building bridges between ideas and execution.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="grain font-sans bg-ink text-fg">
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
