"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Mail, Phone, MapPin, Calendar, Filter } from "lucide-react"

interface ClimateInterest {
  id: number
  name: string
  location: string
  email: string
  phone?: string
  practices: string
  status: string
  created_at: string
}

export function ClimateAdminDashboard() {
  const [interests, setInterests] = useState<ClimateInterest[]>([])
  const [filteredInterests, setFilteredInterests] = useState<ClimateInterest[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInterests()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredInterests(interests)
    } else {
      setFilteredInterests(interests.filter((interest) => interest.status === statusFilter))
    }
  }, [interests, statusFilter])

  const fetchInterests = async () => {
    try {
      const response = await fetch("/api/climate-interest")
      const data = await response.json()
      setInterests(data.interests || [])
    } catch (error) {
      console.error("Erro ao buscar interesses:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const },
      contacted: { label: "Contatado", variant: "default" as const },
      enrolled: { label: "Inscrito", variant: "default" as const },
      rejected: { label: "Rejeitado", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const stats = {
    total: interests.length,
    pending: interests.filter((i) => i.status === "pending").length,
    contacted: interests.filter((i) => i.status === "contacted").length,
    enrolled: interests.filter((i) => i.status === "enrolled").length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <span className="ml-2">Carregando interesses...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Interesses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contatados</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.contacted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscritos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.enrolled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="contacted">Contatados</SelectItem>
                  <SelectItem value="enrolled">Inscritos</SelectItem>
                  <SelectItem value="rejected">Rejeitados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={fetchInterests} variant="outline" size="sm">
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Interesses */}
      <div className="space-y-4">
        {filteredInterests.map((interest) => (
          <Card key={interest.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{interest.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{interest.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(interest.created_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(interest.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Contato:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{interest.email}</span>
                    </div>
                    {interest.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{interest.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Práticas Sustentáveis:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{interest.practices}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-1" />
                  Contatar
                </Button>
                <Button size="sm" variant="outline">
                  Editar Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInterests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Nenhum interesse encontrado para os filtros selecionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
