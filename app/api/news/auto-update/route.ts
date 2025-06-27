import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

// API endpoint para receber notícias do n8n ou outros sistemas de automação
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    // Validar estrutura dos dados
    const requiredFields = ["title", "summary", "content", "category", "source", "author"]

    if (!Array.isArray(body.news)) {
      return NextResponse.json({ error: "Formato inválido. Esperado array de notícias." }, { status: 400 })
    }

    const validNews = []
    const errors = []

    for (const [index, newsItem] of body.news.entries()) {
      const missingFields = requiredFields.filter((field) => !newsItem[field])

      if (missingFields.length > 0) {
        errors.push(`Notícia ${index + 1}: Campos obrigatórios ausentes: ${missingFields.join(", ")}`)
        continue
      }

      validNews.push({
        title: newsItem.title,
        summary: newsItem.summary,
        content: newsItem.content,
        category: newsItem.category,
        source: newsItem.source,
        author: newsItem.author,
        tags: newsItem.tags || [],
        image_url: newsItem.image_url || null,
        is_featured: newsItem.is_featured || false,
        published_at: newsItem.published_at || new Date().toISOString(),
      })
    }

    if (validNews.length === 0) {
      return NextResponse.json(
        {
          error: "Nenhuma notícia válida encontrada",
          details: errors,
        },
        { status: 400 },
      )
    }

    // Inserir notícias válidas no banco
    const { data, error } = await supabase.from("news").insert(validNews).select()

    if (error) {
      console.error("Erro ao inserir notícias:", error)
      return NextResponse.json({ error: "Erro ao salvar notícias no banco" }, { status: 500 })
    }

    // Limpar notícias antigas (manter apenas as 50 mais recentes)
    await supabase.from("news").delete().not("id", "in", `(SELECT id FROM news ORDER BY published_at DESC LIMIT 50)`)

    return NextResponse.json({
      success: true,
      inserted: data.length,
      errors: errors.length > 0 ? errors : null,
      message: `${data.length} notícias inseridas com sucesso`,
    })
  } catch (error) {
    console.error("Erro no endpoint de atualização:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// Endpoint para verificar status das notícias
export async function GET() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("news")
      .select("id, title, published_at, source")
      .order("published_at", { ascending: false })
      .limit(10)

    if (error) {
      return NextResponse.json({ error: "Erro ao buscar notícias" }, { status: 500 })
    }

    return NextResponse.json({
      total_recent: data.length,
      latest_news: data,
      last_update: data[0]?.published_at || null,
    })
  } catch (error) {
    console.error("Erro ao verificar status:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
