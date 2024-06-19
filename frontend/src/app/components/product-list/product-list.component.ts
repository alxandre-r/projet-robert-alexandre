import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../../../models/product';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products!: Observable<Product[]>;
  selectedType = 'All';
  searchQuery = '';
  isSearching = false;  // Variable to track if a search is active

  private selectedType$ = new BehaviorSubject<string>(this.selectedType);
  private searchQuery$ = new BehaviorSubject<string>(this.searchQuery);

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.products = combineLatest([this.selectedType$, this.searchQuery$]).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(([selectedType, searchQuery]) => {
        this.isSearching = searchQuery.length > 0;
        let params = new HttpParams();
        if (selectedType && selectedType !== 'All') {
          params = params.set('type', selectedType);
        }
        if (searchQuery) {
          params = params.set('query', searchQuery.toLowerCase());
        }
        return this.apiService.getCatalogue(params);
      })
    );
  }

  searchByName(event: any) {
    const query = event.target.value.trim();
    this.searchQuery = query;
    this.searchQuery$.next(query);
  }

  filterByType(event: any) {
    const selectedType = event.target.value;
    this.selectedType = selectedType;
    this.selectedType$.next(selectedType);
  }

  redirectToProduct(album_name: string) {
    this.router.navigate(['./product', album_name]);
  }
}
