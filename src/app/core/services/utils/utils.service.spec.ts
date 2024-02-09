// Core
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, HttpMethod, mockProvider, SpectatorService } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

// Services
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let spectator: SpectatorService<UtilsService>;
  let service: UtilsService;

  const createService = createServiceFactory({
    service: UtilsService,
    imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    mocks: [TranslateService, MatDialog]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
