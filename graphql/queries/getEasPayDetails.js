import gql from "graphql-tag";

export default gql`
  query phonenumber($phonenumber: String!) {
    getEasPayUserDetails(phonenumber: $phonenumber) {
      fullname
      phonenumber
    }
  }
`;
