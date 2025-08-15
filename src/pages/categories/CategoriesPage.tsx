import React from 'react'
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../store/services/categories'
import Modal from '../../components/Modal'
import { useTranslation } from 'react-i18next'

export default function CategoriesPage() {
  const { t } = useTranslation()
  const [page, setPage] = React.useState(1)
  const { data, isLoading, isError } = useGetCategoriesQuery({ pagination: { pageNumber: page, pageSize: 10 } })
  const [open, setOpen] = React.useState(false)
  const [edit, setEdit] = React.useState<{id?: string, name: string}>({ name: '' })

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  if (isError) return <div className="card">Failed to load categories</div>

  return (
    <div className="card">
      <div className="flex" style={{justifyContent:'space-between'}}>
        <h2>{t('pages.categories.title')}</h2>
        <button onClick={() => { setEdit({ name: '' }); setOpen(true) }}>{t('pages.categories.new')}</button>
      </div>
      {isLoading ? <p>{t('actions.loading')}</p> : (
        <table className="table">
          <thead><tr><th>{t('table.name')}</th><th style={{width:200}}>{t('table.actions')}</th></tr></thead>
          <tbody>
            {data?.data.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <div className="flex">
                  <button onClick={() => { setEdit({ id: c.id, name: c.name }); setOpen(true) }}>{t('actions.edit')}</button>
                  <button onClick={() => deleteCategory(c.id)} style={{background:'var(--danger)'}}>{t('actions.delete')}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex" style={{justifyContent:'space-between', marginTop: '0.75rem'}}>
        <button disabled={page<=1} onClick={() => setPage(p=>p-1)}>{t('table.button.prev')}</button>
        <span>{t('table.page')} {data?.pagination?.pageNumber ?? page} / {data ? Math.ceil(data.pagination.total / data.pagination.pageSize) : 1}</span>
        <button disabled={data ? page >= Math.ceil(data.pagination.total / data.pagination.pageSize) : true} onClick={() => setPage(p=>p+1)}>{t('table.button.next')}</button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={edit.id ? t('forms.modalTitleCategory.edit') : t('forms.modalTitleCategory.new')}>
        <div className="flex" style={{flexDirection:'column'}}>
          <label>{t('table.name')} <input value={edit.name} onChange={e => setEdit(prev => ({...prev, name: e.target.value}))} /></label>
          <div className="flex" style={{justifyContent:'flex-end'}}>
            <button onClick={() => setOpen(false)} style={{background:'transparent', color:'var(--text)'}}>{t('actions.cancel')}</button>
            <button disabled={!edit.name?.trim()} onClick={async () => {
              if (edit.id) await updateCategory({ id: edit.id, name: edit.name })
              else await createCategory({ name: edit.name })
              setOpen(false)
            }}>{t('actions.save')}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
