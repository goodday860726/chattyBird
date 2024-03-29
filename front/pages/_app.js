import PropTypes from 'prop-types';
import Head from 'next/head';
import '../styles/global.css';

import wrapper from '../store/configureStore';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Chatty Bird</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(App);
