"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Thermometer, Droplets, Wind } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [selectedLocation, setSelectedLocation] = useState("São Paulo, SP")
  const [availableLocations] = useState([
    "São Paulo, SP",
    "Rio de Janeiro, RJ",
    "Belo Horizonte, MG",
    "Porto Alegre, RS",
    "Curitiba, PR",
    "Fortaleza, CE",
    "Recife, PE",
    "Salvador, BA",
    "Brasília, DF",
    "Goiânia, GO",
  ])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setTimeout(() => {
          // Simular dados diferentes baseados na localização
          const locationData = {
            "São Paulo, SP": { temp: 28, humidity: 65, wind: 12, condition: "Ensolarado" },
            "Rio de Janeiro, RJ": { temp: 32, humidity: 78, wind: 8, condition: "Parcialmente nublado" },
            "Belo Horizonte, MG": { temp: 26, humidity: 60, wind: 10, condition: "Ensolarado" },
            "Porto Alegre, RS": { temp: 22, humidity: 85, wind: 15, condition: "Chuvoso" },
            "Curitiba, PR": { temp: 20, humidity: 70, wind: 12, condition: "Nublado" },
            "Fortaleza, CE": { temp: 30, humidity: 80, wind: 18, condition: "Ensolarado" },
            "Recife, PE": { temp: 29, humidity: 82, wind: 16, condition: "Parcialmente nublado" },
            "Salvador, BA": { temp: 28, humidity: 75, wind: 14, condition: "Ensolarado" },
            "Brasília, DF": { temp: 25, humidity: 55, wind: 8, condition: "Ensolarado" },
            "Goiânia, GO": { temp: 27, humidity: 58, wind: 9, condition: "Parcialmente nublado" },
          }

          const data = locationData[selectedLocation] || locationData["São Paulo, SP"]

          setWeather({
            temperature: data.temp,
            humidity: data.humidity,
            windSpeed: data.wind,
            condition: data.condition,
            forecast: [
              { day: "Hoje", temp: data.temp, condition: data.condition, rain: Math.random() * 100 },
              { day: "Amanhã", temp: data.temp - 2, condition: "Parcialmente nublado", rain: Math.random() * 100 },
              { day: "Ter", temp: data.temp - 1, condition: "Nublado", rain: Math.random() * 100 },
              { day: "Qua", temp: data.temp + 1, condition: "Ensolarado", rain: Math.random() * 100 },
              { day: "Qui", temp: data.temp + 2, condition: "Ensolarado", rain: Math.random() * 100 },
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
  }, [selectedLocation])

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
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather?.condition || "")}
            <span>Condições Climáticas</span>
          </div>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableLocations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
