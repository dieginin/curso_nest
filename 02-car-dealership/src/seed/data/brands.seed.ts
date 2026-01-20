import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'toyota',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'honda',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'jeep',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'volvo',
    createdAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'tesla',
    createdAt: new Date().getTime(),
  },
];
