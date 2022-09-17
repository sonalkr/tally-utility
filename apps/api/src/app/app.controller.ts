import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { Message } from '@tally-utility/api-interfaces';

import { AppService } from './app.service';
import { upload_dirpath } from './global.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    console.log('hello');
    return this.appService.getData();
  }
  @Post('create_journal')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: upload_dirpath,
      }),
    })
  )
  createJournal(@UploadedFile() file: Express.Multer.File): Promise<Message> {
    console.log('upload');
    console.log(file);
    return this.appService.convertJournal(file);
  }
  @Post('create_payment')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: upload_dirpath,
      }),
    })
  )
  createPayment(@UploadedFile() file: Express.Multer.File): Promise<Message> {
    console.log('upload');
    console.log(file);
    return this.appService.convertPayment(file);
  }
  @Post('create_receipt')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: upload_dirpath,
      }),
    })
  )
  createReceipt(@UploadedFile() file: Express.Multer.File): Promise<Message> {
    console.log('upload');
    console.log(file);
    return this.appService.convertReceipt(file);
  }

  @Post('create_sale')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: upload_dirpath,
      }),
    })
  )
  createSale(@UploadedFile() file: Express.Multer.File): Promise<Message> {
    console.log('upload');
    console.log(file);
    return this.appService.convertSale(file);
  }

  @Post('create_purchase')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: upload_dirpath,
      }),
    })
  )
  createPurchase(@UploadedFile() file: Express.Multer.File): Promise<Message> {
    console.log('upload');
    console.log(file);
    return this.appService.convertPurchase(file);
  }
}
