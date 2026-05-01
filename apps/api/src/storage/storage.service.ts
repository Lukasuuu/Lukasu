import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async getPresignedUrl(key: string) {
    return { key, url: `https://placeholder.cdn/${key}` };
  }
}
