import React from "react";
import RatingSummaryComponent from "./RatingSummaryComponent";

const Demo = () => {
  const ratingsCount = {
    5: 4700,
    4: 128,
    3: 574,
    2: 287,
    1: 694,
  };

  const categoryRatings = [
    { label: "Sound Quality", value: 3.8 },
    { label: "Bass", value: 3.7 },
    { label: "Design & Build", value: 3.8 },
  ];

  const totalRatings = Object.values(ratingsCount).reduce((a, b) => a + b, 0);
  const averageRating =
    Object.entries(ratingsCount).reduce((sum, [star, count]) => {
      return sum + parseInt(star) * count;
    }, 0) / totalRatings;

  return (
    <div className="px-10 mt-10 flex justify-start">
      <RatingSummaryComponent
        averageRating={averageRating}
        totalRatings={totalRatings}
        ratingsCount={ratingsCount}
        categoryRatings={categoryRatings}
      />
    </div>
  );
};

export default Demo;
