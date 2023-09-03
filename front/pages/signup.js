import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

const FormWrapper = styled(Form)`
  max-width: 450px;
  margin: auto;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>Sign up | ChattyBird</title>
      </Head>
      <FormWrapper onFinish={onSubmit}>
        <div>
          <label htmlFor='user-email'>email</label>
          <br />
          <Input name='user-email' type='email' value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor='user-nick'>nickname</label>
          <br />
          <Input name='user-nick' value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor='user-password'>password</label>
          <br />
          <Input name='user-password' type='password' value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor='user-password-check'>password check</label>
          <br />
          <Input name='user-password-check' type='password' value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>Password do not match.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            No mercy!
          </Checkbox>
          {termError && <ErrorMessage>Need to agree the term.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </FormWrapper>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log('getServerSideProps start');
//   // console.log(context.req.headers);
//   console.log(context);
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch(END);
//   console.log('getServerSideProps end');
//   await context.store.sagaTask.toPromise();
// });

export default Signup;
