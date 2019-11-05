import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  {Reserva} from './Reserva';





@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    public ResponseVuelos = null;
    public reservar = false;
    public itemreserva = null;
    public FNacimiento : any;
     public NCedula: any ;
    private reserva: Reserva ;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    private urlApiVuelos = "https://localhost:44358/api/Vuelos/";
    constructor(private httpClient: HttpClient) {}

    ngOnInit() {
        this.getVuelosDisponibles();
    }

    private getVuelosDisponibles() {
        const url = `${this.urlApiVuelos}ObtenerTodosVuelos`;
        this.httpClient
          .get(url)
          .subscribe(apiData => {
              console.log(apiData);
              this.ResponseVuelos = apiData
          });
      }

      private Guardareserva() {
        const url = `${this.urlApiVuelos}Reservar`;
        console.log(this.reserva);
        console.log(this.httpOptions);
        this.httpClient
          .post<Reserva>(url, this.reserva, this.httpOptions)
          .subscribe(apiData => {
              console.log(apiData);
              this.ResponseVuelos = apiData
          });
      }

      public clickReservar (item){
        this.itemreserva = item;
        this.reservar = true;
 
      }

      calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
    
        return edad;
    }

      public Reservar(){
        
        if(this.calcularEdad(this.FNacimiento) > 17){
            
            this.reserva = new Reserva();
            this.reserva.NumeroCedula =  this.NCedula;
            this.reserva.PrecioReserva = this.itemreserva.precio;
            this.reserva.IdVuelo = this.itemreserva.idVuelo;
            this.Guardareserva();
            return;
        }

         
      }
}
