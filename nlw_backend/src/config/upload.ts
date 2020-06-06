import { resolve } from 'path';
import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';

export default {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename(_, file, callback) {
      const hash = randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    }
  }),
};