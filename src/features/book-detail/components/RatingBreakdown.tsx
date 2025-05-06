import React from 'react';

interface RatingBreakdownProps {
  ratingsBreakdown: Record;
  totalComments: number;
}

const RatingBreakdown: React.FC = ({ ratingsBreakdown, totalComments }) => {
  return (
    <div className="w-[75%] space-y-2 text-sm">
      {Object.entries(ratingsBreakdown)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([stars, value]) => {
          const percentage =
            totalComments > 0 ? (value / totalComments) * 100 : 0;

          return (
            <div key={stars} className="flex items-center pb-4">
              <div className="w-16 font-medium text-gray-700">{stars} sao</div>
              <div className="h-3 flex-1 overflow-hidden rounded-lg bg-gray-200">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="ml-2 w-24 text-sm text-gray-500">
                {percentage.toFixed(0)}%
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RatingBreakdown;
