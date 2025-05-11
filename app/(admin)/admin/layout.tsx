
import "./admin.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
        {children}
        </div>
      </body>
    </html>
  );
}