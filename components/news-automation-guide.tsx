"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Zap, RefreshCw } from "lucide-react"

export function NewsAutomationGuide() {
  const n8nWorkflowExample = `{
  "nodes": [
    {
      "name": "RSS Feed Reader",
      "type": "n8n-nodes-base.rssFeedRead",
      "parameters": {
        "url": "https://www.gov.br/agricultura/pt-br/rss"
      }
    },
    {
      "name": "Process News",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": "const processedNews = items.map(item => ({
          title: item.json.title,
          summary: item.json.description?.substring(0, 200) + '...',
          content: item.json.description,
          category: 'Agricultura',
          source: 'Ministério da Agricultura',
          author: 'Assessoria MAPA',
          published_at: item.json.pubDate,
          is_featured: false
        }));
        return processedNews;"
      }
    },
    {
      "name": "Send to AgroFamiliAPP",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "https://seu-dominio.com/api/news/auto-update",
        "body": {
          "news": "={{$json}}"
        },
        "headers": {
          "Content-Type": "application/json"
        }
      }
    }
  ]
}`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>Automação de Notícias com n8n</span>
          </CardTitle>
          <CardDescription>Configure atualizações automáticas semanais de notícias usando n8n</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Endpoint da API:</h4>
              <code className="bg-gray-100 p-2 rounded text-sm block">POST /api/news/auto-update</code>
            </div>
            <div>
              <h4 className="font-medium mb-2">Frequência Recomendada:</h4>
              <Badge variant="outline">Semanal (Domingos às 06:00)</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Fontes RSS Sugeridas:</h4>
            <ul className="text-sm space-y-1">
              <li>• Ministério da Agricultura: gov.br/agricultura/pt-br/rss</li>
              <li>• EMBRAPA: embrapa.br/rss</li>
              <li>• CONAB: conab.gov.br/rss</li>
              <li>• FAO Brasil: fao.org/brasil/noticias/rss</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Formato JSON Esperado:</h4>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
              {`{
  "news": [
    {
      "title": "Título da notícia",
      "summary": "Resumo da notícia...",
      "content": "Conteúdo completo...",
      "category": "Categoria",
      "source": "Fonte",
      "author": "Autor",
      "tags": ["tag1", "tag2"],
      "is_featured": false
    }
  ]
}`}
            </pre>
          </div>

          <Button variant="outline" onClick={() => navigator.clipboard.writeText(n8nWorkflowExample)}>
            <Code className="h-4 w-4 mr-2" />
            Copiar Workflow n8n
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            <span>Status da Automação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <p className="text-sm">API Configurada</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">⏰</div>
              <p className="text-sm">Aguardando n8n</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">📊</div>
              <p className="text-sm">Monitoramento</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
