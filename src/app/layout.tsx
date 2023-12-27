import type { Metadata } from 'next';
import '../../style/globals.scss';
import localFont from 'next/font/local';

const lausanne = localFont({
  src: [
    {
      path:'../../public/fonts/TWKLausanne-800.woff',
      weight:'800',
    },
    {
      path:'../../public/fonts/TWKLausanne-600.woff2',
      weight:'600',
    },
    {
      path:'../../public/fonts/TWKLausanne-300.woff',
      weight:'300',
    },
    {
      path:'../../public/fonts/TWKLausanne-150.woff',
      weight:'150',
    }
  ],
  variable: '--font-lausanne'
});

export const metadata: Metadata = {
  title: 'Perry Angelora',
  description: 'The Development and Product Experience Portfolio of Perry Angelora',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lausanne.variable}>{children}</body>
    </html>
  );
}
