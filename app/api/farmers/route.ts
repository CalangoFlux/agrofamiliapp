import { NextResponse } from "next/server"

// Simulação de banco de dados de agricultores
const farmers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "(11) 98765-4321",
    location: "Campinas, SP",
    state: "SP",
    city: "Campinas",
    products: ["Hortaliças orgânicas", "Milho", "Feijão"],
    size: 5,
    hasDAP: true,
    coordinates: [-47.0608, -22.9068],
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@exemplo.com",
    phone: "(85) 91234-5678",
    location: "Fortaleza, CE",
    state: "CE",
    city: "Fortaleza",
    products: ["Frutas tropicais", "Mandioca", "Caju"],
    size: 3,
    hasDAP: true,
    coordinates: [-38.5267, -3.7319],
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@exemplo.com",
    phone: "(51) 98765-1234",
    location: "Porto Alegre, RS",
    state: "RS",
    city: "Porto Alegre",
    products: ["Leite", "Queijos artesanais", "Embutidos"],
    size: 12,
    hasDAP: false,
    coordinates: [-51.2177, -30.0346],
    createdAt: "2024-01-05",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get("state")
  const city = searchParams.get("city")

  let filteredFarmers = farmers

  if (state && state !== "all") {
    filteredFarmers = filteredFarmers.filter((farmer) => farmer.state === state)
  }

  if (city && city !== "all") {
    filteredFarmers = filteredFarmers.filter((farmer) => farmer.city === city)
  }

  return NextResponse.json(filteredFarmers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica
    const requiredFields = ["name", "email", "phone", "city", "state", "products", "size"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo obrigatório: ${field}` }, { status: 400 })
      }
    }

    // Criar novo agricultor
    const newFarmer = {
      id: farmers.length + 1,
      ...body,
      location: `${body.city}, ${body.state}`,
      coordinates: [
        -50 + Math.random() * 20, // Longitude aleatória no Brasil
        -30 + Math.random() * 25, // Latitude aleatória no Brasil
      ],
      createdAt: new Date().toISOString().split("T")[0],
    }

    farmers.push(newFarmer)

    return NextResponse.json(newFarmer, { status: 201 })
  } catch (error) {
    console.error("Erro ao cadastrar agricultor:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
