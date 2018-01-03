import { Injectable } from '@angular/core';

// Actions is an Observable, we can listen to the types of actions that
// are being dispatched and respond to them.

import { Effect, Actions } from '@ngrx/effects';
import {map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../app/store';
import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

// Effects is essentially a class which contains a few properties
// that are Observables. Our observables get called by
// ngrx effects and acts kind of like a reducer, so it allows
// us to respond to different events and do different things.
// The role of a reducer is to deal with pure JS state and
// immutable objects. In this case we are going to be listening
// to some events that are dispatched however we're going to
// be dealing with observable streams.In our case we're going to
// use our pizza service to then go and fetch the pizzas and then
// dispatch a new success action when they come back from the server.

@Injectable()
export class PizzasEffects {
  constructor(private  action$: Actions, private pizzaService: fromServices.PizzasService) {}

  // By default an effect will dispatch an action, you can pass in
  // @Effect({dispatch: false}) if you have a use case for it.
  // The role of the PizzasEffects is to listen to the LOAD_PIZZAS action.
  // loadPizzas$ is actually an Observable with a generic type of Action, ie
  // Observable<Action>. This means, this effect when it is executed we
  // need to return an Action and that is the key to understanding what
  // an effect does: we just mark it as an Effect, we can then listen
  // to our Observable of Action of some type and then dispatch a new Action back.
  @Effect()
  loadPizzas$ = this.action$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        );
      })
    );

  // Angular's HttpClient Module returns an Observable which means
  // it fits with our effects.

  @Effect()
  createPizza$ = this.action$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      // map it so we just return the payload which contains the pizza
      map((action: pizzaActions.CreatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzaService
          .createPizza(pizza) // Angular's http returns an observable so we can pipe it
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
          );
      })
    );

  // Order of execution:
  // When the CreatePizzaSuccess action is dispatched by the createPizza$ effect
  // It goes to the reducer first
  // Then it calls this createPizzaSuccess$ effect
  // This effect will then dispatch the Go Action to go to the /products/id page
  @Effect()
  createPizzaSuccess$ = this.action$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(pizza => {
        return new fromRoot.Go({
          path: ['/products', pizza.id],
        });
      })
    );

  @Effect()
  updatePizza$ = this.action$
    .ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map((action: pizzaActions.UpdatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzaService
          .updatePizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
            // Remember to use of to return an observable for catchError
            catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
          );
      })
    );

  @Effect()
  removePizza$ = this.action$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzaService
          .removePizza(pizza)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
          );
      })
    );

  @Effect()
  handlePizzaSuccess$ = this.action$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map(pizza => {
        return new fromRoot.Go({
          path: ['/products']
        });
      })
    );
}
