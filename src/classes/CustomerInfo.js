class CustomerInfo{
	constructor(name,lastname,email){
    	this.firstname = name;
        this.lastname = lastname;
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

    getBirthday(){
        return this.birthday;
    }

    getAnniversary(){
        return this.anniversary;
    }

    getPhoneNumber(){
        return this.phone;
    }

   
}

export default CustomerInfo;