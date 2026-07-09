import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

type SignupData = {
  signup: { token: string };
};

type SignupVars = {
  email: string;
  password: string;
  name: string;
};

type LoginData = {
  login: { token: string };
};

type LoginVars = {
  email: string;
  password: string;
};

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
` as TypedDocumentNode<SignupData, SignupVars>;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
` as TypedDocumentNode<LoginData, LoginVars>;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ login: true, email: '', password: '', name: '' });

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.login) {
        localStorage.setItem(AUTH_TOKEN, data.login.token);
        navigate('/');
      }
    },
  });

  const [signupMutation] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      if (data && data.signup) {
        localStorage.setItem(AUTH_TOKEN, data.signup.token);
        navigate('/');
      }
    },
  });

  const handleLogin = () => {
    loginMutation({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });
  };

  const handleSignup = () => {
    signupMutation({
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
    });
  };

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button className="pointer mr2 button" onClick={formState.login ? handleLogin : handleSignup}>
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={() => setFormState({ ...formState, login: !formState.login })}
        >
          {formState.login ? 'need to create an account?' : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;