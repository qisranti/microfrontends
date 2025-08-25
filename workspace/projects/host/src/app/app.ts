import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';
import { TestServiceService } from 'shlib';

@Component({
  selector: 'app-host-root',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('host');

  #sharedServiceFromLib = inject(TestServiceService);
  message = this.#sharedServiceFromLib.sharedMessage;

  updateMessage() {
    this.#sharedServiceFromLib.sharedMessage.set('Message updated from Host');
  }

}
