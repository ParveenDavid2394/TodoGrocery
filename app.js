// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const groceryInput = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('grocery-list');
const clearBtn = document.querySelector('.clear-btn');


// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit', addItem);

// ****** FUNCTIONS **********
function addItem(e){
    // prevent default behaviour
    e.preventDefault();
}
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
