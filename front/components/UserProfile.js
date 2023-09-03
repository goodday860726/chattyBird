import React, { useCallback } from 'react';
import { Card, Avatar, Skeleton } from 'antd';
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

const { Meta } = Card;
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card>
      <Card.Grid style={{ width: '100%' }} hoverable={false}>
        <Skeleton loading={logOutLoading} active>
          <Meta avatar={<Avatar>{me.nickname[0].toUpperCase()}</Avatar>} title={me.nickname} />
        </Skeleton>
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        <Link href={`/user/${me.id}`}>chatty {me.Posts.length}</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        <Link href='/profile'>following {me.Followings.length}</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        <Link href='/profile'>follower {me.Followers.length}</Link>
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        <LogoutOutlined onClick={onLogOut} key='logout' /> LOG OUT,
      </Card.Grid>
    </Card>
  );
};

export default UserProfile;
