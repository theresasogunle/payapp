import gql from "graphql-tag";

export default gql`
mutation forgotPassword(
  $phonenumber: String!
  
){
forgotPassword(data: {
    phonenumber: $phonenumber
   
  }) {
    status
  }
}`