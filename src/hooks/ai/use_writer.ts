import { useState } from 'react'

// @ts-expect-error ai types
const writerPromise = window.Writer?.create?.()
// @ts-expect-error ai types
const rewriterPromise = window.Rewriter?.create?.()

export type WriterPrompt = {
  input: string
  onChunk(output: string): void
}

export type RewriterPrompt = WriterPrompt & {
  context: string
}

export const useWriter = () => {
  const [isPending, setIsPending] = useState(false)
  // @ts-expect-error ai types
  const isAvailable = !!window.Writer?.availability?.() && !!window.Rewriter?.availability?.()

  const write = async ({ input, onChunk }: WriterPrompt) => {
    setIsPending(true)

    try {
      const writer = await writerPromise
      const stream = writer.writeStreaming(input)
      let output = ''

      for await (const chunk of stream) {
        output += chunk
        onChunk(output)
      }
    } catch (error) {
      console.error(error)
    }

    setIsPending(false)
  }

  const rewrite = async ({ input, context, onChunk }: RewriterPrompt) => {
    setIsPending(true)

    try {
      const rewriter = await rewriterPromise
      const stream = rewriter.rewriteStreaming(input, { context })
      let output = ''

      for await (const chunk of stream) {
        output += chunk
        onChunk(output)
      }
    } catch (error) {
      console.error(error)
    }

    setIsPending(false)
  }

  return { isAvailable, isPending, write, rewrite }
}
