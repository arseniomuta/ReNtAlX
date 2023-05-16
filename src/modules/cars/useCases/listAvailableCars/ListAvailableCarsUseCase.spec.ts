import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all cars available", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description",
      brand: "Audi",
      fine_amount: 100,
      license_plate: "DEF-1313",
      daily_rate: 140.0,
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description",
      brand: "Audi2 test",
      fine_amount: 100,
      license_plate: "DEF-1313",
      daily_rate: 140.0,
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Audi2 test",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      brand: "Audi2 test",
      fine_amount: 100,
      license_plate: "DEF-9876",
      daily_rate: 140.0,
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
