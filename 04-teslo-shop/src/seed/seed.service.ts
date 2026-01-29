import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed.data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.clearDatabase();
    const adminUser = await this.insertNewUsers();
    await this.insertNewProducts(adminUser);
    return 'SEED EXECUTED';
  }

  private async clearDatabase() {
    await this.productsService.deleteAllProducts();
    await this.userRepository.deleteAll();
    // const queryBuilder = this.userRepository.createQueryBuilder();
    // await queryBuilder.delete().where({}).execute();
  }

  private async insertNewUsers() {
    const users: User[] = [];

    initialData.users.forEach((user) =>
      users.push(this.userRepository.create(user)),
    );
    await this.userRepository.save(users);

    return users[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<Product>[] = [];

    products.forEach((product) => {
      insertPromises.push(
        this.productsService.create(
          product,
          user,
        ) as unknown as Promise<Product>,
      );
    });

    await Promise.all(insertPromises);
    return true;
  }
}
