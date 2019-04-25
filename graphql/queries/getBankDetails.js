import gql from "graphql-tag";

export default gql`
  query getBankDetails($accountNumber: String! $bankCode: String!){
  getBankDetails(data: {
    accountNumber: $accountNumber,
    bankCode: $bankCode
  }) {
    data
  }
}`;
