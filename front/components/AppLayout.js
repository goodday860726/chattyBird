import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return (
    <>
      <Link href='/'>main</Link>
      <Link href='/profile'>profile</Link>
      <Link href='/signup'>signup</Link>
      <div>menu</div>
      <div>{children}</div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
