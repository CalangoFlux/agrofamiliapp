import { NextResponse } from "next/server"

// Simulação de notícias - em produção, integraria com APIs de notícias ou RSS feeds
const news = [
  {
    id: 1,
    title: "Novo programa de crédito PRONAF 2024 é lançado com juros reduzidos",
    summary:
      "Governo federal anuncia novas condições especiais para financiamento da agricultura familiar, com taxa de juros de 3% ao ano e prazo de até 10 anos para pagamento.",
    content: "O Ministério da Agricultura anunciou hoje o lançamento do novo programa PRONAF 2024...",
    date: "2024-01-15",
    category: "Programas Governamentais",
    source: "Ministério da Agricultura",
    author: "Redação MAPA",
    tags: ["PRONAF", "Crédito Rural", "Agricultura Familiar"],
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Feira Nacional da Agricultura Familiar bate recorde de vendas",
    summary:
      "Evento em Brasília movimenta R$ 15 milhões em negócios e reúne mais de 500 produtores de todo o país, destacando produtos orgânicos e agroecológicos.",
    content: "A 15ª Feira Nacional da Agricultura Familiar, realizada em Brasília...",
    date: "2024-01-14",
    category: "Mercado",
    source: "CONAB",
    author: "Assessoria CONAB",
    tags: ["Feira", "Agricultura Familiar", "Orgânicos"],
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Tecnologia IoT revoluciona gestão de propriedades rurais familiares",
    summary:
      "Sensores inteligentes e aplicativos móveis ajudam pequenos produtores a monitorar solo, clima e irrigação, aumentando produtividade em até 30%.",
    content: "A adoção de tecnologias de Internet das Coisas (IoT) está transformando...",
    date: "2024-01-13",
    category: "Tecnologia",
    source: "EMBRAPA",
    author: "Dr. Carlos Silva",
    tags: ["IoT", "Tecnologia Rural", "Produtividade"],
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "PAA amplia orçamento para compra de produtos da agricultura familiar",
    summary:
      "Programa de Aquisição de Alimentos terá aumento de 40% no orçamento para 2024, beneficiando mais de 200 mil famílias produtoras.",
    content: "O Programa de Aquisição de Alimentos (PAA) anunciou um aumento significativo...",
    date: "2024-01-12",
    category: "Programas Governamentais",
    source: "Ministério do Desenvolvimento Social",
    author: "Assessoria MDS",
    tags: ["PAA", "Compras Públicas", "Segurança Alimentar"],
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Certificação orgânica simplificada para pequenos produtores",
    summary:
      "Novo processo de certificação participativa reduz custos e burocracia para agricultores familiares que produzem alimentos orgânicos.",
    content: "O Instituto Nacional de Metrologia (INMETRO) lançou um novo modelo...",
    date: "2024-01-11",
    category: "Certificação",
    source: "INMETRO",
    author: "Equipe Técnica INMETRO",
    tags: ["Certificação Orgânica", "Agroecologia", "Sustentabilidade"],
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  let filteredNews = news

  if (category && category !== "all") {
    filteredNews = filteredNews.filter((item) => item.category.toLowerCase().includes(category.toLowerCase()))
  }

  // Ordenar por data (mais recente primeiro)
  filteredNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Limitar resultados
  filteredNews = filteredNews.slice(0, limit)

  return NextResponse.json(filteredNews)
}
