import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HostServiceProxy {
  private remoteService: any;

  async init() {
    const remoteModule = await import('host/hostService');
    this.remoteService = new remoteModule.HostServiceService();
  }

  setHostValue(value: string) {
    if (this.remoteService) {
      this.remoteService.setHostValue(value);
    } else {
      console.warn('Servicio remoto aún no cargado');
    }
  }
}