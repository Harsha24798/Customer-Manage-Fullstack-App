document.addEventListener("DOMContentLoaded", function () {
    let customerTable = document.getElementById("tblCustomer");

    if (customerTable) {
        loadCustomer();
    }
});


function loadCustomer() {
    fetch("http://localhost:8080/customer/get-all")
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let customerTable = document.getElementById("tblCustomer");
            if (!customerTable) {
                console.error("Error: Table element not found!");
                return;
            }

            let tableRow = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
            `;

            data.forEach(customer => {
                tableRow += `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.salary}</td>
                    </tr>
                `;
            });

            tableRow += `</tbody>`; 

            customerTable.innerHTML = tableRow;
        })
        .catch(error => console.error("Error fetching customers:", error));
}


function addCustomer() {
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let salary = document.getElementById("txtSalary").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "name": name,
    "address": address,
    "salary": salary
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8080/customer/add/", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function searchCustomer() {
    let name = document.getElementById("txtName").value.trim();
    
    if (name === "") {
        alert("Enter a name to search.");
        return;
    }

    fetch(`http://localhost:8080/customer/search-by-name/${name}`)
    .then((response) => response.json())
    .then((result) => {
        if (result.length === 0) {
            alert("No customer found.");
            return;
        }

        let customer = result[0];

        document.getElementById("txtName").value = customer.name;
        document.getElementById("txtAddress").value = customer.address;
        document.getElementById("txtSalary").value = customer.salary;
        document.getElementById("lblId").value = customer.id;
        console.log("ID : " + customer.id); 
        
    })
    .catch((error) => console.error(error));
}


function updateCustomer() {
    let id = document.getElementById("lblId").value;
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let salary = document.getElementById("txtSalary").value;

    if (!id) {
        alert("Search for a customer before updating.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`http://localhost:8080/customer/update-customer/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log(result);
        alert("Customer updated successfully!");
        loadCustomer();
    })
    .catch((error) => console.error(error));
}

function deleteCustomer() {
    let id = document.getElementById("lblId").value;

    if (!id) {
        alert("Search for a customer before deleting.");
        return;
    }

    if (!confirm("Are you sure you want to delete this customer?")) {
        return;
    }

    fetch(`http://localhost:8080/customer/delete/${id}`, { method: "DELETE" })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        alert("Customer deleted successfully!");
        loadCustomer(); // Refresh table
    })
    .catch(error => console.error(error));
}
