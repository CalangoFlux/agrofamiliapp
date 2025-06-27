import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("market_prices")
      .select("*")
      .order("price_date", { ascending: false })
      .limit(20)

    if (error) {
      console.error("Erro ao buscar preços:", error)
      return NextResponse.json({ error: "Erro ao buscar preços" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
