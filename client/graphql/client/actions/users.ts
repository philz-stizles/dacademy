import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      description
      photo
    }
  }
`;