import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const month = [
    { 'value': 'jan 2023' }, { 'value': 'feb 2023' }, { 'value': 'march 2023' }, { 'value': 'apr 2023' }, { 'value': 'may 2023' },
    { 'value': 'june 2023' }, { 'value': 'july 2023' }, { 'value': 'aug 2023' }, { 'value': 'sept 2023' }, { 'value': 'oct 2023' },
    { 'value': 'nov 2023' }, { 'value': 'dec 2023' },
];

const acc = [{ 'type': 'Personal Account' }, { 'type': 'Real Living' }, { 'type': 'My Dream Home' }, { 'type': 'Full Circle' },
{ 'type': 'Core Realtors' }, { 'type': 'Big Block' }];

const transType = [{ 'type': 'Home Expense' }, { 'type': 'Personal Expense' }, { 'type': 'Income' }]


function EditTransaction() {
    const { id } = useParams();

    const data = localStorage.getItem('Data');
    let allData = JSON.parse(data);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        t_id: allData[id - 1].t_id,
        date: allData[id - 1].date,
        month_year: allData[id - 1].month_year,
        transaction_type: allData[id - 1].transaction_type,
        from_acc: allData[id - 1].from_acc,
        to_acc: allData[id - 1].to_acc,
        amount: allData[id - 1].amount,
        notes: allData[id - 1].notes,
        receipt: allData[id - 1].receipt
    });

    const handleChange = (e) => {
        setFormData(() => (
            { ...formData, [e.target.name]: e.target.value }
        ))
                if(e.target.name === "receipt")
                {
                    console.log("object");
                }
    }

    const handleImg = (e) => {
       
        
        // let file = e.target.files[0];
        let filename = e.target.files[0].name;
        let fileType = filename.split('.').pop();
        let fileSize = e.target.files[0].size / 1024;
        let allowedTypes = ['jpg', 'jpeg', 'png']      

        let imgData = new FileReader();
        imgData.addEventListener('load', () => {
            setFormData({ ...formData, receipt: imgData.result })
        })
        imgData.readAsDataURL(e.target.files[0]);


        if (!allowedTypes.includes(fileType)) {
            console.log('please upload jpg,jpeg or png files only..');

            errors.receipt = 'please upload jpg,jpeg or png files only..'
            
            setErrors(errors);

            return false;

        } else if (fileSize > 1024) {
            console.log('file size must be less than 1MB');
            errors.receipt = 'file size must be less than 1MB';
            setErrors(errors);
            return false;
        }
        else{
            return true;
        }
       
    }

    function storelocalData() {

        let localData = JSON.parse(data);
        localData.splice((parseInt(id) - 1), 1, formData);
        localStorage.setItem('Data', JSON.stringify(localData));
    }

    const validate = (e) => {
        
        let from_acc = e.target.from_acc;
        let to_acc = e.target.to_acc;
        let amount = e.target.amount;
        let notes = e.target.notes;
        let receipt = e.target.receipt;

        if (from_acc.value == to_acc.value) {
            console.log('from acc and to acc must be different');
            errors.toAcc = 'from acc and to acc must be different';

        } else if (amount.value == '') {
            console.log('enter amount');
            errors.amount = 'enter amount';

        }
      
        else if (notes.value == '') {
            console.log('enter notes');
            errors.notes = 'enter notes';
        }

        else if (notes.value.length > 250) {
            console.log(' enter less than 250 characters');
            errors.notes = 'enter less than 250 characters';
        }

        else {
            return true;
        }
        setErrors({ ...errors })

    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        let isvalid = validate(e);
     
        e.preventDefault();
        if(isvalid){
            alert('data updated...');
            storelocalData();
            navigate('/transaction');
        }
    }
    return (
        <div className="container">

            <form className="card" onSubmit={handleSubmit} >
                <h1>Edit Form</h1>
                <div>
                    <label>Transaction Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                    <span>{errors.date}</span>
                </div>
                <div>
                    <label>Month Year: </label>
                    <select name="month_year" value={formData.month_year} onChange={handleChange} >

                        {month.map((m) => (
                            <option value={m.value}>{m.value}</option>
                        ))}

                    </select>
                    {<span>{errors.month}</span>}
                </div>
                <div>
                    <label>Transaction type: </label>
                    <select name="transaction_type" value={formData.transaction_type} onChange={handleChange} >
                        {transType.map((t) => (
                            <option  >{t.type}</option>
                        ))}
                    </select>
                    <span>{errors.trans}</span>
                </div>
                <div>
                    <label>From Account: </label>
                    <select name="from_acc" value={formData.from_acc} onChange={handleChange}>
                        {
                            acc.map((a) => (
                                <option >{a.type}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>To Account: </label>
                    <select name="to_acc" value={formData.to_acc} onChange={handleChange}>
                        {
                            acc.map((a) => (
                                <option value={a.type}>{a.type}</option>
                            ))
                        }
                    </select>
                    {<span>{errors.toAcc}</span>}
                </div>

                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
                    {<span>{errors.amount}</span>}
                </div>

                <div>
                    <label>Receipt:</label>
                    <input type="file" name="receipt"  onChange={handleImg} />
                    <div >
                        <img src={formData.receipt} width='50px' height='50px' />

                    </div>
                    <span>{errors.receipt}</span>
                </div>

                <div>
                    <label>Notes:</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} />
                    <span>{errors.notes}</span>
                </div>
                
                <input type="submit" />

            </form>
        </div>
    )

}

export default EditTransaction;