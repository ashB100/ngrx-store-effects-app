import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

import { Pizza } from '../../models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProductState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

// Convert data to array as the template expects array
// Selectors are reusable functions, we can use selectors with other selectors.
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);

export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);

// We step through the state tree using selector functions:
// --- getProductState
//    --- getPizzaState
//    --- getPizzasLoaded
// Our ngrx state tree looks like this:
/*const state = {
  products: {
    pizzas: {
      data: [],
      loaded: false,
      loading: false
    }
  }
} */
