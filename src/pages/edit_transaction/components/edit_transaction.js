import { useParams } from "react-router-dom";

const month = [
    { 'value': 'jan 2023' }, { 'value': 'feb 2023' }, { 'value': 'march 2023' }, { 'value': 'apr 2023' }, { 'value': 'may 2023' },
    { 'value': 'june 2023' }, { 'value': 'july 2023' }, { 'value': 'aug 2023' }, { 'value': 'sept 2023' }, { 'value': 'oct 2023' },
    { 'value': 'nov 2023' }, { 'value': 'dec 2023' },
];

const acc = [{ 'type': 'Personal Account' }, { 'type': 'Real Living' }, { 'type': 'My Dream Home' }, { 'type': 'Full Circle' },
{ 'type': 'Core Realtors' }, { 'type': 'Big Block' }];

const transType = [{ 'type': 'Home Expense' }, { 'type': 'Personal Expense' }, { 'type': 'Income' }]


function EditTransaction() {
    const {id} = useParams();
    const data = localStorage.getItem('Data');
    let allData = JSON.parse(data);

    return (
        <div className="container">
        
                {/* <div className="card">
                        <h1>Finance Tracker</h1>
                    <div> Transaction Date: {allData[id].date}</div>
                    <div> Month Year: {allData[id].month_year}</div>
                    <div>Transaction type: {allData[id].transaction_type}</div>
                    <div> From Account: {allData[id].from_acc}</div>
                    <div> To Account: {allData[id].to_acc}</div>
                    <div>Amount: {Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(allData[id].amount)}</div>

                    <div>Receipt:
                        
                    </div>
                    <div>Notes: {allData[id].notes}</div>
                    </div> */}


            <form className="card">
                <h1>Edit Form</h1>
                <div>
                    <label>Transaction Date:</label>
                    <input type="date" name="date"   value={allData[id].date}/>
                    {/* <span>{errors.date}</span> */}
                </div>
                <div>
                    <label>Month Year: </label>
                    <select name="month_year" value={allData[id].month_year} >

                        {month.map((m) => (
                            <option value={m.value}>{m.value}</option>
                        ))}

                    </select>
                     {/* {<span>{errors.month}</span>} */}
                </div>
                <div>
                    <label>Transaction type: </label>
                    <select name="transaction_type" value={allData[id].transaction_type} >
                        {transType.map((t) => (
                            <option  >{t.type}</option>
                        ))}
                    </select>
                    {/* <span>{errors.trans}</span> */}
                </div>
                <div>
                    <label>From Account: </label>
                    <select name="from_acc" value={allData[id].from_acc} >
                        {
                            acc.map((a) => (
                                <option >{a.type}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>To Account: </label>
                    <select name="to_acc" value={allData[id].to_acc} >
                        {
                            acc.map((a) => (
                                <option value={a.type}>{a.type}</option>
                            ))
                        }
                    </select>
                     {/* {<span>{errors.toAcc}</span>} */}
                </div>

                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" value={allData[id].amount}  />
                    {/* {<span>{errors.amount}</span>} */}
                </div>

                <div>
                    <label>Receipt:</label>
                    <input type="file" name="receipt"   />
                    <div >
                            <img src={allData[id].receipt} width='50px' height='50px'  />
                            <span className="dltImg">x</span>
                            
                            </div>
                    {/* <span>{errors.receipt}</span> */}
                </div>

                <div>
                    <label>Notes:</label>
                    <textarea name="notes" value={allData[id].notes}  />
                    {/* <span>{errors.notes}</span> */}
                </div>

                <input type="submit" />
            </form>
        </div>
    )

}

export default EditTransaction;