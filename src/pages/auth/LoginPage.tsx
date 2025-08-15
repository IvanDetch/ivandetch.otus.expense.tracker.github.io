import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSigninMutation } from '../../store/services/auth'
import { useAppDispatch } from '../../store/hooks'
import { setToken } from '../../store/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useAppTranslation } from '../../app/providers/i18n/useAppTranslation'
import { extractServerError } from '../../shared/lib/errors'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const { t } = useAppTranslation()
  const [serverError, setServerError] = React.useState<string>('')
  const [signin, { isLoading, error }] = useSigninMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await signin(data).unwrap()
      dispatch(setToken(res.token))
      navigate('/operations')
    } catch (e: any) { setServerError(extractServerError(e, t)) }
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'2rem auto'}}>
      <h2>{t('pages.login.title')}</h2>
      <form className="flex" style={{flexDirection:'column'}} onSubmit={handleSubmit(onSubmit)}>
        <label>{t('forms.email')} <input type="email" {...register('email')} /></label>
        {errors.email && <small style={{color:'var(--danger)'}}>{errors.email.message}</small>}
        <label>{t('forms.password')} <input type="password" {...register('password')} /></label>
        {errors.password && <small style={{color:'var(--danger)'}}>{errors.password.message}</small>}
        {error && <small style={{color:'var(--danger)'}}>Auth error</small>}
        <button type="submit" disabled={isLoading}>{t('forms.signIn')}</button>
      </form>
      <p> {t('pages.login.orRegister')} <Link to="/register">{t('pages.register.title')}</Link></p>
    </div>
  )
}
