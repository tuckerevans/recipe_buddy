import { TestBed } from '@angular/core/testing';

import { RecipePassService } from './recipe-pass.service';

describe('RecipePassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipePassService = TestBed.get(RecipePassService);
    expect(service).toBeTruthy();
  });
});
