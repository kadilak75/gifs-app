import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Data, SearchGifsResponse } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._busqueda = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
      
      //esta parte del codigo se puede resumir utilizando la busqueda ya realizada mas abajo y guardando la "data"
      //en un array de Data llamado resultados

    //   this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${localStorage.getItem('historial')}&limit=40`)
    //   .subscribe(response =>{
    //     this.resultados = response.data;
    // });
    }
  }

  

  private apiKey: string = 'pj6Pw6uNDhjcw27PMShjM8FLQBaRI6Lm';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  

  private _busqueda: string[] = [];

  get busqueda (){
    return [...this._busqueda];
  }

  public resultados: Data[] = [];

  agregarBusqueda(busqueda:string){
    busqueda = busqueda.toLowerCase()
    if(!this._busqueda.includes(busqueda.trim())){
      this._busqueda.unshift(busqueda);
      this._busqueda = this._busqueda.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._busqueda));
    }
    console.log(this.busqueda);
    const params = new HttpParams()
  .set('api_key',this.apiKey)
  .set('limit','10')
  .set('q', busqueda);

    //this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${busqueda}&limit=40`)
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe(response =>{
      this.resultados = response.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
  });

}

}
