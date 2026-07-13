import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation EmailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      message
      data {
        token
        refreshToken
        user {
          id
          email
          name
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`;