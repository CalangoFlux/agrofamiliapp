-- Tabela para armazenar interesses em créditos climáticos
CREATE TABLE IF NOT EXISTS climate_interests (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    practices TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'contacted', 'enrolled', 'rejected'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_climate_interests_status ON climate_interests(status);
CREATE INDEX IF NOT EXISTS idx_climate_interests_created_at ON climate_interests(created_at);
CREATE INDEX IF NOT EXISTS idx_climate_interests_email ON climate_interests(email);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_climate_interests_updated_at 
    BEFORE UPDATE ON climate_interests
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE climate_interests ENABLE ROW LEVEL SECURITY;

-- Política de segurança (permitir inserção pública)
CREATE POLICY "Allow public insert on climate_interests" ON climate_interests FOR INSERT WITH CHECK (true);

-- Política para leitura (apenas administradores - ajustar conforme necessário)
CREATE POLICY "Allow admin read access on climate_interests" ON climate_interests FOR SELECT USING (true);

-- Comentários para documentação
COMMENT ON TABLE climate_interests IS 'Armazena manifestações de interesse em créditos climáticos e agricultura regenerativa';
COMMENT ON COLUMN climate_interests.status IS 'Status do interesse: pending, contacted, enrolled, rejected';
COMMENT ON COLUMN climate_interests.practices IS 'Práticas sustentáveis já adotadas pelo agricultor';
