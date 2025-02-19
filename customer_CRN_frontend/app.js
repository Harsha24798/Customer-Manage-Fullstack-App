
loadCustomer()

function loadCustomer() {
    fetch("http://localhost:8080/customer/get-all")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        

        let tableRow = `
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Salary</th>
                </tr>
            </thead>
        `;

        let customerTable = document.getElementById("tblCustomer");

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

        customerTable.innerHTML = tableRow;
    })
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

    fetch("http://localhost:8080/customer/add", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}