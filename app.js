//Event listeners
const create = document.querySelector('#create');
create.addEventListener('click', onAddItem);
window.addEventListener('keyup', onAddItem);

//Initialize row counter
let id = 0;

//Purpose: Creates a new row in table with item defined in the table
function onAddItem(event) {
    if (event.type === 'click' || event.key === 'Enter') {
        const createdFullDate = new Date();

        //Replace dashes with slashes so JS can properly parse the date
        const expiredFullDate = document.querySelector('#new-expiration-date').value.replace(/-/, '/').replace(/-/, '/');
        const formattedExpiredDate = new Date(expiredFullDate);
        
        //Format dates for presentation
        const displayExpiredDate = `${formattedExpiredDate.getMonth() + 1}-${formattedExpiredDate.getDate()}-${formattedExpiredDate.getFullYear()}`;
        const displayCreatedDate = `${createdFullDate.getMonth() + 1}-${createdFullDate.getDate()}-${createdFullDate.getFullYear()}`;

        //Format dates for comparison
        const compareExpiredDate = new Date(expiredFullDate).setHours(0,0,0,0);
        const compareCreatedDate = new Date(createdFullDate).setHours(0,0,0,0);

        //Initialize row
        const table = document.querySelector('#list');
        const row = table.insertRow(id + 1);

        //Alert user if item is expired
        if (compareCreatedDate >= compareExpiredDate) {
            row.setAttribute('class', 'table-danger');
        }

        //Create all other elements in row
        row.setAttribute('id', `item-${id}`);
        row.insertCell(0).innerHTML = document.querySelector('#new-item').value;
        row.insertCell(1).innerHTML = displayCreatedDate;
        row.insertCell(2).innerHTML = displayExpiredDate;
        row.insertCell(3).innerHTML = document.querySelector('#new-quantity').value;
        const actions = row.insertCell(4);
        actions.appendChild(createDeleteButton(id++));

        resetForm();
    }
}

//Purpose: Handles creation of the Delete button
function createDeleteButton(deleteId) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.id = deleteId;
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        const elementToDelete = document.querySelector(`#item-${deleteId}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
        id--;
    }
    return btn;
}

//Purpose: to clear the initial form for the next item
function resetForm() {
    document.querySelector('#new-item').value = '';
    document.querySelector('#new-quantity').value = '';
    document.querySelector('#new-expiration-date').value = '';
}
