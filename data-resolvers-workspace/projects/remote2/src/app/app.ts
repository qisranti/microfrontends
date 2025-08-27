import { Component, inject, signal } from '@angular/core';
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
  readonly #router = inject(ActivatedRoute);
  readonly name = toSignal<string>(this.#router.params.pipe(map((params) => params['name'])), {initialValue: undefined});
}
