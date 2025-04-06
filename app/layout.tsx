import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme  appearance="light" accentColor="violet">
          <NavBar />
          <main className="p-5">{children}</main>
          {/* <ThemePanel/> */}
        </Theme>
      </body>
    </html>
  );
}

/**
 * To use the inter classnames we need to modify it according to radix ui, that we can see how 
 * we can do this on radix ui official website in the Typography section inside the "Themes"
 */