"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"

interface Farmer {
  id: number
  name: string
  location: string
  state: string
  city: string
  products: string[]
  size: number
  hasDAP: boolean
  coordinates: [number, number]
}

export function MapComponent() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([])
  const [selectedState, setSelectedState] = useState<string>("all")
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)

  useEffect(() => {
    // Dados de exemplo de agricultores
    const mockFarmers: Farmer[] = [
      {
        id: 1,
        name: "João Silva",
        location: "Campinas, SP",
        state: "SP",
        city: "Campinas",
        products: ["Hortaliças", "Milho", "Feijão"],
        size: 5,
        hasDAP: true,
        coordinates: [-47.0608, -22.9068],
      },
      {
        id: 2,
        name: "Maria Santos",
        location: "Fortaleza, CE",
        state: "CE",
        city: "Fortaleza",
        products: ["Frutas tropicais", "Mandioca"],
        size: 3,
        hasDAP: true,
        coordinates: [-38.5267, -3.7319],
      },
      {
        id: 3,
        name: "Pedro Oliveira",
        location: "Porto Alegre, RS",
        state: "RS",
        city: "Porto Alegre",
        products: ["Leite", "Queijos"],
        size: 12,
        hasDAP: false,
        coordinates: [-51.2177, -30.0346],
      },
      {
        id: 4,
        name: "Ana Costa",
        location: "Belo Horizonte, MG",
        state: "MG",
        city: "Belo Horizonte",
        products: ["Café", "Hortaliças"],
        size: 8,
        hasDAP: true,
        coordinates: [-43.9378, -19.9208],
      },
      {
        id: 5,
        name: "Carlos Ferreira",
        location: "Curitiba, PR",
        state: "PR",
        city: "Curitiba",
        products: ["Soja", "Milho"],
        size: 15,
        hasDAP: true,
        coordinates: [-49.2577, -25.4284],
      },
    ]

    setFarmers(mockFarmers)
    setFilteredFarmers(mockFarmers)
  }, [])

  useEffect(() => {
    if (selectedState === "all") {
      setFilteredFarmers(farmers)
    } else {
      setFilteredFarmers(farmers.filter((farmer) => farmer.state === selectedState))
    }
  }, [selectedState, farmers])

  const states = [...new Set(farmers.map((farmer) => farmer.state))].sort()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Mapa de Agricultores Familiares</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os estados</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{filteredFarmers.length} agricultores encontrados</span>
            </div>
          </div>

          {/* Mapa simplificado - em produção seria integrado com Google Maps ou Leaflet */}
          <div className="relative w-full h-64 bg-green-50 rounded-lg border-2 border-dashed border-green-200 flex items-center justify-center mb-6">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-green-400 mx-auto mb-2" />
              <p className="text-green-600 font-medium">Mapa Interativo</p>
              <p className="text-sm text-gray-500">Integração com Google Maps/Leaflet em desenvolvimento</p>
            </div>
          </div>

          {/* Lista de agricultores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFarmers.map((farmer) => (
              <div
                key={farmer.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFarmer(farmer)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{farmer.name}</h4>
                  <Badge variant={farmer.hasDAP ? "default" : "secondary"}>{farmer.hasDAP ? "DAP" : "Sem DAP"}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{farmer.location}</p>
                <p className="text-sm text-gray-600 mb-2">Propriedade: {farmer.size} hectares</p>
                <div className="flex flex-wrap gap-1">
                  {farmer.products.slice(0, 2).map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {farmer.products.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{farmer.products.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do agricultor selecionado */}
      {selectedFarmer && (
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Agricultor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Informações Pessoais</h4>
                <p>
                  <strong>Nome:</strong> {selectedFarmer.name}
                </p>
                <p>
                  <strong>Localização:</strong> {selectedFarmer.location}
                </p>
                <p>
                  <strong>Tamanho da propriedade:</strong> {selectedFarmer.size} hectares
                </p>
                <p>
                  <strong>Status DAP:</strong> {selectedFarmer.hasDAP ? "Ativo" : "Inativo"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Produtos Cultivados</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFarmer.products.map((product, index) => (
                    <Badge key={index} variant="outline">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
