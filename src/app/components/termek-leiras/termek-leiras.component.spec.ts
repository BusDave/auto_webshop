import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekLeirasComponent } from './termek-leiras.component';

describe('TermekLeirasComponent', () => {
  let component: TermekLeirasComponent;
  let fixture: ComponentFixture<TermekLeirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermekLeirasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermekLeirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
