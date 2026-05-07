import { AuthProvider } from '@/context/AuthContext';
import { ListingProvider } from '@/context/ListingContext';
import './globals.css';

export const metadata = {
  title: 'Property | Premium Real Estate UAE',
  description: 'Find your dream home with the most exclusive property finder in the UAE.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ListingProvider>
            {children}
          </ListingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
