const uri = 'api/Movie';
let todos = [];

function getItems() {
  fetch("https://localhost:7053/GetAllMovies")
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}



function addItem() {
  const ID = document.getElementById('ID');
  const TITLE = document.getElementById('TITLE');
  const RELDT = document.getElementById('RELDT');
  const GENRE = document.getElementById('GENRE');
  const PRICE = document.getElementById('PRICE');

  const item = {
    id: ID.value.trim(),
    title: TITLE.value.trim(),
    releaseDate: RELDT.value.trim(),
    genre: GENRE.value.trim(),
    price: PRICE.value.trim()
  };


  fetch("https://localhost:7053/AddMovie", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      ID.value = '';
      TITLE.value = '';
      RELDT.value = '';
      GENRE.value = '';
      PRICE.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  const luri = "https://localhost:7053/DeleteMovie";

  fetch(`${luri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('EID').value = item.id;
  document.getElementById('ETITLE').value = item.title;
  document.getElementById('ERELDT').value = item.releaseDate;
  document.getElementById('EGENRE').value = item.genre;
  document.getElementById('EPRICE').value = item.price;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const EID = document.getElementById('EID');
  const ETITLE = document.getElementById('ETITLE');
  const ERELDT = document.getElementById('ERELDT');
  const EGENRE = document.getElementById('EGENRE');
  const EPRICE = document.getElementById('EPRICE');

  const eitem = {
    id: EID.value.trim(),
    title: ETITLE.value.trim(),
    releaseDate: ERELDT.value.trim(),
    genre: EGENRE.value.trim(),
    price: EPRICE.value.trim()
  };

  document.getElementById('ID').value = eitem.id;
  document.getElementById('TITLE').value = eitem.title;
  document.getElementById('RELDT').value = eitem.releaseDate;
  document.getElementById('GENRE').value = eitem.genre;
  document.getElementById('PRICE').value = eitem.price;

  const eluri = "https://localhost:7053/DeleteMovie";

  fetch(`${eluri}/${eitem.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'Movie' : 'Movies';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {

    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    //td1.appendChild(isCompleteCheckbox);
    td1.appendChild(document.createTextNode(item.id));

    let td2 = tr.insertCell(1);
    //let textNode = document.createTextNode(item.name);
    td2.appendChild(document.createTextNode(item.title));

    let td3 = tr.insertCell(2);
    //td3.appendChild(editButton);
    td3.appendChild(document.createTextNode(item.releaseDate));

    let td4 = tr.insertCell(3);
    //td4.appendChild(deleteButton);
    td4.appendChild(document.createTextNode(item.genre))

    let td5 = tr.insertCell(4);
    //td5.appendChild(deleteButton);
    td5.appendChild(document.createTextNode(item.price))

    let td6 = tr.insertCell(5)
    td6.appendChild(deleteButton);

    let td7 = tr.insertCell(6)
    td7.appendChild(editButton);

    

  });

  todos = data;
}