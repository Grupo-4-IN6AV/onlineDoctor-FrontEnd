export class PrescriptionModel {
    constructor(
        public id: string,
        public pacient: string,
        public doctor: string,
        public medicaments: string,
        public laboratorys: string,
        public description: string,
        public AnotherMedicaments: string,
        public AnotherLaboratories: string,
        public checked: boolean
    ){}
}