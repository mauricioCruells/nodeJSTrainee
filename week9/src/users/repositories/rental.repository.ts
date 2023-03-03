import { Injectable } from '@nestjs/common';
import { Rentals } from '../entities/rentals.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RentalsRepository extends Repository<Rentals> {
  constructor(private dataSource: DataSource) {
    super(Rentals, dataSource.createEntityManager());
  }

  async deleteRental(rentalId) {
    await this.delete(rentalId);
  }
}
