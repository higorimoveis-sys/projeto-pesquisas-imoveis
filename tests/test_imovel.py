from src.imovel import Imovel, TipoImovel, Status


def test_criar_imovel():
    im = Imovel(
        endereco="Rua das Flores, 123",
        tipo=TipoImovel.CASA,
        preco=350_000,
        area_m2=120,
        quartos=3,
    )
    assert im.endereco == "Rua das Flores, 123"
    assert im.tipo == TipoImovel.CASA
    assert im.status == Status.DISPONIVEL


def test_atualizar_status():
    im = Imovel(
        endereco="Av. Brasil, 456",
        tipo=TipoImovel.APARTAMENTO,
        preco=280_000,
        area_m2=65,
        quartos=2,
    )
    im.atualizar_status(Status.CAPTADO)
    assert im.status == Status.CAPTADO


def test_resumo():
    im = Imovel(
        endereco="Rua A, 10",
        tipo=TipoImovel.TERRENO,
        preco=150_000,
        area_m2=300,
    )
    resumo = im.resumo()
    assert "Terreno" in resumo
    assert "R$" in resumo
    assert "300" in resumo
