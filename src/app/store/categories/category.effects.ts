import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import * as CategoryActions from './category.actions';
import {
  loadCategoriesSuccess,
  loadCategoriesBegin,
} from 'src/app/store/categories/category.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private categoriesService: CategoriesService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategoriesBegin),
      switchMap(() =>
        this.categoriesService.loadData().pipe(
          tap(console.log),
          // map((data) => loadCategoriesSuccess({ data: data })),
          map((data) => loadCategoriesSuccess({ data: data['categories'] })),
          tap(console.log),
          catchError((error) =>
            of(CategoryActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );
}
