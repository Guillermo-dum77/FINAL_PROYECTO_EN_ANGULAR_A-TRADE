import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import contractData from '../../assets/contract-config.json';
import Web3 from 'web3';
import { toWei, fromWei } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private contract: any;

  constructor(private web3Service: Web3Service) {
    this.initContract();
  }

  private async initContract(): Promise<void> {
    const web3: Web3 = this.web3Service.web3;
    this.contract = new web3.eth.Contract(
      contractData.abi,
      contractData.address
    );
  }

  async getProductCount(): Promise<number> {
    return await this.contract.methods.productCount().call();
  }

  async getProduct(id: number): Promise<any> {
    return await this.contract.methods.products(id).call();
  }

  async addProduct(name: string, priceInWei: string): Promise<void> {
    const account = await this.web3Service.getCurrentAccount();
    await this.contract.methods.addProduct(name, priceInWei).send({ from: account });
  }

  async buyProduct(id: number, priceInWei: string): Promise<void> {
    const account = await this.web3Service.getCurrentAccount();
    await this.contract.methods.buyProduct(id).send({ from: account, value: priceInWei });
  }

  toWei(value: string, unit: 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether' = 'ether'): string {
    return toWei(value, unit);
  }

  fromWei(value: string, unit: 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether' = 'ether'): string {
    return fromWei(value, unit);
  }
}


