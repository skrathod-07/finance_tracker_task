import { Fragment } from "react";
import { Link } from "react-router-dom";

function GroupedDataTable({ groupedData }) {

    console.log(groupedData, "groupedData    `")
    console.log(Object.entries(groupedData), "Object.entries(groupedData)");

    return (

        <tbody>
            {Object.entries(groupedData).map(([category, items], i) => (
                <Fragment key={i}>
                
                    <tr><th>{category}</th></tr>

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