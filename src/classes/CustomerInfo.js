class CustomerInfo{
	constructor(name,lastName,email){
    	this.firstname = name;
        this.lastName = lastName;
        this.email = email;
        
    }


    addDateOfBirth(dateOfBirth){
    	this.birthday = dateOfBirth;
    }

    addAnniversary(anniversary){
        this.anniversary = anniversary;

    }


    addPhoneNumber(phoneNumber){
        this.phone = phoneNumber;
    }

   
}

export default CustomerInfo;