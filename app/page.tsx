"use client"

import type React from "react"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  TrendingUp,
  Leaf,
  Users,
  ShoppingCart,
  Bell,
  FileText,
  DollarSign,
  Newspaper,
  Phone,
  Mail,
  Award,
  Target,
  Zap,
} from "lucide-react"
import { DatabaseStatus } from "@/components/database-status"
import { AgroecologySection } from "@/components/agroecology-section"

interface WeatherData {
  temperature: number
  humidity: number
  description: string
  location: string
}

interface NewsItem {
  id: number
  title: string
  summary: string
  date: string
  category: string
  source: string
}

interface Farmer {
  id: number
  name: string
  location: string
  products: string[]
  size: number
  hasDAP: boolean
  coordinates: [number, number]
}

export default function AgroFamiliApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  // Buscar dados reais do Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar agricultores
        const { data: farmersData } = await supabase.from("farmers").select("*").limit(10)

        if (farmersData) {
          setFarmers(
            farmersData.map((farmer) => ({
              id: farmer.id,
              name: farmer.name,
              location: `${farmer.city}, ${farmer.state}`,
              products: farmer.main_products || [],
              size: farmer.property_size || 0,
              hasDAP: farmer.has_dap || false,
              coordinates: farmer.coordinates ? [farmer.coordinates.x, farmer.coordinates.y] : [0, 0],
            })),
          )
        }

        // Buscar notícias
        const { data: newsData } = await supabase
          .from("news")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(5)

        if (newsData) {
          setNews(
            newsData.map((item) => ({
              id: item.id,
              title: item.title,
              summary: item.summary || "",
              date: item.published_at,
              category: item.category || "",
              source: item.source || "",
            })),
          )
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }

    fetchData()
  }, [supabase])

  // Simular dados de clima
  useEffect(() => {
    const fetchWeather = async () => {
      // Simulando API call
      setTimeout(() => {
        setWeather({
          temperature: 28,
          humidity: 65,
          description: "Ensolarado",
          location: "São Paulo, SP",
        })
      }, 1000)
    }
    fetchWeather()
  }, [])

  // Simular notícias
  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: 1,
        title: "Novo programa de crédito PRONAF 2024 é lançado",
        summary:
          "Governo federal anuncia novas condições especiais para financiamento da agricultura familiar com juros reduzidos.",
        date: "2024-01-15",
        category: "Programas Governamentais",
        source: "Ministério da Agricultura",
      },
      {
        id: 2,
        title: "Feira Nacional da Agricultura Familiar bate recorde",
        summary:
          "Evento em Brasília movimenta R$ 15 milhões em negócios e reúne mais de 500 produtores de todo o país.",
        date: "2024-01-14",
        category: "Mercado",
        source: "CONAB",
      },
      {
        id: 3,
        title: "Tecnologia ajuda pequenos produtores a aumentar produtividade",
        summary: "Aplicativos móveis e sensores IoT revolucionam a gestão de propriedades rurais familiares.",
        date: "2024-01-13",
        category: "Tecnologia",
        source: "EMBRAPA",
      },
    ]
    setNews(mockNews)
  }, [])

  // Dados de exemplo de agricultores
  useEffect(() => {
    const mockFarmers: Farmer[] = [
      {
        id: 1,
        name: "João Silva",
        location: "Campinas, SP",
        products: ["Hortaliças", "Milho", "Feijão"],
        size: 5,
        hasDAP: true,
        coordinates: [-47.0608, -22.9068],
      },
      {
        id: 2,
        name: "Maria Santos",
        location: "Fortaleza, CE",
        products: ["Frutas tropicais", "Mandioca"],
        size: 3,
        hasDAP: true,
        coordinates: [-38.5267, -3.7319],
      },
      {
        id: 3,
        name: "Pedro Oliveira",
        location: "Porto Alegre, RS",
        products: ["Leite", "Queijos"],
        size: 12,
        hasDAP: false,
        coordinates: [-51.2177, -30.0346],
      },
    ]
    setFarmers(mockFarmers)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      const { data, error } = await supabase.from("farmers").insert([
        {
          name: formData.get("nome"),
          email: formData.get("email"),
          phone: formData.get("telefone"),
          cpf: formData.get("cpf"),
          address: formData.get("endereco"),
          city: formData.get("municipio"),
          state: formData.get("estado"),
          postal_code: formData.get("cep"),
          property_size: Number.parseFloat(formData.get("tamanho") as string),
          main_products: formData
            .get("produtos")
            ?.toString()
            .split(",")
            .map((p) => p.trim()),
          has_dap: false,
          coordinates: `(${-50 + Math.random() * 20}, ${-30 + Math.random() * 25})`,
        },
      ])

      if (error) throw error

      alert("Cadastro realizado com sucesso!")
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      alert("Erro ao realizar cadastro. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgroFamiliAPP</h1>
                <p className="text-xs text-gray-500">Portal do Agricultor Familiar</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AF</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:grid-cols-7">
            <TabsTrigger value="dashboard" className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="cadastro" className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Cadastro</span>
            </TabsTrigger>
            <TabsTrigger value="documentacao" className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </TabsTrigger>
            <TabsTrigger value="recursos" className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Recursos</span>
            </TabsTrigger>
            <TabsTrigger value="agroecologia" className="flex items-center space-x-1">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Agroecologia</span>
            </TabsTrigger>
            <TabsTrigger value="mercado" className="flex items-center space-x-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Mercado</span>
            </TabsTrigger>
            <TabsTrigger value="noticias" className="flex items-center space-x-1">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Notícias</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Hero Section */}
            <div
              className="relative h-64 bg-cover bg-center rounded-lg overflow-hidden"
              style={{ backgroundImage: "url('/images/hero-bg.png')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold mb-2">Bem-vindo ao AgroFamiliAPP</h2>
                  <p className="text-lg">Sua plataforma completa para agricultura familiar</p>
                </div>
              </div>
            </div>

            {/* Database Status */}
            <DatabaseStatus />

            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span>Condições Climáticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weather ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3">
                      <Thermometer className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold">{weather.temperature}°C</p>
                        <p className="text-sm text-gray-600">Temperatura</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Droplets className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">{weather.humidity}%</p>
                        <p className="text-sm text-gray-600">Umidade</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="text-lg font-bold">{weather.description}</p>
                        <p className="text-sm text-gray-600">Condição</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-lg font-bold">{weather.location}</p>
                        <p className="text-sm text-gray-600">Localização</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    <span className="ml-2">Carregando dados climáticos...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agricultores Cadastrados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{farmers.length}</div>
                  <p className="text-xs text-muted-foreground">+2 esta semana</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Programas Ativos</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">PRONAF, PAA, PNAE</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recursos Disponíveis</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 2.4M</div>
                  <p className="text-xs text-muted-foreground">Em programas de crédito</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">Chamadas públicas ativas</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent News */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Notícias</CardTitle>
                <CardDescription>Fique por dentro das novidades da agricultura familiar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{item.category}</Badge>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cadastro */}
          <TabsContent value="cadastro" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Agricultor Familiar</CardTitle>
                <CardDescription>Preencha seus dados para acessar programas e oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" placeholder="Seu nome completo" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(00) 00000-0000" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço da propriedade</Label>
                    <Input id="endereco" placeholder="Endereço completo" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="municipio">Município</Label>
                      <Input id="municipio" placeholder="Sua cidade" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="produtos">Principais produtos cultivados</Label>
                    <Textarea id="produtos" placeholder="Ex: milho, feijão, hortaliças, leite, etc." required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tamanho">Tamanho da propriedade (hectares)</Label>
                    <Input id="tamanho" type="number" min="0" step="0.01" required />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Cadastrando...
                      </>
                    ) : (
                      "Realizar Cadastro"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentação */}
          <TabsContent value="documentacao" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span>DAP/CAF</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Declaração de Aptidão ao PRONAF ou Cadastro Nacional da Agricultura Familiar
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Documento de identidade</li>
                    <li>• CPF</li>
                    <li>• Comprovante de residência</li>
                    <li>• Documento do imóvel rural</li>
                  </ul>
                  <div className="space-y-2 mt-4">
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() =>
                        window.open("https://www.gov.br/pt-br/servicos/emitir-o-documento-caf-pronaf", "_blank")
                      }
                    >
                      Emitir CAF/PRONAF
                    </Button>
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => window.open("https://dap.mda.gov.br/", "_blank")}
                    >
                      Sistema DAP
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span>Carteira de Produtor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Documento para comercialização direta de produtos rurais</p>
                  <ul className="text-sm space-y-2">
                    <li>• RG e CPF</li>
                    <li>• Comprovante de residência</li>
                    <li>• Documento da propriedade</li>
                    <li>• Taxa de emissão</li>
                  </ul>
                  <Button
                    className="w-full mt-4 bg-transparent"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        "https://sebrae.com.br/sites/PortalSebrae/ufs/ap/artigos/como-obter-o-cartao-de-produtor-rural,c16a5ce5deb2f510VgnVCM1000004c00210aRCRD",
                        "_blank",
                      )
                    }
                  >
                    Como Obter - SEBRAE
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span>Certificação Orgânica</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Certificação para produtos orgânicos e agroecológicos</p>
                  <ul className="text-sm space-y-2">
                    <li>• Plano de manejo orgânico</li>
                    <li>• Histórico da propriedade</li>
                    <li>• Controle de insumos</li>
                    <li>• Auditoria técnica</li>
                  </ul>
                  <Button
                    className="w-full mt-4 bg-transparent"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        "https://www.gov.br/pt-br/servicos/obter-certificacao-de-produtos-organicos-producao-primaria-vegetal",
                        "_blank",
                      )
                    }
                  >
                    Certificação Orgânica - Gov.br
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recursos */}
          <TabsContent value="recursos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">PRONAF</CardTitle>
                  <CardDescription>Programa Nacional de Fortalecimento da Agricultura Familiar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Taxa de juros:</span>
                      <Badge>3% a.a.</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Limite:</span>
                      <Badge>Até R$ 250.000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Prazo:</span>
                      <Badge>Até 10 anos</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={() =>
                      window.open(
                        "https://www.gov.br/pt-br/servicos/acessar-o-programa-nacional-de-fortalecimento-da-agricultura-familiar-pronaf",
                        "_blank",
                      )
                    }
                  >
                    Acessar PRONAF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">PRONAMPE</CardTitle>
                  <CardDescription>
                    Programa Nacional de Apoio às Microempresas e Empresas de Pequeno Porte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Taxa de juros:</span>
                      <Badge>6% a.a.</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Limite:</span>
                      <Badge>Até R$ 150.000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Prazo:</span>
                      <Badge>Até 48 meses</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => window.open("https://www.gov.br/memp/pt-br/programa-acredita/pronampe", "_blank")}
                  >
                    Acessar PRONAMPE
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agroecologia */}
          <TabsContent value="agroecologia" className="space-y-6">
            <AgroecologySection />
          </TabsContent>

          {/* Mercado */}
          <TabsContent value="mercado" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Programas de Compra</CardTitle>
                  <CardDescription>Oportunidades de venda para o governo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">PAA - Programa de Aquisição de Alimentos</h4>
                      <p className="text-sm text-gray-600">Venda direta para o governo federal</p>
                      <Badge className="mt-2">Chamada Aberta</Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">PNAE - Alimentação Escolar</h4>
                      <p className="text-sm text-gray-600">Fornecimento para escolas públicas</p>
                      <Badge className="mt-2">Chamada Aberta</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preços de Mercado</CardTitle>
                  <CardDescription>Cotações atualizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { product: "Milho", price: "R$ 65,00/sc", change: "+2%" },
                      { product: "Feijão", price: "R$ 280,00/sc", change: "-1%" },
                      { product: "Tomate", price: "R$ 4,50/kg", change: "+5%" },
                      { product: "Alface", price: "R$ 2,80/unid", change: "0%" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.product}</span>
                        <div className="text-right">
                          <div className="font-bold">{item.price}</div>
                          <Badge
                            variant={
                              item.change.startsWith("+")
                                ? "default"
                                : item.change.startsWith("-")
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notícias */}
          <TabsContent value="noticias" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Notícias</CardTitle>
                <CardDescription>Fique atualizado sobre agricultura familiar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{item.summary}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{item.source}</span>
                        <span>{new Date(item.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AgroFamiliAPP</h3>
              <p className="text-sm">Plataforma completa para fortalecimento da agricultura familiar no Brasil.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Ministério da Agricultura
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    INCRA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    EMBRAPA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    CONAB
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contato</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>AgroFamiliAPP@proton.me</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>0800 123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <a
                    href="https://t.me/CalangoFlux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Desenvolvedor: @CalangoFlux
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-500 mt-8 pt-4 text-center text-sm">
            <p>&copy; 2024 AgroFamiliAPP - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
