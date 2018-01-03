import { PizzasGuard } from './pizzas.guard';
import { PizzaExistsGuard } from './pizza-exists.guard';
import { ToppingsGuard } from './toppings.guards';

export const guards: any[] = [PizzasGuard, ToppingsGuard, PizzaExistsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
export * from './toppings.guards';

