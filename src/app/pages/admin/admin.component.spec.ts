import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MarketplaceService } from '../../services/marketplace.service';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getProductCount: jasmine.createSpy().and.returnValue(Promise.resolve(1)),
      getProduct: jasmine.createSpy().and.returnValue(Promise.resolve({ id: 1, name: 'Test', price: '1000000000000000000', sold: false })),
      addProduct: jasmine.createSpy().and.returnValue(Promise.resolve()),
      buyProduct: jasmine.createSpy().and.returnValue(Promise.resolve()),
      fromWei: jasmine.createSpy().and.returnValue('1.0'),
      toWei: jasmine.createSpy().and.returnValue('1000000000000000000')
    };

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [{ provide: MarketplaceService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar productos', async () => {
    await component.loadProducts();
    expect(component.products.length).toBeGreaterThan(0);
    expect(mockService.getProductCount).toHaveBeenCalled();
    expect(mockService.getProduct).toHaveBeenCalledWith(1);
  });
});

