const fs = require("fs");
const path = require("path");
const { Imovel } = require("./imovel");

const ARQUIVO_DADOS = path.join(__dirname, "..", "dados", "imoveis.json");

function salvarImoveis(imoveis) {
  const dir = path.dirname(ARQUIVO_DADOS);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const dados = imoveis.map((im) => ({
    endereco: im.endereco,
    tipo: im.tipo,
    preco: im.preco,
    areaM2: im.areaM2,
    quartos: im.quartos,
    status: im.status,
    observacoes: im.observacoes,
    dataCadastro: im.dataCadastro.toISOString(),
  }));
  fs.writeFileSync(ARQUIVO_DADOS, JSON.stringify(dados, null, 2), "utf-8");
}

function carregarImoveis() {
  if (!fs.existsSync(ARQUIVO_DADOS)) {
    return [];
  }
  const dados = JSON.parse(fs.readFileSync(ARQUIVO_DADOS, "utf-8"));
  return dados.map((d) => {
    const im = new Imovel(d);
    im.dataCadastro = new Date(d.dataCadastro);
    return im;
  });
}

function buscarPorTipo(imoveis, tipo) {
  return imoveis.filter((im) => im.tipo === tipo);
}

function buscarPorPreco(imoveis, precoMax) {
  return imoveis.filter((im) => im.preco <= precoMax);
}

module.exports = { salvarImoveis, carregarImoveis, buscarPorTipo, buscarPorPreco };
