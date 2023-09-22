import { gql } from "@apollo/client";

export const GET_TESTIMONIALS = gql`
    getTestimonials() {
        author
        comment
    }
`