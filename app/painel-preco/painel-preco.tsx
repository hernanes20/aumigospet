"use client"

import { produtosPadrao, acessorios } from "../../lib/produtos"
import { db } from "../../lib/firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { useState, useEffect } from "react"

export default function PainelPrecoProdutos() {
  const [roupas, setRoupas] = useState<any[]>([])
  const [acessoriosList, setAcessoriosList] = useState<any[]>([])
  const [editRoupas, setEditRoupas] = useState<{[key:number]: boolean}>({})
  const [editAcessorios, setEditAcessorios] = useState<{[key:number]: boolean}>({})
  const [inputValue, setInputValue] = useState<{[key:string]: string}>({})
  const [isLogged, setIsLogged] = useState(false)
  const [password, setPassword] = useState("")
  const [erro, setErro] = useState<string>("")
  const [debug, setDebug] = useState<any>(null)

  useEffect(() => {
    // Usar dados locais enquanto o Firebase não está configurado
    setRoupas(produtosPadrao)
    setAcessoriosList(acessorios)
    
    // Carregar dados salvos do localStorage
    if (typeof window !== "undefined") {
      const roupasSalvas = localStorage.getItem("aumigos-roupas")
      const acessoriosSalvos = localStorage.getItem("aumigos-acessorios")
      
      if (roupasSalvas) setRoupas(JSON.parse(roupasSalvas))
      if (acessoriosSalvos) setAcessoriosList(JSON.parse(acessoriosSalvos))
    }
  }, [])

  function handleEdit(tipo: "roupa" | "acessorio", idx: number, id: number, valorAtual: string) {
    if (tipo === "roupa") {
      setEditRoupas({ ...editRoupas, [id]: true })
      setInputValue({ ...inputValue, ["roupa-"+id]: valorAtual })
    } else {
      setEditAcessorios({ ...editAcessorios, [id]: true })
      setInputValue({ ...inputValue, ["acessorio-"+id]: valorAtual })
    }
  }

  async function handleSave(tipo: "roupa" | "acessorio", idx: number, id: number) {
    if (tipo === "roupa") {
      const novos = [...roupas]
      novos[idx] = { ...novos[idx], price: inputValue["roupa-"+id] }
      setRoupas(novos)
      setEditRoupas({ ...editRoupas, [id]: false })
      localStorage.setItem("aumigos-roupas", JSON.stringify(novos))
    } else {
      const novos = [...acessoriosList]
      novos[idx] = { ...novos[idx], price: inputValue["acessorio-"+id] }
      setAcessoriosList(novos)
      setEditAcessorios({ ...editAcessorios, [id]: false })
      localStorage.setItem("aumigos-acessorios", JSON.stringify(novos))
    }
  }

  function handleInputChange(tipo: "roupa" | "acessorio", id: number, value: string) {
    setInputValue({ ...inputValue, [`${tipo}-${id}`]: value })
  }

  if (erro) {
    return (
      <div style={{ maxWidth: 400, margin: "120px auto", padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px #0001', textAlign: 'center', color: 'red' }}>
        <h2>Erro</h2>
        <p>{erro}</p>
        <pre style={{ color: 'black', background: '#ffe', padding: 12, borderRadius: 8, marginTop: 16, fontSize: 13, textAlign: 'left', overflowX: 'auto' }}>{JSON.stringify(debug, null, 2)}</pre>
      </div>
    )
  }

  if (!isLogged) {
    return (
      <div style={{ maxWidth: 340, margin: "120px auto", padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px #0001', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Login do Painel</h2>
        <input
          type="password"
          placeholder="Senha do admin"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 18, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }}
        />
        <button
          onClick={() => {
            if (password === "aumigos12@") setIsLogged(true)
            else alert("Senha incorreta!")
          }}
          style={{ width: "100%", padding: 10, borderRadius: 6, background: '#6c47ff', color: '#fff', fontWeight: 700, fontSize: 16, border: 0, cursor: 'pointer' }}
        >Entrar</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px #0001' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center', letterSpacing: 1 }}>Editar Preço dos Produtos</h2>
      <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: 20, color: '#6c47ff' }}>Roupas</h3>
      <table style={{ width: "100%", marginBottom: 40, borderCollapse: "collapse", background: '#f8f8ff', borderRadius: 8, overflow: 'hidden' }}>
        <thead style={{ background: '#ece9ff' }}>
          <tr>
            <th style={{ textAlign: "left", padding: 12, fontWeight: 700, fontSize: 16 }}>Nome</th>
            <th style={{ textAlign: "left", padding: 12, fontWeight: 700, fontSize: 16 }}>Preço</th>
            <th style={{ width: 120 }}></th>
          </tr>
        </thead>
        <tbody>
          {roupas.map((prod, idx) => (
            <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 10, fontWeight: 500 }}>{prod.name}</td>
              <td style={{ padding: 10 }}>
                {editRoupas[prod.id] ? (
                  <input
                    value={inputValue["roupa-"+prod.id]}
                    onChange={e => handleInputChange("roupa", prod.id, e.target.value)}
                    style={{ padding: 6, minWidth: 90, border: '1px solid #bdbdbd', borderRadius: 6, fontSize: 16 }}
                  />
                ) : (
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{prod.price}</span>
                )}
              </td>
              <td style={{ padding: 10 }}>
                {editRoupas[prod.id] ? (
                  <button onClick={() => handleSave("roupa", idx, prod.id)} style={{ background: '#6c47ff', color: '#fff', border: 0, borderRadius: 6, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginRight: 8 }}>Salvar</button>
                ) : (
                  <button onClick={() => handleEdit("roupa", idx, prod.id, prod.price)} style={{ background: '#ece9ff', color: '#6c47ff', border: 0, borderRadius: 6, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ marginTop: 24, marginBottom: 12, fontSize: 20, color: '#ff7a00' }}>Acessórios</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", background: '#fff8f0', borderRadius: 8, overflow: 'hidden' }}>
        <thead style={{ background: '#ffe7c2' }}>
          <tr>
            <th style={{ textAlign: "left", padding: 12, fontWeight: 700, fontSize: 16 }}>Nome</th>
            <th style={{ textAlign: "left", padding: 12, fontWeight: 700, fontSize: 16 }}>Preço</th>
            <th style={{ width: 120 }}></th>
          </tr>
        </thead>
        <tbody>
          {acessoriosList.map((prod, idx) => (
            <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 10, fontWeight: 500 }}>{prod.name}</td>
              <td style={{ padding: 10 }}>
                {editAcessorios[prod.id] ? (
                  <input
                    value={inputValue["acessorio-"+prod.id]}
                    onChange={e => handleInputChange("acessorio", prod.id, e.target.value)}
                    style={{ padding: 6, minWidth: 90, border: '1px solid #bdbdbd', borderRadius: 6, fontSize: 16 }}
                  />
                ) : (
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{prod.price}</span>
                )}
              </td>
              <td style={{ padding: 10 }}>
                {editAcessorios[prod.id] ? (
                  <button onClick={() => handleSave("acessorio", idx, prod.id)} style={{ background: '#ff7a00', color: '#fff', border: 0, borderRadius: 6, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginRight: 8 }}>Salvar</button>
                ) : (
                  <button onClick={() => handleEdit("acessorio", idx, prod.id, prod.price)} style={{ background: '#ffe7c2', color: '#ff7a00', border: 0, borderRadius: 6, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}