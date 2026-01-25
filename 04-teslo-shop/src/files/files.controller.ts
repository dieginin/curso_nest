import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';

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
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile(ImageValidationPipe)
    file: Express.Multer.File,
  ) {
    return { fileName: file.originalname };
  }
}
