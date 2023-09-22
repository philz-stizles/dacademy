import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      description
      image_src
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse() {
    course {
      id
      name
      description
      image_src
    }
  }
`;
