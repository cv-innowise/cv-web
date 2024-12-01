import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { parseISO } from 'date-fns/esm'
import { Button, DialogActions, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { DatePicker } from '@molecules/date-picker'
import { createDialogHook } from 'helpers/create-dialog-hook.helper'
import { requiredValidation } from 'helpers/validation.helper'
import { DayMonthYear } from 'constants/format.constant'
import { ProjectSkillsSelect } from '@molecules/project_skills_select'
import { AiPrompt } from '@molecules/ai_prompt'
import * as Styled from './project.styles'
import { ProjectFormValues, ProjectDialogProps } from './project.types'

const Project = ({ title, confirmText, item, onConfirm, closeDialog }: ProjectDialogProps) => {
  const { t } = useTranslation()
  const methods = useForm<ProjectFormValues>({
    defaultValues: {
      name: item?.name || '',
      domain: item?.domain || '',
      start_date: item?.start_date ? parseISO(item.start_date) : null,
      end_date: item?.end_date ? parseISO(item.end_date) : null,
      description: item?.description || '',
      environment: item?.environment || []
    },
    mode: 'onChange'
  })
  const {
    formState: { errors, isDirty, dirtyFields, defaultValues },
    register,
    handleSubmit,
    watch,
    getValues,
    setValue
  } = methods
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (values: ProjectFormValues) => {
    setIsLoading(true)
    onConfirm(values)
      .then(closeDialog)
      .catch(() => setIsLoading(false))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{t(title)}</DialogTitle>
        <Styled.Column>
          <TextField
            {...register('name', { validate: requiredValidation })}
            autoFocus
            label={t('Name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField {...register('domain')} label={t('Domain')} />
          <DatePicker
            name="start_date"
            rules={{ required: true }}
            label={t('Start Date')}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
            format={DayMonthYear}
          />
          <DatePicker
            name="end_date"
            label={t('End Date')}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
            format={DayMonthYear}
          />
          <Styled.Description
            {...register('description')}
            label={t('Description')}
            multiline
            minRows={5}
          />
          <AiPrompt
            resetDisabled={!dirtyFields.description}
            promptDisabled={!watch('description')}
            onReset={() =>
              setValue('description', defaultValues?.description || '', {
                shouldDirty: true,
                shouldValidate: true
              })
            }
            onPrompt={() => {
              const { name, domain, description } = getValues()

              return {
                input: `
                    Write app technical description based on the following input:
                    "${description}".
                    Application name is ${name || '[Name]'}. Don't use this name in every sentence.
                    Try to rephrase the name.
                    It is connected with ${domain || '[Domain]'} area.
                    Describe which problems it can solve.
                    Include essential and popular features that are used in this area. Don't use the word "essential" and "popular".
                    Your response length should be less than 500 characters.
                  `,
                onChunk(output) {
                  setValue('description', output, { shouldDirty: true, shouldValidate: true })
                }
              }
            }}
          />
          <ProjectSkillsSelect />
        </Styled.Column>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            {t('Cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading || !isDirty}
          >
            {t(confirmText)}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  )
}

export const useProjectDialog = createDialogHook<ProjectDialogProps>(
  (props) => () => <Project {...props} />,
  { maxWidth: 'md', fullWidth: true }
)
