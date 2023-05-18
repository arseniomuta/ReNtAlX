import { ICreatedRentalDTO } from "../dtos/ICreatedRentalDTO";
import { Rental } from "../infra/typeorn/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  create(data: ICreatedRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
