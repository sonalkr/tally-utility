import { upload_dirpath } from '../global.config';

export const clear_tmp_cmd = `find ${upload_dirpath} -mmin +5 -type f -exec rm -fv {} \\;`;
