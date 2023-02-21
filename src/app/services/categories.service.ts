import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as CategoryActions from '../store/categories/category.actions';
import { AppState } from '../store/app.state';
import { selectAllCategories } from '../store/categories/category.selector';
import { Observable } from 'rxjs';
import { Category } from '../store/categories/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}
  loadData() {
    // environment.baseUrl + '/categories'
    console.log('load categories from file');
    return this.http.get('/assets/data/categories.json');
  }
  load() {
    // this.store.dispatch(new LoadCategoriesBegin());
    console.log('dispatch loadCategoriesBegin');
    this.store.dispatch(CategoryActions.loadCategoriesBegin());
  }
  getCategories() {
    return this.store.select(selectAllCategories);
  }
}
