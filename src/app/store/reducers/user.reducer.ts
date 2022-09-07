import { User } from "../models/user.model";
import { GetUserAction, GetUserSuccessAction, UserActionType } from "../actions/user.actions";
import { createReducer, on } from "@ngrx/store";
// create a dummy initial state
const initialUserState: User = {
    id: 0,
    email: 'jack@lalane.not',
    firstName: 'Francois',
    lastName: 'LaLanne',
    nickname: 'Jack',
    dob: new Date("1914-09-26"),
    weight: 155,
};
const initialState = {
    loading: false,
    user: initialUserState,
    error: ''
};
// create reducers
const _userReducer = createReducer(
    initialState,
    on(GetUserAction, (state) => ({loading: false, user: initialUserState, error:''})),
    on(GetUserSuccessAction, (state, {payload}) => ({loading: false, user: payload, error: ''}))
);
export function userReducer(
    state = initialState,
    action: UserActionType
) {
    return _userReducer(state, GetUserAction);
    // switch (action) {
    //     case UserActionType.GET_USER:
    //         return { ...state, loading: true }
    //     case UserActionType.USER_GET_SUCCESSFUL:
    //         return { ...state, user: action.payload, loading: false }
    //     case UserActionType.UPDATE_USER:
    //         return { ...state, user: action.payload }
    //     default:
    //         return state;
    //         break;
    // }
}