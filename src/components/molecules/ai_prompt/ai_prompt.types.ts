import { WriterPrompt } from 'hooks/ai/use_writer'

export type AiPromptProps = {
  resetDisabled?: boolean
  resetHidden?: boolean
  promptDisabled?: boolean
  onReset?(): void
  onPrompt(): WriterPrompt
  onReady?(output: string): void
}
