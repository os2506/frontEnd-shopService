import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpasswordFormComponent } from './recoverpassword-form.component';

describe('RecoverpasswordFormComponent', () => {
  let component: RecoverpasswordFormComponent;
  let fixture: ComponentFixture<RecoverpasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverpasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverpasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
