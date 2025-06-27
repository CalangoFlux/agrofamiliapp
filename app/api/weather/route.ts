import { NextResponse } from "next/server"

// Simulação de API de clima - em produção, integraria com OpenWeatherMap
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat") || "-23.5505"
  const lon = searchParams.get("lon") || "-46.6333"

  try {
    // Em produção, faria chamada real para API de clima
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`)

    // Dados simulados
    const weatherData = {
      temperature: Math.round(20 + Math.random() * 15),
      humidity: Math.round(40 + Math.random() * 40),
      windSpeed: Math.round(5 + Math.random() * 20),
      condition: ["Ensolarado", "Parcialmente nublado", "Nublado", "Chuvoso"][Math.floor(Math.random() * 4)],
      location: "São Paulo, SP",
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ["Hoje", "Amanhã", "Ter", "Qua", "Qui"][i],
        temp: Math.round(18 + Math.random() * 12),
        condition: ["Ensolarado", "Parcialmente nublado", "Nublado", "Chuvoso"][Math.floor(Math.random() * 4)],
        rain: Math.round(Math.random() * 100),
      })),
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Erro ao buscar dados climáticos:", error)
    return NextResponse.json({ error: "Erro ao buscar dados climáticos" }, { status: 500 })
  }
}
