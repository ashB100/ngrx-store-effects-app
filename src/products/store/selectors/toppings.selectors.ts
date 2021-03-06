import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

// Get a reference to the toppings state:
// first get the product state (this will give us state of type ProductsState)
export const getToppingsState = createSelector(
  fromFeature.getProductState,
  (state: fromFeature.ProductsState) => state.toppings
);

// Get a reference to our entities:
// here we'll start from the getToppingsState
export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings
);

// We want to pass all toppings to our components
// So, we want to map our entities into array elements
export const getAllToppings = createSelector(getToppingEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);

/*
Our data structure looks like this:
{
  products: {
    pizzas: {},
    toppings: {
      entities: {}
    }
  }
}
*/
