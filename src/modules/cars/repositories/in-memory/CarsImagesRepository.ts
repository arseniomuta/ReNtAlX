import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

import { ICarsImagesRepository } from "../ICarsImagesRepository";

class CarsImagesRepository implements ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage> {
    throw new Error("Method not implemented.");
  }
}

export { CarsImagesRepository };
