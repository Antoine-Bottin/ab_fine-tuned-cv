"use client";

import {  useState } from "react";


import { api } from "~/trpc/react";

const  AIInput=() =>{
  
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [content, setContent] = useState("");


  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setContent("");
    },
  });


  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ content });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Ask me your question"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-20 rounded-full px-4 py-2 text-white bg-transparent border-slate-100 border-2 focus:outline-none focus:border-slate-200"
          
        />
      </form>
    </div>
  );
}

export default AIInput