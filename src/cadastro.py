import json
from pathlib import Path
from datetime import datetime

from .imovel import Imovel, TipoImovel, Status

ARQUIVO_DADOS = Path(__file__).parent.parent / "dados" / "imoveis.json"


def salvar_imoveis(imoveis: list[Imovel]):
    ARQUIVO_DADOS.parent.mkdir(parents=True, exist_ok=True)
    dados = []
    for im in imoveis:
        dados.append({
            "endereco": im.endereco,
            "tipo": im.tipo.value,
            "preco": im.preco,
            "area_m2": im.area_m2,
            "quartos": im.quartos,
            "status": im.status.value,
            "observacoes": im.observacoes,
            "data_cadastro": im.data_cadastro.isoformat(),
        })
    ARQUIVO_DADOS.write_text(json.dumps(dados, ensure_ascii=False, indent=2), encoding="utf-8")


def carregar_imoveis() -> list[Imovel]:
    if not ARQUIVO_DADOS.exists():
        return []
    dados = json.loads(ARQUIVO_DADOS.read_text(encoding="utf-8"))
    imoveis = []
    for d in dados:
        imoveis.append(Imovel(
            endereco=d["endereco"],
            tipo=TipoImovel(d["tipo"]),
            preco=d["preco"],
            area_m2=d["area_m2"],
            quartos=d["quartos"],
            status=Status(d["status"]),
            observacoes=d["observacoes"],
            data_cadastro=datetime.fromisoformat(d["data_cadastro"]),
        ))
    return imoveis


def buscar_por_tipo(imoveis: list[Imovel], tipo: TipoImovel) -> list[Imovel]:
    return [im for im in imoveis if im.tipo == tipo]


def buscar_por_preco(imoveis: list[Imovel], preco_max: float) -> list[Imovel]:
    return [im for im in imoveis if im.preco <= preco_max]
