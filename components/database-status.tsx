"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Users, Newspaper, DollarSign, ShoppingCart, Cloud } from "lucide-react"
import { useSupabase } from "@/components/supabase-provider"

interface DatabaseStats {
  farmers: number
  government_programs: number
  news: number
  market_prices: number
  sales_opportunities: number
  weather_data: number
}

export function DatabaseStatus() {
  const [stats, setStats] = useState<DatabaseStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // const supabase = createClientComponentClient()
  const { supabase } = useSupabase()

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        setLoading(true)
        setError(null)

        // Verificar cada tabela
        const [farmersResult, programsResult, newsResult, pricesResult, opportunitiesResult, weatherResult] =
          await Promise.all([
            supabase.from("farmers").select("*", { count: "exact", head: true }),
            supabase.from("government_programs").select("*", { count: "exact", head: true }),
            supabase.from("news").select("*", { count: "exact", head: true }),
            supabase.from("market_prices").select("*", { count: "exact", head: true }),
            supabase.from("sales_opportunities").select("*", { count: "exact", head: true }),
            supabase.from("weather_data").select("*", { count: "exact", head: true }),
          ])

        setStats({
          farmers: farmersResult.count || 0,
          government_programs: programsResult.count || 0,
          news: newsResult.count || 0,
          market_prices: pricesResult.count || 0,
          sales_opportunities: opportunitiesResult.count || 0,
          weather_data: weatherResult.count || 0,
        })
      } catch (err) {
        console.error("Erro ao verificar banco:", err)
        setError("Erro ao conectar com o banco de dados")
      } finally {
        setLoading(false)
      }
    }

    checkDatabase()
  }, [supabase])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Status do Banco de Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2">Verificando conexão...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span>Erro na Conexão</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-gray-600 mt-2">
            Verifique se o Supabase está configurado corretamente e se os scripts foram executados.
          </p>
        </CardContent>
      </Card>
    )
  }

  const totalRecords = stats ? Object.values(stats).reduce((sum, count) => sum + count, 0) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Banco de Dados Conectado</span>
        </CardTitle>
        <CardDescription>Total de {totalRecords} registros carregados com sucesso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Agricultores:</span>
            <Badge variant="secondary">{stats?.farmers || 0}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm">Programas:</span>
            <Badge variant="secondary">{stats?.government_programs || 0}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Newspaper className="h-4 w-4 text-purple-500" />
            <span className="text-sm">Notícias:</span>
            <Badge variant="secondary">{stats?.news || 0}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4 text-orange-500" />
            <span className="text-sm">Preços:</span>
            <Badge variant="secondary">{stats?.market_prices || 0}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4 text-red-500" />
            <span className="text-sm">Oportunidades:</span>
            <Badge variant="secondary">{stats?.sales_opportunities || 0}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-cyan-500" />
            <span className="text-sm">Clima:</span>
            <Badge variant="secondary">{stats?.weather_data || 0}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
