export interface singUp{
    name:string
    email:string
    password:string
}

export interface login{
    email:string,
    password:string
}

export interface product{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    originalPrice:string,
    url:string,
    deal:string,
    productId:undefined|number,
    id:number,
    quantity:undefined|number
    
}

export interface cart{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    url:string,
    id:number|undefined,
    quantity:undefined|number,
    userId:number,
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface  order{
    email:string,
    address:string,
    contact:string,
    status:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}