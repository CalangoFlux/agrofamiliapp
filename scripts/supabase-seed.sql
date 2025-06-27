-- Dados iniciais para o AgroFamiliAPP no Supabase
-- Execute após criar as tabelas

-- Inserir programas governamentais
INSERT INTO government_programs (name, description, program_type, interest_rate, max_amount, max_term_months, requirements, is_active) VALUES
('PRONAF Custeio', 'Financiamento para custeio de atividades agropecuárias da agricultura familiar', 'credit', 3.0, 250000.00, 24, ARRAY['DAP ativa', 'Projeto técnico', 'Capacidade de pagamento'], true),
('PRONAF Investimento', 'Financiamento para investimentos em infraestrutura e equipamentos', 'credit', 3.0, 165000.00, 120, ARRAY['DAP ativa', 'Projeto técnico', 'ATER'], true),
('PRONAF Mais Alimentos', 'Linha especial para aumento da produção de alimentos', 'credit', 2.0, 300000.00, 120, ARRAY['DAP ativa', 'Projeto de investimento'], true),
('PAA - Compra com Doação Simultânea', 'Programa de Aquisição de Alimentos com doação para entidades', 'purchase', 0.0, 8000.00, 12, ARRAY['DAP ativa', 'Produtos da safra'], true),
('PNAE', 'Programa Nacional de Alimentação Escolar', 'purchase', 0.0, 20000.00, 12, ARRAY['DAP ativa', 'Chamada pública'], true),
('PRONAF Agroecologia', 'Financiamento para sistemas de produção agroecológicos', 'credit', 2.5, 200000.00, 96, ARRAY['DAP ativa', 'Projeto agroecológico'], true),
('PRONAF Mulher', 'Linha específica para mulheres agricultoras', 'credit', 2.0, 150000.00, 84, ARRAY['DAP ativa', 'Mulher titular'], true),
('PRONAF Jovem', 'Financiamento para jovens agricultores', 'credit', 1.5, 100000.00, 120, ARRAY['DAP ativa', 'Idade entre 16 e 29 anos'], true);

-- Inserir dados de preços de mercado
INSERT INTO market_prices (product_name, price, unit, market_location, price_date, change_percentage) VALUES
('Milho', 65.00, 'sc', 'CEAGESP - São Paulo', CURRENT_DATE, 2.5),
('Feijão Carioca', 280.00, 'sc', 'CEAGESP - São Paulo', CURRENT_DATE, -1.2),
('Feijão Preto', 320.00, 'sc', 'CEAGESP - São Paulo', CURRENT_DATE, 3.8),
('Tomate', 4.50, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 5.3),
('Alface', 2.80, 'unid', 'CEAGESP - São Paulo', CURRENT_DATE, 0.0),
('Cenoura', 3.20, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 8.1),
('Batata', 2.90, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, -3.4),
('Cebola', 3.80, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 1.8),
('Leite', 2.10, 'litro', 'Cooperativa Central', CURRENT_DATE, 4.2),
('Banana', 3.50, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, -2.1),
('Laranja', 2.20, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 6.7),
('Mandioca', 1.80, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 1.5),
('Abóbora', 2.40, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, -0.8),
('Abobrinha', 3.60, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 4.2),
('Pepino', 4.20, 'kg', 'CEAGESP - São Paulo', CURRENT_DATE, 2.9);

