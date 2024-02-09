import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _appConfig: any;

  public get appConfig(): any {
    return this._appConfig;
  }

  public set appConfig(value: any) {
    this._appConfig = value;
  }

  constructor(private http: HttpClient) {}

  init(): Promise<any> {
    return firstValueFrom(
      this.http.get('/assets/config.json').pipe(
        map((val: any) => {
          this._appConfig = val;
          return val;
        })
      )
    );
  }
}
