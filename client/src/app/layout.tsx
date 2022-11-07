import Head from "next/head"
import "../styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head>Sample App</Head>
      <body>{children}</body>
    </html>
  )
}
