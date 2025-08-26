import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TestServiceService } from 'shlib';

@Component({
  selector: 'app-client1-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('client1');

  #sharedServiceFromLib = inject(TestServiceService);
  message = this.#sharedServiceFromLib.sharedMessage;
  messageFromResolverValue = signal('No data yet');
  messageFromResolverComputed = computed(() => this.messageFromResolverValue());

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log('Data from resolver: ', data);
      this.messageFromResolverValue = data['data'];
    });
  }

  testHostService() {}

  testLocalService() {
    this.#sharedServiceFromLib.sharedMessage.set('Message updated from Client1');
  }

  testClient2Service() {}
}
