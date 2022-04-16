import React, { useState } from 'react';
import { Upload as AntUpload } from 'antd';
import ImgCrop from 'antd-img-crop';

const Upload = (props) => {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList, ...rest }) => {
    setFileList(newFileList);
    props?.onFileChange && props?.onFileChange();
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <AntUpload
        name={props.name}
        action={`${process.env.REACT_APP_FURNITURE_HOST}upload`}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </AntUpload>
  );
};

export default Upload;