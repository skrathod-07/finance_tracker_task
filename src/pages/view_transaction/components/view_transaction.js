import { useParams } from "react-router-dom";


function ViewTransaction() {
    const {id} = useParams();
    console.log(id);
    const data = localStorage.getItem('Data');
    let allData = JSON.parse(data);

    return (
        <div className="container">
        
                <div className="card">
                        <h1>Finance Tracker</h1>
                    <div> Transaction Date: {allData[id].date}</div>
                    <div> Month Year: {allData[id].month_year}</div>
                    <div>Transaction type: {allData[id].transaction_type}</div>
                    <div> From Account: {allData[id].from_acc}</div>
                    <div> To Account: {allData[id].to_acc}</div>
                    <div>Amount: {Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(allData[id].amount)}</div>

                    <div>Receipt:
                        <div className="card">
                            <img src={allData[id].receipt} width='200px' height='200px'  />
                            </div>
                    </div>
                    <div>Notes: {allData[id].notes}</div>
                    </div>

        </div>
    )

}

export default ViewTransaction;