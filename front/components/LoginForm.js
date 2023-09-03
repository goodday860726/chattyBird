import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 0 10px;
  }
`;

const FormItemWrapper = styled(Form.Item)`
  label {
    width: 100px;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <FormItemWrapper label='email' colon={false}>
        <Input name='user-email' type='email' value={email} onChange={onChangeEmail} required />
      </FormItemWrapper>
      <FormItemWrapper label='password' colon={false}>
        <Input name='user-password' type='password' value={password} onChange={onChangePassword} required />
      </FormItemWrapper>
      <ButtonWrapper>
        <Button loading={logInLoading} type='primary' htmlType='submit'>
          Login
        </Button>
        <Link href='/signup'>
          <Button>Sign up</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};
export default LoginForm;
