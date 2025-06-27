# Guia de Integração n8n - AgroFamiliAPP

## 📋 Configuração da Automação de Notícias

### 🎯 Objetivo
Automatizar a coleta e inserção de notícias semanalmente no AgroFamiliAPP usando n8n.

### 🔧 Configuração do Workflow

#### 1. Endpoint da API
\`\`\`
POST https://seu-dominio.com/api/news/auto-update
\`\`\`

#### 2. Estrutura do Workflow n8n

\`\`\`json
{
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "value": "0 6 * * 0"
            }
          ]
        }
      }
    },
    {
      "name": "RSS MAPA",
      "type": "n8n-nodes-base.rssFeedRead",
      "parameters": {
        "url": "https://www.gov.br/agricultura/pt-br/rss"
      }
    },
    {
      "name": "RSS EMBRAPA",
      "type": "n8n-nodes-base.rssFeedRead",
      "parameters": {
        "url": "https://www.embrapa.br/rss"
      }
    },
    {
      "name": "RSS FAO",
      "type": "n8n-nodes-base.rssFeedRead",
      "parameters": {
        "url": "https://www.fao.org/brasil/noticias/rss"
      }
    },
    {
      "name": "Merge News",
      "type": "n8n-nodes-base.merge",
      "parameters": {
        "mode": "append"
      }
    },
    {
      "name": "Process News",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const processedNews = items.map(item => {
            const title = item.json.title || '';
            const description = item.json.description || item.json.summary || '';
            
            return {
              title: title.substring(0, 500),
              summary: description.substring(0, 200) + '...',
              content: description,
              category: getCategoryFromSource(item.json.link),
              source: getSourceFromLink(item.json.link),
              author: getAuthorFromSource(item.json.link),
              published_at: item.json.pubDate || new Date().toISOString(),
              is_featured: Math.random() > 0.7,
              tags: extractTags(title + ' ' + description)
            };
          });
          
          function getCategoryFromSource(link) {
            if (link.includes('agricultura')) return 'Agricultura';
            if (link.includes('embrapa')) return 'Pesquisa';
            if (link.includes('fao')) return 'Internacional';
            return 'Geral';
          }
          
          function getSourceFromLink(link) {
            if (link.includes('agricultura')) return 'Ministério da Agricultura';
            if (link.includes('embrapa')) return 'EMBRAPA';
            if (link.includes('fao')) return 'FAO Brasil';
            return 'Fonte Externa';
          }
          
          function getAuthorFromSource(link) {
            if (link.includes('agricultura')) return 'Assessoria MAPA';
            if (link.includes('embrapa')) return 'Equipe EMBRAPA';
            if (link.includes('fao')) return 'FAO Brasil';
            return 'Redação';
          }
          
          function extractTags(text) {
            const keywords = ['agricultura', 'familiar', 'sustentabilidade', 'tecnologia', 'crédito', 'pronaf'];
            return keywords.filter(keyword => 
              text.toLowerCase().includes(keyword)
            );
          }
          
          return processedNews.slice(0, 10); // Limitar a 10 notícias por execução
        `
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
          "Content-Type": "application/json",
          "Authorization": "Bearer SEU_TOKEN_AQUI"
        }
      }
    }
  ]
}
\`\`\`

### 📅 Cronograma
- **Frequência**: Semanal (Domingos às 06:00)
- **Cron Expression**: `0 6 * * 0`

### 🔗 Fontes RSS Configuradas
1. **Ministério da Agricultura**: `https://www.gov.br/agricultura/pt-br/rss`
2. **EMBRAPA**: `https://www.embrapa.br/rss`
3. **FAO Brasil**: `https://www.fao.org/brasil/noticias/rss`
4. **CONAB**: `https://www.conab.gov.br/rss`

### 🛡️ Segurança
- Use tokens de autenticação
- Valide dados antes da inserção
- Limite de 10 notícias por execução
- Limpeza automática de notícias antigas

### 📊 Monitoramento
- Logs de execução no n8n
- Endpoint de status: `GET /api/news/auto-update`
- Notificações de erro via webhook

### 🚀 Próximos Passos
1. Configure o workflow no n8n
2. Teste com dados de exemplo
3. Ative o agendamento
4. Monitore as execuções
