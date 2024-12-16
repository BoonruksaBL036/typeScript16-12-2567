//Customer
class Customer {
    private name:string;
    private address:string;

    constructor (name:string, address:string){
        this.name = name;
        this.address = address;
    }

    public getInfo():string{
        return "Name: "+ this.name + "\nAddress: "+ this.address;
    }
}
//Order
class Order {
    private customer: Customer
    private orderDetails: OrderDetail[] =[];
    private payment: Payment = new Cash(0, 0);
    private date: string
    private status: string

constructor(date: string, status: string, customer: Customer){
    this.date = date
    this.status = status
    this.customer = customer
}
public addOrderDetails(orderDetail: OrderDetail): void {
    this.orderDetails.push(orderDetail)
}
    public clacSubtotal(){
        let subtotal = 0;
        for(let i = 0; i <this.orderDetails.length;i++){    
        subtotal = this.orderDetails[i].clacSubTotal();
        }
        return subtotal;
    }
    public calcTax(){
        let vat = 0; 
        for(let i = 0; i <this.orderDetails.length;i++){    
        vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    public calcTotal(){
        return this.clacSubtotal() + this.calcTax();
    }
    public calcTotalWeight(){
        let weight = 0
        for(let i = 0; i <this.orderDetails.length;i++){    
        weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    public payOrder(payment:Payment){
        this.payment = payment;
    }
    public getPayment():Payment{
        return this.payment;
    }
    public printOrderDetails():void{
        for(let i=0 ;i < this.orderDetails.length; i++){
            this.orderDetails[i].printDetail();
        }
    }
}
//OrderDetail
class OrderDetail {
    private item:Item;
    private quantity: number;
    private taxStatus: string;
    
    constructor(quantity: number, taxStatus: string,item: Item) {
        this.quantity = quantity
        this.taxStatus = taxStatus
        this.item = item
    }
    public clacSubTotal(){
        return this.quantity*this.item.getPriceForQuantity();
    }
    public calcWeight(){
        return this.quantity * this.item.getShippingWeight();
    }
    public calcTax(){
        if(this.taxStatus === "not included"){
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    public printDetail():void{
        console.log(this.item.getName() + "\t"+ this.quantity + "(ชิ้น)\t"+this.clacSubTotal()+"฿");
        
    }
}
//Item
class Item {
    private shippingWeight: number;
    private description: string;
    private price:number;

    constructor(shippingWeight: number,description:string, price:number){
        this.shippingWeight = shippingWeight;
        this.price = price;
        this.description = description;
    }
    public getPriceForQuantity(){
        return this.price;
    }

    public getTax(){
        return this.price * 0.07;
    }

    public getShippingWeight():number{
        return this.shippingWeight;
    }
    public inStock(){
        return true;
    }

    public getName():string{
        return this.description
    }

    public getInfo():string{
        return "Name:"+ this.description+", Price:"+this.price +"฿, Weigth:"+this.shippingWeight+" kg.";
    }
}
//Payment
abstract class Payment {
    private amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }
    public getAmount():number{
        return this.amount;
    }

}
//cash
class Cash  extends Payment{
    private cashTendered: number

    constructor(amount: number, cashTendered: number) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    public getCashTendered():number{
        return this.cashTendered;
    }
    public getChange():number{
        return this.cashTendered - this.getAmount();
    }
}
//Check
class Check extends Payment {
    private name: string;
    private bankID: string;

    constructor(amount: number, name: string, bankID: string) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    public authorized(): boolean {
        return true
    }
}
//credit
class Credit extends Payment {
    private number: string
    private type: string
    private expDate: string

    constructor(amount: number, number: string, type: string, expDate: string) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    public authorized(): boolean {
        return true
    }
}

//Create Object
//customer
const customer1 = new Customer("Mr. Chole Dee", "85 Malaiman road, Nakphon Patho,");
// console.log(customer1.getInfo());

//Item
const item1 = new Item(1.5,"Lotus's water",15);
// console.log(item1.getInfo());

const item2 = new Item(0.05,"Lay",30);
// console.log(item2.getInfo());

const item3 = new Item(2,"mama",6);
// console.log(item2.getInfo());

//Order
const order1 = new Order("16/12/2567","in progress",customer1);

//OrderDetaill
const orderDetail1 = new OrderDetail(1, "not included",item1);
const orderDetail2 = new OrderDetail(2, "not included",item2);
const orderDetail3 = new OrderDetail(2, "not included",item3);

//OrderDetaill
order1.addOrderDetails(orderDetail1);
order1.addOrderDetails(orderDetail2);
order1.addOrderDetails(orderDetail3);

const amount = order1.calcTotal();

console.log("\nOrder Details:");
order1.printOrderDetails();

//Payment
const cash = new Cash(amount, 1000);

order1.payOrder(cash);
console.log("SubTotal: " + order1.clacSubtotal());
console.log("VAT: "+ order1.calcTax()+"฿");




console.log("Recieve: "+ (order1.getPayment() as Cash) .getCashTendered());
console.log("Change: " + (order1.getPayment() as Cash) .getChange()+"฿");



