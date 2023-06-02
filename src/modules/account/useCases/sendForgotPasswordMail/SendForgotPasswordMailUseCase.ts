import { IUsersRepository } from "modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "modules/account/repositories/IUsersTokensRepository";
import { randomUUID } from "node:crypto";
import { resolve } from "path";
import { IDateProvider } from "shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "ForgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = randomUUID();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação da senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
