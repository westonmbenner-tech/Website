import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Globe",
  description: "An interactive travel globe for a premium portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