-- Inserir oportunidades de venda
INSERT INTO sales_opportunities (title, description, buyer_name, buyer_contact, product_needed, quantity_needed, price_offered, location, deadline, opportunity_type, is_active) VALUES
('Fornecimento de Hortaliças para Escolas - Campinas', 'Chamada pública para fornecimento de hortaliças orgânicas para alimentação escolar', 'Prefeitura de Campinas', 'licitacao@campinas.sp.gov.br', 'Hortaliças orgânicas', '500 kg/semana', 8.50, 'Campinas, SP', CURRENT_DATE + INTERVAL '30 days', 'pnae', true),
('Compra de Frutas Tropicais - PAA Ceará', 'Aquisição de frutas tropicais para doação através do PAA', 'CONAB Regional CE', 'paa.ce@conab.gov.br', 'Frutas tropicais', '2 toneladas', 3.20, 'Fortaleza, CE', CURRENT_DATE + INTERVAL '45 days', 'paa', true),
('Fornecimento de Leite para Cooperativa', 'Cooperativa busca produtores de leite para fornecimento regular', 'Cooperativa Agropecuária Vale Verde', 'contato@coopverde.com.br', 'Leite in natura', '1000 litros/dia', 2.15, 'Porto Alegre, RS', CURRENT_DATE + INTERVAL '60 days', 'cooperative', true),
('Venda Direta para Restaurante Orgânico', 'Restaurante especializado em comida orgânica busca fornecedores', 'Restaurante Sabor Natural', 'compras@sabornatural.com.br', 'Verduras e legumes orgânicos', '50 kg/semana', 12.00, 'São Paulo, SP', CURRENT_DATE + INTERVAL '15 days', 'private', true),
('Fornecimento para Merenda Escolar - Ribeirão Preto', 'Chamada pública para fornecimento de produtos da agricultura familiar', 'Prefeitura de Ribeirão Preto', 'merenda@ribeirao.sp.gov.br', 'Frutas e verduras', '300 kg/semana', 6.80, 'Ribeirão Preto, SP', CURRENT_DATE + INTERVAL '25 days', 'pnae', true),
('Compra de Grãos - PAA Nacional', 'Programa de Aquisição de Alimentos busca produtores de grãos', 'CONAB Nacional', 'paa@conab.gov.br', 'Milho e feijão', '10 toneladas', 65.00, 'Brasília, DF', CURRENT_DATE + INTERVAL '40 days', 'paa', true);

-- Inserir notícias
INSERT INTO news (title, summary, content, category, source, author, tags, image_url, published_at, is_featured) VALUES
('Governo anuncia R$ 48 bilhões para o Plano Safra da Agricultura Familiar 2024/2025', 'Novo Plano Safra destina recursos recordes para crédito rural, com foco em sustentabilidade e inovação tecnológica', 'O Ministério da Agricultura anunciou hoje o Plano Safra da Agricultura Familiar 2024/2025, com orçamento de R$ 48 bilhões, representando um aumento de 10% em relação ao ano anterior. Os recursos serão destinados principalmente ao PRONAF, com novas linhas de crédito para tecnologias sustentáveis e agricultura de baixo carbono. O programa também inclui incentivos especiais para jovens agricultores e mulheres rurais, além de linhas específicas para agroecologia e sistemas agroflorestais.', 'Programas Governamentais', 'Ministério da Agricultura', 'Assessoria MAPA', ARRAY['Plano Safra', 'PRONAF', 'Crédito Rural', 'Sustentabilidade'], '/placeholder.svg?height=300&width=600', NOW() - INTERVAL '1 day', true),

('Tecnologia blockchain revoluciona certificação de produtos orgânicos', 'Nova plataforma utiliza blockchain para garantir rastreabilidade e autenticidade de produtos orgânicos da agricultura familiar', 'Uma startup brasileira desenvolveu uma plataforma baseada em blockchain que permite rastrear toda a cadeia produtiva de alimentos orgânicos, desde o plantio até o consumidor final. A tecnologia promete revolucionar a certificação orgânica, reduzindo custos em até 40% e aumentando a confiança dos consumidores. Já foram cadastrados mais de 500 produtores em cinco estados, com expectativa de expansão nacional até o final do ano.', 'Tecnologia', 'TechAgro News', 'Marina Silva', ARRAY['Blockchain', 'Orgânicos', 'Rastreabilidade', 'Inovação'], '/placeholder.svg?height=300&width=600', NOW() - INTERVAL '2 days', false),

('Feira Nacional da Agricultura Familiar movimenta R$ 25 milhões em Brasília', 'Evento reúne mais de 800 produtores de todo o país e bate recorde de vendas, destacando produtos agroecológicos', 'A 16ª Feira Nacional da Agricultura Familiar, realizada no Parque da Cidade em Brasília, encerrou com recorde de público e vendas. Mais de 150 mil visitantes passaram pelo evento durante os cinco dias, gerando negócios de R$ 25 milhões. Os produtos agroecológicos e orgânicos foram os mais procurados, representando 60% das vendas. O evento também promoveu rodadas de negócios que resultaram em contratos de fornecimento para redes de supermercados e restaurantes.', 'Mercado', 'CONAB', 'João Santos', ARRAY['Feira', 'Agricultura Familiar', 'Agroecologia', 'Vendas'], '/placeholder.svg?height=300&width=600', NOW() - INTERVAL '3 days', true),

