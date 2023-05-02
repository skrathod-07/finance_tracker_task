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
                    <div> Transaction Date: {allData[id-1].date}</div>
                    <div> Month Year: {allData[id-1].month_year}</div>
                    <div>Transaction type: {allData[id-1].transaction_type}</div>
                    <div> From Account: {allData[id-1].from_acc}</div>
                    <div> To Account: {allData[id-1].to_acc}</div>
                    <div>Amount: {Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(allData[id-1].amount)}</div>

                    <div>Receipt:
                    <div>
                        <img src={allData[id-1].receipt} width='150px' height='150px'  />
                    </div>
                    </div>
                    <div>Notes: {allData[id-1].notes}</div>
                    </div>

        </div>
    )

}

export default ViewTransaction;