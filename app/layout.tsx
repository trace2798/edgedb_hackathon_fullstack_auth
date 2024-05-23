import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { auth } from "@/edgedb";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Productivus",
  description: "Efficiently manage your tasks",
  openGraph: {
    title: "Productivus",
    description: "Efficiently manage your tasks",
    url: "https://productivus.vercel.app/",
    siteName: "Productivus",
    images: [
      {
        url: "https://productivus.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Productivus",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Productivus",
    description: "Efficiently manage your tasks",
    images: [
      {
        url: "https://productivus.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Productivus",
      },
    ],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = auth.getSession();
  // // console.log(session)
  // const [user] = await session.client.query(
  //   `SELECT User {*} FILTER .id = global current_user.id`
  // );
  // // console.log(user);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ModalProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
