import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

export const metadata: Metadata = {
  title: "Aurix | Your Go-To Platform for Freelance Gigs & Job Opportunities",
  description:
    "Aurix connects freelancers with the best opportunities from top platforms like Upwork, AngelList, and Fiverr. Discover gigs that match your skills and take the next step in your freelance career.",
  keywords:
    "freelance gigs, job opportunities, upwork, angel list, fiverr, freelance platform, find jobs online, remote work, freelance developers, freelance designers, freelance marketers",
  openGraph: {
    type: "website",
    title: "Aurix | Your Go-To Platform for Freelance Gigs & Job Opportunities",
    description:
      "Aurix helps freelancers find the best job opportunities from top platforms. Explore gigs and grow your freelance career today!",
    url: "https://aurix.space",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurix | Freelance Gigs & Job Opportunities",
    description:
      "Discover top freelance gigs and job opportunities from Upwork, AngelList, and more on Aurix. Find your next gig today!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
