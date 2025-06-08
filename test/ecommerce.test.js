const Ecommerce = artifacts.require("Ecommerce");

contract("Ecommerce", (accounts) => {
  const owner = accounts[0];
  const buyer = accounts[1];
  const anotherBuyer = accounts[2];

  let ecommerceInstance;

  beforeEach(async () => {
    ecommerceInstance = await Ecommerce.new();
  });

  // Test 1: Agregar producto
  it("debería permitir al owner agregar un producto", async () => {
    await ecommerceInstance.addProduct("Camisa", web3.utils.toWei("1", "ether"), { from: owner });
    const product = await ecommerceInstance.products(1);

    assert.equal(product.name, "Camisa", "El nombre del producto no coincide");
    assert.equal(product.price.toString(), web3.utils.toWei("1", "ether"), "El precio no coincide");
    assert.equal(product.sold, false, "El estado de vendido debería ser false");
  });

  // Test 2: Comprar producto
  it("debería permitir comprar un producto", async () => {
    await ecommerceInstance.addProduct("Zapatos", web3.utils.toWei("2", "ether"), { from: owner });
    await ecommerceInstance.buyProduct(1, { from: buyer, value: web3.utils.toWei("2", "ether") });
    const product = await ecommerceInstance.products(1);

    assert.equal(product.sold, true, "El producto debería marcarse como vendido");
  });

  // Test 3: Fondos insuficientes
  it("debería fallar si el comprador envía fondos insuficientes", async () => {
    await ecommerceInstance.addProduct("Pantalón", web3.utils.toWei("3", "ether"), { from: owner });

    try {
      await ecommerceInstance.buyProduct(1, { from: buyer, value: web3.utils.toWei("1", "ether") });
      assert.fail("La compra debería haber fallado por fondos insuficientes");
    } catch (error) {
      assert(error.message.includes("Fondos insuficientes") || error.message.includes("insufficient"), "Se esperaba un error por fondos insuficientes");
    }
  });

  // Test 4: Producto vendido - No comprar
  it("no debería permitir comprar un producto ya vendido", async () => {
    await ecommerceInstance.addProduct("Gorra", web3.utils.toWei("0.5", "ether"), { from: owner });
    await ecommerceInstance.buyProduct(1, { from: buyer, value: web3.utils.toWei("0.5", "ether") });

    try {
      await ecommerceInstance.buyProduct(1, { from: anotherBuyer, value: web3.utils.toWei("0.5", "ether") });
      assert.fail("No se debería poder comprar un producto ya vendido");
    } catch (error) {
      assert(error.message.includes("Producto ya vendido") || error.message.includes("vendido"), "Se esperaba un error por producto ya vendido");
    }
  });
});
