import gql from "graphql-tag";

export default gql`mutation signUp(
  $phonenumber: String!
  $fullname: String!
  $email: String!
  $dob: String!
  $gender: Gender!
  $password: String!
) {
  signUp(data: {
    phonenumber: $phonenumber
    fullname: $fullname
    email: $email
    DOB: $dob
    gender: $gender
    password: $password
  }) {
    status
    message
    user {
      fullname,
      email
    }
  }
}`