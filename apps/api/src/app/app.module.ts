import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log(join(__dirname, '../../../apps/api/tmp/r_data'));
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../apps/api/src/public'),
      renderPath: '/api/public',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
