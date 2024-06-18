import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId: number | undefined;
  product: Product | undefined;
  products! : Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    let params = new HttpParams();


    this.products= this.apiService.getCatalogue(params);
    console.log(this.products);

    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Récupérer l'ID du produit depuis l'URL
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(id: number): void {
    this.apiService.getProduct(id)
      .subscribe(product => {
        this.product = product;
      }, error => {
        console.log('Une erreur s\'est produite lors de la récupération des détails du produit:', error);
      });
  }

  redirectToProduct(album_name: string) {
    window.scrollTo(0, 0);
    this.router.navigate(['./product', album_name]);
  }

  getProductImageUrl(): string {
    return this.product ? `assets/images/products/${this.product.id}.jpg` : '';
  }

  getProductDetailsImageUrl(): string {
    return this.product ? `assets/images/products/${this.product.id}-details.jpg` : '';
  }
  
}
