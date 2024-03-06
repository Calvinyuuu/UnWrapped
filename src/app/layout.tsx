import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: 'UnWrapped',
  description: 'Created by Calvin Yu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
