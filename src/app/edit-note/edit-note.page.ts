import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ListadoService } from '../listado.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  editar = new FormGroup({
    titulo: new FormControl(this.listadoService.tituloNotaActualizar, Validators.required),
    contenido: new FormControl(this.listadoService.contenidoNotaActualizar, Validators.required)
  })

  constructor(private modalCtrl: ModalController, private listadoService: ListadoService) { }

  ngOnInit() {

  }

  cancelar() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmar() {
    if(this.editar.valid) {
      return this.modalCtrl.dismiss(this.editar.value);
    } else {
      return null;
    }

  }


}
