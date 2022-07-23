export class AppointmentModel {
    constructor(
        public id: string,
        public pacient: string,
        public doctor: string,
        public date: string,
        public modality: string,
        public checked: boolean
    ){}
}