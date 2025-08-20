import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uniloco - Discover Your Adventure",
  description: "Web3 Travel Story Platform - Where Every Journey Becomes a Story",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#3B82F6",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Uniloco",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: ["travel", "web3", "ai", "adventure", "story", "mobile"],
  authors: [{ name: "Uniloco Team" }],
  openGraph: {
    title: "Uniloco - Discover Your Adventure",
    description: "Web3 Travel Story Platform - Where Every Journey Becomes a Story",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uniloco - Discover Your Adventure",
    description: "Web3 Travel Story Platform - Where Every Journey Becomes a Story",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Uniloco" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
