import React from "react";
import VariableStatisticsTab from "../../components/VariableStatisticsTab";
import PlotDiagramsTwoTabs from "../../components/PlotDiagramTwoTabs";

const VariableStatistics = () => {
  return (
    <div className="container_height">
      <div className="w-100 border-start">
        <div className="">
          <PlotDiagramsTwoTabs />
        </div>
      </div>
      {/* <!-- cell four --> */}
      <div className="w-100 border-start">
        <VariableStatisticsTab />
      </div>
    </div>
  );
};

export default VariableStatistics;
