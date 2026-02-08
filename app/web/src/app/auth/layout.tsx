"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <div>
            <h1>Layout test!!</h1>
        </div>
        {children}
    </section>
  );
}
