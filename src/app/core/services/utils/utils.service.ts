import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Commonly used utils and helpers
 */
export class UtilsService {
  activeUnderlineColor: number;
  activeUnderlineColor$: Subject<number> = new Subject<number>();

  constructor() {}

  public isWebView() {
    const navigator = this.checkwv();
    return navigator === 'androidwv' || navigator === 'ioswv';
  }

  public checkwv() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipod|ipad/.test(userAgent);
    if (ios) {
      if (this.checkBrowser()) {
        return 'web';
      } else {
        return 'ioswv';
      }
    } else {
      if (userAgent.includes('wv')) {
        // Android webview
        return 'androidwv';
      } else {
        // Chrome
        return 'web';
      }
    }
  }

  public checkBrowser(): boolean {
    // Get the user-agent string
    const userAgentString = window.navigator.userAgent;

    // Detect Chrome
    let chromeAgent = userAgentString.indexOf('Chrome') > -1;

    // Detect Internet Explorer
    const IExplorerAgent = userAgentString.indexOf('MSIE') > -1 || userAgentString.indexOf('rv:') > -1;

    // Detect Firefox
    const firefoxAgent = userAgentString.indexOf('Firefox') > -1;

    // Detect Safari
    let safariAgent = userAgentString.indexOf('Safari') > -1;

    // Discard Safari since it also matches Chrome
    if (chromeAgent && safariAgent) safariAgent = false;

    // Detect Opera
    const operaAgent = userAgentString.indexOf('OP') > -1;

    // Discard Chrome since it also matches Opera
    if (chromeAgent && operaAgent) chromeAgent = false;

    return safariAgent || chromeAgent || IExplorerAgent || operaAgent || firefoxAgent;
  }

  scrollTop() {
    const options = { top: 0 };
    window.scrollTo(options);
  }


  changeActiveUnderlineColor(index: number) {
    this.activeUnderlineColor = index;
    this.activeUnderlineColor$.next(this.activeUnderlineColor);
  }
}