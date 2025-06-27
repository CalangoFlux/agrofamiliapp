"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User, Globe } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  summary: string
  content: string
  category: string
  source: string
  author: string
  date: string
  url?: string
  featured: boolean
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Notícias atualizadas de todas as fontes mencionadas
    const updatedNews: NewsItem[] = [
      {
        id: 1,
        title: "FAO lança programa para fortalecer agricultura familiar no Brasil",
        summary:
          "Organização das Nações Unidas para Alimentação e Agricultura anuncia investimento de US$ 50 milhões para apoiar pequenos produtores brasileiros.",
        content:
          "A FAO Brasil, em parceria com o governo federal, lançou um programa abrangente para fortalecer a agricultura familiar no país. O programa inclui capacitação técnica, acesso a tecnologias sustentáveis e apoio à comercialização de produtos.",
        category: "Internacional",
        source: "FAO Brasil",
        author: "Equipe FAO",
        date: "2024-01-20",
        url: "https://www.fao.org/brasil/pt/",
        featured: true,
      },
      {
        id: 2,
        title: "PAA amplia modalidades de compra para agricultura familiar",
        summary:
          "Programa de Aquisição de Alimentos do MDS anuncia novas modalidades de compra direta de produtores familiares, beneficiando mais de 300 mil famílias.",
        content:
          "O Ministério do Desenvolvimento Social expandiu as modalidades do PAA, incluindo compra de sementes crioulas e produtos da sociobiodiversidade. O programa agora atende 27 estados brasileiros.",
        category: "Programas Governamentais",
        source: "MDS",
        author: "Assessoria PAA",
        date: "2024-01-18",
        url: "https://paa.mds.gov.br/page/",
        featured: true,
      },
      {
        id: 3,
        title: "PNAE garante 30% de produtos da agricultura familiar na merenda escolar",
        summary:
          "Programa Nacional de Alimentação Escolar do FNDE reforça compromisso com compra direta de produtores locais, movimentando R$ 1,2 bilhão em 2024.",
        content:
          "O FNDE divulgou dados que mostram o crescimento das compras da agricultura familiar para a alimentação escolar. O programa atende 40 milhões de estudantes em todo o país.",
        category: "Alimentação Escolar",
        source: "FNDE",
        author: "Diretoria PNAE",
        date: "2024-01-16",
        url: "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pnae",
        featured: true,
      },
      {
        id: 4,
        title: "Associação Brasileira de Agroecologia promove encontro nacional",
        summary:
          "ABA organiza o maior encontro de agroecologia do país, reunindo pesquisadores, produtores e técnicos para discutir práticas sustentáveis.",
        content:
          "O evento da ABA contará com mais de 2 mil participantes e 500 trabalhos científicos apresentados, consolidando o Brasil como referência mundial em agroecologia.",
        category: "Agroecologia",
        source: "ABA",
        author: "Comitê Organizador",
        date: "2024-01-15",
        url: "https://aba-agroecologia.org.br/",
        featured: false,
      },
      {
        id: 5,
        title: "Portal Agroecologia lança biblioteca digital com 10 mil publicações",
        summary:
          "Maior acervo digital de agroecologia da América Latina disponibiliza gratuitamente artigos, livros e vídeos educacionais.",
        content:
          "A biblioteca digital do Portal Agroecologia reúne conhecimento de universidades, institutos de pesquisa e organizações da sociedade civil, democratizando o acesso à informação.",
        category: "Educação",
        source: "Portal Agroecologia",
        author: "Equipe Editorial",
        date: "2024-01-14",
        url: "https://agroecologia.org.br/",
        featured: false,
      },
      {
        id: 6,
        title: "REGA Brasil articula 150 grupos de agroecologia em universidades",
        summary:
          "Rede de Grupos de Agroecologia do Brasil fortalece pesquisa e extensão em agroecologia em instituições de ensino superior.",
        content:
          "A REGA Brasil conecta estudantes, professores e pesquisadores de todo o país, promovendo intercâmbio de conhecimentos e práticas agroecológicas.",
        category: "Pesquisa",
        source: "REGA Brasil",
        author: "Coordenação Nacional",
        date: "2024-01-12",
        url: "https://regabrasil.com.br/",
        featured: false,
      },
      {
        id: 7,
        title: "Novo Plano Safra 2024/2025 destina R$ 48 bilhões para agricultura familiar",
        summary:
          "Governo federal anuncia maior orçamento da história para o PRONAF, com foco em sustentabilidade e inovação tecnológica.",
        content:
          "O Plano Safra inclui linhas especiais para jovens agricultores, mulheres rurais e produção agroecológica, além de condições especiais de financiamento.",
        category: "Programas Governamentais",
        source: "MAPA",
        author: "Ministério da Agricultura",
        date: "2024-01-10",
        featured: true,
      },
      {
        id: 8,
        title: "Tecnologia blockchain revoluciona certificação orgânica no Brasil",
        summary:
          "Startup brasileira desenvolve plataforma que reduz custos de certificação orgânica em 60% usando tecnologia blockchain.",
        content:
          "A plataforma já certificou mais de 1.000 produtores em 8 estados, garantindo rastreabilidade completa da produção orgânica desde o campo até o consumidor.",
        category: "Tecnologia",
        source: "AgTech News",
        author: "Redação",
        date: "2024-01-08",
        featured: false,
      },
    ]

    setNews(updatedNews)
  }, [])

  const categories = ["all", ...Array.from(new Set(news.map((item) => item.category)))]

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)

  const featuredNews = news.filter((item) => item.featured)

  return (
    <div className="space-y-6">
      {/* Featured News */}
      <div>
        <h3 className="text-xl font-bold mb-4">Notícias em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredNews.slice(0, 3).map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="default">{item.category}</Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(item.date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{item.summary}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-600">
                    <Globe className="h-3 w-3 mr-1" />
                    {item.source}
                  </div>
                  {item.url && (
                    <Button size="sm" variant="outline" onClick={() => window.open(item.url, "_blank")}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ler mais
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category === "all" ? "Todas" : category}
          </Button>
        ))}
      </div>

      {/* All News */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.date).toLocaleDateString("pt-BR")}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-3">{item.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {item.source}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {item.author}
                  </div>
                </div>

                {item.url && (
                  <Button variant="outline" onClick={() => window.open(item.url, "_blank")}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Fonte Original
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
