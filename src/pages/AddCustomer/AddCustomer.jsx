import React from 'react'
import './addCustomer.css'
import NavigationComponent from "../../components/navigationComponent/NavigationComponent"

function AddCustomer() {
    return (
        <div className="customersContainer">

            <NavigationComponent title="Add Customer" />

            <div style={{
                backgroundImage: `url(/images/addcustomerbg.png)`
                , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                backgroundPosition: 'center right'
            }} className="addCustomerWrapper">


                <div className="addCustomerWrapperCont">
                    <button className="addCustomerButton">Upload CSV</button>

                    <form className="formAddCustomer">
                        <input className="addforminput" type="text" name="username" placeholder="FirstName" />
                        <input className="addforminput" type="text" name="username" placeholder="Lastname" />

                        <div className="addCustomerInsideInput">

                            <input className="addforminputin" type="text" name="username" placeholder="Phone Numner" />
                            <div className="addforminputinImg spaceleft" >
                                <input className="addforminputi" type="text" name="username" placeholder="Birthday" />
                                <img src="/images/calendar.png" alt="" />
                            </div>



                        </div>

                        <input className="addforminput" type="email" name="email" placeholder="Email" />
                        <div className = "Anniversary">
                            <input className="addformLast" type="email" name="Anniversary" placeholder="Anniversary" />
                            <img src="/images/calendar.png" alt="" />
                        </div>

                        <div className="submitcont">
                            <input className="submiting" type="submit" name="submit" />
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default AddCustomer
