"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ExternalLink,
  Leaf,
  Globe,
  Coins,
  TreePine,
  Network,
  Shield,
  Users,
  CheckCircle,
  Sprout,
  Zap,
  DollarSign,
  BookOpen,
} from "lucide-react"

interface ClimateProject {
  name: string
  description: string
  url: string
  icon: React.ReactNode
  category: string
  features: string[]
}

export function ClimateCreditsSection() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    practices: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const climateProjects: ClimateProject[] = [
    {
      name: "Regen Network",
      description:
        "Plataforma Web3 que rastreia impacto climático e permite que agricultores emitam créditos regenerativos através de monitoramento científico e verificação descentralizada.",
      url: "https://www.regen.network",
      icon: <Network className="h-6 w-6 text-green-600" />,
      category: "Créditos Regenerativos",
      features: ["Monitoramento via satélite", "Verificação científica", "Tokenização Web3", "Mercado descentralizado"],
    },
    {
      name: "Open Forest Protocol",
      description:
        "Protocolo que valida reflorestamentos comunitários com transparência via blockchain, conectando projetos locais a financiamento global sustentável.",
      url: "https://www.openforestprotocol.org",
      icon: <TreePine className="h-6 w-6 text-green-700" />,
      category: "Reflorestamento",
      features: ["Validação comunitária", "Transparência blockchain", "Financiamento direto", "Impacto mensurável"],
    },
    {
      name: "Toucan Protocol",
      description:
        "Infraestrutura de tokenização e mercado de carbono digital, oferecendo acesso ao Carbon Bridge para digitalização de créditos tradicionais.",
      url: "https://toucan.earth",
      icon: <Coins className="h-6 w-6 text-blue-600" />,
      category: "Tokenização",
      features: ["Carbon Bridge", "Mercado digital", "Liquidez DeFi", "Acesso global"],
    },
    {
      name: "Greenpill Brasil",
      description:
        "Rede descentralizada que apoia projetos regenerativos locais com tecnologia Web3, conectando comunidades brasileiras ao ecossistema global.",
      url: "https://linktr.ee/greenpillbrasil",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      category: "Comunidade",
      features: ["Rede local", "Apoio técnico", "Financiamento coletivo", "Educação Web3"],
    },
    {
      name: "Verra + Hedera",
      description:
        "Iniciativa global para digitalização dos créditos do Verified Carbon Standard com rastreabilidade completa e baixo custo operacional.",
      url: "https://verra.org/verra-and-hedera-to-accelerate-digital-transformation-of-carbon-markets/",
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      category: "Padrão Global",
      features: ["VCS digitalizado", "Baixo custo", "Rastreabilidade", "Padrão internacional"],
    },
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simular envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(
        "Obrigado pelo interesse! Entraremos em contato em breve para conectá-lo às oportunidades de créditos climáticos.",
      )
      setFormData({ name: "", location: "", practices: "", email: "", phone: "" })
      setIsFormOpen(false)
    } catch (error) {
      alert("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Globe className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Conecte sua produção ao futuro do clima</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Transforme suas práticas sustentáveis em valor econômico através dos mercados de carbono e agricultura
          regenerativa
        </p>
      </div>

      {/* Introdução Acessível */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Leaf className="h-6 w-6" />
            <span>O que são Créditos de Carbono e Agricultura Regenerativa?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Coins className="h-5 w-5 mr-2 text-green-600" />
                Créditos de Carbono
              </h4>
              <p className="text-sm leading-relaxed">
                São certificados que representam a remoção ou redução de 1 tonelada de CO₂ da atmosfera. Agricultores
                familiares podem gerar esses créditos através de práticas como plantio de árvores, agricultura
                regenerativa e conservação do solo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Sprout className="h-5 w-5 mr-2 text-green-600" />
                Agricultura Regenerativa
              </h4>
              <p className="text-sm leading-relaxed">
                Sistema de produção que restaura a saúde do solo, aumenta a biodiversidade e sequestra carbono. Inclui
                práticas como rotação de culturas, cobertura vegetal, integração lavoura-pecuária e redução de insumos
                químicos.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold mb-2 text-green-800">Como Participar:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Adote práticas regenerativas em sua propriedade</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Monitore e documente o impacto ambiental</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Conecte-se às plataformas de certificação</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projetos Web3 */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Plataformas Web3 para Créditos Climáticos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {climateProjects.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project.icon}
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>

                <div>
                  <h5 className="font-medium text-sm mb-2">Principais recursos:</h5>
                  <div className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full group-hover:bg-green-600 transition-colors bg-transparent"
                  variant="outline"
                  onClick={() => window.open(project.url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explorar Plataforma
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefícios para Agricultores */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center text-blue-900">Benefícios para Agricultores Familiares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-blue-900">Renda Adicional</h4>
              <p className="text-sm text-blue-800">
                Monetize práticas sustentáveis através da venda de créditos de carbono
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-blue-900">Tecnologia Avançada</h4>
              <p className="text-sm text-blue-800">
                Acesso a ferramentas de monitoramento e verificação via blockchain
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-blue-900">Impacto Global</h4>
              <p className="text-sm text-blue-800">Contribua para o combate às mudanças climáticas globais</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Principal */}
      <div className="text-center space-y-6 bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl">
        <h3 className="text-2xl font-bold">Pronto para transformar sua propriedade?</h3>
        <p className="text-lg opacity-90">
          Junte-se à revolução da agricultura regenerativa e conecte-se ao futuro sustentável
        </p>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full"
            >
              <Leaf className="h-5 w-5 mr-2" />
              Quero Participar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sprout className="h-5 w-5 text-green-600" />
                <span>Interesse em Créditos Climáticos</span>
              </DialogTitle>
              <DialogDescription>
                Preencha seus dados para receber informações sobre como participar dos mercados de carbono
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização da propriedade</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Cidade, Estado"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="practices">Práticas sustentáveis já adotadas</Label>
                <Textarea
                  id="practices"
                  value={formData.practices}
                  onChange={(e) => setFormData({ ...formData, practices: e.target.value })}
                  placeholder="Ex: compostagem, rotação de culturas, plantio direto, agrofloresta..."
                  rows={3}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Enviar Interesse
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recursos Educacionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>Recursos Educacionais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Guias Práticos:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>Como implementar agricultura regenerativa</li>
                <li>Monitoramento de carbono no solo</li>
                <li>Documentação para certificação</li>
                <li>Introdução ao Web3 para agricultores</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Próximos Passos:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>Avaliação da propriedade</li>
                <li>Plano de transição sustentável</li>
                <li>Conexão com plataformas</li>
                <li>Acompanhamento técnico</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
