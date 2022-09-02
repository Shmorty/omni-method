import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../models/state.model";
import { userReducer } from "./user.reducer";

export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    categories: void 0,
    assessments: void 0
}