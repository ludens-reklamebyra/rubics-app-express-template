import crypto from 'crypto';
import { CLIENT_SECRET } from '../utils/constants.js';

const aes_algorithm = 'aes-256-cbc';
const aes_split_char = '-';
const aes_iv_length = 16;

const encrypt = (hash: string) => aesEncrypt(hash);
const decrypt = (hash: string) => aesDecrypt(hash);
export const EncryptedString = {
  type: String,
  set: encrypt,
  get: decrypt,
};

function aesEncrypt(state: string, secret = CLIENT_SECRET): string {
  try {
    if (!state) return state;
    const iv = crypto.randomBytes(aes_iv_length);
    const cipher = crypto.createCipheriv(
      aes_algorithm,
      Buffer.from(secret, 'base64'),
      iv
    );
    const encrypted = Buffer.concat([cipher.update(state), cipher.final()]);
    return encrypted.toString('hex') + aes_split_char + iv.toString('hex');
  } catch (e) {
    return 'invalid';
  }
}

function aesDecrypt(state: string, secret = CLIENT_SECRET): string {
  try {
    const [encrypted, iv] = state
      .split(aes_split_char)
      .map((x) => Buffer.from(x, 'hex'));
    const decipher = crypto.createDecipheriv(
      aes_algorithm,
      Buffer.from(secret, 'base64'),
      iv
    );
    const decrypted = decipher.update(encrypted);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  } catch (e) {
    console.error('aesDecrypt', e);
    return state;
  }
}

export { encrypt, decrypt };
