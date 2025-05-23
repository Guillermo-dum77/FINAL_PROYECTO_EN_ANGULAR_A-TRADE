// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ECommerce {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool sold;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductAdded(uint id, string name, uint price, address seller);
    event ProductSold(uint id, address buyer);

    function addProduct(string memory _name, uint _price) public {
        require(_price > 0, "El precio debe ser mayor que cero");
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);
        emit ProductAdded(productCount, _name, _price, msg.sender);
    }

    function buyProduct(uint _id) public payable {
        Product storage product = products[_id];
        require(_id > 0 && _id <= productCount, "Producto no existe");
	    require(msg.value >= product.price, "Fondos insuficientes");
        require(!product.sold, "Producto ya vendido");

        product.seller.transfer(msg.value);
        product.sold = true;

        emit ProductSold(_id, msg.sender);
    }
}
