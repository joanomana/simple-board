
import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat", 
  subsets: ["latin"], 
  weight: ["400", "500", "600","700"], 
});





export const metadata = {
  title: "CRUD Operations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {children}
      </body>
    </html>
  );
}
