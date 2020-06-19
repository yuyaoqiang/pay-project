import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class SystemInfoService {

  // 图片上传
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static upload(params) {
    const formData = new FormData();
    formData.append('file_data', params.file);
    return request( '/storage/uploadPic', { method: 'post', data: formData },);
  }
}

export default SystemInfoService;
