import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/alwaysUsed/navbar/Navbar";
import Navbottom from "@/components/alwaysUsed/navbottom/Navbottom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "osdabel.my.id",
  description: "RUKI : Ruang Kreasi Dan Informasi, OSIS SMAN 18 Garut, MPK SMAN 18 Garut, Organisasi Siswa Intra Sekolah, OSIS, Majelis Perwakilan Kelas, MPK, SMAN 18 garut",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

          
        <Navbar />
        <Navbottom />
        {children}
      </body>
    </html>
  );
}
