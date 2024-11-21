import "./globals.css";
import localFont from "next/font/local";
import AuthProvider from "./context/AuthContext";
import ApolloWrapper from "./context/ApolloWrapper";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./actions/getCurrentUser";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Messenger",
  description: "Realtime messenger app.",
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} antialiased`}
      >
        <AuthProvider currentUser={currentUser}>
          <Toaster />
          <ApolloWrapper>{children}</ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
