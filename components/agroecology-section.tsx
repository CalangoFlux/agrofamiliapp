"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Leaf, Users, BookOpen, Sprout } from "lucide-react"

export function AgroecologySection() {
  const agroecologyResources = [
    {
      title: "Associação Brasileira de Agroecologia",
      description:
        "Organização que promove o desenvolvimento da agroecologia no Brasil através de pesquisa, ensino e extensão.",
      url: "https://aba-agroecologia.org.br/",
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      topics: ["Pesquisa", "Ensino", "Extensão", "Congressos"],
    },
    {
      title: "Portal Agroecologia",
      description:
        "Portal de referência em agroecologia com artigos, notícias e recursos educacionais para produtores e técnicos.",
      url: "https://agroecologia.org.br/",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      topics: ["Artigos", "Notícias", "Recursos", "Educação"],
    },
    {
      title: "Rede de Grupos de Agroecologia do Brasil",
      description:
        "Rede que articula grupos de agroecologia em universidades e institutos de pesquisa em todo o Brasil.",
      url: "https://regabrasil.com.br/",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      topics: ["Rede", "Universidades", "Pesquisa", "Articulação"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recursos de Agroecologia</h2>
        <p className="text-gray-600">Conecte-se com as principais organizações de agroecologia do Brasil</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agroecologyResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                {resource.icon}
                <span className="text-lg">{resource.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 text-sm leading-relaxed">{resource.description}</CardDescription>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.topics.map((topic, topicIndex) => (
                  <Badge key={topicIndex} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>

              <Button className="w-full" onClick={() => window.open(resource.url, "_blank")}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Acessar Site
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Sprout className="h-5 w-5" />
            <span>Por que Agroecologia?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-800 mb-2">Benefícios Ambientais:</h4>
              <ul className="space-y-1 text-green-700">
                <li>• Preservação da biodiversidade</li>
                <li>• Conservação do solo e água</li>
                <li>• Redução de agrotóxicos</li>
                <li>• Sequestro de carbono</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">Benefícios Sociais:</h4>
              <ul className="space-y-1 text-green-700">
                <li>• Fortalecimento da agricultura familiar</li>
                <li>• Segurança alimentar</li>
                <li>• Geração de renda sustentável</li>
                <li>• Valorização do conhecimento tradicional</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
