import gql from "graphql-tag";

export default gql`
  query authenticateUser($phonenumber: String!) {
    authenticateUser(phonenumber: $phonenumber) {
      status
      phonenumber
    }
  }
`;
