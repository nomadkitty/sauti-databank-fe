import React from "react";
import dataParse from "./dataParse";
import Graph from "./Graph";
import { filterByDate } from "../DataParseHelpers/filterByDate";

const GraphParse = ({
  data,
  filters,
  queryType,
  filterBoxStartDate,
  filterBoxEndDate
}) => {
  if (queryType === "sessionsData") {
    data = filterByDate(data, filterBoxStartDate, filterBoxEndDate);
  }

  const chartData = dataParse(
    filters[0].selectedTableColumnName,
    data[`${queryType}`],
    filters[1].selectedTableColumnName,

    filterBoxStartDate,

    filterBoxEndDate,
    filters[2].selectedTableColumnName,

    filters[0].selectedTable,
    filters[1].selectedTable
  );

  const graphItems = filters[1].selectedTableColumnName !== "";
  if (graphItems === true) {
    return (
      <>
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.crossFilterValues}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
        />
      </>
    );
  } else if (graphItems === false) {
    return (
      <>
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.keys || chartData.csvKeys}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
        />
      </>
    );
  }
};
export default GraphParse;
