import * as nodemailer from "nodemailer";
import type { SentMessageInfo, Transporter } from "nodemailer";

import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { emailConfig } from "#/config/email.config.js";

import type { ConfigType } from "@nestjs/config";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }
  async sendUserSignupEmail(
    emailAddress: string,
    signupVerifyToken: string,
  ): Promise<SentMessageInfo> {
    const baseUrl = this.config.baseUrl;

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: "가입 인증 메일",
      html: `
            가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
            <form action="${url}" method="POST">
            <button>가입확인</button>
            </form>
            `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
