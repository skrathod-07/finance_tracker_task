import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function GroupedDataTable({ groupedData }) {
    const data = localStorage.getItem('Data');
    let allData = JSON.parse(data);

    const [tableData, setTabledata] = useState(allData);
    const [order, setOrder] = useState('asc');
    const [gData,setGdata]=useState(groupedData);

    
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
    return (

        <tbody>
            {Object.entries(groupedData).map(([category, items], i) => (
                <Fragment key={i}>

                    <br /> <tr className="btn"><th>{category}</th></tr><br />
                    
                    <tr key={category} >
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
                    
                    {
                        items.map((item, index) => (

                            <tr key={index} >

                                <>
                                    <td>{item.date}</td>
                                    <td>{item.month_year}</td>
                                    <td>{item.transaction_type}</td>
                                    <td>{item.from_acc}</td>
                                    <td>{item.to_acc}</td>
                                    <td>{Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount)}</td>
                                    <td> <img src={item.receipt} height='50px' width='50px' /> </td>
                                    <td>{item.notes}</td>
                                    <td> <Link to={`/edit/${item.t_id}`}>Edit</Link></td>
                                    <td> <Link to={`/transaction/${item.t_id}`}>view</Link></td>
                                </>
                            </tr>
                        ))
                    }
                </Fragment>

            ))}

        </tbody>

    )

}
export default GroupedDataTable;