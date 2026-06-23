const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { Imovel, TipoImovel } = require("../src/imovel");
const cadastro = require("../src/cadastro");

function criarExemplos() {
  return [
    new Imovel({ endereco: "Rua A, 1", tipo: TipoImovel.CASA, preco: 300000, areaM2: 100, quartos: 3 }),
    new Imovel({ endereco: "Rua B, 2", tipo: TipoImovel.APARTAMENTO, preco: 200000, areaM2: 60, quartos: 2 }),
    new Imovel({ endereco: "Rua C, 3", tipo: TipoImovel.TERRENO, preco: 100000, areaM2: 250 }),
  ];
}

describe("Cadastro", () => {
  it("deve buscar por tipo", () => {
    const imoveis = criarExemplos();
    const casas = cadastro.buscarPorTipo(imoveis, TipoImovel.CASA);
    assert.strictEqual(casas.length, 1);
    assert.strictEqual(casas[0].endereco, "Rua A, 1");
  });

  it("deve buscar por preço máximo", () => {
    const imoveis = criarExemplos();
    const baratos = cadastro.buscarPorPreco(imoveis, 150000);
    assert.strictEqual(baratos.length, 1);
    assert.strictEqual(baratos[0].tipo, TipoImovel.TERRENO);
  });
});
