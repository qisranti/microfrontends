import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-remote2-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('remote2');
  userName = signal('');
  constructor(private route: ActivatedRoute) {
    const resolvedName = this.route.snapshot.data['userName'];
    this.userName.set(resolvedName);
  }
}
