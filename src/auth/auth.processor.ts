import { MailerService } from "@nestjs-modules/mailer"
import { Process } from "@nestjs/bull"

export class AuthService{
    constructor(private readonly mail: MailerService){}
    @Process('verifyEmailAddress')
    async sendVerificationMail(job: any){
        const {data}= job;

        try{
            await this.mail.sendMail({
                ...data,
                subject:'Verify your Email',
                template:'verify-email',
                context:{
                    otp:data.otp,
                },
            });
        }
        catch(e){
            console.log(e);
        }
    }
}