import React from 'react'
import { useProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } from '../../store/services/auth'
import { useAppDispatch } from '../../store/hooks'
import { setToken } from '../../store/slices/authSlice'
import { useAppTranslation } from '../../app/providers/i18n/useAppTranslation'
import { extractServerError } from '../../shared/lib/errors'

export default function ProfilePage() {
  const { t } = useAppTranslation()
  const [serverError, setServerError] = React.useState<string>('')
  const { data, isLoading, isError } = useProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation()
  const dispatch = useAppDispatch()

  const [name, setName] = React.useState('')
  const [oldPass, setOldPass] = React.useState('')
  const [newPass, setNewPass] = React.useState('')

  React.useEffect(() => { if (data) setName(data.name) }, [data])

  if (isLoading) return <div className="card">{t("actions.loading")}</div>
  if (isError) return <div className="card">{t("actions.loadingErr")}</div>

  return (
    <div className="card">
      <div className="flex" style={{justifyContent:'space-between'}}>
        <h2>{t('pages.profile.title')}</h2>
        <button onClick={() => dispatch(setToken(null))}>{t("auth.signOut")}</button>
      </div>
      <p><b>Email:</b> {data?.email}</p>
      <div className="flex">
        <input value={name} onChange={e => setName(e.target.value)} placeholder={t("forms.name")} />
        <button onClick={() => updateProfile({ name })} disabled={isUpdating}>{t("actions.save")}</button>
      </div>
      <h3>{t('pages.profile.changePassword')}</h3>
      <div className="flex">
        <input type="password" placeholder={t("forms.oldPassword")} value={oldPass} onChange={e => setOldPass(e.target.value)} />
        <input type="password" placeholder={t("forms.newPassword")} value={newPass} onChange={e => setNewPass(e.target.value)} />
        <button onClick={async () => { try { await changePassword({ password: oldPass, newPassword: newPass }).unwrap() } catch(e:any){ setServerError(extractServerError(e, t)) } }} disabled={isChanging}>{t("forms.change")}</button>{serverError && <small style={{color:'var(--danger)'}}>{serverError}</small>}
      </div>
    </div>
  )
}
