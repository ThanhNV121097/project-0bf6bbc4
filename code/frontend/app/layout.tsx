import "./globals.css";

export const metadata = {
  title: "hello-word-15",
  description: "End-to-end pipeline proof"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
