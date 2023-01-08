import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisSmall, pais } from '../interfaces/paises.Interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

 
  private _baseUrl:string = 'https://restcountries.com/v2'
  private _regiones:string[]= ['EU', 'EFTA', 'CARICOM', 'PA', 'AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC']

  get regiones():string[]{
    return [...this._regiones];
  }

  constructor(private http:HttpClient) { }

  getPaisesPorRegion(region:string):Observable<PaisSmall[]>{
    const url : string = `${this._baseUrl}/regionalbloc/${region}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorAlphaCode(code:string):Observable<pais | null>{

    if(!code){
      return of(null)
    }
    const url : string = `${this._baseUrl}/alpha/${code}`;
    return this.http.get<pais>(url);
  }

  getPaisPorAlphaCodeSmall(code:string):Observable<PaisSmall>{
    const url : string = `${this._baseUrl}/alpha/${code}?fields=name,alpha3Code`;
    return this.http.get<PaisSmall>(url);
  }


  getPaisesPorCodigos(borders:string[]):Observable<PaisSmall[]>{
    if(!borders){
      return of ([]);
    }

    const PETICIONES: Observable<PaisSmall>[]= [];

    borders.forEach(codigo => {
      const peticion = this.getPaisPorAlphaCodeSmall( codigo);
      PETICIONES.push(peticion);
    });

    return combineLatest(PETICIONES); //regresa un Observable
  }
}
