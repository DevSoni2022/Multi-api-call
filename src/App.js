import "./App.css";
import { useEffect, useState } from "react";
const API_URL = "https://swapi.dev/api/people/";
const App = () => {
  const [data, setData] = useState("");
  const [grpData, setGrpData] = useState([]);
  const [showData, setShowData] = useState([]);
  const fetchData = async () => {
    const data = await fetch(API_URL);
    const res = await data.json();
    res && res.results && setData(res.results);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchListData = async (ele) => {
    const filterData = data.filter((e) => e.name === ele.target.value);

    let arr = [];
    const { films, vichles, species } = filterData && filterData[0];
    let obj = [...(films || ""), ...(vichles || ""), ...(species || "")];
    const getvalues = Object.values(obj || "");
    const response = await Promise.all(
      getvalues.map((url) => executeAsyncTask(url))
    );
    console.log(response);

    response &&
      response.length > 0 &&
      response.map((ele, index) => {
        arr.push(ele.title ? ele.title : ele.name);
      });
    setGrpData(arr);
  };
  const executeAsyncTask = async (url) => {
    const data = await fetch(url);
    const res = await data.json();
    return res;
  };

  return (
    <div className="App">
      <select onChange={(ele) => fetchListData(ele)}>
        {data &&
          data.map((ele, index) => {
            return (
              <option
                value={ele.name}
                onChange={(ele) => fetchListData(ele)}
                key={index}
              >
                {ele.name}
              </option>
            );
          })}
      </select>

      {grpData &&
        grpData.length > 0 &&
        grpData.map((ele, index) => {
          return (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                gap: "10px",
                padding: "10px",
                fontSize: "20px",
                fontWeight: "500px",
              }}
            >
              {ele}
            </span>
          );
        })}
    </div>
  );
};

export default App;
