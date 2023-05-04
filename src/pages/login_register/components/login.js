import { Link } from "react-router-dom";

function Login(){
    return(
        <div className="container">
        <form className="card">
            <h1>Login Page</h1>
            <div>
                <label>Email:</label>
                <input type="text"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password"/>
            </div>
            <input type="submit"/>
            <p>Don't have an acoount? <Link to={'/register'}>Register Here</Link></p>
        </form>
</div>
    )   
}

export default  Login;