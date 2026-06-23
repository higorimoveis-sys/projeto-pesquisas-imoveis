const { describe, it } = require("node:test");
const assert = require("node:assert");
const { Imovel, TipoImovel, Status } = require("../src/imovel");

describe("Imovel", () => {
  it("deve criar um imóvel com valores padrão", () => {
    const im = new Imovel({
      endereco: "Rua das Flores, 123",
      tipo: TipoImovel.CASA,
      preco: 350000,
      areaM2: 120,
      quartos: 3,
    });
    assert.strictEqual(im.endereco, "Rua das Flores, 123");
    assert.strictEqual(im.tipo, TipoImovel.CASA);
    assert.strictEqual(im.status, Status.DISPONIVEL);
  });

  it("deve atualizar o status", () => {
    const im = new Imovel({
      endereco: "Av. Brasil, 456",
      tipo: TipoImovel.APARTAMENTO,
      preco: 280000,
      areaM2: 65,
      quartos: 2,
    });
    im.atualizarStatus(Status.CAPTADO);
    assert.strictEqual(im.status, Status.CAPTADO);
  });

  it("deve gerar resumo com informações corretas", () => {
    const im = new Imovel({
      endereco: "Rua A, 10",
      tipo: TipoImovel.TERRENO,
      preco: 150000,
      areaM2: 300,
    });
    const resumo = im.resumo();
    assert.ok(resumo.includes("Terreno"));
    assert.ok(resumo.includes("R$"));
    assert.ok(resumo.includes("300"));
  });
});
