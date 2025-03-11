import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import OpenAI from "openai";

const UPLOADED_FILE_ID='file-Twqs5gDpR8WG66UjwJBQGS'


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {


    const completion = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:a-bottin:ab-fine-tuned-cv:B9tmutKK:ckpt-step-80",
      messages: [
          { role: "developer", content: "You are a helpful assistant." },
          {
              role: "user",
              content: input.content,
          },
      ],
      store: true,
  });
  
  console.log(completion.choices[0].message);


      // return ctx.db.aIOutput.create({
      //   data: {
      //     content: input.content,
      //   },
      // });
    }),

});


