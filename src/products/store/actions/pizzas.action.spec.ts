import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', () => {

  describe('LoadPizzas Actions', () => {
    describe('LoadPizzas', () => {
      it('should create an action', () => {
        const action = new fromPizzas.LoadPizzas();

        expect({ ...action }).toEqual(({
          type: fromPizzas.LOAD_PIZZAS
        }));
      });
    });

    describe('LoadPizzasFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromPizzas.LoadPizzasFail(payload);

        expect({ ...action }).toEqual(({
          type: fromPizzas.LOAD_PIZZAS_FAIL,
          payload
        }));
      });
    });

    describe('LoadPizzasSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            "name": "Blazin' Inferno",
            "toppings": [
              {
                "id": 9,
                "name": "pepper"
              },
              {
                "id": 3,
                "name": "basil"
              },
              {
                "id": 7,
                "name": "olive"
              }
            ],
            "id": 1
          },
          {
            "name": "Seaside Surfin'",
            "toppings": [
              {
                "id": 6,
                "name": "mushroom"
              },
              {
                "id": 7,
                "name": "olive"
              },
              {
                "id": 3,
                "name": "basil"
              },
              {
                "id": 8,
                "name": "onion"
              }
            ],
            "id": 2
          }];

        const action = new fromPizzas.LoadPizzasSuccess(payload);

        expect({ ...action }).toEqual(({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload
        }));
      });
    });

  });
});
