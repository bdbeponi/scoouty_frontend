// src/app/layout.js

import "@/app/globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import ReduxProvider from "@/redux/reduxProvider/ReduxProvider";
import { Toaster } from "sonner";

export const metadata = {
  title: "Scooty Lelo",
  description: "Scooty Lelo Website",
  // verification: {
  //   google: "dVhkHySBvxmgD8mQ1EkTdyUEEqG_0utMRjcaaUtIe9A",
  // },
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body cz-shortcut-listen="true" className="antialiased">
          <Navbar />
          <div className="mt-28 lg:mt-18 bg-gray-50">{children}</div>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ReduxProvider>
  );
}
