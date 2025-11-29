import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

// Updated fonts to Inter and Poppins for academic premium feel
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

// Updated metadata for Dr. Amruta S. Desai's portfolio
export const metadata: Metadata = {
  title: "Dr. Amruta S. Desai, Ph.D. - Plant Biotechnology Researcher",
  description:
    "Professional portfolio of Dr. Amruta S. Desai, Assistant Professor and University Research Coordinator at Pimpri Chinchwad University. Specializing in Plant Breeding, Biotechnology, and Molecular Biology.",
  keywords: "Plant Breeding, Biotechnology, Molecular Biology, Research, Academic, Ph.D., Amruta Desai",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
