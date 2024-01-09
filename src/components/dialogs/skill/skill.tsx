import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, DialogActions, DialogTitle, TextField } from '@mui/material'
import { useSkillCreate, useSkillUpdate } from 'hooks/use-skills'
import { createDialogHook } from 'helpers/create-dialog-hook.helper'
import { SkillCategorySelect } from '@molecules/skill-category-select'
import { SkillFormValues, SkillProps } from './skill.types'
import * as Styled from './skill.styles'

const Skill = ({ item, closeDialog }: SkillProps) => {
  const methods = useForm<SkillFormValues>({
    defaultValues: {
      name: item?.name || '',
      category: item?.category || ''
    }
  })
  const {
    formState: { errors, isDirty },
    register,
    handleSubmit
  } = methods
  const { t } = useTranslation()
  const [createSkill, { loading }] = useSkillCreate()
  const [updateSkill, { loading: updating }] = useSkillUpdate()

  const onSubmit = ({ name, category }: SkillFormValues) => {
    if (item) {
      updateSkill({
        variables: {
          skill: {
            skillId: item.id,
            name,
            category
          }
        }
      }).then(() => closeDialog())
      return
    }
    createSkill({
      variables: {
        skill: {
          name,
          category
        }
      }
    }).then(() => closeDialog())
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{item ? t('Update skill') : t('Create skill')}</DialogTitle>
        <Styled.Column>
          <TextField
            {...register('name', { required: true })}
            autoFocus
            label={t('Name')}
            error={!!errors.name}
          />
          <SkillCategorySelect />
        </Styled.Column>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            {t('Cancel')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || updating || !isDirty}
          >
            {item ? t('Update') : t('Create')}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  )
}

export const useSkillDialog = createDialogHook<SkillProps>((props) => () => <Skill {...props} />, {
  maxWidth: 'sm',
  fullWidth: true
})
