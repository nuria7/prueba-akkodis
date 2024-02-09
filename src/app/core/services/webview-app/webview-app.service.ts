import { Injectable, NgZone } from '@angular/core';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class WebviewAppService {
  constructor(private utilsService: UtilsService, private ngZone: NgZone) {}

  public callNative(method: string, parameters: any = null) {
    if (this.utilsService.isWebView()) {
      if (this.utilsService.checkwv() === 'ioswv') {
        this.callIOS(parameters, method);
      } else {
        this.callAndroid(parameters, method);
      }
    }
  }

  private callAndroid(parameters: any, method: string) {
    this.ngZone.runOutsideAngular(() => {
      if (parameters !== null) {
        if (typeof parameters === 'object') {
          this.postMessageWithParametersAndroid(method, parameters);
        } else {
          (window as any).Android[method](parameters);
        }
      } else {
        (window as any).Android[method]();
      }
    });
  }

  private callIOS(parameters: any, method: string) {
    this.ngZone.runOutsideAngular(() => {
      try {
        if (parameters !== null) {
          if (typeof parameters === 'object') {
            this.postMessageWithParametersIOs(method, parameters);
          } else {
            (window as any).webkit.messageHandlers[method].postMessage(parameters);
          }
        } else {
          (window as any).webkit.messageHandlers[method].postMessage('');
        }
      } catch (err) {}
    });
  }

  // Código para cuando viene más de 1 parametro
  postMessageWithParametersAndroid(methodName: string, parameters: any) {
    switch (methodName) {
      case 'openMaps':
        (window as any).Android[methodName](parameters.latitude, parameters.longitude, null, parameters.placemark);
        break;
    }
  }

  postMessageWithParametersIOs(methodName: string, parameters: any) {
    switch (methodName) {
      case 'openMaps':
        (window as any).webkit.messageHandlers[methodName].postMessage({
          latitude: parameters.latitude.toString(),
          longitude: parameters.longitude.toString(),
          zoom: null,
          name: parameters.placemark
        });
        break;
    }
  }
}