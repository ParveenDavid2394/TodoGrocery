// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const groceryInput = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


// edit option
let editElement;
let editFlag = false;
let editID = "";

// create id for each item
const id = new Date().getTime.toString();

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);



// ****** FUNCTIONS **********

function addItem(e) {
    // prevent default behaviour
    e.preventDefault();

    // grab the value passed using input
    const value = groceryInput.value;

    // condition to separate add items to list and edit exisiting items on list
    if (value && !editFlag) {
        // add items to the list
        addToList(value);
        displayAlert('Item successfully added', 'success');
        addToLocalStorage(id, value);
        setBackToDefault();

    } else if (value && editFlag){

        console.log('edit item on list');

    } else {
        // trying to enter empty string 
        displayAlert('Please enter a value', 'danger');
    }
}

// add item to the list
function addToList(value){
    // create element
    const element = document.createElement('article');

    // add class to element
    element.classList.add('grocery-item');

    // create id attribute for element
    const attr = document.createAttribute('data-id');

    // set id value to id attribute
    attr.value = id;

    // set id attribute in element
    element.setAttributeNode(attr);

    // enter child element and value into element
    element.innerHTML = `<p class="title">${value}</p>
				<div class="btn-container">
					<button type="button" class="edit-btn">
						<i class="fas fa-edit"></i>
					</button>
					<button type="button" class="delete-btn">
						<i class="fas fa-trash"></i>
					</button>
                </div>`;
                
    // append element to parent list ( grocery-list)
    list.appendChild(element);

    // add show-container class to the parent container
    container.classList.add('show-container'); 
}

// display alert function 
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert after 2s
    setTimeout( () =>{
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}


// set everything to default after edit or add item in list
function setBackToDefault(){
    // after every edit or adding of an item, clear the input area
    groceryInput.value = '';

    // setting back to default after an edit
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'Enter';
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    console.log('added to local storage');
}



// ****** SETUP ITEMS **********
