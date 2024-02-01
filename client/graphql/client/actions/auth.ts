import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($data: SignupInput) {
    signup(data: $data) {
      success
      code
      message
      data {
        first_name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($credentials: LoginInput) {
    login(credentials: $credentials) {
      last_name
      first_name
      email
      token
    }
  }
`;