'use client'

import { useState } from 'react'

import { api } from '~/trpc/react'

interface IAiOutput {
    question: string
    answer: string
}

const AIInput = () => {
    // const [latestPost] = api.post.getLatest.useSuspenseQuery();

    const utils = api.useUtils()
    const [question, setQuestion] = useState('')

    const [output, setOutput] = useState<IAiOutput[]>()

    const { mutate: createPostMutation, isPending } =
        api.post.create.useMutation({
            onSuccess: async (data) => {
                console.log('data', data)
                await utils.post.invalidate()
                setOutput((prev) =>
                    prev ? [...prev, data as IAiOutput] : [data as IAiOutput]
                )
                setQuestion('')
            },
        })

    console.log(output, isPending)

    return (
        <div className="w-full max-w-lg">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createPostMutation({ question })
                }}
                className="flex flex-col gap-2"
            >
                <input
                    type="text"
                    placeholder="Ask me your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full h-20 rounded-full px-4 py-2 text-white bg-transparent border-slate-100 border-2 focus:outline-none focus:border-slate-200 text-3xl  "
                />
            </form>
        </div>
    )
}

export default AIInput
