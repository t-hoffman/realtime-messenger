import "./globals.css";
import localFont from "next/font/local";
import AuthContext from "./context/AuthContext";
import ApolloWrapper from "./components/ApolloWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Messenger",
  description: "Realtime messenger app.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} antialiased`}
      >
        <AuthContext>
          <Toaster />
          <ApolloWrapper>{children}</ApolloWrapper>
        </AuthContext>
      </body>
    </html>
  );
}
