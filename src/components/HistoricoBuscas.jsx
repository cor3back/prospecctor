import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Copy, ExternalLink, Search, Trash2, Edit } from 'lucide-react'
import { toast } from 'sonner'

function HistoricoBuscas({ buscas }) {
  const [filtro, setFiltro] = useState('')
  const [buscaEditando, setBuscaEditando] = useState(null)

  const buscasFiltradas = buscas.filter(busca => 
    busca.tipoNegocio.toLowerCase().includes(filtro.toLowerCase()) ||
    busca.cidade?.toLowerCase().includes(filtro.toLowerCase()) ||
    busca.plataformas.some(p => p.toLowerCase().includes(filtro.toLowerCase()))
  )

  const copiarString = (string) => {
    navigator.clipboard.writeText(string)
    toast.success('String copiada para a área de transferência!')
  }

  const abrirNoGoogle = (string) => {
    const primeiraString = string.split('\n\n')[0]
    const url = `https://www.google.com/search?q=${encodeURIComponent(primeiraString)}`
    window.open(url, '_blank')
  }

  const editarBusca = (busca) => {
    setBuscaEditando(busca)
  }

  const salvarEdicao = () => {
    // Esta funcionalidade será implementada quando tivermos persistência
    setBuscaEditando(null)
    toast.success('Busca atualizada com sucesso!')
  }

  if (buscas.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma busca realizada</h3>
        <p className="text-gray-600">Suas buscas aparecerão aqui após serem geradas na aba Prospecção.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtro */}
      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="Filtrar por tipo de negócio, cidade ou plataforma..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Lista de Buscas */}
      <div className="space-y-4">
        {buscasFiltradas.map(busca => (
          <Card key={busca.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{busca.tipoNegocio}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {busca.cidade && `${busca.cidade} • `}
                    {busca.data}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editarBusca(busca)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {busca.plataformas.map(plataforma => (
                  <Badge key={plataforma} variant="secondary">
                    {plataforma}
                  </Badge>
                ))}
                {busca.servicos.map(servico => (
                  <Badge key={servico} variant="outline">
                    {servico}
                  </Badge>
                ))}
              </div>

              {/* String de Busca */}
              <div className="space-y-2">
                <Textarea
                  value={busca.string}
                  readOnly
                  className="min-h-[80px] font-mono text-sm bg-gray-50"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copiarString(busca.string)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => abrirNoGoogle(busca.string)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir no Google
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {buscasFiltradas.length === 0 && filtro && (
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhuma busca encontrada com o filtro "{filtro}"</p>
        </div>
      )}
    </div>
  )
}

export default HistoricoBuscas

