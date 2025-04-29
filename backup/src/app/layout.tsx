import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5D Waves - Meditation & Relaxation App",
  description: "Raise your consciousness, meditate, sleep deeply & clear your mind with 5D Waves meditation app. Download now on iOS and Android.",
  keywords: "meditation, relaxation, mindfulness, sleep, focus, 5D Waves, breathing, consciousness",
  openGraph: {
    title: "5D Waves - Meditation & Relaxation App",
    description: "Raise your consciousness, meditate, sleep deeply & clear your mind with 5D Waves meditation app.",
    url: "https://5dwaves.com",
    siteName: "5D Waves",
    images: [
      {
        url: "/images/logo7.png",
        width: 1200,
        height: 630,
        alt: "5D Waves Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL('https://5dwaves.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          }
          `}
        </style>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
