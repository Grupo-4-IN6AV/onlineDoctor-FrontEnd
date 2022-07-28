export class LaboratoryModel {
    constructor(
        public id: string,
        public pacient: string,
        public typeLaboratory: string,
        public date: string,
        public specifications: string,
        public checked: boolean
    ){}
}