('PAA amplia orçamento em 40% e beneficiará 200 mil famílias em 2024', 'Programa de Aquisição de Alimentos terá aumento significativo no orçamento, fortalecendo a agricultura familiar', 'O Programa de Aquisição de Alimentos (PAA) anunciou um aumento de 40% no orçamento para 2024, passando de R$ 500 milhões para R$ 700 milhões. O programa deve beneficiar mais de 200 mil famílias produtoras em todo o país, com foco especial em regiões de maior vulnerabilidade social. As modalidades de Compra com Doação Simultânea e Formação de Estoques receberão os maiores incrementos orçamentários.', 'Programas Governamentais', 'Ministério do Desenvolvimento Social', 'Assessoria MDS', ARRAY['PAA', 'Compras Públicas', 'Segurança Alimentar', 'Orçamento'], '/placeholder.svg?height=300&width=600', NOW() - INTERVAL '4 days', false),

('Certificação orgânica simplificada reduz custos para pequenos produtores', 'Novo processo de certificação participativa diminui burocracia e custos para agricultores familiares', 'O Instituto Nacional de Metrologia (INMETRO) lançou um novo modelo de certificação orgânica participativa que reduz em até 70% os custos para pequenos produtores. O sistema permite que grupos de agricultores se organizem em redes de certificação, compartilhando custos e responsabilidades. Já foram credenciadas 15 organizações de controle social em 8 estados, beneficiando mais de 3 mil produtores familiares.', 'Certificação', 'INMETRO', 'Equipe Técnica INMETRO', ARRAY['Certificação Orgânica', 'Agroecologia', 'Sustentabilidade', 'Custos'], '/placeholder.svg?height=300&width=600', NOW() - INTERVAL '5 days', false),

('Aplicativo conecta agricultores familiares a consumidores urbanos', 'Plataforma digital facilita venda direta e elimina intermediários na comercialização', 'Um novo aplicativo desenvolvido por uma cooperativa de agricultores familiares está revolucionando a venda direta de produtos rurais. A plataforma conecta produtores a consumidores urbanos, permitindo pedidos online e entrega em domicílio. Em apenas 6 meses, o app já cadastrou 200 produtores e 5 mil consumidores, movimentando R$ 2 milhões em vendas diretas.', 'Tecnologia', 'Cooperativa Digital Rural', 'Carlos Ferreira', ARRAY['Aplicativo', 'Venda Direta', 'Tecnologia', 'Cooperativismo'], '/placeholder.svg?height=300&width=600', NOW() - INTERVAL '6 days', false);

