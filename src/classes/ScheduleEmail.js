class ScheduleEmail{
    constructor(recieverAddress, messageBody, messageSubject, schedule_date, scheduleType){
        this.recieverAddress = recieverAddress;
        this.messageBody = messageBody;
        this.messageSubject = messageSubject;
        this.schedule_date = schedule_date;
        this.scheduleType = scheduleType;
    }
}

export default ScheduleEmail