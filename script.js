var table = document.getElementById("crudTable").getElementsByTagName('tbody')[0];
var data = JSON.parse(localStorage.getItem("data")) || [];
var editIndex = -1;
var isEditing = false;

function SaveDataToLocalStorage() {
    localStorage.setItem("data", JSON.stringify(data));
}

function ClearInputFields() {
    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
    document.getElementById("age").value = "";
}

function AddData() {
    var product = document.getElementById("product").value;
    var price = document.getElementById("price").value;
    var age = document.getElementById("age").value;

    if (product === "" || price === "" || age === "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'info',
            title: 'please complete all fields'
          })
        return;
    }

    var row = {
        product: product,
        price: price,
        age: age
    };

    if (isEditing) {
        data[editIndex] = row;
        isEditing = false;
        document.getElementById("submitButton").innerText = "Add Data";
    } else {
        data.push(row);
    }

    ClearInputFields();
    SaveDataToLocalStorage();
    UpdateTable();

    // alert("Datos agregados exitosamente.");
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'data successfully saved'
      })
}

function EditData(index) {
    editIndex = index;
    isEditing = true;

    var selectedItem = data[index];

    document.getElementById("product").value = selectedItem.product;
    document.getElementById("price").value = selectedItem.price;
    document.getElementById("age").value = selectedItem.age;

    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
    })
    
    Toast.fire({
    icon: 'success',
    title: 'data successfully updated'
    })
    document.getElementById("submitButton").innerText = "Update Data";
}

function DeleteData(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          data.splice(index, 1);
          SaveDataToLocalStorage();
          UpdateTable();
        }
      })

    ClearInputFields(); // Limpia los campos de entrada después de eliminar
}

function UpdateTable() {
    table.innerHTML = "";

    data.forEach(function (item, index) {
        var newRow = table.insertRow(table.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);

        cell1.innerHTML = item.product;
        cell2.innerHTML = item.price;
        cell3.innerHTML = item.age;
        cell4.innerHTML = '<button class="btn btn-warning" onclick="EditData(' + index + ')">Editar</button> ' +
            '<button class="btn btn-danger" onclick="DeleteData(' + index + ')">Eliminar</button>';
    });
}

// Cargar los datos desde el almacenamiento local al cargar la página
UpdateTable();