-- Inserir alguns agricultores de exemplo
INSERT INTO farmers (name, email, phone, cpf, address, city, state, postal_code, property_size, main_products, has_dap, coordinates) VALUES
('João Silva dos Santos', 'joao.silva@email.com', '(11) 98765-4321', '123.456.789-00', 'Sítio Boa Esperança, Zona Rural', 'Campinas', 'SP', '13100-000', 5.5, ARRAY['Hortaliças orgânicas', 'Milho', 'Feijão'], true, '(-47.0608, -22.9068)'),
('Maria Santos Oliveira', 'maria.santos@email.com', '(85) 91234-5678', '987.654.321-00', 'Fazenda Sol Nascente, KM 15', 'Fortaleza', 'CE', '60000-000', 3.2, ARRAY['Frutas tropicais', 'Mandioca', 'Caju'], true, '(-38.5267, -3.7319)'),
('Pedro Oliveira Costa', 'pedro.oliveira@email.com', '(51) 98765-1234', '456.789.123-00', 'Sítio Arroio Feliz, Interior', 'Porto Alegre', 'RS', '90000-000', 12.0, ARRAY['Leite', 'Queijos artesanais', 'Embutidos'], false, '(-51.2177, -30.0346)'),
('Ana Costa Ferreira', 'ana.costa@email.com', '(31) 94567-8901', '789.123.456-00', 'Chácara Primavera, Zona Rural', 'Belo Horizonte', 'MG', '30000-000', 8.3, ARRAY['Café', 'Hortaliças', 'Mel'], true, '(-43.9378, -19.9208)'),
('Carlos Ferreira Lima', 'carlos.ferreira@email.com', '(41) 93456-7890', '321.654.987-00', 'Sítio Recanto Verde, BR-277', 'Curitiba', 'PR', '80000-000', 15.7, ARRAY['Soja', 'Milho', 'Avicultura'], true, '(-49.2577, -25.4284)'),
('Luiza Pereira Santos', 'luiza.pereira@email.com', '(62) 92345-6789', '654.321.987-00', 'Fazenda Cerrado Verde, GO-060', 'Goiânia', 'GO', '74000-000', 25.0, ARRAY['Soja', 'Milho', 'Algodão'], true, '(-49.2532, -16.6864)'),
('Roberto Silva Souza', 'roberto.silva@email.com', '(84) 91234-5678', '147.258.369-00', 'Sítio Mandacaru, RN-120', 'Natal', 'RN', '59000-000', 4.8, ARRAY['Caju', 'Manga', 'Coco'], false, '(-35.2094, -5.7945)'),
('Fernanda Lima Costa', 'fernanda.lima@email.com', '(65) 98765-4321', '258.369.147-00', 'Fazenda Pantanal, MT-070', 'Cuiabá', 'MT', '78000-000', 45.2, ARRAY['Gado de corte', 'Soja', 'Milho'], true, '(-56.0966, -15.6014)');

-- Inserir dados climáticos de exemplo
INSERT INTO weather_data (location, temperature, humidity, wind_speed, weather_condition, forecast_data, recorded_at) VALUES
('São Paulo, SP', 24.5, 68, 12.3, 'Parcialmente nublado', 
'{"forecast": [{"day": "Hoje", "temp": 24, "condition": "Parcialmente nublado", "rain": 30}, {"day": "Amanhã", "temp": 22, "condition": "Chuvoso", "rain": 80}, {"day": "Ter", "temp": 20, "condition": "Chuvoso", "rain": 90}, {"day": "Qua", "temp": 23, "condition": "Nublado", "rain": 40}, {"day": "Qui", "temp": 26, "condition": "Ensolarado", "rain": 10}]}', 
NOW()),

('Campinas, SP', 26.2, 62, 8.7, 'Ensolarado',
'{"forecast": [{"day": "Hoje", "temp": 26, "condition": "Ensolarado", "rain": 10}, {"day": "Amanhã", "temp": 24, "condition": "Parcialmente nublado", "rain": 40}, {"day": "Ter", "temp": 22, "condition": "Chuvoso", "rain": 75}, {"day": "Qua", "temp": 25, "condition": "Nublado", "rain": 35}, {"day": "Qui", "temp": 28, "condition": "Ensolarado", "rain": 5}]}',
NOW()),

('Fortaleza, CE', 29.8, 75, 15.2, 'Ensolarado',
'{"forecast": [{"day": "Hoje", "temp": 30, "condition": "Ensolarado", "rain": 5}, {"day": "Amanhã", "temp": 31, "condition": "Ensolarado", "rain": 0}, {"day": "Ter", "temp": 29, "condition": "Parcialmente nublado", "rain": 20}, {"day": "Qua", "temp": 28, "condition": "Nublado", "rain": 45}, {"day": "Qui", "temp": 30, "condition": "Ensolarado", "rain": 10}]}',
NOW()),

('Porto Alegre, RS', 18.5, 80, 20.1, 'Chuvoso',
'{"forecast": [{"day": "Hoje", "temp": 18, "condition": "Chuvoso", "rain": 85}, {"day": "Amanhã", "temp": 16, "condition": "Chuvoso", "rain": 90}, {"day": "Ter", "temp": 19, "condition": "Nublado", "rain": 60}, {"day": "Qua", "temp": 22, "condition": "Parcialmente nublado", "rain": 30}, {"day": "Qui", "temp": 24, "condition": "Ensolarado", "rain": 15}]}',
NOW());
