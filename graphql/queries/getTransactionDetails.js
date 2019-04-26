import gql from "graphql-tag";

export default gql`
  query getTransactionDetails($transactionReference: String!) {
  getTransactionDetails(transactionReference: $transactionReference) {
    medium
    amount
    transactionReference
    total
    fee
    mediumName
    mediumNumber
    status
  }
}
`