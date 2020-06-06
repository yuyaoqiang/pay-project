import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';
import { helpers } from '@/utils';
import _ from 'lodash';
/**
 * general upload component for image
 */
export const GeneralUploadComponent = props => {
  const { dispatch, setImgAddress, imgAddress, sysytemLoadingState, height, width } = props;
  const [loading, setLoading] = useState<boolean>(false);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式的图片!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片超过2MB限制');
      return false;
    }
    return isJpgOrPng && isLt2M;
  }

  const loadingHandle = () => {
    if (sysytemLoadingState) {
      setLoading(true);
    }
    if (!sysytemLoadingState) {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const getUploadAddress = file => {
    return dispatch({
      type: 'systemInfo/upload',
      payload: { file },
    }).then(data => {
      const filename = data.data;
      setImgAddress(filename);
      return filename;
    });
  };

  const hasHttpStr = src => {
    const { staticAddress } = props;
    if (_.includes(src, 'http')) {
      return src;
    } else {
      return  src;
    }
  };

  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={file => getUploadAddress(file)}
      beforeUpload={beforeUpload}
      onChange={loadingHandle}
    >
      {imgAddress ? (
        <img
          src={hasHttpStr(imgAddress)}
          alt="avatar"
          style={{
            height: helpers.isJudge(height)(height, '100px'),
            width: helpers.isJudge(width)(width, '100px'),
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
