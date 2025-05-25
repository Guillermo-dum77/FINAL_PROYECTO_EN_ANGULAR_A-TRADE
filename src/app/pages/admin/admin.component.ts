import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  newName = '';
  newPrice = 0;
  products: any[] = [];

  constructor(public marketplace: MarketplaceService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    const count = await this.marketplace.getProductCount();
    this.products = [];

    for (let i = 1; i <= count; i++) {
      const product = await this.marketplace.getProduct(i);

      this.products.push({
        ...product,
        price: parseFloat(this.marketplace.fromWei(product.price, 'ether')), // ✅ numérico
        rawPrice: product.price // original en wei, si se necesita
      });
    }
  }

  async addProduct() {
    const priceInWei = this.marketplace.toWei(this.newPrice.toString(), 'ether');
    await this.marketplace.addProduct(this.newName, priceInWei);
    this.newName = '';
    this.newPrice = 0;
    await this.loadProducts();
  }

  async buyProduct(product: any) {
    await this.marketplace.buyProduct(product.id, product.rawPrice); // ✅ usamos raw wei
    await this.loadProducts();
  }
}

