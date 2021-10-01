let id = 0;

document.querySelector('#add').addEventListener('click', () => {
    const createdDate = new Date();
    const table = document.querySelector('#list');
    const row = table.insertRow(id + 1);
    row.setAttribute('id', `item-${id}`);
    row.insertCell(0).innerHTML = document.querySelector('#new-item').value;
    row.insertCell(1).innerHTML = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}-${createdDate.getDate()}`;
    row.insertCell(2).innerHTML = document.querySelector('#new-expiration-date').value;
    row.insertCell(3).innerHTML = document.querySelector('#new-quantity').value;
    const actions = row.insertCell(4);
    actions.appendChild(createDeleteButton(id++));
    resetForm();
});

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

function resetForm() {
    document.querySelector('#new-item').value = '';
    document.querySelector('#new-quantity').value = '';
    document.querySelector('#new-expiration-date').value = '';
}
