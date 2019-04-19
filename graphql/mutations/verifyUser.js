import gql from "graphql-tag";

export default gql`mutation verifyUser(
  $phonenumber: String!
  $code: Int!
){
  verifyUser(data: {
    phonenumber: $phonenumber
    code: $code
  }) {
    token
  }
}`