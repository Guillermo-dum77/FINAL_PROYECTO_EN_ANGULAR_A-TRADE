import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { toWei, fromWei } from 'web3-utils';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  public web3: Web3;

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      alert('MetaMask no está instalada. Instálala para usar esta DApp.');
      throw new Error('MetaMask no detectada');
    }
  }

  async getCurrentAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }

  toWei(value: string, unit: 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether' = 'ether'): string {
    return toWei(value, unit);
  }

  fromWei(value: string, unit: 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether' = 'ether'): string {
    return fromWei(value, unit);
  }
}


