class CustomerInfo{
	constructor(name,lastName,email){
    	this.name = name;
        this.lastName = lastName;
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