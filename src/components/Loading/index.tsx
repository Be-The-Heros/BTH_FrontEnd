import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import { ListPost } from "";
const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

interface LoadingProps {
  align?: string;
  cover?: string;
}
const Loading = ({ align = 'center', cover = 'inline' }: LoadingProps) => {
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} />
    </div>
  );
};

export default Loading;
