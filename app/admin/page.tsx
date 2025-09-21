"use client"


import { useState, useEffect } from "react"
import { produtosPadrao } from "../../lib/produtos"

const ADMIN_PASSWORD = "aumigos123@%"

export default function AdminPage() {
  const [isLogged, setIsLogged] = useState(false)
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState<any[]>([])
  const [editIdx, setEditIdx] = useState<number|null>(null)
  const [editData, setEditData] = useState<any>({})
  const [mounted, setMounted] = useState(false)

  // Garante que só acessa localStorage no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem("aumigos-products")
    if (saved) {
      setProducts(JSON.parse(saved))
    } else {
      setProducts(produtosPadrao)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("aumigos-products", JSON.stringify(products))
  }, [products, mounted])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) setIsLogged(true)
    else alert("Senha incorreta!")
  }

  function handleEdit(idx: number) {
    setEditIdx(idx)
    setEditData({ ...products[idx] })
  }

  function handleSave(idx: number) {
    const newProducts = [...products]
    newProducts[idx] = { ...editData }
    setProducts(newProducts)
    setEditIdx(null)
  }

  function handleAdd() {
    setProducts([...products, { name: "Novo Produto", price: "R$ 0,00", image: "" }])
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setEditData((d: any) => ({ ...d, image: ev.target?.result }))
    }
    reader.readAsDataURL(file)
  }

  if (!mounted) return null;
  if (!isLogged) {
    return (
      <div style={{ maxWidth: 340, margin: "100px auto", padding: 32, border: "1px solid #e0e0e0", borderRadius: 12, background: '#fff', boxShadow: '0 2px 16px #0001' }}>
        <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: 24 }}>Admin - Aumigos Pet</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Senha do admin"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", margin: "12px 0 20px 0", padding: 10, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 16 }}
          />
          <button type="submit" style={{ width: "100%", padding: 10, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}>Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: 24, fontSize: 28, fontWeight: 700 }}>Painel Admin - Aumigos Pet</h2>
      <button
        onClick={handleAdd}
        style={{ margin: "16px 0 24px 0", padding: '10px 20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}
      >Adicionar Produto</button>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: '#f8fafc', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 8px #0001' }}>
        <thead style={{ background: '#f1f5f9' }}>
          <tr>
            <th style={{ padding: 12, fontWeight: 700, color: '#334155', fontSize: 16 }}>Nome</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#334155', fontSize: 16 }}>Preço</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#334155', fontSize: 16 }}>Imagem</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#334155', fontSize: 16 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
              <td style={{ padding: 10 }}>
                {editIdx === idx ? (
                  <input value={editData.name} onChange={e => setEditData((d: any) => ({ ...d, name: e.target.value }))} style={{ padding: 6, borderRadius: 4, border: '1px solid #cbd5e1', fontSize: 15, width: '100%' }} />
                ) : <span style={{ fontWeight: 500 }}>{prod.name}</span>}
              </td>
              <td style={{ padding: 10 }}>
                {editIdx === idx ? (
                  <input value={editData.price} onChange={e => setEditData((d: any) => ({ ...d, price: e.target.value }))} style={{ padding: 6, borderRadius: 4, border: '1px solid #cbd5e1', fontSize: 15, width: '100%' }} />
                ) : <span style={{ color: '#16a34a', fontWeight: 600 }}>{prod.price}</span>}
              </td>
              <td style={{ padding: 10 }}>
                {editIdx === idx ? (
                  <>
                    {editData.image && <img src={editData.image} alt="preview" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, marginBottom: 6, border: '1px solid #e5e7eb' }} />}
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'block', marginTop: 4 }} />
                  </>
                ) : prod.image ? <img src={prod.image} alt="produto" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: '1px solid #e5e7eb' }} /> : null}
              </td>
              <td style={{ padding: 10 }}>
                {editIdx === idx ? (
                  <>
                    <button
                      onClick={() => handleSave(idx)}
                      style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 600, fontSize: 15, marginRight: 8, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}
                    >Salvar</button>
                    <button
                      onClick={() => setEditIdx(null)}
                      style={{ background: '#f87171', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}
                    >Cancelar</button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(idx)}
                    style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #0001' }}
                  >Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
