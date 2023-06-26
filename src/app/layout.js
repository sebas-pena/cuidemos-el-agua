import localFont from '@next/font/local'
import Header from '@/components/layout/Header'
import ReduxProvider from '@/store/Provider'
import './globals.css'
import 'leaflet/dist/leaflet.css'

const coolvetica = localFont({
  src: [
    {
      path: '../../public/fonts/coolvetica.otf',
      weight: '600'
    }
  ],
  variable: '--font-coolvetica'
})

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={coolvetica.variable + " flex flex-col w-screen min-h-[100svh] overflow-x-hidden"}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
