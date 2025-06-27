-- Dados iniciais para o AgroFamiliAPP
-- Execute após criar as tabelas

-- Inserir programas governamentais
INSERT INTO government_programs (name, description, program_type, interest_rate, max_amount, max_term_months, requirements, is_active) VALUES
('PRONAF Custeio', 'Financiamento para custeio de atividades agropecuárias da agricultura familiar', 'credit', 3.0, 250000.00, 24, ARRAY['DAP ativa', 'Projeto técnico', 'Capacidade de pagamento'], true),
('PRONAF Investimento', 'Financiamento para investimentos em infraestrutura e equipamentos', 'credit', 3.0, 165000.00, 120, ARRAY['DAP ativa', 'Projeto técnico', 'ATER'], true),
('PRONAF Mais Alimentos', 'Linha especial para aumento da produção de alimentos', 'credit', 2.0, 300000.00, 120, ARRAY['DAP ativa', 'Projeto de investimento'], true),
('PAA - Compra com Doação Simultânea', 'Programa de Aquisição de Alimentos com doação para entidades', 'purchase', 0.0, 8000.00, 12, ARRAY['DAP ativa', 'Produtos da safra'], true),
('PNAE', 'Programa Nacional de Alimentação Escolar', 'purchase', 0.0, 20000.00, 12, ARRAY['DAP ativa', 'Chamada pública'], true);

-- Inserir dados de preços de mercado
INSERT INTO market_prices (product_name, price, unit, market_location, price_date, change_percentage) VALUES
('Milho', 65.00, 'sc', 'CEAGESP - São Paulo', CURRENT_DATE, 2.5),
('Feijão Carioca', 280.00, 'sc', 'CEAGESP - São Paulo', CURRENT_DATE, -1.2),
('Tomate', 4.50, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 5.3),
('Alface', 2.80, 'unid', 'CEAGESP - São Paulo', CURRENT_DATE, 0.0),
('Cenoura', 3.20, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 8.1),
('Batata', 2.90, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, -3.4),
('Cebola', 3.80, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 1.8),
('Leite', 2.10, 'litro', 'Cooperativa Central', CURRENT_DATE, 4.2);

-- Inserir oportunidades de venda
INSERT INTO sales_opportunities (title, description, buyer_name, buyer_contact, product_needed, quantity_needed, price_offered, location, deadline, opportunity_type, is_active) VALUES
('Fornecimento de Hortaliças para Escolas', 'Chamada pública para fornecimento de hortaliças orgânicas para alimentação escolar', 'Prefeitura de Campinas', 'licitacao@campinas.sp.gov.br', 'Hortaliças orgânicas', '500 kg/semana', 8.50, 'Campinas, SP', CURRENT_DATE + INTERVAL '30 days', 'pnae', true),
('Compra de Frutas Tropicais', 'Aquisição de frutas tropicais para doação através do PAA', 'CONAB Regional CE', 'paa.ce@conab.gov.br', 'Frutas tropicais', '2 toneladas', 3.20, 'Fortaleza, CE', CURRENT_DATE + INTERVAL '45 days', 'paa', true),
('Fornecimento de Leite para Cooperativa', 'Cooperativa busca produtores de leite para fornecimento regular', 'Cooperativa Agropecuária Vale Verde', 'contato@coopverde.com.br', 'Leite in natura', '1000 litros/dia', 2.15, 'Porto Alegre, RS', CURRENT_DATE + INTERVAL '60 days', 'cooperative', true),
('Venda Direta para Restaurante', 'Restaurante especializado em comida orgânica busca fornecedores', 'Restaurante Sabor Natural', 'compras@sabornatural.com.br', 'Verduras e legumes orgânicos', '50 kg/semana', 12.00, 'São Paulo, SP', CURRENT_DATE + INTERVAL '15 days', 'private', true);

-- Inserir notícias
INSERT INTO news (title, summary, content, category, source, author, tags, image_url, published_at, is_featured) VALUES
('Governo anuncia R$ 48 bilhões para o Plano Safra da Agricultura Familiar 2024/2025', 'Novo Plano Safra destina recursos recordes para crédito rural, com foco em sustentabilidade e inovação tecnológica', 'O Ministério da Agricultura anunciou hoje o Plano Safra da Agricultura Familiar 2024/2025, com orçamento de R$ 48 bilhões, representando um aumento de 10% em relação ao ano anterior. Os recursos serão destinados principalmente ao PRONAF, com novas linhas de crédito para tecnologias sustentáveis e agricultura de baixo carbono.', 'Programas Governamentais', 'Ministério da Agricultura', 'Assessoria MAPA', ARRAY['Plano Safra', 'PRONAF', 'Crédito Rural'], '/placeholder.svg?height=300&width=600', CURRENT_TIMESTAMP - INTERVAL '1 day', true),
('Tecnologia blockchain chega à certificação de produtos orgânicos', 'Nova plataforma utiliza blockchain para garantir rastreabilidade e autenticidade de produtos orgânicos da agricultura familiar', 'Uma startup brasileira desenvolveu uma plataforma baseada em blockchain que permite rastrear toda a cadeia produtiva de alimentos orgânicos, desde o plantio até o consumidor final. A tecnologia promete revolucionar a certificação orgânica, reduzindo custos e aumentando a confiança dos consumidores.', 'Tecnologia', 'TechAgro News', 'Marina Silva', ARRAY['Blockchain', 'Orgânicos', 'Rastreabilidade'], '/placeholder.svg?height=300&width=600', CURRENT_TIMESTAMP - INTERVAL '2 days', false),
('Feira Nacional da Agricultura Familiar movimenta R$ 25 milhões em Brasília', 'Evento reúne mais de 800 produtores de todo o país e bate recorde de vendas, destacando produtos agroecológicos', 'A 16ª Feira Nacional da Agricultura Familiar, realizada no Parque da Cidade em Brasília, encerrou com recorde de público e vendas. Mais de 150 mil visitantes passaram pelo evento durante os cinco dias, gerando negócios de R$ 25 milhões. Os produtos agroecológicos e orgânicos foram os mais procurados.', 'Mercado', 'CONAB', 'João Santos', ARRAY['Feira', 'Agricultura Familiar', 'Agroecologia'], '/placeholder.svg?height=300&width=600', CURRENT_TIMESTAMP - INTERVAL '3 days', true);

-- Inserir dados climáticos de exemplo
INSERT INTO weather_data (location, temperature, humidity, wind_speed, weather_condition, forecast_data, recorded_at) VALUES
('São Paulo, SP', 24.5, 68, 12.3, 'Parcialmente nublado', 
'{"forecast": [{"day": "Hoje", "temp": 24, "condition": "Parcialmente nublado", "rain": 30}, {"day": "Amanhã", "temp": 22, "condition": "Chuvoso", "rain": 80}]}', 
CURRENT_TIMESTAMP),
('Campinas, SP', 26.2, 62, 8.7, 'Ensolarado',
'{"forecast": [{"day": "Hoje", "temp": 26, "condition": "Ensolarado", "rain": 10}, {"day": "Amanhã", "temp": 24, "condition": "Parcialmente nublado", "rain": 40}]}',
CURRENT_TIMESTAMP),
('Fortaleza, CE', 29.8, 75, 15.2, 'Ensolarado',
'{"forecast": [{"day": "Hoje", "temp": 30, "condition": "Ensolarado", "rain": 5}, {"day": "Amanhã", "temp": 31, "condition": "Ensolarado", "rain": 0}]}',
CURRENT_TIMESTAMP);
