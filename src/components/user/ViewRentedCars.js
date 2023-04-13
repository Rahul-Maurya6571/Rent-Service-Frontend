import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ViewRentedCars() {
    const [userEmail, setUserEmail] = useState("")
    const [rentedCars, setRentedCars] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUserEmail(user.email)
        console.log(userEmail)


        fetch("https://rent-service-backend.onrender.com/cartitems", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usertoken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rentedFor: userEmail
            })
        }).then(res => res.json())
            .then(result => {
                if(result.error){
                    console.log(result.error)
                }
                else{
                    console.log(result)
                    setRentedCars(result)
                }
            })

    }, [userEmail])
    return (
        <>
            <div><Link to="/viewcar"><button>Rent more cars</button></Link></div>
            <div className="car-container">{rentedCars.map((item, i) => {
          return <div key={i} className="car-data">
            <div><b>Model:</b> {item.model}</div>
            <div className="car-image">
              <img src={item.carImage} alt="car-img" />
            </div>
            <span><b>Seats:</b> {item.seatingCapacity}</span>
            <span className="car-rent"><b>Rent/day:</b> ₹{item.rentPerDay}</span>
            <div><b>Car Number:</b> {item.carNumber}</div>
          </div>
        })}
      </div>
            
        </>
    )

}
export default ViewRentedCars
