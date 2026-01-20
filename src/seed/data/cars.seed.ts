import { Car } from '../../cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'toyota',
    model: 'corolla',
  },
  {
    id: uuid(),
    brand: 'honda',
    model: 'civic',
  },
  {
    id: uuid(),
    brand: 'jeep',
    model: 'cherokee',
  },
];
