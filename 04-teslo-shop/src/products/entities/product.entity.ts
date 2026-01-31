import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from './';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '370848d5-dfc5-4c01-9bd1-969daa0ff70c',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Kids Corp Jacket',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({ example: 30, description: 'Product Price', default: 0 })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example:
      'Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.',
    description: 'Product Description',
    default: null,
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 'kids_corp_jacket',
    description: 'Product Slug',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({ example: 10, description: 'Product Stock', default: 0 })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({ example: ['XS', 'S', 'M'], description: 'Product Sizes' })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({ example: 'kid', description: 'Product Gender' })
  @Column('text')
  gender: string;

  @ApiProperty({ example: ['shirt'], description: 'Product Tags', default: [] })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: ['1506211-00-A_0_2000.jpg', '1506211-00-A_1_2000.jpg'],
    description: 'Product Images',
    default: [],
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlug() {
    this.slug = (this.slug ?? this.title)
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
