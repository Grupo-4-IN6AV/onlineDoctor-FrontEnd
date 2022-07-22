export class MedicamentModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: string,
        public stock: string,
        public checked: boolean
    ){}
}