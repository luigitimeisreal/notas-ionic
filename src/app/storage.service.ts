import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { notaActual } from './interfaces/nota';
import { ListadoService } from './listado.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _notas?: notaActual[] = [];

  constructor(private storage: Storage, private listadoService: ListadoService) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    console.log("Init", this._storage);

  }

  async guardarEliminarNotas(notas?: notaActual[]) {
    this._notas = notas;
    this._storage?.set("notas", this._notas);
  }


  async cargarNotas() {
    await this.init();
    try {
      console.log("Cargandostorage", this._storage);
      const notasCargadas = await this._storage?.get("notas");
      console.log("notasCArgadas", notasCargadas);
      this._notas = notasCargadas || [];
      this.listadoService.notas = this._notas;
    } catch (error) {
      console.log("Error!", error);

    }
  }

}
