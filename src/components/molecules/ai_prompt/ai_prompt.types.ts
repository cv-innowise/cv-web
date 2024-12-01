import { WriterPrompt } from 'hooks/ai/use_writer'

export type AiPromptProps = {
  resetDisabled?: boolean
  promptDisabled?: boolean
  onReset(): void
  onPrompt(): WriterPrompt
}
