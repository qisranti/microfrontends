import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-remote2-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('remote2');
  readonly route = inject(ActivatedRoute);
  userName = signal('');

  constructor(route: ActivatedRoute) {
    const resolvedName = route.snapshot.data['userName'];
    this.userName.set(resolvedName);
  }
}
