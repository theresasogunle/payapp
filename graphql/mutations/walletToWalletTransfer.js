import gql from "graphql-tag";

export default gql`
  mutation walletToWalletTransfer($amount: Float!, $receiverPhone: String!) {
    walletToWalletTransfer(
      data: { amount: $amount, receiverPhone: $receiverPhone }
    ) {
      status
    }
  }
`;
