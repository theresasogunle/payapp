import gql from "graphql-tag";

export default gql`
  mutation walletToBankTransfer(
    $amount: Float!
    $accountNumber: String!
    $bankCode: String!
  ) {
    walletToBankTransfer(
      data: {
        amount: $amount
        accountNumber: $accountNumber
        bankCode: $bankCode
      }
    ) {
      status
    }
  }
`;
