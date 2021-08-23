import React from 'react'
import './addCustomer.css'
import CloseIcon from '@material-ui/icons/Close';
import Dashnav from '../../components/dashnav/Dashnav';
function AddCustomer({ openModal, setOpenModal }) {

    //const [openModal, setOpenModal] = useState(false);
    var fileName = "myDocument.pdf";
    var fileExtension = fileName.split('.').pop(); 


    
    return (
        <div className="customersContainer">

            <CloseIcon
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 10
                }}
                onClick={setOpenModal} />
            <Dashnav title="Add Customer" />

            <div style={{
                backgroundImage: `url(/images/addcustomerbg.png)`
                , backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
                backgroundPosition: 'center right'
            }} className="addCustomerWrapper">

                <div className="addCustomerWrapperCont">
                <input label="Upload CSV" type="file" name = "upload" accept=".csv"/>
                   
                    <form className="formAddCustomer">
                        <input label="Upload CSV" type="file" name = "upload"/>
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
                        <div className="Anniversary">
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
