import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getCatalogue(params: HttpParams) : Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendProduct, {params});
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.backendProduct}/${id}`);
  }
}
