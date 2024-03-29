import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import { DepartmentSelect } from '@molecules/department-select'
import { PositionSelect } from '@molecules/position-select'
import { useUserUpdate } from 'hooks/use-users'
import { useProfileUpdate } from 'hooks/use-profile'
import { useAuth } from 'hooks/use-auth'
import { EmployeeProfileFormProps, UserProfileFormValues } from './employee-profile-form.types'
import * as Styled from './employee-profile-form.styles'

export const EmployeeProfileForm = ({ user }: EmployeeProfileFormProps) => {
  const [updateUser, { loading }] = useUserUpdate()
  const [updateProfile] = useProfileUpdate()
  const { isAdmin, userId } = useAuth()
  const { t } = useTranslation()

  const methods = useForm<UserProfileFormValues>({
    defaultValues: {
      profile: {
        first_name: user.profile.first_name || '',
        last_name: user.profile.last_name || ''
      },
      departmentId: user.department?.id || '',
      positionId: user.position?.id || ''
    }
  })
  const { formState, register, handleSubmit, reset } = methods

  const onSubmit = ({ profile, departmentId, positionId }: UserProfileFormValues) => {
    Promise.all([
      updateProfile({
        variables: {
          profile: {
            userId: user.id,
            first_name: profile.first_name,
            last_name: profile.last_name
          }
        }
      }),
      updateUser({
        variables: {
          user: {
            userId: user.id,
            departmentId,
            positionId,
            role: user.role
          }
        }
      })
    ]).then(() => reset({ profile, departmentId, positionId }))
  }

  return (
    <FormProvider {...methods}>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('profile.first_name')} autoFocus label={t('First Name')} />
        <TextField {...register('profile.last_name')} label={t('Last Name')} />
        <DepartmentSelect name="departmentId" />
        <PositionSelect name="positionId" />
        {(isAdmin || userId === user.id) && (
          <Styled.SubmitButton
            type="submit"
            variant="contained"
            disabled={!formState.isDirty || loading}
          >
            {t('Update')}
          </Styled.SubmitButton>
        )}
      </Styled.Form>
    </FormProvider>
  )
}
