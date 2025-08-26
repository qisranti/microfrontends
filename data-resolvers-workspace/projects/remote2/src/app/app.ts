import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-remote2-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('remote2');
  name = '';

  constructor(private router: ActivatedRoute){
    this.router.params.subscribe(params => {
      this.name = params['name'] || '';
    });
  }
}
