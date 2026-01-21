import { CreatePokemonDto, UpdatePokemonDto } from './dto';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 11000) {
        const mongoError = error as Error & {
          code: number;
          keyPattern: Record<string, unknown>;
          keyValue: Record<string, unknown>;
        };

        throw new ConflictException(
          `Pokemon with ${Object.keys(mongoError.keyPattern).join(', ')}: ${Object.values(
            mongoError.keyValue,
          ).join(', ')} already exists`,
        );
      }

      throw new InternalServerErrorException(
        "Can't create pokemon - Check server logs",
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
