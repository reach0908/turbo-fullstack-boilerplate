import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionUtil {
	private readonly ENCRYPTION_KEY: Buffer;
	private readonly IV_LENGTH = 16;
	private readonly ALGORITHM = 'aes-256-cbc';

	constructor(private configService: ConfigService) {
		const key = this.configService.get<string>('auth.encryption.key');
		this.ENCRYPTION_KEY = key ? Buffer.from(key) : randomBytes(32);
	}

	encrypt(text: string): string {
		const iv = randomBytes(this.IV_LENGTH);
		const cipher = createCipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv);

		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);

		return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
	}

	decrypt(text: string): string {
		const [ivHex, encryptedHex] = text.split(':');
		const iv = Buffer.from(ivHex, 'hex');
		const encrypted = Buffer.from(encryptedHex, 'hex');

		const decipher = createDecipheriv(
			this.ALGORITHM,
			this.ENCRYPTION_KEY,
			iv,
		);

		let decrypted = decipher.update(encrypted);
		decrypted = Buffer.concat([decrypted, decipher.final()]);

		return decrypted.toString();
	}
}
