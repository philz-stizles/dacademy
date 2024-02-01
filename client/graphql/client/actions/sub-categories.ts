import { gql } from "@apollo/client";

export const GET_SUB_CATEGORIES = gql`
  query GetSubCategories {
    subCategories {
      id
      name
      category
    }
  }
`;
