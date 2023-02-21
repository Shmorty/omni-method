import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { loadCategoriesBegin } from 'src/app/store/categories/category.actions';
import { Category } from 'src/app/store/categories/category.model';
import { selectAllCategories } from 'src/app/store/categories/category.selector';
// import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  // public categories$ = this.categoryService.getCategories();
  public categories$ = this.store.select(selectAllCategories);

  constructor(
    private auth: AuthService,
    private categoryService: CategoriesService,
    private store: Store
  ) {}

  ngOnInit() {
    // this.categoryService.load();
    this.store.dispatch(loadCategoriesBegin());
    // this.categories$ = this.categoryService.getCategories();
  }

  logout() {
    this.auth.logout();
  }
}
