import gql from "graphql-tag";

export default gql`
  {
    walletTransactionHistory {
      transactionReference
      type
      description
      amount
    }
  }
`;
