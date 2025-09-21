"use client"

import { useState } from "react"
import { produtosPadrao, acessorios } from "../lib/produtos"

export default function PainelPrecoProdutos() {
  const [roupas, setRoupas] = useState(produtosPadrao)
  const [acessoriosList, setAcessoriosList] = useState(acessorios)

  function handlePrecoChange(tipo: "roupa" | "acessorio", idx: number, novoPreco: string) {
    if (tipo === "roupa") {
      const novos = [...roupas]
      novos[idx] = { ...novos[idx], price: novoPreco }
      setRoupas(novos)
    } else {
      const novos = [...acessoriosList]
      novos[idx] = { ...novos[idx], price: novoPreco }
      setAcessoriosList(novos)
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Editar Preço dos Produtos</h2>
      <h3 style={{ marginTop: 24, marginBottom: 8 }}>Roupas</h3>
      <table style={{ width: "100%", marginBottom: 32, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nome</th>
            <th style={{ textAlign: "left" }}>Preço</th>
          </tr>
        </thead>
        <tbody>
          {roupas.map((prod, idx) => (
            <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{prod.name}</td>
              <td>
                <input
                  value={prod.price}
                  onChange={e => handlePrecoChange("roupa", idx, e.target.value)}
                  style={{ padding: 4, minWidth: 80 }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ marginTop: 24, marginBottom: 8 }}>Acessórios</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nome</th>
            <th style={{ textAlign: "left" }}>Preço</th>
          </tr>
        </thead>
        <tbody>
          {acessoriosList.map((prod, idx) => (
            <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{prod.name}</td>
              <td>
                <input
                  value={prod.price}
                  onChange={e => handlePrecoChange("acessorio", idx, e.target.value)}
                  style={{ padding: 4, minWidth: 80 }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
