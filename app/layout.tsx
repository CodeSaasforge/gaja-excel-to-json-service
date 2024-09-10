import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import classNames from "@/utils/classNames";
import "./globals.css";
import Providers from "@/providers/Providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Excel to JSON service",
  description: "Gaja - Excel to json service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(poppins.className, "bg-gray-200/40")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
