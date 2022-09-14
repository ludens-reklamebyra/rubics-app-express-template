export interface File {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
  encoding: string;
  size: number;
}
