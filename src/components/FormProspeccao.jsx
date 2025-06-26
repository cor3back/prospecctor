import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Copy, ExternalLink, Save, Wand2 } from 'lucide-react'
import { toast } from 'sonner'

const tiposNegocio = [
  'Advogado',
  'Clínica estética',
  'Consultório odontológico',
  'Salão de beleza',
  'Provedor de internet',
  'Coach',
  'Loja de roupas',
  'Restaurante',
  'Arquiteto',
  'Contador',
  'Terapeuta',
  'Personal trainer',
  'Outro'
]

const servicosNecessarios = [
  'Identidade visual',
  'Criação de site',
  'Rebranding',
  'Social Media Kit',
  'Branding',
  'Novo logotipo',
  'Landing page'
]

const plataformasBusca = [
  { id: 'facebook', label: 'Facebook', site: 'site:facebook.com' },
  { id: 'instagram', label: 'Instagram', site: 'site:instagram.com' },
  { id: 'google', label: 'Google', site: '' },
  { id: 'sites-br', label: 'Sites com .com.br', site: 'site:.com.br' },
  { id: 'linkedin', label: 'LinkedIn', site: 'site:linkedin.com' }
]

function FormProspeccao({ onAdicionarBusca }) {
  const [tipoNegocio, setTipoNegocio] = useState('')
  const [tipoNegocioOutro, setTipoNegocioOutro] = useState('')
  const [servicosSelecionados, setServicosSelecionados] = useState([])
  const [cidade, setCidade] = useState('')
  const [plataformasSelecionadas, setPlataformasSelecionadas] = useState([])
  const [stringGerada, setStringGerada] = useState('')

  const handleServicoChange = (servico, checked) => {
    if (checked) {
      setServicosSelecionados(prev => [...prev, servico])
    } else {
      setServicosSelecionados(prev => prev.filter(s => s !== servico))
    }
  }

  const handlePlataformaChange = (plataforma, checked) => {
    if (checked) {
      setPlataformasSelecionadas(prev => [...prev, plataforma])
    } else {
      setPlataformasSelecionadas(prev => prev.filter(p => p.id !== plataforma.id))
    }
  }

  const gerarString = () => {
    if (!tipoNegocio || plataformasSelecionadas.length === 0) {
      toast.error('Preencha pelo menos o tipo de negócio e uma plataforma')
      return
    }

    const negocio = tipoNegocio === 'Outro' ? tipoNegocioOutro : tipoNegocio
    const strings = []

    plataformasSelecionadas.forEach(plataforma => {
      let string = ''
      
      if (plataforma.site) {
        string += plataforma.site + ' '
      }

      // Termo principal de busca
      if (cidade) {
        string += `"${negocio.toLowerCase()} em ${cidade}"`
      } else {
        string += `"${negocio.toLowerCase()}"`
      }

      // Adicionar termos de contato
      if (plataforma.id === 'sites-br') {
        string += ' ("desenvolvido por wix" OR "em construção")'
      } else {
        string += ' ("contato" OR "email" OR "WhatsApp")'
      }

      // Adicionar serviços se selecionados
      if (servicosSelecionados.length > 0) {
        const servicosString = servicosSelecionados.map(s => `"${s.toLowerCase()}"`).join(' OR ')
        string += ` (${servicosString})`
      }

      strings.push(string)
    })

    const stringFinal = strings.join('\n\n')
    setStringGerada(stringFinal)

    // Adicionar ao histórico
    const busca = {
      id: Date.now(),
      data: new Date().toLocaleString('pt-BR'),
      tipoNegocio: negocio,
      servicos: servicosSelecionados,
      cidade,
      plataformas: plataformasSelecionadas.map(p => p.label),
      string: stringFinal
    }
    
    onAdicionarBusca(busca)
    toast.success('String de busca gerada com sucesso!')
  }

  const copiarString = () => {
    navigator.clipboard.writeText(stringGerada)
    toast.success('String copiada para a área de transferência!')
  }

  const abrirNoGoogle = () => {
    const primeiraString = stringGerada.split('\n\n')[0]
    const url = `https://www.google.com/search?q=${encodeURIComponent(primeiraString)}`
    window.open(url, '_blank')
  }

  const salvarBusca = () => {
    // Esta funcionalidade será implementada na próxima fase
    toast.success('Busca salva com sucesso!')
  }

  return (
    <div className="space-y-6">
      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tipo de Negócio */}
        <div className="space-y-2">
          <Label htmlFor="tipo-negocio">Tipo de Negócio</Label>
          <Select value={tipoNegocio} onValueChange={setTipoNegocio}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de negócio" />
            </SelectTrigger>
            <SelectContent>
              {tiposNegocio.map(tipo => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {tipoNegocio === 'Outro' && (
            <Input
              placeholder="Digite o tipo de negócio"
              value={tipoNegocioOutro}
              onChange={(e) => setTipoNegocioOutro(e.target.value)}
            />
          )}
        </div>

        {/* Cidade */}
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade ou Região</Label>
          <Input
            id="cidade"
            placeholder="Ex: Campos dos Goytacazes, São Paulo..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
      </div>

      {/* Serviços Necessários */}
      <div className="space-y-3">
        <Label>Serviços Necessários (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {servicosNecessarios.map(servico => (
            <div key={servico} className="flex items-center space-x-2">
              <Checkbox
                id={servico}
                checked={servicosSelecionados.includes(servico)}
                onCheckedChange={(checked) => handleServicoChange(servico, checked)}
              />
              <Label htmlFor={servico} className="text-sm">{servico}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Plataformas de Busca */}
      <div className="space-y-3">
        <Label>Plataformas de Busca</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {plataformasBusca.map(plataforma => (
            <div key={plataforma.id} className="flex items-center space-x-2">
              <Checkbox
                id={plataforma.id}
                checked={plataformasSelecionadas.some(p => p.id === plataforma.id)}
                onCheckedChange={(checked) => handlePlataformaChange(plataforma, checked)}
              />
              <Label htmlFor={plataforma.id} className="text-sm">{plataforma.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Botão Gerar */}
      <div className="flex justify-center">
        <Button onClick={gerarString} size="lg" className="w-full md:w-auto">
          <Wand2 className="w-4 h-4 mr-2" />
          Gerar String de Busca
        </Button>
      </div>

      {/* Resultado */}
      {stringGerada && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>String de Busca Gerada</Label>
              <Textarea
                value={stringGerada}
                readOnly
                className="min-h-[120px] font-mono text-sm"
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={copiarString} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar String
                </Button>
                <Button onClick={abrirNoGoogle} variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir no Google
                </Button>
                <Button onClick={salvarBusca} variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar para Depois
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default FormProspeccao

