"use strict";
//Customer
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return "Name: " + this.name + "\nAddress: " + this.address;
    }
}
//Order
class Order {
    constructor(date, status, customer) {
        this.orderDetails = [];
        this.payment = new Cash(0, 0);
        this.date = date;
        this.status = status;
        this.customer = customer;
    }
    addOrderDetails(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    clacSubtotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal = this.orderDetails[i].clacSubTotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcTotal() {
        return this.clacSubtotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
        return weight;
    }
    payOrder(payment) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }
    printOrderDetails() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetail();
        }
    }
}
//OrderDetail
class OrderDetail {
    constructor(quantity, taxStatus, item) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = item;
    }
    clacSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === "not included") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    printDetail() {
        console.log(this.item.getName() + "\t" + this.quantity + "(ชิ้น)\t" + this.clacSubTotal() + "฿");
    }
}
//Item
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.price = price;
        this.description = description;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 0.07;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    inStock() {
        return true;
    }
    getName() {
        return this.description;
    }
    getInfo() {
        return "Name:" + this.description + ", Price:" + this.price + "฿, Weigth:" + this.shippingWeight + " kg.";
    }
}
//Payment
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}
//cash
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getCashTendered() {
        return this.cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
}
//Check
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
        return true;
    }
}
//credit
class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    authorized() {
        return true;
    }
}
//Create Object
//customer
const customer1 = new Customer("Mr. Chole Dee", "85 Malaiman road, Nakphon Patho,");
// console.log(customer1.getInfo());
//Item
const item1 = new Item(1.5, "Lotus's water", 15);
// console.log(item1.getInfo());
const item2 = new Item(0.05, "Lay", 30);
// console.log(item2.getInfo());
const item3 = new Item(2, "mama", 6);
// console.log(item2.getInfo());
//Order
const order1 = new Order("16/12/2567", "in progress", customer1);
//OrderDetaill
const orderDetail1 = new OrderDetail(1, "not included", item1);
const orderDetail2 = new OrderDetail(2, "not included", item2);
const orderDetail3 = new OrderDetail(2, "not included", item3);
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
console.log("VAT: " + order1.calcTax() + "฿");
console.log("Recieve: " + order1.getPayment().getCashTendered());
console.log("Change: " + order1.getPayment().getChange() + "฿");
