import { gql } from "apollo-boost";

export const DELETE_HERD = gql`
  mutation DeleteMutation($token: String, $target: ID) {
    removeHerd(token: $token, id: $target) {
      color
    }
  }
`;
