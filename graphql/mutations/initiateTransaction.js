import gql from "graphql-tag";

export default gql`
  mutation initiateTransaction($amount: Float!) {
    initiateTransaction(data: { amount: $amount }) {
      transactionReference
    }
  }
`;
