// bootcamp
$(function() {

    //Send the GET request
    $.get( `/api/products/${9}` ).then(function(response){
        console.log( `productList: `, response);
        document.getElementById('hiduserid').value = 'sahar1';
        document.getElementById('hidproductid').value = response.productid;

        document.getElementById('productdescription').innerHTML = `<p>${response.productdescription}</p>`;
        document.getElementById('productname').innerHTML = `<h3>${response.productname}</h3>`; 
        document.getElementById('productprice').innerHTML = `<h2>$${response.productprice}</h2>`; 
        document.getElementById('productimage').setAttribute("src", "/assets/img/.../Bel-Air+Sofa.jpg"); 
      });

      $("#addtocart").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
       
        var newCartItem = {
          userid: $("#hiduserid").val().trim(),
          productid: $("#hidproductid").val().trim(),
          productquantity: $("#productquantity").val().trim()
        };
      
        //Send the POST request..
        $.ajax("/api/carts", { 
          type: "POST",
          data: newCartItem
        }).then(
          function(data) {
            console.log("New item added to cart!");
            console.log(data);
            location.href="/cart.html"
          }
        );
      });

});