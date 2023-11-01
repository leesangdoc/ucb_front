import type { AppProps } from "next/app";
import StackedBarChart from "@/components/StackedBarChart";
import DonutPieChart from "@/components/DonutPieChart";

export const viewChart = ({ children }: { children: React.ReactNode }) => (
  <>
    <title>home-test</title>
    <StackedBarChart />
    <DonutPieChart/>
  </>
);
  
export default viewChart;