import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ConfigService } from '../config-service/config.service';
import { UtilsService } from '../utils/utils.service';
import { WebviewAppService } from './webview-app.service';
import { NgZone } from '@angular/core';

describe('WebviewAppService', () => {
  let spectator: SpectatorService<WebviewAppService>;
  let service: WebviewAppService;

  const parameters = {
    latitude: 2,
    longitude: 3,
    placemark: 2
  };

  const createService = createServiceFactory({
    service: WebviewAppService,
    imports: [RouterTestingModule],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    mocks: [ConfigService, UtilsService, HttpClient]
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be callNative', () => {
    const postMessageMock = jest.fn();
    Object.defineProperty(window, 'webkit', {
      value: { messageHandlers: { method: { postMessage: postMessageMock } } }
    });

    const utilsService = spectator.inject(UtilsService);
    const spyed = jest.spyOn(utilsService, 'isWebView').mockImplementation(() => true);

    const secondSpyed = jest.spyOn(utilsService, 'checkwv').mockImplementation(() => 'ioswv');
    service.callNative('openMaps', parameters);
    expect(spyed).toHaveBeenCalled();
    expect(secondSpyed).toHaveBeenCalled();
  });

  it('should be callNative', () => {
    const postMessageMock = jest.fn();
    Object.defineProperty(window, 'webkit', {
      value: { messageHandlers: { method: { postMessage: postMessageMock } } }
    });

    const utilsService = spectator.inject(UtilsService);
    const spyed = jest.spyOn(utilsService, 'isWebView').mockImplementation(() => true);

    const secondSpyed = jest.spyOn(utilsService, 'checkwv').mockImplementation(() => 'androidwv');
    service.callNative('GET', parameters);
    expect(spyed).toHaveBeenCalled();
    expect(secondSpyed).toHaveBeenCalled();
  });

  it('should be callIOS', () => {
    const ngZone = spectator.inject(NgZone);
    const spyed = jest.spyOn(ngZone, 'runOutsideAngular');

    service['callIOS'](2, '{openMaps}');
    expect(spyed).toHaveBeenCalled();
  });

  it('should be callIOS parameter will be null', () => {
    const ngZone = spectator.inject(NgZone);
    const spyed = jest.spyOn(ngZone, 'runOutsideAngular');
    service['callIOS'](null, 'openMaps');
    expect(spyed).toHaveBeenCalled();
  });
});