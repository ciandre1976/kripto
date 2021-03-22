import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const CoinList = () => {
  let time = new Date().getMinutes(1);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState([{ name: "", value: 0 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
          {
            headers: {
              "X-CMC_PRO_API_KEY": "0362bf63-6515-41c9-99be-3883aa3ba767",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          let { data } = res;
          setIsLoading(true);
          setCoins(data.data);
          setIsLoading(false);
          let test = data.data;
          test.map((res) => {
            return 1;
          });
        });
    };
    fetchData();
  }, [time]);

  const HandleChange = (e, price) => {
    let value = e.target.value;
    let name = e.target.name;
    setCoin({ ...coin, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
  };

  let indexOfLastCoin = currentPage * postPerPage;
  let indexOfFirstCoin = indexOfLastCoin - postPerPage;
  let currentCoin = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  let paginate = (pagenumber) => setCurrentPage(pagenumber);

  return (
    <>
      <th>Name</th>
      <th>Short name</th>
      <th>$ Value</th>
      <th>last 24h</th>
      <th>Amount you own</th>
      <th>$ value of your coin</th>

      {currentCoin.map((coin) => {
        let res = coin.quote.USD.percent_change_24h > 0 ? "green" : "red";
        return (
          <>
            {!isLoading ? (
              <tr key={coin.id}>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>{`${coin.quote.USD.price} $`} </td>

                <td style={{ color: res }}>
                  {`${coin.quote.USD.percent_change_24h} %`}
                </td>
                <td>
                  <form>
                    <input
                      style={{ padding: "5px" }}
                      onChange={(e) => {
                        HandleChange(e, coin.quote.USD.price);
                      }}
                      placeholder="amount"
                      type="text"
                      id={coin.name}
                      name={coin.name}
                      value={coin.value}
                    />
                    <button
                      style={{ padding: "5px", width: "200px" }}
                      onSubmit={HandleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </td>

                <td style={{ color: "orange" }}>total</td>
              </tr>
            ) : (
              <>LOADING...</>
            )}
          </>
        );
      })}
      <Pagination
        postPerPage={postPerPage}
        totalPosts={coins.length}
        paginate={paginate}
      />
    </>
  );
};

export default CoinList;
