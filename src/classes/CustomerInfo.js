class CustomerInfo{
	constructor(name,phoneNumber,email){
    	this.name = name;
        this.phoneNumber = phoneNumber
        this.email = email;
        
    }


    addDateOfBirth(dateOfBirth){
    	this.dateOfBirth = dateOfBirth;
    }

    addAnniversary(anniversary){
        this.addAnniversary = anniversary;

    }

   
}

export default CustomerInfo;