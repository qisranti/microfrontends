import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from 'shared';

@Component({
  selector: 'app-remote1-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('remote1');
  #sharedService = inject(SharedService);
  message = this.#sharedService.sharedMessage;
}
