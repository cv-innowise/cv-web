import { Controller, useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useCvUpdate } from 'hooks/use-cvs'
import { requiredValidation } from 'helpers/validation.helper'
import { usePermission } from 'hooks/use_permission'
import { addNotification } from 'graphql/notifications'
import { AiPrompt, getCvPrompt } from '@molecules/ai_prompt'
import * as Styled from './cv-details-form.styles'
import { CvDetailsFormProps, CvFormValues } from './cv-details-form.types'

const CvDetailsForm = ({ cv }: CvDetailsFormProps) => {
  const { t } = useTranslation()
  const { canUpdateCv } = usePermission()
  const {
    formState: { errors, isDirty, dirtyFields, defaultValues },
    control,
    reset,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue
  } = useForm<CvFormValues>({
    defaultValues: {
      name: cv.name,
      education: cv.education || '',
      description: cv.description
    }
  })

  const [updateCv, { loading }] = useCvUpdate()

  const onSubmit = ({ name, education, description }: CvFormValues) => {
    updateCv({
      variables: {
        cv: {
          cvId: cv.id,
          name,
          education,
          description
        }
      }
    })
      .then(() => reset({ name, education, description }))
      .then(() => addNotification('CV was updated'))
      .catch((error: Error) => addNotification(error.message, 'error'))
  }

  return (
    <Styled.Form disabled={!canUpdateCv(cv)} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name', { validate: requiredValidation })}
        autoFocus={canUpdateCv(cv)}
        label={t('Name')}
        error={!!errors.name}
        helperText={t(errors.name?.message || '')}
      />
      <TextField {...register('education')} label={t('Education')} />
      <Controller
        name="description"
        control={control}
        rules={{ validate: requiredValidation }}
        render={({ field }) => (
          <Styled.Description
            {...field}
            label={t('Description')}
            multiline
            minRows={7}
            error={!!errors.description}
            helperText={t(errors.description?.message || '')}
          />
        )}
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
          const { name, education, description } = getValues()

          return {
            input: getCvPrompt(description, name, education),
            onChunk(output) {
              setValue('description', output, { shouldDirty: true, shouldValidate: true })
            }
          }
        }}
      />
      {canUpdateCv(cv) && (
        <Button
          sx={{ gridColumn: 2 }}
          type="submit"
          variant="contained"
          disabled={!isDirty || loading}
        >
          {t('Update')}
        </Button>
      )}
    </Styled.Form>
  )
}

export default memo(CvDetailsForm)
