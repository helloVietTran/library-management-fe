import { FC } from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';

interface StatisticCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  borderRightColor?: 'green' | 'orange' | 'blue';
}

const StatisticCard: FC = ({
  title,
  currentValue,
  previousValue,
  borderRightColor = 'green',
}) => {
  const difference = currentValue - previousValue;
  return (
    <div
      className={`statistic-card w-full border-${borderRightColor} text-primary`}
    >
      <div className="gap flex items-center justify-between">
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <div className="mt-2 flex items-center">
        <span className="total mr-4 text-3xl font-bold">{currentValue}</span>

        <div>
          <div
            className={`mt-2 flex items-center text-sm ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {difference >= 0 ? (
              <FaArrowTrendUp size={20} className="mr-2" />
            ) : (
              <FaArrowTrendUp size={20} className="mr-2 rotate-180" />
            )}

            <span>{difference >= 0 ? '+' + difference : '-' + difference}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Tháng trước: {previousValue}
      </div>
    </div>
  );
};

export default StatisticCard;
