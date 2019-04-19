import gql from "graphql-tag";

export default gql`mutation loginUser(
  $phonenumber: String!
  $password: String!
) {
  loginUser(data: {
    phonenumber: $phonenumber,
    password: $password
  }) {
    token
    user {
      verified
      fullname
    }
  }
}`