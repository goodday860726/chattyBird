import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import { HomeOutlined, SearchOutlined, ProfileOutlined, LoginOutlined } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const menuItems = [
  {
    label: <Link href={'/'}>Home!</Link>,
    icon: <HomeOutlined />,
    key: 'home',
  },
  {
    label: <Link href={'/profile'}>Profile</Link>,
    icon: <ProfileOutlined />,
    key: 'profile',
  },
  {
    label: <Link href={'/signup'}>Search</Link>,
    icon: <SearchOutlined />,
    key: 'search',
  },
  {
    label: <Link href={'/signup'}>Signup</Link>,
    icon: <LoginOutlined />,
    key: 'signup',
  },
];

const AppLayout = ({ children }) => {
  return (
    <div>
      <Layout hasSider='true'>
        <Sider width='300' breakpoint='lg'>
          <Menu mode='vertical' style={{ height: '100vh', backgroundColor: 'skyblue' }} items={menuItems} />
        </Sider>
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
            }}
          >
            {children}
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            <a href='https://github.com/goodday860726' target='_blank'>
              ©2023 Created by goodday860726
            </a>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
