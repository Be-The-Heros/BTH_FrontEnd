import { Button, Input, Tooltip } from 'antd';
import React from 'react';
import { CopyOutlined } from '@ant-design/icons';

export const SuggestVerificationMobile = () => {
  const [isOpenLink, setIsOpenLinkMobile] = React.useState(false);

  return (
    <React.Fragment>
      <div
        style={{
          fontSize: '1.2rem',
        }}
      >
        Please check device have camera support
      </div>

      {isOpenLink && (
        <div className='url mt-3'>
          <div className='description'>
            Please copy and paste this link to your mobile device
          </div>
          <Input.Group compact>
            <Input
              disabled
              style={{ width: 'calc(100% - 200px)' }}
              defaultValue={window.location.href}
            />
            <Tooltip title='copy url'>
              <Button
                icon={<CopyOutlined />}
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              />
            </Tooltip>
          </Input.Group>
        </div>
      )}
      <div
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        className='mt-2'
        onClick={() => setIsOpenLinkMobile(!isOpenLink)}
      >{`${!isOpenLink ? "I don't have camera" : 'go back'}`}</div>
    </React.Fragment>
  );
};
