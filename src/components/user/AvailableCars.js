import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import cart from "../../Images/cart.png"
import { Link } from "react-router-dom";
function AvailableCars() {
    const [cars, setCars] = useState([])
    const [selectedOptionValue,setSelectedOptionValue] = useState("")
    const [userEmail,SetUserEmail] = useState("")

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"))
        SetUserEmail(user.email)

        fetch("https://rent-service-frontend.onrender.com/allcars", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usertoken"),
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                if (result.error) {
                    toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                else {
                    console.log(result)
                    setCars(result)
                }
            })
    }, [])

    const bookCar = (carModel,id) => {
        console.log(id,carModel)
        console.log(selectedOptionValue)
        if(userEmail){
            fetch("https://rent-service-frontend.onrender.com/rentcar", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usertoken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: carModel,
                days:selectedOptionValue,
                rentedFor:userEmail
            })
        }).then(res => res.json())
            .then(result => {
                if(result.error) {
                    toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                if(result.message) {
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    setSelectedOptionValue("")
                }
            })
        }
        
    }

    const handleSelectChange =(e)=>{
        setSelectedOptionValue(e.target.value)
        
    }

    return <>
    <div className="cart">
        <Link to="/viewrentedcars"><img src={cart} alt="cart.png" /></Link>
    </div>
    <div className="car-container">
        {cars.map((item, i) => {
            return <div key={i} className="car-data">
                <div><b>Model:</b> {item.model}</div>
                <div className="car-image">
                    <img src={item.carImage} alt="car-img" />
                </div>
                <span><b>Seats:</b> {item.seatingCapacity}</span>
                <span className="car-rent"><b>Rent/day:</b> ₹{item.rentPerDay}</span>
                <div>
                    <span className="car-number"><b>Number:</b> {item.carNumber}</span>
                    <span className="car-rent">
                        <b>Days:</b>
                        <select value={selectedOptionValue} className="rent-days" onChange={handleSelectChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    </span>
                    
                </div>
                <div className="book-car" onClick={() => bookCar(item.model,item.addedBy)}>
                    <span>Rent Car</span>
                </div>
            </div>
        })}
    </div>
    </>
}
export default AvailableCars