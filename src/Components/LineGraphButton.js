import React, { useState } from "react";
import LineGraph from "./LineGraph";
import Graph from "./Graph";

const LineGraphButton = ({
  data,
  chartData,
  filters,
  queryType,
  makeFilterList,
  buttonHandle,
  open,
  setOpen
}) => {
  const graphItems = filters[1].selectedTableColumnName !== "";

  // const buttonHandle = e => {
  //   setOpen(!open);
  // };

  const renderUpdate = () => {
    console.log(open);
    if (open === true) {
      console.log("display Line Graph");
      return (
        <>
          <LineGraph
            data={data}
            filter0={filters[0]}
            buttonHandle={buttonHandle}
          />
        </>
      );
    } else {
      console.log(`renderUpdate`, open);
      return <button onClick={() => setOpen(!open)}>Display Line Graph</button>;
    }
  };

  console.log(graphItems);

  const renderGraph = () => {
    console.log(graphItems);
    if (graphItems === true && open === false) {
      console.log("true");
      return (
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.crossFilterValues}
          groupMode={"grouped"}
          sampleSize={chartData.totalSampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
        />
      );
    } else if (graphItems === false && open === false) {
      console.log("false");
      return (
        <Graph
          data={chartData.percentageData}
          csvData={chartData.dataStructure}
          filters={filters}
          keys={chartData.keys || chartData.csvKeys}
          groupMode={"stacked"}
          sampleSize={chartData.sampleSize}
          tableName={queryType === "sessionsData" ? "Sessions" : "Users"}
        />
      );
    } else {
      return null;
    }
  };
  console.log(`renderGraph`, renderGraph());

  //console.log(sdata.sessionsData);
  if (data.sessionsData) {
    return (
      <>
        <div className="graph-titles-container">
          <div className="graph-title-diplay">
            <h1 className="graph-title">Data Series</h1>
            <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
          </div>
          <div className="graph-title-diplay">
            <h1 className="graph-title">Subsample</h1>
            <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>
          </div>
          {filters[2].selectedTableColumnName && (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
              <h3 className="graph-title-small">{makeFilterList()}</h3>
            </div>
          )}
        </div>
        {renderUpdate()}
        {renderGraph()}
      </>
    );
  } else {
    return (
      <>
        <p>No Line Graph Available</p>

        <div className="graph-titles-container">
          <div className="graph-title-diplay">
            <h1 className="graph-title">Data Series</h1>
            <h2 className="graph-title-small">{filters[0].selectedCategory}</h2>
          </div>
          <div className="graph-title-diplay">
            <h1 className="graph-title">Subsample</h1>
            <h2 className="graph-title-small">{filters[1].selectedCategory}</h2>
          </div>
          {filters[2].selectedTableColumnName && (
            <div className="graph-title-diplay">
              <h3 className="graph-title">Additional Filter</h3>
              <h3 className="graph-title-small">{makeFilterList()}</h3>
            </div>
          )}
        </div>
        {renderGraph()}
      </>
    );
  }
};

export default LineGraphButton;