import './globals.css';
import { Inter, IBM_Plex_Serif } from 'next/font/google';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ibm-plex-serif',
});

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}` }>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}