import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import { ListPost } from "";
const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

interface LoadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  align?: string;
  cover?: string;
}

const Loading = ({
  align = 'center',
  cover = 'inline',
  style,
}: LoadingProps) => {
  return (
    <div style={style} className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} />
    </div>
  );
};

export default Loading;
