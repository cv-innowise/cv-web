import { CreateCvResult } from 'graphql/cvs/cvs.types'
import { DialogProps } from 'graphql/dialogs/dialogs.types'

export type CvFormValues = {
  name: string
  education: string
  description: string
}

export type CvProps = DialogProps & {
  userId: string
  onCreate?(data: CreateCvResult): void
}
