import { useForm } from 'react-hook-form'
import { generatePath, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { setSession } from 'graphql/auth/session'
import { PasswordInput } from '@molecules/password-input'
import { requiredValidation, passwordValidation } from 'helpers/validation.helper'
import { routes } from 'constants/routes'
import { signup } from 'hooks/use-auth'
import { addNotification } from 'graphql/notifications'
import { SignupFormValues } from './signup.types'
import * as Styled from '../login/login.styles'

const Signup = () => {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onSubmit = ({ email, password }: SignupFormValues) => {
    setLoading(true)
    signup({
      variables: {
        auth: {
          email,
          password
        }
      }
    })
      .then(({ data }) => {
        if (data) {
          setSession(data.signup)
          navigate(generatePath(routes.users.profile, { userId: data.signup.user.id }))
        }
      })
      .catch((error) => addNotification(error.message, 'error'))
      .finally(() => setLoading(false))
  }

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" textAlign="center">
        {t('Register now')}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {t('Welcome! Sign up to continue')}
      </Typography>
      <TextField
        {...register('email', { validate: requiredValidation })}
        label={t('Email')}
        placeholder="example@mail.com"
        autoFocus
        error={!!errors.email}
        helperText={t(errors.email?.message || '')}
      />
      <PasswordInput
        {...register('password', { validate: passwordValidation })}
        label={t('Password')}
        placeholder={t('Enter your password') || ''}
        error={!!errors.password}
        helperText={t(errors.password?.message || '')}
      />
      <Styled.Actions>
        <Button variant="contained" type="submit" disabled={loading}>
          {t('Create account')}
        </Button>
        <Button color="secondary" onClick={() => navigate(routes.auth.login)}>
          {t('I have an account')}
        </Button>
      </Styled.Actions>
    </Styled.Form>
  )
}

export default Signup
