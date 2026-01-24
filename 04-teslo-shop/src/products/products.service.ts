import { CreateProductDto } from './dto/create-product.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseError } from 'pg';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBError(error as DatabaseError);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.productRepository.find({ take: limit, skip: offset });
  }

  async findOne(term: string) {
    const isId = isUUID(term);
    const where = isId ? { id: term } : { slug: term };

    const product = await this.productRepository.findOneBy(where);
    if (!product)
      throw new NotFoundException(
        `No product found with ${isId ? 'id' : 'slug'} ${term}`,
      );
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.preload({
        id,
        ...updateProductDto,
      });
      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBError(error as DatabaseError);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBError(error: DatabaseError) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(`Error: ${error.code} | ${error.message}`);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!',
    );
  }
}
