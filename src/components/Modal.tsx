import React from 'react'
import ReactDOM from 'react-dom'

type Props = { isOpen: boolean; onClose: () => void; children: React.ReactNode; title?: string }
export default function Modal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'grid',placeItems:'center',zIndex:10}}>
      <div className="card" style={{minWidth: 360, maxWidth: 600}}>
        <div className="flex" style={{justifyContent:'space-between', marginBottom: '0.75rem'}}>
          <strong>{title}</strong>
          <button onClick={onClose} style={{background:'transparent',color:'var(--text)'}}>✖</button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}
