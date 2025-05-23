import { TestBed } from '@angular/core/testing';
import { Web3Service } from './web3.service';


declare let window: any;

describe('Web3Service', () => {
  let service: Web3Service;

  beforeEach(() => {
    // Dirección válida para evitar el error InvalidAddressError
    window.ethereum = {
      request: jasmine.createSpy().and.resolveTo([
        '0x000000000000000000000000000000000000dead'
      ])
    };

    (window as any).Web3 = require('web3'); 

    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3Service);
  });

  it('debería instanciarse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar la cuenta actual', async () => {
    const account = await service.getCurrentAccount();
    expect(account.toLowerCase()).toBe('0x000000000000000000000000000000000000dead');
  });
});

