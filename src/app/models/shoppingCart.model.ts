export class ShoppingCartModel {
    constructor(
        public id: string,
        public user: string,
        public NIT: string,
        public products: string,
        public IVA: number,
        public subTotal: number,
        public total: number,
        public quantity: number,
        public price: number,
        public subTotalProduct: number
    ){}
}