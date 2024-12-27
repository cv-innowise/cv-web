import { useState } from 'react'

// @ts-expect-error ai types
const writerPromise = window.ai?.writer?.create?.()
// @ts-expect-error ai types
const rewriterPromise = window.ai?.rewriter?.create?.()

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
  const isAvailable = !!window.ai

  const write = async ({ input, onChunk }: WriterPrompt) => {
    setIsPending(true)

    try {
      const writer = await writerPromise
      const stream = writer.writeStreaming(input)

      for await (const chunk of stream) {
        onChunk(chunk)
      }
    } catch (error) {
      // todo error
    }

    setIsPending(false)
  }

  const rewrite = async ({ input, context, onChunk }: RewriterPrompt) => {
    setIsPending(true)

    try {
      const rewriter = await rewriterPromise
      const stream = rewriter.rewriteStreaming(input, { context })

      for await (const chunk of stream) {
        onChunk(chunk)
      }
    } catch (error) {
      // todo error
    }

    setIsPending(false)
  }

  return { isAvailable, isPending, write, rewrite }
}
