import React from 'react'
import './addCustomer.css'
import NavigationComponent from "../../components/navigationComponent/NavigationComponent"

function AddCustomer() {
    return (
        <div  className="customersContainer">

           <NavigationComponent/>

            <div style = {{backgroundImage: `url(/images/addcustomerbg.png)`,backgroundRepeat: 'no-repeat',backgroundSize: 'contain',backgroundPosition: 'center right'}} className="addCustomerWrapper">


            </div>
            
        </div>
    )
}

export default AddCustomer
