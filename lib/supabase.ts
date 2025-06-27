import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Cliente para componentes do lado do cliente
export const createClient = () => createClientComponentClient()

// Cliente para componentes do lado do servidor
export const createServerClient = () => createServerComponentClient({ cookies })

// Tipos do banco de dados
export interface Database {
  public: {
    Tables: {
      farmers: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          cpf: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          property_size: number | null
          main_products: string[] | null
          has_dap: boolean
          dap_number: string | null
          coordinates: { x: number; y: number } | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          email: string
          phone?: string
          cpf?: string
          address?: string
          city?: string
          state?: string
          postal_code?: string
          property_size?: number
          main_products?: string[]
          has_dap?: boolean
          dap_number?: string
          coordinates?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string
          cpf?: string
          address?: string
          city?: string
          state?: string
          postal_code?: string
          property_size?: number
          main_products?: string[]
          has_dap?: boolean
          dap_number?: string
          coordinates?: string
        }
      }
      government_programs: {
        Row: {
          id: number
          name: string
          description: string | null
          program_type: string | null
          interest_rate: number | null
          max_amount: number | null
          max_term_months: number | null
          requirements: string[] | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          name: string
          description?: string
          program_type?: string
          interest_rate?: number
          max_amount?: number
          max_term_months?: number
          requirements?: string[]
          is_active?: boolean
        }
        Update: {
          name?: string
          description?: string
          program_type?: string
          interest_rate?: number
          max_amount?: number
          max_term_months?: number
          requirements?: string[]
          is_active?: boolean
        }
      }
      news: {
        Row: {
          id: number
          title: string
          summary: string | null
          content: string | null
          category: string | null
          source: string | null
          author: string | null
          tags: string[] | null
          image_url: string | null
          published_at: string
          is_featured: boolean
        }
        Insert: {
          title: string
          summary?: string
          content?: string
          category?: string
          source?: string
          author?: string
          tags?: string[]
          image_url?: string
          published_at?: string
          is_featured?: boolean
        }
        Update: {
          title?: string
          summary?: string
          content?: string
          category?: string
          source?: string
          author?: string
          tags?: string[]
          image_url?: string
          published_at?: string
          is_featured?: boolean
        }
      }
      market_prices: {
        Row: {
          id: number
          product_name: string
          price: number
          unit: string | null
          market_location: string | null
          price_date: string
          change_percentage: number | null
          created_at: string
        }
        Insert: {
          product_name: string
          price: number
          unit?: string
          market_location?: string
          price_date?: string
          change_percentage?: number
        }
        Update: {
          product_name?: string
          price?: number
          unit?: string
          market_location?: string
          price_date?: string
          change_percentage?: number
        }
      }
      sales_opportunities: {
        Row: {
          id: number
          title: string
          description: string | null
          buyer_name: string | null
          buyer_contact: string | null
          product_needed: string | null
          quantity_needed: string | null
          price_offered: number | null
          location: string | null
          deadline: string | null
          opportunity_type: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          title: string
          description?: string
          buyer_name?: string
          buyer_contact?: string
          product_needed?: string
          quantity_needed?: string
          price_offered?: number
          location?: string
          deadline?: string
          opportunity_type?: string
          is_active?: boolean
        }
        Update: {
          title?: string
          description?: string
          buyer_name?: string
          buyer_contact?: string
          product_needed?: string
          quantity_needed?: string
          price_offered?: number
          location?: string
          deadline?: string
          opportunity_type?: string
          is_active?: boolean
        }
      }
      weather_data: {
        Row: {
          id: number
          location: string
          temperature: number | null
          humidity: number | null
          wind_speed: number | null
          weather_condition: string | null
          forecast_data: any | null
          recorded_at: string
        }
        Insert: {
          location: string
          temperature?: number
          humidity?: number
          wind_speed?: number
          weather_condition?: string
          forecast_data?: any
          recorded_at?: string
        }
        Update: {
          location?: string
          temperature?: number
          humidity?: number
          wind_speed?: number
          weather_condition?: string
          forecast_data?: any
          recorded_at?: string
        }
      }
    }
  }
}
