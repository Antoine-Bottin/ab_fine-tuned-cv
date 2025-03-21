'use client'

import { useState } from 'react'

import { api } from '~/trpc/react'
import Loader from '../Loader'

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
            },
        })

    return (
        <div className="w-full absolute top-1/3 max-w-3xl flex flex-col overflow-hidden">
            {isPending ? (
                <Loader />
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        createPostMutation({ question })
                        setQuestion('')
                    }}
                    className="flex flex-col gap-2"
                >
                    <input
                        type="text"
                        placeholder={
                            isPending ? 'Loading...' : 'Ask a question'
                        }
                        value={question}
                        disabled={isPending}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full h-20 rounded-full px-4 py-2 text-white bg-transparent border-slate-100 border-2 focus:outline-none focus:border-slate-200 text-3xl   "
                    />
                </form>
            )}

            {output?.length && output.length > 0 && (
                <div className="h-full flex flex-col gap-4 mt-2 overflow-scroll scrollbar-hide border-2">
                    {output?.reverse().map(({ question, answer }, idx) => {
                        return (
                            <div key={idx} className="flex gap-3">
                                {idx + 1}.
                                <div key={idx} className="flex flex-col gap-2">
                                    <div className="text-2xl text-gray-500 italic">
                                        {question}
                                    </div>
                                    <div className="text-2xl text-white">
                                        {answer}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default AIInput
