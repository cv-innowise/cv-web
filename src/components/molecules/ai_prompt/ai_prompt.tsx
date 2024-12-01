import { AutoAwesome, Undo } from '@mui/icons-material'
import { Box, Button, CircularProgress } from '@mui/material'
import { useWriter } from 'hooks/ai/use_writer'
import { AiPromptProps } from './ai_prompt.types'

const buttonSx = {
  height: '32px',
  minWidth: '120px'
}

export const AiPrompt = ({ resetDisabled, promptDisabled, onReset, onPrompt }: AiPromptProps) => {
  const { isAvailable, isPending, write } = useWriter()

  if (!isAvailable) {
    return null
  }

  return (
    <>
      <Box display="flex" gridColumn="span 2" justifyContent="flex-end" mt="-24px">
        <Button
          color="secondary"
          sx={buttonSx}
          startIcon={<Undo />}
          disabled={isPending || resetDisabled}
          onClick={onReset}
        >
          Undo
        </Button>

        <Button
          sx={buttonSx}
          startIcon={
            isPending ? (
              <CircularProgress size="sm" sx={{ height: '20px', width: '20px' }} />
            ) : (
              <AutoAwesome />
            )
          }
          disabled={isPending || promptDisabled}
          onClick={() => write(onPrompt())}
        >
          Use AI
        </Button>
      </Box>
    </>
  )
}
