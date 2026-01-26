import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

const ImageValidationPipe = new ParseFilePipe({
  fileIsRequired: true,
  validators: [
    new FileTypeValidator({
      fileType: /^image\/(png|jpeg|jpg|gif)$/,
      errorMessage: 'Make sure that file is an image',
    }),
  ],
});

@Controller('files')
export class FilesController {
  private hostApi?: string;

  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {
    this.hostApi = configService.get<string>('HOST_API');
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(
    // @UploadedFile(ImageValidationPipe)
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('A file must be attached');

    // const secureUrl = `${file.filename}`;
    const secureUrl = `${this.hostApi}/files/product/${file.filename}`;
    return { secureUrl };
  }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }
}
