import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 10.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 19.99,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 5.49,
    },
  ];

  router = inject(Router);
  ngOnInit(): void {
    
  }

  lastClientInfo(clientId: number) {
    console.log('Last client info for client ID:', clientId);
    this.router.navigate(['/clients', clientId]);
  }
}
