import React from 'react';
import { useForm } from 'react-hook-form';
import 'twin.macro';

import Wrapper from '../components/page-wrapper/PageWrapper';
import Input from '../components/input/Input';
import FormGroup from '../components/form-group/FormGroup';
import CustomButton from '../components/customButton/CustomButton';
import Logo from '../components/logo/Logo';
import Error from '../components/error/Error';
import type { Credentials } from 'types/userTypes';

const Login: React.FC<{
  onLogin: (credentials: Credentials) => void;
}> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Credentials) => {
    onLogin(data);
  };

  return (
    <Wrapper>
      <form id="login-form" name="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div tw="flex flex-col items-center mb-8">
          <Logo />
          <h1 tw="text-2xl mt-8">My Store</h1>
        </div>

        <FormGroup>
          <label htmlFor="username">Username</label>
          <Input
            {...register('username', { required: true })}
            type="text"
            id="username"
            name="username"
          />
          {errors['username'] && <Error>This field is required</Error>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input
            {...register('password', { required: true })}
            type="password"
            id="password"
            name="password"
          />
          {errors['password'] && <Error>This field is required</Error>}
        </FormGroup>

        <div tw="flex justify-center mt-6 ">
          <CustomButton type="submit" form="login-form">
            Login
          </CustomButton>
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;
