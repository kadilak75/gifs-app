import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  get historial(){
    return this.gifsService.busqueda;
  } 

  mostrar(evento:string){
    this.gifsService.agregarBusqueda(evento);
  }

}
