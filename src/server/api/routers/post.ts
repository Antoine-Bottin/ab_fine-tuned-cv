import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

import OpenAI from 'openai'

const FINE_TUNED_MODEL =
    'ft:gpt-4o-mini-2024-07-18:a-bottin:ab-fine-tuned-cv:B9uu9kYI'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

console.log(process.env.OPENAI_API_KEY)

export const postRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ question: z.string().min(1) }))
        .mutation(async ({ input }) => {
            const completion = await openai.chat.completions.create({
                model: FINE_TUNED_MODEL,
                messages: [
                    {
                        role: 'developer',
                        content:
                            'You are a helpful assistant focused on Antoine Bottin, software engeneer experience.',
                    },
                    {
                        role: 'user',
                        content: input.question,
                    },
                ],
                store: true,
            })

            return {
                question: input.question,
                answer: completion.choices[0]?.message.content,
            }
        }),
})
