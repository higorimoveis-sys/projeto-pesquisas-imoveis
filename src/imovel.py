from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class Status(Enum):
    DISPONIVEL = "disponível"
    CAPTADO = "captado"
    VISITADO = "visitado"
    NEGOCIANDO = "negociando"
    FECHADO = "fechado"


class TipoImovel(Enum):
    CASA = "casa"
    APARTAMENTO = "apartamento"
    TERRENO = "terreno"
    COMERCIAL = "comercial"


@dataclass
class Imovel:
    endereco: str
    tipo: TipoImovel
    preco: float
    area_m2: float
    quartos: int = 0
    status: Status = Status.DISPONIVEL
    observacoes: str = ""
    data_cadastro: datetime = field(default_factory=datetime.now)

    def atualizar_status(self, novo_status: Status):
        self.status = novo_status

    def resumo(self) -> str:
        return (
            f"{self.tipo.value.title()} - {self.endereco}\n"
            f"Preço: R$ {self.preco:,.2f} | Área: {self.area_m2}m² | Quartos: {self.quartos}\n"
            f"Status: {self.status.value} | Cadastro: {self.data_cadastro:%d/%m/%Y}"
        )
