import { Injectable } from '@angular/core';

// Actions is an Observable, we can listen to the types of actions that
// are being dispatched and respond to them.

import { Effect, Actions } from '@ngrx/effects';
import {map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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
}