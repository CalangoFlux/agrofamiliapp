import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const supabase = createServerClient()

    let query = supabase.from("news").select("*").order("published_at", { ascending: false }).limit(limit)

    if (category && category !== "all") {
      query = query.ilike("category", `%${category}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar notícias:", error)
      return NextResponse.json({ error: "Erro ao buscar notícias" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("news")
      .insert([
        {
          title: body.title,
          summary: body.summary,
          content: body.content,
          category: body.category,
          source: body.source,
          author: body.author,
          tags: body.tags,
          image_url: body.image_url,
          is_featured: body.is_featured || false,
        },
      ])
      .select()

    if (error) {
      console.error("Erro ao inserir notícia:", error)
      return NextResponse.json({ error: "Erro ao criar notícia" }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
