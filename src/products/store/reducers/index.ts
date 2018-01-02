// One file which contains all of the reducers for this
// module
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState,
  toppings: fromToppings.ToppingsState
}

// Register our reducers
// We know that a slice of state is managed by a reducer
// function.
// We're taking the reducer function and binding it to 'pizzas'
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
};

// Selectors
export const getProductState = createFeatureSelector<ProductsState>('products');

