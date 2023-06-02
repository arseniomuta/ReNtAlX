import { UsersRepositoryInMemory } from "modules/account/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "modules/account/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      drive_license: "664168",
      email: "ofufatfog@fove.lb",
      name: "Austria",
      password: "12345",
    });
    await sendForgotPasswordMailUseCase.execute("ofufatfog@fove.lb");
    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("vib@ipnuuv.vi")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenEmail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );
    usersRepositoryInMemory.create({
      drive_license: "8029892",
      email: "moh@surjif.in",
      name: "Leon Perkins",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("moh@surjif.in");

    expect(generateTokenEmail).toBeCalled();
  });
});
