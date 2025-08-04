import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Customer } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: Customer) {
    const url = `${process.env.api_url}/api/customers/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Prisma-TEST App!',
      template: './confirmation',
      context: {
        username: user.full_name,
        url,
      },
    });
  }
}
