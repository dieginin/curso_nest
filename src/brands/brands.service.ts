import { CreateBrandDto, UpdateBrandDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    { id: uuid(), name: 'toyota', createdAt: new Date().getTime() },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((b) => b.id === id);

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map((brand) => {
      if (brand.id === brandDB.id) {
        brandDB.updatedAt = new Date().getTime();
        updateBrandDto.name = updateBrandDto.name.toLocaleLowerCase();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }
      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    this.findOne(id);
    this.brands = this.brands.filter((b) => b.id !== id);
  }
}
