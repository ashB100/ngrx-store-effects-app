// For type checking purposes
import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// Load pizzas
// We are communicating via events, these events
// describe the steps of what is happening in our
// application so we can respond to them accordingly
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

// Action Creators
export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

// Action types
// We need to export our action types.
// These are used in our reducer.
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;


