'use client';

import { useCallback, useState } from 'react';
import StarRatings from 'react-star-ratings';

type Props = {};

const Rating = (props: Props) => {
  const [rating, setRating] = useState(5);

  const changeRatingHandler = useCallback(() => {}, []);

  return (
    <div className="flex items-center gap-1 flex-wrap mb-1">
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-yellow-700">4.7</span>
        <StarRatings
          rating={rating}
          starRatedColor="#e59819"
          starDimension="15px"
          starSpacing="1px"
          starHoverColor="#e59819"
          changeRating={changeRatingHandler}
          numberOfStars={5}
          name="rating"
        />
      </div>
      <div className="text-xs text-gray-500 font-normal">(12,000)</div>
    </div>
  );
};

export default Rating;
