import { Injectable } from '@angular/core';
import { notaActual } from './interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  notas?: notaActual[] = [];
  tituloNotaActualizar: string = "";
  contenidoNotaActualizar: string = "";

  constructor() { }
}
