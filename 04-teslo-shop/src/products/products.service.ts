import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseError } from 'pg';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product, ProductImage } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
      });
      await this.productRepository.save(product);
      return { ...product, images };
    } catch (error) {
      this.handleDBError(error as DatabaseError);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      // relations: { images: true },
    });

    return products.map(({ images, ...rest }) => ({
      ...rest,
      images: images?.map((img) => img.url),
    }));
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);

    return { ...rest, images: images.map((img) => img.url) };
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
        images: [],
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
