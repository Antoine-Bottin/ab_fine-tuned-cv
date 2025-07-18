'use client'

import { useRef, useState } from 'react'

import { api } from '~/trpc/react'

interface IAiOutput {
    question: string
    answer: string
}

const AIInput = () => {
    const utils = api.useUtils()

    const inputRef = useRef<HTMLInputElement>(null)

    const [question, setQuestion] = useState('')

    const [output, setOutput] = useState<IAiOutput[]>()

    const { mutate: createPostMutation, isPending } =
        api.post.create.useMutation({
            onSuccess: async (data) => {
                await utils.post.invalidate()
                setOutput((prev) =>
                    prev ? [...prev, data as IAiOutput] : [data as IAiOutput]
                )

                setTimeout(() => {
                    inputRef.current?.focus()
                }, 50)
            },
        })

    return (
        <div className="relative h-dvh w-4/5 !important md:w-3/5 flex flex-col justify-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    createPostMutation({ question })
                    setQuestion('')
                }}
                className="relative"
            >
                <input
                    type="text"
                    ref={inputRef}
                    placeholder={
                        isPending ? '' : 'Ask a question about my experience'
                    }
                    value={question}
                    disabled={isPending}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="absolute left-1/2 top-1/2 h-16 md:h-20 -translate-x-1/2 -translate-y-1/2
                           w-full rounded-full px-4 py-2 text-white
                           bg-transparent border-slate-100 border-2
                           focus:outline-none focus:border-slate-200 text-2xl md:text-3xl xs:text-sm
                           placeholder:text-base md:placeholder:text-2xl sm:placeholder:text-lg
                           leading-[4rem] md:leading-[5rem]"
                />
                {isPending && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
                        <span
                            className="block w-3 h-3 bg-slate-200 rounded-full animate-bounce"
                            style={{ animationDelay: '0s' }}
                        ></span>
                        <span
                            className="block w-3 h-3 bg-slate-200 rounded-full animate-bounce"
                            style={{ animationDelay: '0.15s' }}
                        ></span>
                        <span
                            className="block w-3 h-3 bg-slate-200 rounded-full animate-bounce"
                            style={{ animationDelay: '0.3s' }}
                        ></span>
                    </span>
                )}
            </form>

            {output?.length && output.length > 0 && (
                <div
                    className="absolute left-1/2 top-[calc(50%+3rem)] md:top-[calc(50%+5rem)]  -translate-x-1/2 
                   w-full max-h-[40vh] overflow-auto flex flex-col gap-3 scrollbar-hide"
                >
                    {[...output].reverse().map(({ question, answer }, idx) => (
                        <div key={idx} className="flex gap-3">
                            <div className="mt-0.5">{idx + 1}.</div>
                            <div className="flex flex-col gap-2">
                                <div className="text-lg md:text-2xl text-gray-500 italic break-words">
                                    {`${question.charAt(0).toUpperCase()}${question.slice(1)}`}
                                </div>
                                <div className="text-lg md:text-2xl text-white break-words">
                                    {answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AIInput
