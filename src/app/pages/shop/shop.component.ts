import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  products: any[] = [];

  constructor(public marketplace: MarketplaceService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    const count = await this.marketplace.getProductCount();
    const loaded: any[] = [];

    for (let i = 1; i <= count; i++) {
      const product = await this.marketplace.getProduct(i);
      if (!product.sold) {
        loaded.push({
          ...product,
          price: parseFloat(this.marketplace.fromWei(product.price, 'ether')), // numérico
          rawPrice: product.price
        });
      }
    }

    this.products = loaded;
  }

  async buyProduct(product: any) {
    await this.marketplace.buyProduct(product.id, product.rawPrice);
    await this.loadProducts();
  }
}








