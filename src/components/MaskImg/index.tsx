import React from 'react';
import { BackTop } from 'antd';

export const MaskImg = props => {
  const { imgSrc, visiable } = props;
  return (
    <div
      onClick={() => visiable()}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        background: '#000000',
        opacity: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 99999,
      }}
    >
      123123
      <img
        src={imgSrc}
        style={{
          display: 'block',
          minHeight: '300px',
          minWidth: '300px',
          border: '1px solid #fff',
        }}
      ></img>
    </div>
  );
};
