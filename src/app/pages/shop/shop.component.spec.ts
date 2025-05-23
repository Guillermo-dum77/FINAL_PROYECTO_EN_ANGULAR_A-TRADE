import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { MarketplaceService } from '../../services/marketplace.service';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getProductCount: jasmine.createSpy().and.returnValue(Promise.resolve(2)),
      getProduct: jasmine.createSpy().and.callFake((id: number) => Promise.resolve({
        id,
        name: 'TestProduct',
        price: '1000000000000000000',
        sold: false
      })),
      fromWei: jasmine.createSpy().and.returnValue('1.0'),
      buyProduct: jasmine.createSpy().and.returnValue(Promise.resolve())
    };

    await TestBed.configureTestingModule({
      imports: [ShopComponent],
      providers: [{ provide: MarketplaceService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar productos disponibles', async () => {
    await component.loadProducts();
    expect(component.products.length).toBeGreaterThan(0);
  });
});







