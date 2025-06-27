"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Thermometer, Droplets, Wind } from "lucide-react"

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  forecast: Array<{
    day: string
    temp: number
    condition: string
    rain: number
  }>
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular chamada para API de clima
    const fetchWeather = async () => {
      try {
        // Em produção, aqui seria uma chamada real para OpenWeatherMap ou similar
        setTimeout(() => {
          setWeather({
            temperature: 28,
            humidity: 65,
            windSpeed: 12,
            condition: "Ensolarado",
            forecast: [
              { day: "Hoje", temp: 28, condition: "Ensolarado", rain: 0 },
              { day: "Amanhã", temp: 26, condition: "Parcialmente nublado", rain: 20 },
              { day: "Ter", temp: 24, condition: "Chuvoso", rain: 80 },
              { day: "Qua", temp: 22, condition: "Chuvoso", rain: 90 },
              { day: "Qui", temp: 25, condition: "Nublado", rain: 40 },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erro ao buscar dados climáticos:", error)
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "ensolarado":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "nublado":
      case "parcialmente nublado":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "chuvoso":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Condições Climáticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2">Carregando dados climáticos...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Condições Climáticas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Dados climáticos indisponíveis</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getWeatherIcon(weather.condition)}
          <span>Condições Climáticas - Hoje</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Thermometer className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-gray-600">Temperatura</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Droplets className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{weather.humidity}%</p>
              <p className="text-sm text-gray-600">Umidade</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wind className="h-8 w-8 text-gray-500" />
            <div>
              <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
              <p className="text-sm text-gray-600">Vento</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Previsão para os próximos dias</h4>
          <div className="grid grid-cols-5 gap-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <p className="text-xs font-medium">{day.day}</p>
                <div className="my-2 flex justify-center">{getWeatherIcon(day.condition)}</div>
                <p className="text-sm font-bold">{day.temp}°C</p>
                <p className="text-xs text-blue-600">{day.rain}%</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
