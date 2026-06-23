import tempfile
from pathlib import Path
from unittest.mock import patch

from src.imovel import Imovel, TipoImovel, Status
from src.cadastro import salvar_imoveis, carregar_imoveis, buscar_por_tipo, buscar_por_preco


def _imoveis_exemplo():
    return [
        Imovel("Rua A, 1", TipoImovel.CASA, 300_000, 100, quartos=3),
        Imovel("Rua B, 2", TipoImovel.APARTAMENTO, 200_000, 60, quartos=2),
        Imovel("Rua C, 3", TipoImovel.TERRENO, 100_000, 250),
    ]


def test_salvar_e_carregar():
    with tempfile.TemporaryDirectory() as tmp:
        arquivo = Path(tmp) / "imoveis.json"
        with patch("src.cadastro.ARQUIVO_DADOS", arquivo):
            originais = _imoveis_exemplo()
            salvar_imoveis(originais)
            carregados = carregar_imoveis()
            assert len(carregados) == 3
            assert carregados[0].endereco == "Rua A, 1"
            assert carregados[1].tipo == TipoImovel.APARTAMENTO


def test_buscar_por_tipo():
    imoveis = _imoveis_exemplo()
    casas = buscar_por_tipo(imoveis, TipoImovel.CASA)
    assert len(casas) == 1
    assert casas[0].endereco == "Rua A, 1"


def test_buscar_por_preco():
    imoveis = _imoveis_exemplo()
    baratos = buscar_por_preco(imoveis, 150_000)
    assert len(baratos) == 1
    assert baratos[0].tipo == TipoImovel.TERRENO
