// bootcamp
$(function() {

// since this page has already been loginRequired(true)!
document.getElementById("customerlogin").style.display='none'; 

    //Send the GET request
    $.get( `/api/cartFields` ).then(function(response){
            // GET pre-posted params from server and keep them in hidden fields for further use 
            document.getElementById('hiduserid').value = response.USERID;
            document.getElementById('hidproductid').value = response.PRODUCTID;
            document.getElementById('hidproductquantity').value = response.PRODUCTQUANTITY;
            // console.log(response.USERID);  // agar direct az addressbar biyad too checkout.html ina empty hastan... (bayad control konim!)

                //Send the GET request
                $.get( `/api/cart/${document.getElementById('hiduserid').value}` ).then(function(response){
                
                    ulStr = ` <h2>Your Order</h2>
                    <ul class="list">
                        <li>
                        <a href="#">Product
                            <span>Total</span>
                        </a>
                        </li>`;

                    let totalAmount = 0;
                    for (i=0; i<response.length; i++){
                        let totalRow=0;
                        totalRow = number_format(Number(response[i].productquantity)*Number(response[i].productprice), 2);
                        ulStr = ulStr + 
                                    `<li>
                                    <a href="#">${response[i].productname}
                                        <span class="middle">x ${response[i].productquantity}</span>
                                        <span class="last">$${totalRow}</span>
                                    </a>
                                    </li>`
                        
                        totalAmount = Number(totalAmount) + Number(totalRow);

                        addOrder(response[i].userid, response[i].productid, response[i].productquantity);

                        
                        
                    }

                    ulStr = ulStr + ` </ul>`; 
                    $("#myorderbox").prepend(ulStr);

                    totalAmount = number_format(totalAmount,2);
                    $("#totalAmount").html(`<span>$${totalAmount}</span>`);

                    totalAmount = Number(totalAmount) + Number(50);
                    $("#totalAmountIncludingShipping").html(`<span>$${number_format(totalAmount,2)}</span>`);

                });
    });

});


function number_format(val, decimals){
    //Parse the value as a float value
    val = parseFloat(val);
    //Format the value w/ the specified number
    //of decimal places and return it.
    return val.toFixed(decimals);
}

function addOrder(userid, productid, productquantity){
    const newOrder={ 
        userid: userid,
        productid: productid,
        productquantity: productquantity
      };
    
      //console.log(newOrder);
    
      // Send the POST request.
      $.ajax("/api/orders", {
        type: "POST",
        data: newOrder
      }).then(
        function() {
          console.log("New Order created!");
        }
      );
}

$("#proceedtopayment").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    if ($("#termsoption").prop("checked")) {
        location.href="/payment.html";
    } else alert("please check terms & conditions!");
    
});