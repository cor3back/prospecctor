import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Search, 
  Target, 
  Copy, 
  ExternalLink, 
  Users, 
  Lightbulb, 
  CheckCircle,
  ArrowRight,
  AlertTriangle
} from 'lucide-react'

function Tutorial() {
  const [passoAtual, setPassoAtual] = useState(0)

  const passos = [
    {
      titulo: "1. Preencha os Filtros",
      icone: <Target className="w-6 h-6" />,
      conteudo: (
        <div className="space-y-4">
          <p>Configure os filtros de busca para encontrar seus clientes ideais:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span><strong>Tipo de Negócio:</strong> Selecione o segmento que você quer prospectar</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span><strong>Cidade:</strong> Defina a localização geográfica (opcional)</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span><strong>Serviços:</strong> Marque os serviços que você oferece (opcional)</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span><strong>Plataformas:</strong> Escolha onde buscar (Facebook, Instagram, etc.)</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      titulo: "2. Gere a String",
      icone: <Search className="w-6 h-6" />,
      conteudo: (
        <div className="space-y-4">
          <p>Clique em "Gerar String de Busca" para criar automaticamente as consultas otimizadas.</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-mono">
              Exemplo: site:facebook.com "advogado em São Paulo" ("contato" OR "email" OR "WhatsApp")
            </p>
          </div>
          <p className="text-sm text-gray-600">
            O sistema criará strings específicas para cada plataforma selecionada, otimizadas para encontrar informações de contato.
          </p>
        </div>
      )
    },
    {
      titulo: "3. Copie ou Abra no Google",
      icone: <Copy className="w-6 h-6" />,
      conteudo: (
        <div className="space-y-4">
          <p>Use os botões para facilitar sua busca:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Copy className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Copiar String</h4>
                <p className="text-sm text-gray-600">Copia a string para usar em qualquer lugar</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ExternalLink className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Abrir no Google</h4>
                <p className="text-sm text-gray-600">Abre diretamente a busca no Google</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      titulo: "4. Entre em Contato com Ética",
      icone: <Users className="w-6 h-6" />,
      conteudo: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Importante: Práticas Éticas</h4>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• Sempre se apresente de forma profissional</li>
                  <li>• Explique como encontrou o contato</li>
                  <li>• Ofereça valor real antes de vender</li>
                  <li>• Respeite a privacidade e preferências do cliente</li>
                  <li>• Não faça spam ou contatos excessivos</li>
                </ul>
              </div>
            </div>
          </div>
          <p>Cadastre os leads encontrados na aba "Leads" para organizar seu funil de vendas.</p>
        </div>
      )
    }
  ]

  const dicas = [
    {
      titulo: "Sites em Construção",
      conteudo: "Use termos como 'em construção' ou 'desenvolvido por wix' para encontrar sites que precisam de atualização.",
      icone: <Lightbulb className="w-5 h-5 text-yellow-500" />
    },
    {
      titulo: "Combine Termos",
      conteudo: "Misture diferentes tipos de negócio e serviços para encontrar nichos específicos.",
      icone: <Target className="w-5 h-5 text-blue-500" />
    },
    {
      titulo: "Varie as Plataformas",
      conteudo: "Cada plataforma tem características únicas. Instagram é visual, LinkedIn é profissional.",
      icone: <Search className="w-5 h-5 text-green-500" />
    },
    {
      titulo: "Salve Tudo",
      conteudo: "Use o histórico e o gerenciamento de leads para não perder nenhuma oportunidade.",
      icone: <Users className="w-5 h-5 text-purple-500" />
    }
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="passo-a-passo" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="passo-a-passo">Passo a Passo</TabsTrigger>
          <TabsTrigger value="dicas">Dicas Avançadas</TabsTrigger>
        </TabsList>

        <TabsContent value="passo-a-passo" className="space-y-6">
          {/* Navegação dos Passos */}
          <div className="flex justify-center space-x-2 mb-6">
            {passos.map((_, index) => (
              <Button
                key={index}
                variant={passoAtual === index ? "default" : "outline"}
                size="sm"
                onClick={() => setPassoAtual(index)}
                className="w-10 h-10 rounded-full p-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {/* Conteúdo do Passo Atual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                {passos[passoAtual].icone}
                <span>{passos[passoAtual].titulo}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {passos[passoAtual].conteudo}
            </CardContent>
          </Card>

          {/* Navegação */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setPassoAtual(Math.max(0, passoAtual - 1))}
              disabled={passoAtual === 0}
            >
              Anterior
            </Button>
            <Button
              onClick={() => setPassoAtual(Math.min(passos.length - 1, passoAtual + 1))}
              disabled={passoAtual === passos.length - 1}
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="dicas" className="space-y-4">
          <div className="grid gap-4">
            {dicas.map((dica, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    {dica.icone}
                    <div>
                      <h3 className="font-medium mb-2">{dica.titulo}</h3>
                      <p className="text-sm text-gray-600">{dica.conteudo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Exemplos de Strings */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Strings Eficazes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2">Facebook</Badge>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                    site:facebook.com "clínica estética São Paulo" ("contato" OR "email" OR "WhatsApp")
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Sites .com.br</Badge>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                    site:.com.br "desenvolvido por wix" OR "em construção"
                  </p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Instagram</Badge>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                    site:instagram.com "personal trainer Rio de Janeiro" ("email" OR "contato")
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Tutorial

