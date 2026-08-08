```javascript
let inventory = [];

function addProduct() {
    const name = document.getElementById("productName").value;
    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);

    if (name === "" || quantity < 0 || price < 0) {
        alert("Please enter valid product information.");
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        quantity: quantity,
        price: price
    };

    inventory.push(product);

    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";

    displayProducts();
}

function deleteProduct(id) {
    inventory = inventory.filter(product => product.id !== id);
    displayProducts();
}

function displayProducts() {
    const table = document.getElementById("inventoryTable");
    const search = document.getElementById("search").value.toLowerCase();
    const emptyMessage = document.getElementById("emptyMessage");

    table.innerHTML = "";

    const filteredInventory = inventory.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    if (filteredInventory.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    filteredInventory.forEach(product => {

        const row = document.createElement("tr");

        const status = product.quantity <= 5
            ? `<span class="low-stock">Low Stock</span>`
            : `<span class="in-stock">In Stock</span>`;

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${status}</td>
            <td>
                <button 
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}
```
