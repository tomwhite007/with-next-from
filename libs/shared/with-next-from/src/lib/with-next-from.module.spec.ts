import { async, TestBed } from '@angular/core/testing';
import { WithNextFromModule } from './with-next-from.module';

describe('WithNextFromModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WithNextFromModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WithNextFromModule).toBeDefined();
  });
});
