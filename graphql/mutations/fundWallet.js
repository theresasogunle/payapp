import gql from "graphql-tag";

export default gql`
  mutation fundWallet($reference: String!) {
    fundWallet(data: { transactionReference: $reference }) {
      status
    }
  }
`;
