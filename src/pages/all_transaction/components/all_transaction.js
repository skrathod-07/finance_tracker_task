
import { useState } from "react";
import { Link } from "react-router-dom";
function AllTransaction() {
    const data = localStorage.getItem('Data');
    let allData = JSON.parse(data);

    const [tableData, setTabledata] = useState(allData);
    const [order, setOrder] = useState('asc');

    const sortData = (sortby) => {

        if (order === 'asc') {
            const sortedData = [...tableData].sort((a, b) =>
                a[sortby].toLowerCase() > b[sortby].toLowerCase() ? 1 : -1
            );

            setTabledata(sortedData);
            setOrder('dsc');
        }
        if (order === 'dsc') {
            const sortedData = [...tableData].sort((a, b) =>
                a[sortby].toLowerCase() < b[sortby].toLowerCase() ? 1 : -1
            );

            setTabledata(sortedData);
            setOrder('none');
        }

        if (order === 'none') {
            setTabledata(allData);
            setOrder('asc');
        }


    }

    const sortNum = (e) => {
        if (order == 'asc') {

            const sortedData = [...tableData].sort((a, b) => a[e] - b[e]
            );

            setTabledata(sortedData);
            setOrder('dsc');
        }
        if (order == 'dsc') {

            const sortedData = [...tableData].sort((a, b) => b[e] - a[e]
            );

            setTabledata(sortedData);
            setOrder('none');
        }
        if (order === 'none') {
            setTabledata(allData);
            setOrder('asc');
        }
    }

    return (
        <div className="container">
            <h1>All Transaction</h1>
            <div>
                <div>
                    <label>Grroup By:</label>
                    <select>
                        <option>none</option>
                        <option>Month Year</option>
                        <option>Transaction Type</option>
                        <option>From Account</option>
                        <option>To Account</option>
                    </select>

                </div><br />
                <table border='1px'>
                    <tr >
                        <th onClick={() => sortData('date')}>Transaction Date</th>
                        <th onClick={() => sortData('month_year')}>Month Year</th>
                        <th onClick={() => sortData('transaction_type')}>Transaction type</th>
                        <th onClick={() => sortData('from_acc')}>From Account</th>
                        <th onClick={() => sortData('to_acc')}>To Account</th>
                        <th onClick={() => sortNum('amount')}>Amount</th>
                        <th >Receipt</th>
                        <th onClick={() => sortData('notes')}>Notes</th>
                        <th >Action</th>
                    </tr>

                    {tableData.map((e, index) => (

                        <tr key={index} >
                            <td>{e.date}</td>
                            <td>{e.month_year}</td>
                            <td>{e.transaction_type}</td>
                            <td>{e.from_acc}</td>
                            <td>{e.to_acc}</td>
                            <td>{Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(e.amount)}</td>
                            <td> <img src={e.receipt} height='50px' width='50px'/> </td>
                            <td>{e.notes}</td>
                            <td> <Link to={`/transaction/${index}`}>view</Link></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}
export default AllTransaction;