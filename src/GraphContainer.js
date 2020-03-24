import React, { useState, useEffect } from "react";
import "./App.scss";
import "./index.css";
import ReactGa from "react-ga";
import Navbar from "./Components/Navbar";
import FilterBox from "./Components/FilterBox";
import "react-dropdown/style.css";
import { withRouter } from "react-router-dom";
import Queries from "./Components/Queries2";
import useCalendar from "../src/hooks/useCalendar";
import styled from "styled-components";
import swal from "sweetalert";
import ClipboardJS from "clipboard";

const GraphContainer = () => {
  const [filters, setFilters] = useState({
    // old plan
    // default query setup
    // show or hide is only for the first one
    // check with russ about changes
    // first one: show or hide
    // second one: always hide
    // all rest: always show
    0: {
      nameOfFilter: "Data Series",
      selectedCategory: "Gender", // label
      selectedOption: undefined,
      avaliableOptions: [],
      selectableOptions: {
        Female: false,
        male: false
      },
      selectedTable: "Users", // value.query
      selectedTableColumnName: "gender", // value.type
      showOptions: false
    },

    1: {
      nameOfFilter: "Compare SubSamples",
      selectedCategory: "",
      selectedOption: undefined,
      avaliableOptions: [],
      selectableOptions: {},
      selectedTable: "Users",
      selectedTableColumnName: "",
      showOptions: false
    },
    2: {
      nameOfFilter: "Data Filter",
      selectedCategory: "",
      selectedOption: undefined,
      avaliableOptions: [],
      selectableOptions: {},
      selectedTable: "",
      selectedTableColumnName: "",
      showOptions: false
    }
  });
  // put the date here
  const {
    filterBoxStartDate,
    setFilterBoxStartDate,
    filterBoxEndDate,
    setFilterBoxEndDate
  } = useCalendar();

  const [hidden, setHidden] = useState(false);

  function HideFilters() {
    setHidden(!hidden);
  }

  const clipboard = new ClipboardJS(".btn", {
    text: function() {
      return document.location.href;
    }
  });
  clipboard.on("success", function(e) {
    swal({ title: "", text: "copied url!", icon: "success" });
  });

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1>Informal Cross-Border Trade Data</h1>
        </div>
        <div className="content-container">
          <ContentContainerDiv
            className={hidden ? "extend" : "chart-container"}
          >
            <SocialMediaContainer className="social-media-container">
              <div>
                <SocialMediaIconsTwitter
                  class="twitter-share-button"
                  target="_blank"
                  href="https://twitter.com/intent/tweet?text=This%20website%20is%20awesome!"
                >
                  <i class="fab fa-twitter"> Twitter</i>
                </SocialMediaIconsTwitter>
              </div>
              <div
                class="fb-share-button"
                data-href="https://blissful-pare-60612f.netlify.com/data"
                data-layout="button"
                data-size="small"
              >
                <SocialMediaIconsFacebook
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                  class="fb-xfbml-parse-ignore"
                >
                  <i class="fab fa-facebook-square"> Facebook</i>
                </SocialMediaIconsFacebook>
              </div>
              <CopyUrlButton className="btn">Copy URL</CopyUrlButton>
              <FilterHideButton onClick={HideFilters}>
                {hidden ? <p>Show Filters</p> : <p>Hide Filters</p>}
              </FilterHideButton>
            </SocialMediaContainer>
            <Queries
              filters={filters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </ContentContainerDiv>
          <div
            className={
              hidden ? "dropdown-container hide" : "dropdown-container"
            }
          >
            <FilterBox
              filters={filters}
              setFilters={setFilters}
              filterBoxStartDate={filterBoxStartDate}
              setFilterBoxStartDate={setFilterBoxStartDate}
              filterBoxEndDate={filterBoxEndDate}
              setFilterBoxEndDate={setFilterBoxEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(GraphContainer);

const FilterHideButton = styled.button`
  padding: 8px 5px;
  background: #eb5e52;
  font-weight: 400;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
  width: 95px;
  opacity: 0.75;
  border: none;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-top: 2px solid #47837f;
  border-bottom: 2px solid #47837f;
  border-left: 2px solid #47837f;
  padding: 5px;
  margin-bottom: 5px;
`;
const SocialMediaIconsTwitter = styled.a`
  font-size: 2rem;
  margin: 0 10px;
  color: rgb(0, 172, 238);
`;
const SocialMediaIconsFacebook = styled.a`
  font-size: 2rem;
  margin: 0 10px;
  color: rgb(59, 89, 152);
`;

const CopyUrlButton = styled.button`
  padding: 8px 5px;
  background: #47837f;
  font-weight: 400;
  color: white;
  border-radius: 5px;
  font-size: 1.4rem;
  width: 95px;
  opacity: 0.75;
  border: none;
  &: hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const ContentContainerDiv = styled.div`
  border-right: 2px solid #47837f;
  margin-right: 2px;
`;
