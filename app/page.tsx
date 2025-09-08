"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Phone, Mail, Instagram, Facebook, Menu, X } from "lucide-react"

// SVG WhatsApp (inline)
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.421h-.001a8.933 8.933 0 01-4.533-1.232l-.325-.192-3.363.896.898-3.274-.211-.336A8.922 8.922 0 013.067 12.02c.001-4.944 4.017-8.965 8.965-8.965 2.389 0 4.637.933 6.324 2.623a8.862 8.862 0 012.641 6.312c-.003 4.944-4.018 8.965-8.965 8.965m7.666-16.597A10.88 10.88 0 0012.032 1.1C6.065 1.1 1.1 6.058 1.1 12.02c0 1.993.522 3.938 1.514 5.646L.25 22.9l5.406-1.438a10.89 10.89 0 005.377 1.372h.005c5.967 0 10.932-4.958 10.932-10.92 0-2.91-1.134-5.64-3.197-7.808"/></svg>
)

import { useState, useEffect } from "react"
import { produtosPadrao, acessorios } from "../lib/produtos"
export default function PetCatalog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dogClothes, setDogClothes] = useState(produtosPadrao)
  const [acessoriosList, setAcessoriosList] = useState(acessorios)
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Carregar preços salvos do localStorage ao abrir o site
  useEffect(() => {
    if (typeof window !== "undefined") {
      const roupasSalvas = localStorage.getItem("aumigos-roupas")
      if (roupasSalvas) setDogClothes(JSON.parse(roupasSalvas))
      const acessoriosSalvos = localStorage.getItem("aumigos-acessorios")
      if (acessoriosSalvos) setAcessoriosList(JSON.parse(acessoriosSalvos))
    }
  }, [])

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-card-foreground text-balance">{product.name}</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{product.price}</span>
          <Heart className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 text-pretty">{product.description}</p>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setModalImage(product.image)}>
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  )

  // Modal de imagem em tela cheia
  const FullImageModal = ({ src, onClose }: { src: string, onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80" onClick={onClose}>
      <img src={src} alt="Produto" className="max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white" />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl font-bold bg-black/60 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/80 transition-colors"
        aria-label="Fechar"
      >
        ×
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {modalImage && <FullImageModal src={modalImage} onClose={() => setModalImage(null)} />}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo e redes sociais */}
            <div className="flex items-center gap-4">
              <img
                src="/logo.jpg"
                alt="Logo Aumigos Pet"
                className="h-10 w-10 rounded-full object-cover shadow"
              />
              <span className="text-xl font-bold text-primary-foreground">Aumigos Pet</span>
              <a
                href="/painel-preco"
                className="ml-4 px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm font-semibold shadow hover:bg-secondary/80 transition-colors border border-secondary/40"
                style={{ textDecoration: 'none' }}
                title="Painel Admin"
              >
                Admin
              </a>
              {/* Redes sociais desktop */}
              <div className="hidden md:flex items-center gap-2 ml-4">
                <a href="https://wa.me/92993936571" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <WhatsappIcon className="w-6 h-6 text-primary-foreground hover:text-green-500 transition-colors" />
                </a>
                <a href="https://www.instagram.com/aumigos._pet?utm_source=ig_web_button_share_sheet&igsh=MWQxN2duc2Z6YWp4eg==" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <Instagram className="w-6 h-6 text-primary-foreground hover:text-pink-500 transition-colors" />
                </a>
              </div>
            </div>
            {/* ...existing code... */}
          </div>
          {/* ...existing code... */}
        </div>
      </nav>

      {/* Header/Cover */}
      <header className="bg-background py-8 px-2">
        <div className="max-w-7xl mx-auto text-center">
          <img
            src="/fundotema.jpeg"
            alt="Aumigos Pet - Bem Vindo"
            className="mx-auto rounded-lg shadow-lg w-full max-w-none"
          />
        </div>
      </header>

      {/* Sobre nós */}
      <section id="sobre-nos" className="max-w-4xl mx-auto my-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-card rounded-xl shadow-lg p-6">
            <img
              src="/sobrenos.jpeg"
              alt="Sobre nós"
              className="w-full md:w-1/2 rounded-lg object-cover shadow-md"
            />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">Sobre nós</h2>
            <p className="text-muted-foreground text-lg">
              Somos apaixonados por pets e acreditamos que cada animal merece conforto, estilo e carinho. Nossa missão é oferecer produtos de alta qualidade, pensados com amor para o bem-estar do seu melhor aumigo. Conheça nossa história e faça parte da nossa família!
            </p>
          </div>
        </div>
      </section>


      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/92993936571"
        target="_blank"
        rel="noopener noreferrer"
        title="Fale conosco no WhatsApp"
        className="fixed z-50 bottom-28 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
      >
        <WhatsappIcon className="w-7 h-7" />
        <span className="sr-only">WhatsApp</span>
      </a>


      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Roupas para Cães */}
        <section id="roupas-caes" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-card-foreground mb-2">Roupas para Cães</h2>
            <p className="text-muted-foreground text-lg">Conforto e estilo para seu companheiro canino</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {dogClothes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Seção de Acessórios */}
          <div className="text-center mb-8 mt-16">
            <h2 className="text-3xl font-bold text-card-foreground mb-2">Acessórios</h2>
            <p className="text-muted-foreground text-lg">Detalhes que fazem toda a diferença</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {acessoriosList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

  {/* ...removido seção Guia de Tamanhos... */}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Aumigos Pet</h3>
              <p className="opacity-90 text-pretty">
                Especializados em roupas e acessórios de alta qualidade para pets. Seu melhor aumigo merece o melhor!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(92) 99393-6571</span>
                </div>
                
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://www.instagram.com/aumigos._pet?utm_source=ig_web_button_share_sheet&igsh=MWQxN2duc2Z6YWp4eg==" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <Instagram className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
                </a>
                <a href="https://wa.me/92993936571" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <WhatsappIcon className="w-6 h-6 hover:text-green-500 cursor-pointer transition-colors" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="opacity-75">© 2025 Aumigos Pet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Print Instructions */}
      <div className="no-print fixed bottom-4 right-4 bg-accent text-accent-foreground p-4 rounded-lg shadow-lg">
        <p className="text-sm font-medium">💡 Para salvar em PDF:</p>
        <p className="text-xs">Ctrl+P → Salvar como PDF</p>
      </div>
    </div>
  )
}
