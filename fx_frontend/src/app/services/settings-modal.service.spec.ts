import { TestBed } from '@angular/core/testing';

import { SettingsModalService } from './settings-modal.service';

describe('SettingsModalService', () => {
  let service: SettingsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
