import { useState } from "react";


function Pagination({itemPerPage,totalItems,onPageChange}){
    const [currentPage,setCurrentPage]=useState(1);

    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalItems/itemPerPage);i++){
        pageNumbers.push(i);
    }

    const handleClick =(pageNumber)=>{
        setCurrentPage(pageNumber);
        onPageChange(pageNumber);
    }

    return(

        <div className="container">
            <center><ul >
                 { pageNumbers.map((num)=>(
                <li key={num} onClick={()=>handleClick(num)} >
                    <a  className="btn">{num}</a>
                </li>
                ))}
            </ul>
            </center>

        </div>
    )


}
export default Pagination;