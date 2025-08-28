import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-clients',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients = [
    {
      id: 1,
      name: 'Client 1',
      description: 'Description for Client 1',
    },
    {
      id: 2,
      name: 'Client 2',
      description: 'Description for Client 2',
    },
    {
      id: 3,
      name: 'Client 3',
      description: 'Description for Client 3',
    },
  ];
  @Input() id!: number;
  constructor() {
    console.log('Client ID:', this.id);
  }

  ngOnInit() {}
}
