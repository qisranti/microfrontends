import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SharedService } from 'shared';

@Component({
  selector: 'app-shell-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shell');
  #sharedService = inject(SharedService);
  message = this.#sharedService.sharedMessage;

  updateMessage(): void {
    this.#sharedService.sharedMessage.set('Message updated by Shell at ' + new Date().toLocaleTimeString());
  }
}
