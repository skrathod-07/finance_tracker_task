import TransForm from "./pages/add_transaction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllTransaction from "./pages/all_transaction/components/all_transaction";
import Edit from "./pages/edit_transaction";
import View from "./pages/view_transaction";
import Login from "./pages/login_register/components/login";
import Register from "./pages/login_register/components/register";

function App() {
  return (
    // <div>
    //     <TransForm/>
    // </div>

    <BrowserRouter>
        <Routes>
            <Route index element={<AllTransaction/>}/>
            <Route  path="/transaction" element={<TransForm/>}/>
            <Route  path="/edit/:id" element={<Edit/>}/>
            <Route  path="/transaction/:id" element={<View/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
