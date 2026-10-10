import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserSchema } from './models/user.schema.js';
import { UsersRepository } from './users.repository.js';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: 'UserDocument', schema: UserSchema }]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
