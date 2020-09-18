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
const id = new Date().getTime().toString();



// ***************** EVENT LISTENERS **********************

// submit form
form.addEventListener('submit', manageItem);

// clear items
clearBtn.addEventListener('click', ()=>{
    if (confirm('Are you sure?')) {
        clearItems();
    }
});



// ***************** FUNCTIONS *******************

// main function
function manageItem(e) {
    // prevent default behaviour
    e.preventDefault();

    // grab the value passed using input
    const value = groceryInput.value;

    // condition to separate add items to list and edit exisiting items on list
    if (value && !editFlag) {
        // add items to the list
        addToList(value);
        displayAlert('Item successfully added', 'success');

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
                
    // select both edit and delete buttons
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    // add eventlistener to both the buttons
    deleteBtn.addEventListener('click', (e)=>{
        if (confirm('Are you sure?')) {
            deleteItem(e);
        }
    });

    editBtn.addEventListener('click', editItem);

    // append element to parent list ( grocery-list)
    list.appendChild(element);

    // add show-container class to the parent container
    container.classList.add('show-container'); 

    // add to local storage
    //addToLocalStorage(id, value);

    // set inputs buttons back to default
    setBackToDefault();
}

// delete item
function deleteItem(e) {
    // get element where event listener is attached
    const element = e.currentTarget;

    // get parent's parent element
    const parentElement = element.parentElement.parentElement;
    
    // use the list parent container to remove the parent element
    list.removeChild(parentElement);

    // if no items left in list, then hide the container
    if(list.children.length <= 0){
        container.classList.remove('show-container');
    }

    // display alert
    displayAlert('Item deleted', 'danger');

    // set inputs buttons back to default
    setBackToDefault();

    // remove from local storage
    //removeFromLocalStorage(id);
}

// edit item
function editItem() {
    console.log('edit item');
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

// clear items in list
function clearItems() {
    // target all items with 'grocery-items' class
    const items = document.querySelectorAll('.grocery-item');

    // loop thru and remove one by one using parent element
    items.forEach( (item) =>{
        list.removeChild(item);
    })

    // hide container once everything is cleared
    container.classList.remove('show-container');

    // set everything back to default
    setBackToDefault();

    // clear from local storage
    //localStorage.removeItem('list');

    // display alert
    displayAlert('List Emptied', 'danger');
}


// ******************** LOCAL STORAGE ***********************
function addToLocalStorage(id, value){
    // console.log('added to local storage');
}

function removeFromLocalStorage(id) {
    
}





// ********************* SETUP ITEMS ***********************
