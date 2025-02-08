import * as nodemailer from 'nodemailer';
import type { SentMessageInfo, Transporter } from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
	to: string;
	subject: string;
	html: string;
}

@Injectable()
export class EmailService {
	private transporter: Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}
	async sendUserSignupEmail(
		emailAddress: string,
		signupVerifyToken: string,
	): Promise<SentMessageInfo> {
		const baseUrl = 'http://localhost:3001';

		const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

		const mailOptions: EmailOptions = {
			to: emailAddress,
			subject: '가입 인증 메일',
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
