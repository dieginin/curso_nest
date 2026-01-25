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

const ImageValidationPipe = new ParseFilePipe({
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
      storage: diskStorage({ destination: './static/uploads' }),
    }),
  )
  uploadProductImage(
    @UploadedFile(ImageValidationPipe)
    file: Express.Multer.File,
  ) {
    return { fileName: file.originalname };
  }
}
