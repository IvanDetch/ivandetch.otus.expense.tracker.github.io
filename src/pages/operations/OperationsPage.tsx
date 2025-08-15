import React from 'react'
import { useGetOperationsQuery, useCreateOperationMutation, useUpdateOperationMutation, useDeleteOperationMutation, type OperationType } from '../../store/services/operations'
import { useGetCategoriesQuery } from '../../store/services/categories'
import Modal from '../../components/Modal'
import { useTranslation } from 'react-i18next'

function usePagination(total=0, pageSize=10) {
  const [page, setPage] = React.useState(1)
  const pages = Math.max(1, Math.ceil(total / pageSize))
  return { page, setPage, pages, pageSize }
}

export default function OperationsPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = React.useState<{ type?: OperationType; sorting?: { type: 'ASC' | 'DESC'; field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date' } }>({})
  const { page, setPage, pages, pageSize } = usePagination()
  const { data, isLoading, isError } = useGetOperationsQuery({
    pagination: { pageNumber: page, pageSize },
    type: filters.type,
    sorting: filters.sorting
  })
  const [open, setOpen] = React.useState(false)
  const [edit, setEdit] = React.useState<any>(null)

  const [createOperation] = useCreateOperationMutation()
  const [updateOperation] = useUpdateOperationMutation()
  const [deleteOperation] = useDeleteOperationMutation()
  const { data: catData } = useGetCategoriesQuery({ pagination: { pageNumber: 1, pageSize: 100 } })

  React.useEffect(() => {
    if (data) {
      // update total pages
    }
  }, [data])

  return (
    <div className="card">
      <div className="flex" style={{justifyContent:'space-between'}}>
        <h2>{t('pages.operations.title')}</h2>
        <div className="flex">
          <select value={filters.type ?? ''} onChange={e => { setPage(1); setFilters(f => ({...f, type: (e.target.value || undefined) as any})) }}>
            <option value="">{t('forms.all') ?? 'All'}</option>
            <option value="Profit">{t('forms.profit')}</option>
            <option value="Cost">{t('forms.cost')}</option>
          </select>
          <select value={filters.sorting?.field ?? 'date'} onChange={e => setFilters(f => ({...f, sorting: { ...(f.sorting ?? { type: 'DESC' as const }), field: e.target.value as any }}))}>
            <option value="date">{t('forms.date')}</option>
            <option value="name">{t('table.name')}</option>
            <option value="createdAt">{t('table.createdAt')}</option>
            <option value="updatedAt">{t('table.updatedAt')}</option>
          </select>
          <select value={filters.sorting?.type ?? 'DESC'} onChange={e => setFilters(f => ({...f, sorting: { ...(f.sorting ?? { field: 'date' as const }), type: e.target.value as any }}))}>
            <option value="DESC">{t('forms.sorting.desc') ?? 'Desc'}</option>
            <option value="ASC">{t('forms.sorting.asc') ?? 'Asc'}</option>
          </select>
          <button onClick={() => { setEdit({ name:'', desc:'', amount:0, date: new Date().toISOString().slice(0,10), type:'Cost', categoryId: catData?.data[0]?.id }); setOpen(true) }}>{t('pages.operations.new')}</button>
        </div>
      </div>

      {isError ? <p>Failed to load</p> : isLoading ? <p>Loading...</p> : (
        <table className="table">
          <thead>
            <tr><th>{t('table.name')}</th><th>{t('table.desc')}</th><th>{t('table.type')}</th><th>Amount</th><th>{t('forms.date')}</th><th>{t('table.category')}</th><th style={{width:220}}>{t('table.actions')}</th></tr>
          </thead>
          <tbody>
            {data?.data.map(op => (
              <tr key={op.id}>
                <td>{op.name}</td>
                <td>{op.desc}</td>
                <td><span className="badge">{op.type}</span></td>
                <td>{op.amount.toLocaleString('ru-RU',{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                <td>{op.date?.slice(0,10)}</td>
                <td>{op.category?.name}</td>
                <td className="flex">
                  <button onClick={() => { setEdit({ id: op.id, name: op.name, desc: op.desc, amount: op.amount, date: op.date.slice(0,10), type: op.type, categoryId: op.category?.id }); setOpen(true) }}>{t('actions.edit')}</button>
                  <button onClick={() => deleteOperation(op.id)} style={{background:'var(--danger)'}}>{t('actions.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex" style={{justifyContent:'space-between', marginTop:'0.75rem'}}>
        <button disabled={page<=1} onClick={() => setPage(p=>p-1)}>Prev</button>
        <span>Page {data?.pagination?.pageNumber ?? page} / {data ? Math.ceil(data.pagination.total / data.pagination.pageSize) : pages}</span>
        <button disabled={data ? page >= Math.ceil(data.pagination.total / data.pagination.pageSize) : true} onClick={() => setPage(p=>p+1)}>Next</button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={edit?.id ? 'Edit operation' : 'New operation'}>
        <div className="flex" style={{flexDirection:'column', gap:'0.5rem'}}>
          <label>{t('table.name')} <input value={edit?.name ?? ''} onChange={e => setEdit((s:any)=>({...s,name:e.target.value}))}/></label>
          <label>{t('forms.desc')} <input value={edit?.desc ?? ''} onChange={e => setEdit((s:any)=>({...s,desc:e.target.value}))}/></label>
          <label>{t('forms.amount')} <input type="number" step="0.01" value={edit?.amount ?? 0} onChange={e => setEdit((s:any)=>({...s,amount: Number(e.target.value)}))}/></label>
          <label>{t('forms.date')} <input type="date" value={edit?.date ?? ''} onChange={e => setEdit((s:any)=>({...s,date: e.target.value}))}/></label>
          <label>{t('forms.type')}
            <select value={edit?.type ?? 'Cost'} onChange={e => setEdit((s:any)=>({...s, type: e.target.value}))}>
              <option value="Cost">{t('forms.cost')}</option>
              <option value="Profit">{t('forms.profit')}</option>
            </select>
          </label>
          <label>{t('forms.category')}
            <select value={edit?.categoryId ?? ''} onChange={e => setEdit((s:any)=>({...s, categoryId: e.target.value}))}>
              {catData?.data.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <div className="flex" style={{justifyContent:'flex-end'}}>
            <button onClick={() => setOpen(false)} style={{background:'transparent', color:'var(--text)'}}>{t('actions.cancel')}</button>
            <button disabled={!edit?.name?.trim() || !edit?.categoryId || !edit?.date || isNaN(Number(edit?.amount))} onClick={async () => {
              const body = {
                ...edit,
                date: new Date(edit.date).toISOString()
              }
              if (edit.id) await updateOperation(body).unwrap()
              else await createOperation(body).unwrap()
              setOpen(false)
            }}>{t('actions.save')}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
