import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller.js';
import { ReservationsService } from './reservations.service.js';

@Module({
  imports: [],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
