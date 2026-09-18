import type { Metadata } from "next";
import { Lexend, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollbarHandler from "@/components/ScrollbarHandler";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "bourbaki.blog",
  description: "Personal space - developer, reader, thinker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint so pages do not flash dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${lexend.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ScrollbarHandler />
        {children}
      </body>
    </html>
  );
}
