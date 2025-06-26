import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Plus, Download, Edit, Trash2, Users } from 'lucide-react'
import { toast } from 'sonner'

const statusOptions = [
  { value: 'novo', label: 'Novo', color: 'bg-blue-100 text-blue-800' },
  { value: 'contatado', label: 'Contatado', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'cliente', label: 'Cliente', color: 'bg-green-100 text-green-800' },
  { value: 'perdido', label: 'Perdido', color: 'bg-red-100 text-red-800' }
]

const plataformasOptions = [
  'Facebook',
  'Instagram',
  'Google',
  'Sites .com.br',
  'LinkedIn',
  'Outro'
]

function GerenciamentoLeads({ leads, onAdicionarLead }) {
  const [dialogAberto, setDialogAberto] = useState(false)
  const [leadEditando, setLeadEditando] = useState(null)
  const [filtroStatus, setFiltroStatus] = useState('todos')
  
  // Formulário
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [contato, setContato] = useState('')
  const [status, setStatus] = useState('novo')
  const [anotacoes, setAnotacoes] = useState('')

  const limparFormulario = () => {
    setNome('')
    setCidade('')
    setPlataforma('')
    setContato('')
    setStatus('novo')
    setAnotacoes('')
    setLeadEditando(null)
  }

  const salvarLead = () => {
    if (!nome || !cidade || !plataforma || !contato) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    const lead = {
      id: leadEditando?.id || Date.now(),
      nome,
      cidade,
      plataforma,
      contato,
      status,
      anotacoes,
      dataCriacao: leadEditando?.dataCriacao || new Date().toLocaleString('pt-BR'),
      dataAtualizacao: new Date().toLocaleString('pt-BR')
    }

    onAdicionarLead(lead)
    limparFormulario()
    setDialogAberto(false)
    toast.success(leadEditando ? 'Lead atualizado com sucesso!' : 'Lead adicionado com sucesso!')
  }

  const editarLead = (lead) => {
    setNome(lead.nome)
    setCidade(lead.cidade)
    setPlataforma(lead.plataforma)
    setContato(lead.contato)
    setStatus(lead.status)
    setAnotacoes(lead.anotacoes)
    setLeadEditando(lead)
    setDialogAberto(true)
  }

  const exportarCSV = () => {
    if (leads.length === 0) {
      toast.error('Nenhum lead para exportar')
      return
    }

    const headers = ['Nome', 'Cidade', 'Plataforma', 'Contato', 'Status', 'Anotações', 'Data Criação', 'Data Atualização']
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.nome,
        lead.cidade,
        lead.plataforma,
        lead.contato,
        lead.status,
        lead.anotacoes.replace(/,/g, ';'),
        lead.dataCriacao,
        lead.dataAtualizacao
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `leads_prospeccter_pro_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('Leads exportados com sucesso!')
  }

  const getStatusBadge = (statusValue) => {
    const statusObj = statusOptions.find(s => s.value === statusValue)
    return (
      <Badge className={statusObj?.color}>
        {statusObj?.label}
      </Badge>
    )
  }

  const leadsFiltrados = filtroStatus === 'todos' 
    ? leads 
    : leads.filter(lead => lead.status === filtroStatus)

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">
            {leadsFiltrados.length} lead(s) encontrado(s)
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportarCSV} disabled={leads.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          
          <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
            <DialogTrigger asChild>
              <Button onClick={limparFormulario}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {leadEditando ? 'Editar Lead' : 'Novo Lead'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome do lead"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      placeholder="Cidade"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plataforma">Plataforma *</Label>
                    <Select value={plataforma} onValueChange={setPlataforma}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {plataformasOptions.map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(s => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contato">Contato *</Label>
                  <Input
                    id="contato"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    placeholder="Email, telefone ou WhatsApp"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anotacoes">Anotações</Label>
                  <Textarea
                    id="anotacoes"
                    value={anotacoes}
                    onChange={(e) => setAnotacoes(e.target.value)}
                    placeholder="Observações sobre o lead..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setDialogAberto(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={salvarLead}>
                    {leadEditando ? 'Atualizar' : 'Salvar'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lista de Leads */}
      {leadsFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {leads.length === 0 ? 'Nenhum lead cadastrado' : 'Nenhum lead encontrado'}
          </h3>
          <p className="text-gray-600">
            {leads.length === 0 
              ? 'Comece adicionando seus primeiros leads encontrados.'
              : 'Tente alterar o filtro de status.'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leadsFiltrados.map(lead => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{lead.nome}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {lead.cidade} • {lead.plataforma}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(lead.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editarLead(lead)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>Contato:</strong> {lead.contato}
                </p>
                {lead.anotacoes && (
                  <p className="text-sm">
                    <strong>Anotações:</strong> {lead.anotacoes}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Criado em {lead.dataCriacao}
                  {lead.dataAtualizacao !== lead.dataCriacao && 
                    ` • Atualizado em ${lead.dataAtualizacao}`
                  }
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default GerenciamentoLeads

