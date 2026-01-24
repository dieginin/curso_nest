import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'SEED EXECUTED9';
  }

  private async insertNewProducts() {
    return !!(await this.productsService.deleteAllProducts());
  }
}
