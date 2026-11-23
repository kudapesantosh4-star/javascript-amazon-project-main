export const cart = [
    
];

export function addtocart(){let matchingitem ;

           cart.forEach((cartitem) =>{
            if(productid === cartitem.productid){
                matchingitem = item;
            }

           });
           
           if(matchingitem){
            matchingitem.quantity += 1;
           } else {

           
            cart.push({
                productid: productid,
                quantity
            });
        };

}