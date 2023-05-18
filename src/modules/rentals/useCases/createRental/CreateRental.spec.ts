import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental ", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "34567",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if there is another open  to use the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
