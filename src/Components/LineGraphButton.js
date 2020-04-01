import React, { useState } from "react";
import LineGraph from "./LineGraph";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Loader from "react-loader-spinner";

const LineGraphButton = ({ sdata, filter0 }) => {
  const [open, setOpen] = useState(false);

  console.log(filter0.selectedCategory);
  console.log(filter0.selectedTableColumnName);

  const SESSIONS_QUERY = gql`
query getData {
  sessionsData {
   ${filter0.selectedTableColumnName}
  }
}
`;

  const { data, loading, error } = useQuery(SESSIONS_QUERY);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={100000}
        />
      </div>
    );
  }

  if (error) {
    return <p>error</p>;
  }

  const buttonHandle = e => {
    setOpen(!open);
  };
  if (sdata.sessionsData) {
    return (
      <>
        <button onClick={buttonHandle}>
          Display Line Graph
          <LineGraph data={sdata} filter0={filter0} />
        </button>
      </>
    );
  } else {
    return <p>No Line Graph Available</p>;
  }
};

export default LineGraphButton;
