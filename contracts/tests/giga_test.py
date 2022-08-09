import pytest

INITIAL_SUPPLY = 1e5
DECIMALS = 18


@pytest.fixture
def giga_contract(GigaNFT, accounts):
    # deploy the contract with the initial value as a constructor argument
    yield GigaNFT.deploy({'from': accounts[0]})


@pytest.fixture
def zorang_contract(Zorang, accounts):
    # deploy the contract with the initial value as a constructor argument
    yield Zorang.deploy("Zorang", "ZRG", DECIMALS, INITIAL_SUPPLY, {'from': accounts[0]})


def test_initial_state(zorang_contract, accounts):
    # Check if the constructor of the contract is set up properly
    assert zorang_contract.totalSupply() == INITIAL_SUPPLY * 10 ** DECIMALS
    assert zorang_contract.balanceOf(
        accounts[0]) == INITIAL_SUPPLY * 10 ** DECIMALS


def test_mint(giga_contract, zorang_contract, accounts):
    giga_contract.setZorang(zorang_contract, {'from': accounts[0]})
    zorang_contract.approve(giga_contract, 1e69, {'from': accounts[0]})
    assert giga_contract.zorang() == zorang_contract
    x = [i for i in range(11)]
    y = [x for i in range(8)]
    giga_contract.mint(accounts[0],  1, y, "", {'from': accounts[0]})
    y1 = giga_contract.channelsOf(1)
    y = [tuple(yy) for yy in y]
    assert tuple(y) == y1[0]
