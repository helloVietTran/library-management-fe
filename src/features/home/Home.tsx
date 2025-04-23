import React from "react";

import useAuthStore from "@/store/authStore";
import BoxContent from "@/components/BoxContent";
import StatisticCard from "@/components/StatisticCard";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import DashboardHeader from "./components/DashboardHeader";
import useNewUserStats from "./hooks/useNewUserStats";
import useNewBorrowRecordStats from "./hooks/useNewBorrowRecordStats";
import useNewBookStats from "./hooks/useNewBookStats";


const Home = () => {
    const { user } = useAuthStore();

    const { data: userStatsData } = useNewUserStats();
    const { data: borrowRecordStatsData } = useNewBorrowRecordStats();
    const { data: bookStatsData } = useNewBookStats();

    return (
        <div className="home">
            <DashboardHeader
                user={user || null}
            />

            <div className="grid grid-cols-3 gap-4 mb-6 mt-4">
                <BoxContent
                    className="bg-[url('/img/bg/overview-bg-6.jpg')] bg-no-repeat bg-cover bg-center rounded-none border-s-5 border-[#76ca36]"
                >
                    <StatisticCard
                        title="Người dùng mới"
                        currentValue={userStatsData?.currentMonth || 0}
                        previousValue={userStatsData?.previousMonth || 0}
                    />
                </BoxContent>

                <BoxContent
                    className="bg-[url('/img/bg/overview-bg-7.jpg')] bg-no-repeat bg-cover bg-center rounded-none border-s-5 border-[#fd8a54]"
                >
                    <StatisticCard
                        title="Lượt mượn mới"
                        currentValue={borrowRecordStatsData?.currentMonth || 0}
                        previousValue={borrowRecordStatsData?.previousMonth || 0}
                    />
                </BoxContent>

                <BoxContent
                    className="bg-[url('/img/bg/overview-bg-8.jpg')] bg-no-repeat bg-cover bg-center rounded-none border-s-5 border-[#5788ec]"
                >
                    <StatisticCard
                        title="Sách mới"
                        currentValue={bookStatsData?.currentMonth || 0}
                        previousValue={bookStatsData?.previousMonth || 0}
                    />
                </BoxContent>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="w-1/2 md:w-1/2 lg:w-1/2">
                    <LineChart
                        chartTitle="Biến động mượn trả"
                    />
                </div>

                <div className="w-1/2 md:w-1/2 lg:w-1/2">
                    <BarChart
                        chartTitle="Lượt mượn theo tháng"
                        chartLabel="Cuốn"
                    />
                </div>
            </div>

        </div>
    );
}

export default Home;