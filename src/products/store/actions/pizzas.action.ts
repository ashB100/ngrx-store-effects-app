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

// Create Pizza
// Constants
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';

// Action Creators
export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// Update Pizza
// Constants
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Success';

// Action Creators
export class UpdatePizza {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// Remove Pizza
// Constants
export const REMOVE_PIZZA = '[Product] Remove Pizza';
export const REMOVE_PIZZA_FAIL = '[Product] Remove Pizza Fail';
export const REMOVE_PIZZA_SUCCESS = '[Product] Remove Pizza Success';

// Action Creators
export class RemovePizza {
  readonly type = REMOVE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class RemovePizzaFail {
  readonly type = REMOVE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class RemovePizzaSuccess {
  readonly type = REMOVE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// Action types
// We need to export our action types.
// These are used in our reducer.
export type PizzasAction =
  LoadPizzas |
  LoadPizzasFail |
  LoadPizzasSuccess |
  CreatePizza |
  CreatePizzaFail |
  CreatePizzaSuccess |
  UpdatePizza |
  UpdatePizzaFail |
  UpdatePizzaSuccess |
  RemovePizza |
  RemovePizzaFail |
  RemovePizzaSuccess;
