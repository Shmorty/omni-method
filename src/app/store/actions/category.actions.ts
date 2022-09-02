import { Action } from "@ngrx/store";
import { Category } from "../models/category.model";

export enum CategoryActionType {
    GET_CATEGORIES = '[Category] Get Categories',
}

export class GetCategoriesAction implements Action {
    readonly type = CategoryActionType.GET_CATEGORIES;

    constructor () {}
}

export type CategoryAction = GetCategoriesAction;