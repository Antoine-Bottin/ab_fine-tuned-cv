import { HydrateClient } from '~/trpc/server'
import AIInput from './_components/Input'

export default async function Home() {
    return (
        <HydrateClient>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#080808] to-[#15162c] text-white">
                <AIInput />
            </main>
        </HydrateClient>
    )
}
