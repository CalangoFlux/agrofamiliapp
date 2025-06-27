"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Thermometer, Droplets, Wind, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  location: string
  forecast: Array<{
    day: string
    temp: number
    condition: string
    rain: number
  }>
}

interface LocationData {
  latitude: number
  longitude: number
  city: string
  state: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Função para obter localização do usuário
  const getCurrentLocation = () => {
    setLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada neste navegador")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // Simular reverse geocoding para obter cidade/estado
          const locationData = await reverseGeocode(latitude, longitude)
          setLocation(locationData)

          // Buscar dados climáticos para a localização
          await fetchWeatherForLocation(locationData)
        } catch (error) {
          console.error("Erro ao obter dados de localização:", error)
          setLocationError("Erro ao obter dados de localização")
          // Usar localização padrão
          await fetchWeatherForLocation({
            latitude: -23.5505,
            longitude: -46.6333,
            city: "São Paulo",
            state: "SP",
          })
        }
      },
      (error) => {
        console.error("Erro de geolocalização:", error)
        setLocationError("Não foi possível obter sua localização")
        // Usar localização padrão
        fetchWeatherForLocation({
          latitude: -23.5505,
          longitude: -46.6333,
          city: "São Paulo",
          state: "SP",
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutos
      },
    )
  }

  // Simular reverse geocoding
  const reverseGeocode = async (lat: number, lon: number): Promise<LocationData> => {
    // Em produção, usaria uma API real como Google Maps ou OpenCage
    const cities = [
      { lat: -23.5505, lon: -46.6333, city: "São Paulo", state: "SP" },
      { lat: -22.9068, lon: -43.1729, city: "Rio de Janeiro", state: "RJ" },
      { lat: -19.9208, lon: -43.9378, city: "Belo Horizonte", state: "MG" },
      { lat: -30.0346, lon: -51.2177, city: "Porto Alegre", state: "RS" },
      { lat: -25.4284, lon: -49.2577, city: "Curitiba", state: "PR" },
      { lat: -3.7319, lon: -38.5267, city: "Fortaleza", state: "CE" },
      { lat: -8.0476, lon: -34.877, city: "Recife", state: "PE" },
      { lat: -12.9714, lon: -38.5014, city: "Salvador", state: "BA" },
      { lat: -15.8267, lon: -47.9218, city: "Brasília", state: "DF" },
      { lat: -16.6864, lon: -49.2643, city: "Goiânia", state: "GO" },
    ]

    // Encontrar cidade mais próxima
    let closest = cities[0]
    let minDistance = Math.sqrt(Math.pow(lat - closest.lat, 2) + Math.pow(lon - closest.lon, 2))

    cities.forEach((city) => {
      const distance = Math.sqrt(Math.pow(lat - city.lat, 2) + Math.pow(lon - city.lon, 2))
      if (distance < minDistance) {
        minDistance = distance
        closest = city
      }
    })

    return {
      latitude: lat,
      longitude: lon,
      city: closest.city,
      state: closest.state,
    }
  }

  // Buscar dados climáticos para localização específica
  const fetchWeatherForLocation = async (locationData: LocationData) => {
    try {
      // Simular dados climáticos baseados na localização
      const weatherConditions = ["Ensolarado", "Parcialmente nublado", "Nublado", "Chuvoso"]
      const baseTemp = locationData.latitude > -15 ? 28 : locationData.latitude > -25 ? 24 : 20

      const weatherData: WeatherData = {
        temperature: baseTemp + Math.round((Math.random() - 0.5) * 8),
        humidity: 50 + Math.round(Math.random() * 40),
        windSpeed: 5 + Math.round(Math.random() * 20),
        condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
        location: `${locationData.city}, ${locationData.state}`,
        forecast: Array.from({ length: 5 }, (_, i) => ({
          day: ["Hoje", "Amanhã", "Ter", "Qua", "Qui"][i],
          temp: baseTemp + Math.round((Math.random() - 0.5) * 6),
          condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
          rain: Math.round(Math.random() * 100),
        })),
      }

      setWeather(weatherData)
    } catch (error) {
      console.error("Erro ao buscar dados climáticos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
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
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <span>Condições Climáticas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
            <span className="ml-2">Obtendo sua localização...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (locationError && !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-red-500" />
            <span>Condições Climáticas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-red-600">{locationError}</p>
            <Button onClick={getCurrentLocation} variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Tentar Novamente
            </Button>
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
            {getWeatherIcon(weather.condition)}
            <span>Condições Climáticas</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{weather.location}</span>
            <Button onClick={getCurrentLocation} variant="ghost" size="sm">
              Atualizar
            </Button>
          </div>
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
                <p className="text-xs text-blue-600">{Math.round(day.rain)}%</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
