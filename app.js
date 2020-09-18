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


// ***************** EVENT LISTENERS **********************

// submit form
form.addEventListener('submit', manageItem);

// clear items
clearBtn.addEventListener('click', ()=>{
    if (confirm('Are you sure?')) {
        clearItems();
    }
});

// setup items that are in local storage once DOM is loaded
window.addEventListener('DOMContentLoaded', setupItems); 

// ***************** FUNCTIONS *******************

// main function
function manageItem(e) {
    // prevent default behaviour
    e.preventDefault();

    // grab the value passed using input
    const value = groceryInput.value;

    // condition to separate add items to list and edit exisiting items on list
    if (value && !editFlag) {

        // create id for each item using date time functionality
        const id = new Date().getTime().toString();

        // add items to the list
        addToList(id,value);

        // display alert
        displayAlert('Item successfully added', 'success');

    } else if (value && editFlag){

        editElement.innerHTML = value;

        // display alert
        displayAlert('Item edited', 'success');

        // edit in local storage
        editLocalStorage(editID, value);

        // set back to default
        setBackToDefault();

    } else {

        // trying to enter empty string 
        displayAlert('Please enter a value', 'danger');
    }
}

// add item to the list
function addToList(id, value){

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
    addToLocalStorage(id, value);

    // set inputs buttons back to default
    setBackToDefault();
}

// delete item
function deleteItem(e) {

    // get element where event listener is attached which is the parent's parent element
    const element = e.currentTarget.parentElement.parentElement;

    // get the id of the element
    const id = element.dataset.id;
    
    // use the list parent container to remove the parent element
    list.removeChild(element);

    // if no items left in list, then hide the container
    if(list.children.length <= 0){
        container.classList.remove('show-container');
    }

    // display alert
    displayAlert('Item deleted', 'danger');
    
    // remove from local storage
    removeFromLocalStorage(id);

    // set inputs buttons back to default
    setBackToDefault();

    
}

// edit item
function editItem(e) {

    // get element where event listener is attached which is the parent's parent element
    const element = e.currentTarget.parentElement.parentElement;
    
    // use querySelector to select the title from the p tag
    editElement = element.querySelector('.title');

    // place the title as the input's value
    groceryInput.value = editElement.innerHTML;

    // change editFlag to true
    editFlag = true;

    editID = element.dataset.id;

    // change text on submit button
    submitBtn.textContent = 'Edit';
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

    // clear from local storage -> deletes the whole list using the key
    localStorage.removeItem('list');

    // display alert
    displayAlert('List Emptied', 'danger');
}


// ******************** LOCAL STORAGE ***********************
// local storage API -> saves as keys and values and as strings
// few methods -> getItem, setItem, removeItem

function addToLocalStorage(id, value){
    // create object using id and value
    const groceryItem = {id,value};

    const items = getLocalStorage();

    // append groceryItems in list
    items.push(groceryItem);

    // add the items list into local storage
    localStorage.setItem("list",JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    
    items = items.filter( (item)=>{
        if (item.id !== id) {
            return item;
        }
    });

    // add the items list into local storage
    localStorage.setItem("list", JSON.stringify(items));

}

function editLocalStorage(id,value) {

    let items = getLocalStorage();

    items = items.map( (item) =>{
        if (item.id === id) {
            item.value = value;
        }

        return item;
    });

    // add the items list into local storage
    localStorage.setItem("list", JSON.stringify(items));
}

// check to see if there is an existing list in local storage, if no,create one
function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}


// ********************* SETUP ITEMS ***********************
function setupItems(){
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach( (item) =>{
            addToList(item.id, item.value);
        });

        container.classList.add('show-container');
    }
}

/*
    How JSON and localstorage work together

    local storage needs a key and a value pair. Value pair need to be saved in strings

    so to change values into strings, use JSON.stringify();

    when getting back an item from local storage, it will return in string,

    so need to JSON.parse() the whole thing to convert it into its original form  
*/