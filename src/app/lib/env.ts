export const env = {
    openAiApiKey: process.env.OPENAI_API_KEY ?? '',
}

if (!env.openAiApiKey) {
    throw new Error('Missing OPENAI_API_KEY in environment variables.')
}
