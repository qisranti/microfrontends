import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestServiceService } from 'shlib';

@Component({
  selector: 'app-client1-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client1');

  #sharedServiceFromLib = inject(TestServiceService);
  message = this.#sharedServiceFromLib.sharedMessage;

  testHostService() {}

  testLocalService() {}

  testClient2Service() {}
}
