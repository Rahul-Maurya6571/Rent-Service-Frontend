import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

function Header(){
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate()
    const handleSelectChange = (event) => {
        const agencyToken = localStorage.getItem("agencytoken")
        const userToken = localStorage.getItem("usertoken")

        if(agencyToken){
            localStorage.removeItem("agencytoken")
            localStorage.removeItem("agency")
        }
        if(userToken){
            localStorage.removeItem("usertoken")
            localStorage.removeItem("user")
        }

        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        navigate(selectedValue);
      };

      const handleRegister = ()=>{
        const agencyToken = localStorage.getItem("agencytoken")
        const userToken = localStorage.getItem("usertoken")
        
        if(agencyToken){
            localStorage.removeItem("agencytoken")
            localStorage.removeItem("agency")
        }
        if(userToken){
            localStorage.removeItem("usertoken")
            localStorage.removeItem("user")
        }
        
      }
    return<><header className="header">
        <span onClick={()=>{navigate("/")}}>Car Rental</span>
        <span className="header_links">
            <span>
                Signin&nbsp; 
                <select value={selectedOption} style={{width:"20px"}} onChange={handleSelectChange}>
                    {/* <option value=""></option> */}
                    <option value="/agencysignin">Agency</option>
                    <option value="/usersignin">Customer</option>
                </select>

            </span>
            <span><Link onClick={handleRegister} className="no_underline" to="/register">Register</Link></span>
        </span>
    </header>
    <div>
        {/* <img style={{zIndex:"-1"}} src="https://wallpapers.com/images/featured/yvujuqnic9e56nsg.jpg" alt="car.jpg"/> */}
    </div>
    </>
}
export default Header