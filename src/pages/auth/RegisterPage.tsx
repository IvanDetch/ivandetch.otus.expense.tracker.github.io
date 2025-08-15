import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignupMutation } from '../../store/services/auth'
import { useAppDispatch } from '../../store/hooks'
import { setToken } from '../../store/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useAppTranslation } from '../../app/providers/i18n/useAppTranslation'
import { extractServerError, extractFieldError } from '../../shared/lib/errors'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email(),
  password: z.string().min(6)
})
type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const { t } = useAppTranslation()
  const [serverError, setServerError] = React.useState<string>('')
  const [signup, { isLoading, error }] = useSignupMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await signup(data).unwrap()
      dispatch(setToken(res.token))
      navigate('/operations')
    } catch (e: any) { setServerError(extractServerError(e, t)) }
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'2rem auto'}}>
      <h2>{t('pages.register.title')}</h2>
      <form className="flex" style={{flexDirection:'column'}} onSubmit={handleSubmit(onSubmit)}>
        <label>{t('forms.name')} <input {...register('name')} /></label>
        {errors.name && <small style={{color:'var(--danger)'}}>{errors.name.message}</small>}
        <label>{t('forms.email')} <input type="email" {...register('email')} /></label>
        {errors.email && <small style={{color:'var(--danger)'}}>{errors.email.message}</small>}
         <label>{t('forms.password')} <input type="password" {...register('password')} /></label>
        {errors.password && <small style={{color:'var(--danger)'}}>{errors.password.message}</small>}
        {error && <small style={{color:'var(--danger)'}}>Registration error</small>}
        <button type="submit" disabled={isLoading}>{t('forms.signUp')}</button>
      </form>
      <p>{t('pages.register.hasAccount')} <Link to="/login">{t('pages.login.title')}</Link></p>
    </div>
  )
}
