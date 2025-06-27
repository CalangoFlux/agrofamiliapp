import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

// API para receber manifestações de interesse em créditos climáticos
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    // Validação básica
    const requiredFields = ["name", "location", "email", "practices"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo obrigatório: ${field}` }, { status: 400 })
      }
    }

    // Inserir interesse no banco
    const { data, error } = await supabase
      .from("climate_interests")
      .insert([
        {
          name: body.name,
          location: body.location,
          email: body.email,
          phone: body.phone || null,
          practices: body.practices,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Erro ao inserir interesse:", error)
      return NextResponse.json({ error: "Erro ao registrar interesse" }, { status: 500 })
    }

    // Aqui você pode adicionar integração com serviços de email/notificação
    // Por exemplo, enviar email para a equipe ou para o interessado

    return NextResponse.json(
      {
        success: true,
        message: "Interesse registrado com sucesso!",
        id: data[0].id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// Endpoint para listar interesses (para administração)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"

    const supabase = createServerClient()

    let query = supabase.from("climate_interests").select("*").order("created_at", { ascending: false })

    if (status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar interesses:", error)
      return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 })
    }

    return NextResponse.json({
      interests: data,
      total: data.length,
    })
  } catch (error) {
    console.error("Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
