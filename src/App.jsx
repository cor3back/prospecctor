import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Search, Target, History, Users, BookOpen } from 'lucide-react'
import { Toaster } from 'sonner'
import FormProspeccao from './components/FormProspeccao'
import HistoricoBuscas from './components/HistoricoBuscas'
import GerenciamentoLeads from './components/GerenciamentoLeads'
import Tutorial from './components/Tutorial'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('prospeccao')
  const [buscas, setBuscas] = useState([])
  const [leads, setLeads] = useState([])

  const adicionarBusca = (busca) => {
    setBuscas(prev => [busca, ...prev])
  }

  const adicionarLead = (lead) => {
    setLeads(prev => [lead, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prospeccter Pro</h1>
                <p className="text-sm text-gray-600">Prospecção Inteligente de Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="prospeccao" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Prospecção
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Tutorial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prospeccao">
            <Card>
              <CardHeader>
                <CardTitle>Gerador de String de Busca</CardTitle>
                <CardDescription>
                  Configure os filtros para gerar strings de busca personalizadas e encontrar clientes potenciais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormProspeccao onAdicionarBusca={adicionarBusca} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Buscas</CardTitle>
                <CardDescription>
                  Visualize e reutilize suas buscas anteriores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HistoricoBuscas buscas={buscas} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Leads</CardTitle>
                <CardDescription>
                  Cadastre e gerencie seus leads encontrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GerenciamentoLeads leads={leads} onAdicionarLead={adicionarLead} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorial">
            <Card>
              <CardHeader>
                <CardTitle>Como Usar o Prospeccter Pro</CardTitle>
                <CardDescription>
                  Aprenda a usar todas as funcionalidades da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tutorial />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Toaster position="top-right" />
    </div>
  )
}

export default App

