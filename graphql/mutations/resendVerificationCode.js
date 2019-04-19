import gql from "graphql-tag";

export default gql`mutation resendVerificationCode(
  $phonenumber: String!
){
  resendVerificationCode(data: {
    phonenumber: $phonenumber
  }) {
    status
    message
  }
}`