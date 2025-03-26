import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import { TRPCReactProvider } from '~/trpc/react'
import '~/styles/globals.css'

export const metadata: Metadata = {
    title: 'Antoine Bottin - Xxperience ',
    description: 'Ask your questions about my experience',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
    keywords: [
        'web',
        'developer',
        'CV',
        'Curriculum Vitae',
        'Antoine Bottin',
        'software ingeneer',
        'reactJS',
        'NextJs',
        'NodeJs',
        'TypeScript',
        'JavaScript',
        'HTML',
    ],
    metadataBase: new URL('https://www.xperience.abottin.dev'),
    openGraph: {
        title: 'Antoine Bottin - Xperience ',
        description: 'Ask your questions about my resume',
        images: [{ url: '/pictures/Photo_CV.jpg' }],
        type: 'website',
        url: 'https://www.xperience.abottin.dev',
    },
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <Analytics />
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    )
}
