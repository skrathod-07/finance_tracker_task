import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {

    const [user, setUser] = useState({
        user_id: '',
        name: '',
        email: '',
        password: '',
        confirm_password:   ''

    });

    const [errors, setErrors] = useState({ name: 'fdfd' });

    const handleChange = (e) => {
        setUser(() => (
            { ...user, [e.target.name]: e.target.value }
        ))
    }

    function storelocalData() {
        
        let allData = JSON.parse(localStorage.getItem('registerData') || '[]');
         
          if(allData.length==0){
              allData.push({...user,user_id:1 });
              localStorage.setItem('registerData', JSON.stringify(allData));
          }
          else{
            let prevID=allData[allData.length-1]['user_id'];
            allData.push({...user,user_id:prevID+1 });
            localStorage.setItem('registerData', JSON.stringify(allData));
          }      

    }
    const rand = () => {
        return Math.random().toString(36).substring(2);
      };

      const token = () => {
        return rand();
      };
      
      console.log(token());
    console.log('users:',user);
    const handleSub = (e) => {
        e.preventDefault();
        errors.email='jhj'
        // setErrors({})
        storelocalData();
        // console.log(errors);
        // if (Object.keys(errors).length == 1) {
        //     alert('sufdjkf');
        //     console.log('after set', errors);
        // }
    }

    return (
        <div className="container">
            <form className="card" onSubmit={handleSub} >
                <h1>Register Page</h1>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirm_password" onChange={handleChange} />
                </div>
                <input type="submit" />
                <p>already have an acoount? <Link to={'/login'}>Login Here</Link></p>
            </form>
        </div>
    )
}

export default Register;