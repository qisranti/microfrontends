import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-remote2-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('remote2');
  readonly name = signal('');

  constructor(private router: ActivatedRoute) {
    const nameSignal = toSignal(
      this.router.params.pipe(map(params => params['name'] || ''))
    );

    this.name.set(nameSignal());
  }

}
