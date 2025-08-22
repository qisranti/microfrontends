import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HostServiceProxy } from './shared/services/HostServiceProxy.service';

@Component({
  selector: 'app-client1-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client1');
  hostServices = inject(HostServiceProxy);

  testHostService(){

  }

  testLocalService(){

  }

  testClient2Service(){

  }
}
