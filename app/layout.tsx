import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree, Inter, Manrope, Space_Grotesk } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import getGamesByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import { ThemeProvider } from '@/components/theme-provider'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const font = spaceGrotesk

export const metadata = {
  title: 'Games',
  description: 'Play',
};

export const revalidate = 0 // don't cache

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userGames = await getGamesByUserId();
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
          <Sidebar songs={userSongs} games={userGames}>
            {children}
          </Sidebar>
          <Player />
          </UserProvider>
        </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
