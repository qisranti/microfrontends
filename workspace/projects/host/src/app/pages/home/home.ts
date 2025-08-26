import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HostServiceService } from '../../shared/services/host-service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-host-home',
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly title = signal('home host');

  hostService = inject(HostServiceService);

  testLocalService() {
    
  }
  testClient1Service() {}
  testClient2Service() {}
}
