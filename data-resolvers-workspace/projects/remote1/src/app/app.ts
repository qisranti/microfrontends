import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-remote1-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('remote1');

  name = '';

  constructor(private router: Router) {}

  setName() {
    this.title.set(this.name);
    this.router.navigate(['/remote2', this.name]);
  }
}
