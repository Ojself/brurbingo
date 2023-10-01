import "./globals.css";
import Footer from "../components/Footer";
export const metadata = {
  title: "Brurbingo",
  description: "Your favorite bingo game with favorite person",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
