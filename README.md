# Prospeccter Pro

**Prospecção Inteligente de Clientes através de Buscas Avançadas no Google**

## 📋 Sobre o Projeto

O Prospeccter Pro é um aplicativo web desenvolvido para freelancers e agências criativas que precisam encontrar clientes potenciais de forma eficiente. A ferramenta gera automaticamente strings de busca otimizadas para o Google, permitindo encontrar prospects específicos em diferentes plataformas digitais.

## ✨ Funcionalidades Principais

### 🎯 Geração de String de Busca
- **Tipo de Negócio**: 12+ categorias pré-definidas + opção personalizada
- **Localização**: Filtro por cidade ou região
- **Serviços**: 7 tipos de serviços criativos (identidade visual, sites, etc.)
- **Plataformas**: Facebook, Instagram, Google, Sites .com.br, LinkedIn

### 📊 Histórico de Buscas
- Armazenamento automático de todas as buscas realizadas
- Filtro por tipo de negócio, cidade ou plataforma
- Reutilização de buscas anteriores
- Botões para copiar strings e abrir no Google

### 👥 Gerenciamento de Leads
- Cadastro manual de leads encontrados
- Campos: Nome, Cidade, Plataforma, Contato, Status, Anotações
- Status: Novo, Contatado, Cliente, Perdido
- Exportação em formato CSV
- Filtros por status

### 📚 Tutorial Interativo
- Guia passo a passo de como usar a plataforma
- Dicas avançadas de prospecção
- Exemplos práticos de strings eficazes
- Orientações sobre práticas éticas

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20.18.0+
- pnpm

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd prospeccter-pro

# Instale as dependências
pnpm install

# Execute o servidor de desenvolvimento
pnpm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção
```bash
# Gerar build de produção
pnpm run build

# Preview do build
pnpm run preview
```

## 📱 Responsividade

O aplicativo foi desenvolvido com abordagem **mobile-first** e é totalmente responsivo, funcionando perfeitamente em:
- 📱 Smartphones (375px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🎨 Design System

### Paleta de Cores
- **Primary**: Roxo escuro (#5F27CD)
- **Background**: Branco e cinza claro
- **Accent**: Variações de roxo
- **Status Colors**: Verde (sucesso), Amarelo (atenção), Vermelho (erro)

### Tipografia
- Fonte sans-serif moderna e legível
- Hierarquia clara de tamanhos
- Contraste otimizado para acessibilidade

## 📖 Como Usar

### 1. Configurar Filtros
1. Selecione o **tipo de negócio** que deseja prospectar
2. Digite a **cidade ou região** (opcional)
3. Marque os **serviços** que você oferece (opcional)
4. Escolha as **plataformas** onde deseja buscar

### 2. Gerar String
1. Clique em **"Gerar String de Busca"**
2. O sistema criará strings otimizadas para cada plataforma
3. Use os botões para **copiar** ou **abrir no Google**

### 3. Gerenciar Leads
1. Vá para a aba **"Leads"**
2. Clique em **"Novo Lead"** para cadastrar prospects
3. Acompanhe o status de cada lead
4. Exporte dados em CSV quando necessário

### 4. Consultar Histórico
1. Acesse a aba **"Histórico"**
2. Visualize todas as buscas realizadas
3. Use o filtro para encontrar buscas específicas
4. Reutilize strings anteriores

## 🔍 Exemplos de Strings Geradas

### Facebook
```
site:facebook.com "advogado em São Paulo" ("contato" OR "email" OR "WhatsApp")
```

### Instagram
```
site:instagram.com "clínica estética Rio de Janeiro" ("email" OR "contato")
```

### Sites .com.br
```
site:.com.br "desenvolvido por wix" OR "em construção"
```

## ⚖️ Práticas Éticas

O Prospeccter Pro promove práticas éticas de prospecção:
- ✅ Apresentação profissional
- ✅ Transparência sobre como encontrou o contato
- ✅ Oferta de valor real
- ✅ Respeito à privacidade
- ❌ Evitar spam ou contatos excessivos

## 📁 Estrutura do Projeto

```
prospeccter-pro/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── FormProspeccao.jsx
│   │   ├── HistoricoBuscas.jsx
│   │   ├── GerenciamentoLeads.jsx
│   │   └── Tutorial.jsx
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos globais
│   └── main.jsx             # Ponto de entrada
├── package.json
└── README.md
```

## 🤝 Contribuição

Este projeto foi desenvolvido como uma solução completa para prospecção inteligente. Para melhorias ou sugestões, entre em contato.

## 📄 Licença

Projeto desenvolvido para fins demonstrativos e educacionais.

---

**Prospeccter Pro** - Transformando a forma como você encontra seus próximos clientes! 🚀

