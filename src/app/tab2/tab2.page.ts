import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListadoService } from '../listado.service';
import { notaActual } from '../interfaces/nota';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isToastOpen = false;
  mensajeToast = "Nota añadida";

  escribir = new FormGroup({
    titulo: new FormControl("", Validators.required),
    contenido: new FormControl("", Validators.required)
  })

  subirNota() {

    if(this.escribir.valid) {
      console.log(this.escribir.value);
      const notaNueva: notaActual = {
        titulo: this.escribir.value.titulo!,
        contenido: this.escribir.value.contenido!
      }
      const notaExistente = this.listadoService.notas?.find(nota => {
        return nota.titulo === notaNueva.titulo;
      });
      if(!notaExistente) {
        this.listadoService.notas?.push(notaNueva);
        this.mensajeToast = "Nota añadida"
      } else {
        this.mensajeToast = "Ya hay una nota con ese título"
      }
      this.setOpen(true);
    }
  }

  constructor(private listadoService: ListadoService) {}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


}
