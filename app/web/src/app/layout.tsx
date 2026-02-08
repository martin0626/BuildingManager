import Link from "next/link";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> 
          <Link href="/auth/login">Login</Link> 
          <Link href="/auth/register">Register</Link>
          <Link href="/buildings">Buildings</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
