import gql from "graphql-tag";

export default gql`{
  user {
    id
    email
    phonenumber
    fullname
    wallet {
      amount
    }
  }
}`