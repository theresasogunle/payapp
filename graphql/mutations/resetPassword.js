import gql from "graphql-tag";

export default gql`mutation resetPassword($code:Int! $password:String! $phonenumber:String!){
  resetPassword(data:{
    code:$code
    password:$password
    phonenumber:$phonenumber
    
  }){
    user{
      phonenumber
    }
  }
}`