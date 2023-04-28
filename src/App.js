import TransForm from "./pages/add_transaction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllTransaction from "./pages/all_transaction/components/all_transaction";
import View from "./pages/view_transaction";

function App() {
  return (
    // <div>
    //     <TransForm/>
    // </div>

    <BrowserRouter>
        <Routes>
            <Route index element={<TransForm/>}/>
            <Route  path="/transaction" element={<AllTransaction/>}/>
            <Route  path="/transaction/:id" element={<View/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
