import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { notaActual } from '../interfaces/nota';
import { ListadoService } from '../listado.service';
import { StorageService } from '../storage.service';
import { ActionSheetController, IonModal, ModalController } from '@ionic/angular';
import { EditNotePage } from '../edit-note/edit-note.page';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  notas?: notaActual[];
  isToastOpen = false;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private listadoService: ListadoService,
    private storageService: StorageService,
    private actionSheetCtrl:ActionSheetController,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit(): void {
    console.log("Init");
    this.cargarNotasExterno();
  }

  async cargarNotasExterno() {
    console.log("cargandonotasExterno");
    await this.storageService.cargarNotas();
  }

  ionViewWillEnter() {
    console.log("IonView");
    console.log("", this.listadoService.notas);
    this.notas = this.listadoService.notas;
    // Añadir notas al Storage
    console.log("Añadiendo notas", this.notas);

    this.storageService.guardarEliminarNotas(this.notas);
  }

  async abrirMenu(titulo: string, contenido: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Opciones",
      buttons: [
        {
          text: "Eliminar",
          icon: "trash-outline",
          handler: () => this.eliminar(titulo)
        },
        {
          text: "Editar",
          icon: "create-outline",
          handler: () => this.editar(titulo, contenido)
        },
        {
          text: "Compartir",
          icon: "share-social-outline",
          handler: () => this.compartir(titulo, contenido)
        },
        {
          text: "Cancelar",
          icon: "close-outline",
          role: "cancel"
        }
      ]
    });

    await actionSheet.present();
  }

  eliminar(titulo: string) {
    this.notas = this.notas?.filter(nota => nota.titulo !== titulo);
    this.listadoService.notas = this.notas;
    this.storageService.guardarEliminarNotas(this.notas);
    this.setOpen(true);
  }

  editar(titulo: string, contenido: string) {
    this.listadoService.tituloNotaActualizar = titulo;
    this.listadoService.contenidoNotaActualizar = contenido;
    const modal = this.modalCtrl.create({
      component: EditNotePage
    }).then(modalCreado => {
      modalCreado.present();

      modalCreado.onDidDismiss().then(({data}) => {
        if(data) {
          console.log("Recibiendo", data.titulo);
          this.notas = this.notas?.filter(nota => nota.titulo !== titulo);
          let notaNueva: notaActual = {
            titulo: data.titulo,
            contenido: data.contenido
          }
          this.notas?.push(notaNueva);
          this.listadoService.notas = this.notas;
          this.storageService.guardarEliminarNotas(this.notas);
        }
      })
    })


  }

  async compartir(titulo: string, contenido: string) {
    await Share.share({
      title: titulo,
      text: contenido
    });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    // this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    console.log("Recibiendo", event);
  }

}
