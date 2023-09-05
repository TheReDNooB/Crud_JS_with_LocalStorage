//validates
function ValidateForm(){
    let product = document.getElementById("product").value;
    let price = document.getElementById("price").value;
    let age = document.getElementById("age").value;

    if(product == ""){
        alert("Product name is required");
        return false;
    }

    if(price == ""){
        alert("price is required");
        return false;
    }

    if(price < 1){
        alert("price must be positive number");
        return false;
    }


    if(age == ""){
        alert("age is required");
        return false;
    }
    
    if(age < 2003){
        alert("age must be mayor number");
        return false;
    }
}


//function show data
function showData(){
    let productList;

    if(localStorage.getItem("productsList") == null){
        productList = [];
    }else{
        productList = JSON.parse(localStorage.getItem("productsList"));
    }

    let html = "";

    productList.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.product + "</td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.age + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button><button onclick="updateData('+index+')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });


    document.querySelector("#crudTable tbody").innerHTML = html;
}

//loads all data when for document or page loaded
document.onload = showData();

//function to add data

function AddData(){
    //if form is validate
    if(ValidateForm() == true){
        let product = document.getElementById("product").value;
        let price = document.getElementById("price").value;
        let age = document.getElementById("age").value;


        let productList;

        if(localStorage.getItem("productsList") == null){
            productList = [];
        }else{
            productList =JSON.parse(localStorage.getItem("productsList"));
        }

        productList.push({
            product: product,
            price: price,
            age: age,
        });

        localStorage.setItem("productsList", JSON.stringify(productList));
        showData();

        document.getElementById("product").value = "";
        document.getElementById("price").value = "";
        document.getElementById("age").value = "";
    }
}