import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./CarForm.css";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function AddCar() {
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("")
  // const navigate = useNavigate()
  const [agencyCarData, setAgencyCarData] = useState([])
  const [showRegisterPage, shouldShowRegisterPage] = useState(true)

  useEffect(() => {
    /*
    -now we have our url now we can make a seperate network req to our server to post the data
    -but posting the photo to cloudinary and using that setting the url is time taking thats why we are making network call in use effect

    -but this is kick in when component is mount so to prevent this we will use if we have url the this will gonna execute this network call */
    if (url) {
      shouldShowRegisterPage(false)

      fetch("https://rent-service-backend.onrender.com/addcar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("agencytoken")
        },
        body: JSON.stringify({
          model: model,
          carNumber: number,
          seatingCapacity: seatingCapacity,
          rentPerDay: rentPerDay,
          carImage: url
        })
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          if (data.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_CENTER
            })
          }
          else {
            console.log(data.addedBy)
            getAddedCars(data.addedBy._id)

            toast.success("Car added successfully", {
              position: toast.POSITION.TOP_CENTER
            })
            setImage("")
            setModel("")
            setNumber("")
            setRentPerDay("")
            setSeatingCapacity("")

            
          }
        }).catch(err => console.log(err))
    }
  }, [url])


  /* if we have agencyEmail */
  const getAddedCars = (id) => {
    fetch("https://rent-service-backend.onrender.com/addedcar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("agencytoken")
      },
      body: JSON.stringify({ agencyId: id })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setAgencyCarData(result)
      })
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "car-rental")
    data.append("cloud_name", "dxtihuids")
    fetch("https://api.cloudinary.com/v1_1/dxtihuids/image/upload", {//api base url
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
        // console.log(typeof (data.url))
        // console.log(data.url)
      })//after clicking on submit we will have a data in the browser console,inside the data there is a url try to run this url in different tab u will see yr image there
      .catch(err => console.log(err))
  };

  return (
    <>
      {!showRegisterPage && 
      <>
      <span>Add More Cars :&nbsp;</span>
      <span style={{float:"right",marginRight:"20px"}}>
        <Link to="/bookedcars"><button>Show Booked cars</button></Link>
      </span>
      <button onClick={()=>{shouldShowRegisterPage(true)}}>Add</button>
      </>}
      {showRegisterPage && <form className="car-form" onSubmit={handleSubmit}>
        <h3>Add New Car</h3>
        <div className="form-control">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) => setImage(event.target.files[0])}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="model">Vehicle Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="number">Vehicle number:</label>
          <input
            type="text"
            id="number"
            name="number"
            minLength={8}
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="seatingCapacity">Seating Capacity:</label>
          <input
            type="number"
            id="seatingCapacity"
            name="seatingCapacity"
            value={seatingCapacity}
            min={2}
            onChange={(event) => setSeatingCapacity(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="rentPerDay">Rent per day:</label>
          <input
            type="number"
            id="rentPerDay"
            name="rentPerDay"
            value={rentPerDay}
            onChange={(event) => setRentPerDay(event.target.value)}
            required
          />
        </div>

        <button type="submit">Add Car</button>
      </form>}
      {!showRegisterPage && <div className="car-container">
        {agencyCarData.map((item, i) => {
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
      </div>}
    </>
  );
}

export default AddCar;
