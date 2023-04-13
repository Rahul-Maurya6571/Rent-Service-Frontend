import { useEffect, useState } from "react"

function BookedCars(){
const [bookedCars,setBookedCars] = useState([])

    useEffect(()=>{
        fetch("https://rent-service-frontend.onrender.com/bookedcars",{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("agencytoken"),
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setBookedCars(result)
        })
    },[])
    return  <div className="car-container">{bookedCars.map((item, i) => {
        return <div key={i} className="car-data">
          <div><b>Model:</b> {item.model}</div>
          <div className="car-image">
            <img src={item.carImage} alt="car-img" />
          </div>
          <span><b>Seats:</b> {item.seatingCapacity}</span>
          <span className="car-rent"><b>Rent/day:</b> ₹{item.rentPerDay}</span>
          <div><b>Car Number:</b> {item.carNumber} <span style={{float:"right"}}>Total Price :{item.totalPrice}</span></div>
        </div>

      })}</div>
      
}
export default BookedCars