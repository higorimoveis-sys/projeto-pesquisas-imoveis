const Status = {
  DISPONIVEL: "disponível",
  CAPTADO: "captado",
  VISITADO: "visitado",
  NEGOCIANDO: "negociando",
  FECHADO: "fechado",
};

const TipoImovel = {
  CASA: "casa",
  APARTAMENTO: "apartamento",
  TERRENO: "terreno",
  COMERCIAL: "comercial",
};

class Imovel {
  constructor({ endereco, tipo, preco, areaM2, quartos = 0, status = Status.DISPONIVEL, observacoes = "" }) {
    this.endereco = endereco;
    this.tipo = tipo;
    this.preco = preco;
    this.areaM2 = areaM2;
    this.quartos = quartos;
    this.status = status;
    this.observacoes = observacoes;
    this.dataCadastro = new Date();
  }

  atualizarStatus(novoStatus) {
    this.status = novoStatus;
  }

  resumo() {
    const tipo = this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1);
    const preco = this.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const data = this.dataCadastro.toLocaleDateString("pt-BR");
    return `${tipo} - ${this.endereco}\nPreço: ${preco} | Área: ${this.areaM2}m² | Quartos: ${this.quartos}\nStatus: ${this.status} | Cadastro: ${data}`;
  }
}

module.exports = { Imovel, Status, TipoImovel };
