import React, { useCallback } from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import Link from 'next/link';

const CardWrapper = styled(Card)`
  .ant-card-body {
    padding: 12px 10px;
  }
  button {
    /* margin: 10px auto; */
    margin-top: 10px;
  }
`;

const gridStyle = {
  width: '100%',
  height: '100%',
  padding: '8px',
};

const SimpleUserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Tooltip
      title={
        <>
          <div>profile</div>
          <button onClick={onLogOut}>Log Out</button>
        </>
      }
      trigger='click'
    >
      <Avatar>{me.nickname[0].toUpperCase()}</Avatar>
    </Tooltip>
  );
};

export default SimpleUserProfile;
