import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/toppings.selectors';

import { Topping } from '../../models/topping.model';

describe('Toppings Selectors', () => {
  // Import TestBed because we are going to use the store module inside
  // these tests. We need to set up a few things first:
  let store: Store<fromReducers.ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'bacon' },
    { id: 2, name: 'pepperoni' },
    { id: 3, name: 'tomato' },
  ];

  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ]
    })

    store = TestBed.get(Store);

    // The callThrough allows us to spy on dispatch function,
    // however it doesn't alter that function is changed ??
    // TODO: lookup callThrough and sypOn
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getToppingEntities', () => {
    it('should return toppings as entities', () => {
      let result;

      store
        .select(fromSelectors.getToppingEntities)
        .subscribe(value => {
          result = value;
        });

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedToppings', () => {
    it('should return selected toppings as ids', () => {
      let result;

      store
        .select(fromSelectors.getSelectedToppings)
        .subscribe(value => {
          result = value;
        });

      store.dispatch(new fromActions.LoadToppingsSuccess(toppings));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.VisualiseToppings([1, 3]));

      expect(result).toEqual([1, 3]);
    });
  });

});
