-- Execute este script no SQL Editor do Supabase para criar as tabelas

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários/agricultores
CREATE TABLE IF NOT EXISTS farmers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(2),
    postal_code VARCHAR(10),
    property_size DECIMAL(10,2),
    main_products TEXT[],
    has_dap BOOLEAN DEFAULT FALSE,
    dap_number VARCHAR(50),
    coordinates POINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de programas governamentais
CREATE TABLE IF NOT EXISTS government_programs (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    program_type VARCHAR(50), -- 'credit', 'purchase', 'support'
    interest_rate DECIMAL(5,2),
    max_amount DECIMAL(15,2),
    max_term_months INTEGER,
    requirements TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS news (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    summary TEXT,
    content TEXT,
    category VARCHAR(100),
    source VARCHAR(255),
    author VARCHAR(255),
    tags TEXT[],
    image_url VARCHAR(500),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT FALSE
);

-- Tabela de preços de mercado
CREATE TABLE IF NOT EXISTS market_prices (
    id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20), -- 'kg', 'sc', 'unid'
    market_location VARCHAR(255),
    price_date DATE DEFAULT CURRENT_DATE,
    change_percentage DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de oportunidades de venda
CREATE TABLE IF NOT EXISTS sales_opportunities (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    buyer_name VARCHAR(255),
    buyer_contact VARCHAR(255),
    product_needed VARCHAR(255),
    quantity_needed VARCHAR(100),
    price_offered DECIMAL(10,2),
    location VARCHAR(255),
    deadline DATE,
    opportunity_type VARCHAR(50), -- 'paa', 'pnae', 'private', 'cooperative'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de dados climáticos
CREATE TABLE IF NOT EXISTS weather_data (
    id BIGSERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    temperature DECIMAL(5,2),
    humidity INTEGER,
    wind_speed DECIMAL(5,2),
    weather_condition VARCHAR(100),
    forecast_data JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_farmers_state ON farmers(state);
CREATE INDEX IF NOT EXISTS idx_farmers_city ON farmers(city);
CREATE INDEX IF NOT EXISTS idx_farmers_has_dap ON farmers(has_dap);
CREATE INDEX IF NOT EXISTS idx_farmers_email ON farmers(email);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_market_prices_product ON market_prices(product_name);
CREATE INDEX IF NOT EXISTS idx_market_prices_date ON market_prices(price_date);
CREATE INDEX IF NOT EXISTS idx_sales_opportunities_active ON sales_opportunities(is_active);
CREATE INDEX IF NOT EXISTS idx_weather_location ON weather_data(location);

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_farmers_updated_at 
    BEFORE UPDATE ON farmers
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança (permitir leitura pública por enquanto)
CREATE POLICY "Allow public read access on farmers" ON farmers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on government_programs" ON government_programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on news" ON news FOR SELECT USING (true);
CREATE POLICY "Allow public read access on market_prices" ON market_prices FOR SELECT USING (true);
CREATE POLICY "Allow public read access on sales_opportunities" ON sales_opportunities FOR SELECT USING (true);
CREATE POLICY "Allow public read access on weather_data" ON weather_data FOR SELECT USING (true);

-- Permitir inserção pública para farmers (cadastro)
CREATE POLICY "Allow public insert on farmers" ON farmers FOR INSERT WITH CHECK (true);
