import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroupedDataTable from "./groupedDataTable";
import Pagination from "./pagination";

function AllTransaction() {
  const data = localStorage.getItem("Data");
  let allData = JSON.parse(data);

  const [tableData, setTabledata] = useState(allData);
  const [order, setOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [groupedData, setGroupedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;


  const handleSearch = (e) => {
    
    const value = e.target.value;
    console.log(value);
    let arr = [...allData];
    if (value !== "") {
      let d = arr.filter((item) =>
        Object.values(item).some((data) =>
          data.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setTabledata(d);
    } else {
      setTabledata(allData);
    }
  };

  const sortData = (sortby) => {
    if (order === "asc") {
      const sortedData = [...tableData].sort((a, b) =>
        a[sortby].toLowerCase() > b[sortby].toLowerCase() ? 1 : -1
      );

      setTabledata(sortedData);
      setOrder("dsc");
    }
    if (order === "dsc") {
      const sortedData = [...tableData].sort((a, b) =>
        a[sortby].toLowerCase() < b[sortby].toLowerCase() ? 1 : -1
      );

      setTabledata(sortedData);
      setOrder("none");
    }

    if (order === "none") {
      setTabledata(allData);
      setOrder("asc");
    }
  };

  const sortNum = (e) => {
    if (order == "asc") {
      const sortedData = [...tableData].sort((a, b) => a[e] - b[e]);

      setTabledata(sortedData);
      setOrder("dsc");
    }
    if (order == "dsc") {
      const sortedData = [...tableData].sort((a, b) => b[e] - a[e]);

      setTabledata(sortedData);
      setOrder("none");
    }
    if (order === "none") {
      setTabledata(allData);
      setOrder("asc");
    }
  };

  const groupBy = (array, property) => {
    return array.reduce((acc, item) => {
      const key = item[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);

      return acc;
    }, {});
  };
  const handleCategoryChange = (e) => {
  
    const category = e.target.value;
    setSelectedCategory(category);
    const dataArr = [...allData];
    const groupedBData = groupBy(dataArr, category);
    console.log('groupby data...:',groupedBData);

   let p= Object.keys(groupedBData).map((groupByColumn) =>groupedBData[groupByColumn]);
//    console.log('afeter p:',p);
    setGroupedData(groupedBData);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let dataDisplay = tableData.slice(startIndex, endIndex);
  // setTabledata(dataDisplay);

  console.log(currentPage);

  return (
    <div className="container">
      <h1>All Transaction</h1>
      <div>
        <div className="container">
          <ul>
            <li>
              <Link to={"/transaction"} className="btn">
                Add Transaction
              </Link>
            </li>
          </ul>
        </div>

        <>
          <div className="grp_src">
            <div>
              <label>Group By:</label>
              <select onChange={handleCategoryChange}>
                <option value="none">none</option>
                <option value="month_year">Month Year</option>
                <option value="transaction_type">Transaction Type</option>
                <option value="from_acc">From Account</option>
                <option value="to_acc">To Account</option>
              </select>
            </div>
          </div>
          <br />
          <table border="1px">
            <tbody>
              <>
                {selectedCategory == "none" ? (
                  <>
                    <div className="search">
                      <div>
                        search:
                        <input
                          type="text"
                          name="search"
                          onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <tr>
                      <th onClick={() => sortData("date")}>Transaction Date</th>
                      <th onClick={() => sortData("month_year")}>Month Year</th>
                      <th onClick={() => sortData("transaction_type")}>
                        Transaction type
                      </th>
                      <th onClick={() => sortData("from_acc")}>From Account</th>
                      <th onClick={() => sortData("to_acc")}>To Account</th>
                      <th onClick={() => sortNum("amount")}>Amount</th>
                      <th>Receipt</th>
                      <th onClick={() => sortData("notes")}>Notes</th>
                      <th>Action</th>
                    </tr>
                    {dataDisplay.map((e, index) => (
                      <tr key={index}>
                        <td>{e.date}</td>
                        <td>{e.month_year}</td>
                        <td>{e.transaction_type}</td>
                        <td>{e.from_acc}</td>
                        <td>{e.to_acc}</td>
                        <td>
                          {Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(e.amount)}
                        </td>
                        <td>
                          <img src={e.receipt} height="50px" width="50px" />
                        </td>
                        <td>{e.notes}</td>
                        <td>
                          <Link to={`/edit/${e.t_id}`}>Edit</Link>
                        </td>
                        <td>
                          <Link to={`/transaction/${e.t_id}`}>view</Link>
                        </td>
                      </tr>
                    ))}
                    <Pagination
                      itemPerPage={itemPerPage}
                      totalItems={tableData.length}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <GroupedDataTable groupedData={groupedData} />
                )}
              </>
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
}
export default AllTransaction;
