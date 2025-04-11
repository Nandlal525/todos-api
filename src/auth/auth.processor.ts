import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';

@Processor('auth')
export class AuthProcessor {
  constructor(private readonly mail: MailerService) {}

  @Process('verifyEmailAddress')
  async sendVerificationMail(job: any) {
    const { data } = job;

    try {
      await this.mail.sendMail({
        ...data,
        subject: 'Verify your Email',
        template: 'verify-email',
        context: {
          otp: data.otp,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
