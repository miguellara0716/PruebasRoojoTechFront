import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }
  urlApiViajes = 'https://localhost:44358/api/Vuelos/';
  getVuelos() {
    return this
      .http
      .get(`${this.urlApiViajes}ObtenerTodosVuelos`);
  }
//   private handleError(operation = 'operation', result?: T) {
//     return (error: any): Observable => {
//       console.error(error);
//       this.log(`${operation} failed: ${error.message}`);

//       return of(result as T);
//     };
//   }

//   private log(message: string) {
//     console.log(message);
//   }

//   getCharacters() {
//     return this.http.get(`${this.url}/characters`).pipe(
//       catchError(this.handleError<Characters[]>('characters', [])));
// }


}

