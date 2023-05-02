import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const month = [
    { 'value': 'jan 2023' }, { 'value': 'feb 2023' }, { 'value': 'march 2023' }, { 'value': 'apr 2023' }, { 'value': 'may 2023' },
    { 'value': 'june 2023' }, { 'value': 'july 2023' }, { 'value': 'aug 2023' }, { 'value': 'sept 2023' }, { 'value': 'oct 2023' },
    { 'value': 'nov 2023' }, { 'value': 'dec 2023' },
];

const acc = [{ 'type': 'Personal Account' }, { 'type': 'Real Living' }, { 'type': 'My Dream Home' }, { 'type': 'Full Circle' },
{ 'type': 'Core Realtors' }, { 'type': 'Big Block' }];

const transType = [{ 'type': 'Home Expense' }, { 'type': 'Personal Expense' }, { 'type': 'Income' }]

const Trans = () => {
    const [formData, setFormData] = useState({
        t_id:'',
        date: '',
        month_year: '',
        transaction_type: '',
        from_acc: '',
        to_acc: '',
        amount: '',
        notes: '',
        receipt: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(() => (
            { ...formData, [e.target.name]: e.target.value }
        ))

    }

    const checkFile = (e) => {
        let file = e.target.files[0];
        let filename = e.target.files[0].name;
        let fileType = filename.split('.').pop();
        let fileSize = file.size / 1024;
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

        } else if (fileSize > 1024) {
            console.log('file size must be less than 1MB');
            errors.receipt = 'file size must be less than 1MB';
            setErrors(errors);
        }
    }


    const validate = (e) => {
        
        let date = e.target.date;
        let month = e.target.month_year;
        let trans = e.target.transaction_type;
        let from_acc = e.target.from_acc;
        let to_acc = e.target.to_acc;
        let amount = e.target.amount;
        let notes = e.target.notes;
        let receipt = e.target.receipt;

        if (date.value == '') {
            console.log('enter date');
            errors.date = 'please select date'

        }

        else if (month.value == '') {
            console.log('plese select month');
            errors.month = 'plese select month'

        }
        else if (trans.value == '') {
            console.log('select transaction type');
            errors.trans = 'please select transaction type'

        }
        else if (from_acc.value == '') {
            console.log('select from_acc ');
            errors.fromAcc = 'select from acc';

        } else if (to_acc.value == '') {
            console.log('select to_acc ');
            errors.toAcc = 'select from acc';

        } else if (from_acc.value == to_acc.value) {
            console.log('from acc and to acc must be different');
            errors.toAcc = 'from acc and to acc must be different';

        } else if (amount.value == '') {
            console.log('enter amount');
            errors.amount = 'enter amount';

        }
        else if (receipt.value == '') {
            console.log('plese select file');
            errors.receipt = 'please select file';


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


    function storelocalData() {
        

        let allData = JSON.parse(localStorage.getItem('Data') || '[]');
          // allData.push(data);
          if(allData.length==0){
              allData.push({...formData,t_id:1 });
              localStorage.setItem('Data', JSON.stringify(allData));
          }
          else{
            let prevID=allData[allData.length-1]['t_id'];
            allData.push({...formData,t_id:prevID+1 });
            localStorage.setItem('Data', JSON.stringify(allData));
          }
        // console.log('t is',t);

    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let isvalid = validate(e);
        // let isFileValid=checkFile(e);

        if (isvalid) {
            alert('data submitted...');
            storelocalData();
            navigate('/transaction');
        }

    }

    return (

        <div className="container ">
            <form onSubmit={handleSubmit} className="card">
                <h1>Transaction Form</h1>
                <div>
                    <label>Transaction Date:</label>
                    <input type="date" name="date" onChange={handleChange} />
                    <span>{errors.date}</span>
                </div>
                <div>
                    <label>Month Year: </label>
                    <select name="month_year" onChange={handleChange}>

                        {month.map((m) => (
                            <option value={m.value}>{m.value}</option>
                        ))}

                    </select> {<span>{errors.month}</span>}
                </div>
                <div>
                    <label>Transaction type: </label>
                    <select name="transaction_type" onChange={handleChange}>
                        {transType.map((t) => (
                            <option  >{t.type}</option>
                        ))}
                    </select>
                    <span>{errors.trans}</span>
                </div>
                <div>
                    <label>From Account: </label>
                    <select name="from_acc" onChange={handleChange}>
                        {
                            acc.map((a) => (
                                <option >{a.type}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>To Account: </label>
                    <select name="to_acc" onChange={handleChange}>
                        {
                            acc.map((a) => (
                                <option value={a.type}>{a.type}</option>
                            ))
                        }
                    </select> {<span>{errors.toAcc}</span>}
                </div>

                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" onChange={handleChange} />
                    {<span>{errors.amount}</span>}
                </div>

                <div>
                    <label>Receipt:</label>
                    <input type="file" name="receipt" onChange={checkFile} />
                    <span>{errors.receipt}</span>
                </div>

                <div>
                    <label>Notes:</label>
                    <textarea name="notes" onChange={handleChange} />
                    <span>{errors.notes}</span>
                </div>

                <input type="submit" />
            </form>

        </div>


    )
}

export default Trans;