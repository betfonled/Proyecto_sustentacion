import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy{

  ruta=localStorage.getItem('route');

  title = 'MedGestionAlert';


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}
