import React from "react";

const RatingBars = ({ ratingsCount }) => {
  const maxCount = Math.max(...Object.values(ratingsCount));

  return (
    <div className="space-y-1 w-full">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratingsCount[star] || 0;
        const percent = maxCount ? (count / maxCount) * 100 : 0;

        return (
          <div key={star} className="flex items-center space-x-2 text-sm">
            <span className="w-4">{star}★</span>
            <div className="w-full bg-gray-200 h-2 rounded relative">
              <div
                className={`absolute left-0 top-0 h-2 ${
                  star >= 4
                    ? "bg-green-500"
                    : star === 3
                    ? "bg-yellow-400"
                    : "bg-red-400"
                } rounded`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <span className="w-12 text-right">{count.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
};

const CircleMeter = ({ label, value }) => {
  const strokeDashoffset = 100 - value * 20;

  return (
    <div className="flex flex-col  items-center">
      <svg width="60" height="60" className="mb-1">
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="5"
        />
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="none"
          stroke="#10b981"
          strokeWidth="5"
          strokeDasharray="157"
          strokeDashoffset={(157 * strokeDashoffset) / 100}
          transform="rotate(-90 30 30)"
        />
        <text
          x="30"
          y="35"
          textAnchor="middle"
          className="font-semibold text-sm fill-current text-gray-800"
        >
          {value.toFixed(1)}
        </text>
      </svg>
      <span className="text-sm text-center">{label}</span>
    </div>
  );
};

const RatingSummaryComponent = ({
  averageRating,
  totalRatings,
  ratingsCount,
  categoryRatings,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-3/4 ">
      <div className="flex">
        <h2 className="text-2xl flex-1 font-semibold mb-2">
          Ratings & Reviews
        </h2>
        <button className=" pr-5 font-semibold hover:bg-black hover:text-white text-right border-2 border-black  max-w-32 flex-1">
          {" "}
          Give Review{" "}
        </button>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
        <span className="text-xl ml-1">★</span>
      </div>
      <p className="text-gray-500 mb-4">
        {totalRatings.toLocaleString()} Ratings
      </p>

      <RatingBars ratingsCount={ratingsCount} />

      <div className="flex space-x-4 mt-6 justify-between">
        {categoryRatings.map((cat, idx) => (
          <CircleMeter key={idx} label={cat.label} value={cat.value} />
        ))}
      </div>
    </div>
  );
};

export default RatingSummaryComponent;
