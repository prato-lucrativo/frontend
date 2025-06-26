import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroPratoPage } from './cadastro-prato.page';

describe('CadastroPratoPage', () => {
  let component: CadastroPratoPage;
  let fixture: ComponentFixture<CadastroPratoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
