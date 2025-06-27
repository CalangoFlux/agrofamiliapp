import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get("state")
    const city = searchParams.get("city")

    const supabase = createServerClient()

    let query = supabase.from("farmers").select("*").order("created_at", { ascending: false })

    if (state && state !== "all") {
      query = query.eq("state", state)
    }

    if (city && city !== "all") {
      query = query.eq("city", city)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar agricultores:", error)
      return NextResponse.json({ error: "Erro ao buscar agricultores" }, { status: 500 })
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

    // Validação básica
    const requiredFields = ["name", "email", "city", "state"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo obrigatório: ${field}` }, { status: 400 })
      }
    }

    const { data, error } = await supabase
      .from("farmers")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          cpf: body.cpf,
          address: body.address,
          city: body.city,
          state: body.state,
          postal_code: body.postal_code,
          property_size: body.property_size,
          main_products: body.main_products,
          has_dap: body.has_dap || false,
          coordinates: `(${-50 + Math.random() * 20}, ${-30 + Math.random() * 25})`,
        },
      ])
      .select()

    if (error) {
      console.error("Erro ao inserir agricultor:", error)
      return NextResponse.json({ error: "Erro ao cadastrar agricultor" }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
