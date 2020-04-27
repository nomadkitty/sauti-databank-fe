export const QUERIES = "QUERIES";
export const LOADQUERY = "LOADQUERY";
export const ERROR = "ERROR";

export const getQuery = data => dispatch => {
  console.log(data, "this is the data in the actions");
  dispatch({ type: LOADQUERY });
  async function query(queryData) {
    try {
      console.log(queryData, "its hitting the try");
      dispatch({ type: QUERIES, payload: queryData });
    } catch (err) {
      dispatch({ type: ERROR, payload: "error" });
    }
  }
  query(data);
};