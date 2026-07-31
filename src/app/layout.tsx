import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "800"], 
  subsets: ["latin"], 
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DuniyaPay - Transférez sans frontières",
  description: "DuniyaPay est une plateforme financière qui permet d'envoyer et de recevoir de l'argent partout dans le monde de manière rapide, sécurisée et accessible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
