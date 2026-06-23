const readline = require("readline");
const { Imovel, TipoImovel, Status } = require("./imovel");
const { salvarImoveis, carregarImoveis, buscarPorTipo, buscarPorPreco } = require("./cadastro");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function perguntar(pergunta) {
  return new Promise((resolve) => rl.question(pergunta, resolve));
}

function exibirMenu() {
  console.log("\n========================================");
  console.log("   SISTEMA DE PESQUISA DE IMÓVEIS");
  console.log("========================================");
  console.log("1. Cadastrar imóvel");
  console.log("2. Listar todos os imóveis");
  console.log("3. Buscar por tipo");
  console.log("4. Buscar por preço máximo");
  console.log("5. Atualizar status de um imóvel");
  console.log("6. Sair");
  console.log("----------------------------------------");
}

async function cadastrar(imoveis) {
  console.log("\n--- Novo Imóvel ---");
  const endereco = await perguntar("Endereço: ");

  console.log("Tipos: 1-Casa  2-Apartamento  3-Terreno  4-Comercial");
  const tipoOpcao = await perguntar("Tipo (1-4): ");
  const tipos = [TipoImovel.CASA, TipoImovel.APARTAMENTO, TipoImovel.TERRENO, TipoImovel.COMERCIAL];
  const tipo = tipos[parseInt(tipoOpcao) - 1];
  if (!tipo) {
    console.log("Tipo inválido.");
    return;
  }

  const preco = parseFloat(await perguntar("Preço (R$): "));
  if (isNaN(preco)) {
    console.log("Preço inválido.");
    return;
  }

  const areaM2 = parseFloat(await perguntar("Área (m²): "));
  if (isNaN(areaM2)) {
    console.log("Área inválida.");
    return;
  }

  const quartos = parseInt(await perguntar("Quartos: ")) || 0;
  const observacoes = await perguntar("Observações: ");

  const imovel = new Imovel({ endereco, tipo, preco, areaM2, quartos, observacoes });
  imoveis.push(imovel);
  salvarImoveis(imoveis);
  console.log("\nImóvel cadastrado com sucesso!");
}

function listarTodos(imoveis) {
  if (imoveis.length === 0) {
    console.log("\nNenhum imóvel cadastrado.");
    return;
  }
  console.log(`\n--- ${imoveis.length} imóvel(is) cadastrado(s) ---`);
  imoveis.forEach((im, i) => {
    console.log(`\n[${i + 1}]`);
    console.log(im.resumo());
  });
}

async function buscarTipo(imoveis) {
  console.log("Tipos: 1-Casa  2-Apartamento  3-Terreno  4-Comercial");
  const opcao = await perguntar("Tipo (1-4): ");
  const tipos = [TipoImovel.CASA, TipoImovel.APARTAMENTO, TipoImovel.TERRENO, TipoImovel.COMERCIAL];
  const tipo = tipos[parseInt(opcao) - 1];
  if (!tipo) {
    console.log("Tipo inválido.");
    return;
  }
  const resultado = buscarPorTipo(imoveis, tipo);
  if (resultado.length === 0) {
    console.log("Nenhum imóvel encontrado.");
    return;
  }
  resultado.forEach((im) => console.log("\n" + im.resumo()));
}

async function buscarPreco(imoveis) {
  const max = parseFloat(await perguntar("Preço máximo (R$): "));
  if (isNaN(max)) {
    console.log("Valor inválido.");
    return;
  }
  const resultado = buscarPorPreco(imoveis, max);
  if (resultado.length === 0) {
    console.log("Nenhum imóvel encontrado nessa faixa.");
    return;
  }
  console.log(`\n${resultado.length} imóvel(is) até R$ ${max.toLocaleString("pt-BR")}:`);
  resultado.forEach((im) => console.log("\n" + im.resumo()));
}

async function atualizarStatus(imoveis) {
  if (imoveis.length === 0) {
    console.log("\nNenhum imóvel cadastrado.");
    return;
  }
  listarTodos(imoveis);
  const num = parseInt(await perguntar("\nNúmero do imóvel: "));
  if (isNaN(num) || num < 1 || num > imoveis.length) {
    console.log("Número inválido.");
    return;
  }

  console.log("Status: 1-Disponível  2-Captado  3-Visitado  4-Negociando  5-Fechado");
  const opcao = await perguntar("Novo status (1-5): ");
  const statuses = [Status.DISPONIVEL, Status.CAPTADO, Status.VISITADO, Status.NEGOCIANDO, Status.FECHADO];
  const novoStatus = statuses[parseInt(opcao) - 1];
  if (!novoStatus) {
    console.log("Status inválido.");
    return;
  }

  imoveis[num - 1].atualizarStatus(novoStatus);
  salvarImoveis(imoveis);
  console.log("Status atualizado!");
}

async function main() {
  let imoveis = carregarImoveis();
  console.log(`Carregados ${imoveis.length} imóvel(is) do banco de dados.`);

  let rodando = true;
  while (rodando) {
    exibirMenu();
    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao.trim()) {
      case "1": await cadastrar(imoveis); break;
      case "2": listarTodos(imoveis); break;
      case "3": await buscarTipo(imoveis); break;
      case "4": await buscarPreco(imoveis); break;
      case "5": await atualizarStatus(imoveis); break;
      case "6":
        console.log("\nAté logo!");
        rodando = false;
        break;
      default:
        console.log("Opção inválida.");
    }
  }

  rl.close();
}

main();
