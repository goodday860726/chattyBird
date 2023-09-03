import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Layout, Modal, Card, Avatar, Skeleton } from 'antd';
import { HomeOutlined, SearchOutlined, ProfileOutlined, LoginOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import SimpleUserProfile from './SimpleUserProfile';
import { OPEN_LOGIN_MODAL_REQUEST, CLOSE_LOGIN_MODAL_REQUEST } from '../reducers/user';

const SiderWrapper = styled(Layout.Sider)`
  width: 120px;
  li:last-child {
    text-align: center;
    height: auto;
  }
`;

const MenuWrapper = styled(Menu)`
  height: 100%;
  background-color: skyblue;
`;

function getItem(label, key, icon, title) {
  return {
    key,
    icon,
    label,
    title,
  };
}

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { Header, Content, Footer } = Layout;
  const { displayLoginModal } = useSelector((state) => state.user);
  const { me } = useSelector((state) => state.user);
  const showModal = () => {
    dispatch({ type: OPEN_LOGIN_MODAL_REQUEST });
  };

  const onCancel = () => {
    dispatch({ type: CLOSE_LOGIN_MODAL_REQUEST });
  };

  const nonMemberMenuItems = [
    getItem(<Link href={'/'}>Home</Link>, 'home', <HomeOutlined />),
    getItem(<Link href={'/search'}>Search</Link>, 'search', <SearchOutlined />),
    getItem(<Link href={'/signup'}>Signup</Link>, 'signup', <LoginOutlined />),
    getItem(<div onClick={showModal}>Login</div>, 'login'),
  ];
  const memberMenuItems = [
    getItem(<Link href={'/'}>Home</Link>, 'home', <HomeOutlined />),
    getItem(<Link href={'/profile'}>Profile</Link>, 'profile', <ProfileOutlined />),
    getItem(<Link href={'/search'}>Search</Link>, 'search', <SearchOutlined />),
    getItem(<SimpleUserProfile />, null, null, null),
  ];
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider='true' style={{ height: '100vh' }}>
      <SiderWrapper breakpoint='lg' collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <MenuWrapper mode='vertical' items={me ? memberMenuItems : nonMemberMenuItems} />
      </SiderWrapper>
      <Layout className='site-layout'>
        <Header
          style={{
            padding: 0,
            background: 'gray',
          }}
        ></Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: 'salmon',
            overflow: 'auto',
          }}
        >
          <Modal
            title='Login'
            open={displayLoginModal}
            onCancel={onCancel}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            <LoginForm />
          </Modal>
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            padding: '15px',
          }}
        >
          <a href='https://github.com/goodday860726' target='_blank'>
            ©2023 Created by goodday860726
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
