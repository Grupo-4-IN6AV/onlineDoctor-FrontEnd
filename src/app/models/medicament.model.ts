export class MedicamentModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public typeMedicament: string,
        public price: number,
        public stock: number,
        public sales: number,
        public availibility: boolean,
        public checked: boolean
    ){}
}