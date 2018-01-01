import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {
  switch(action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        // The reducer is not actually fetching/loading the data
        // Instead we have to setup an effect that listens to the
        // LOAD_PIZZAS action. The effects will fetch the data
        // then dispatch the LOAD_PIZZAS_SUCCESS action!
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;

      const entities = pizzas.reduce((entities: {[id: number]: Pizza }, pizza) => {
        return {
          ...entities,
          // Bind each pizza by its key
          // This is the new es6 syntax where you can dynamically
          // create the properties from the id. So it is dynamically
          // going to create 1, 2, or 3 as the objects key.
          [pizza.id]: pizza
        };
      }, {
        ...state.entities
      });

      /* We will be given this structure from action.payload:

      [{ id: 1 }, { id: 2 }]

      We want to convert it into a simple object lookup:
      {
        1: {
            id: 1,
            name: 'Mu Pizza',
            toppings: []
          }
      }*/

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

// Its a good practice to export these states
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
