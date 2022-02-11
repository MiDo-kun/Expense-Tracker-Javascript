// PROGRAM STRUCTURE
// loadData - get data from localstorage then show in the document, 
// NOTE: This should apply in every changes that will happen in localstorage
// Add - get the user input and send it to the database
// Delete - remove the user data from localstorage
// Edit - use modal here and able to alter the data in local storage

/* ---SELECTORS--- */
// Input
const input = document.querySelectorAll('#description, #amount');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const date = document.querySelector('#date');
// Buttons
const submit = document.querySelector('#submit');
const edit = document.querySelector('.edit');
const deleteContent = document.querySelector('.delete');
// Table
const tbody = document.getElementsByTagName('tbody');

// DISABLE SUBMIT (if no input);
input.forEach((data) => {
   data.addEventListener('keyup', () => {
      if (input[0].value.trim() != "" && input[1].value.trim() != "") {
         submit.disabled = false;
      }
      else {
         submit.disabled = true;
      }
   });
});

// ADD
submit.addEventListener('click', () => {
   let data = localStorage.getItem('User-Data')
   let concat = description.value + ", " + amount.value + ", " + date.value;

   if (data == null) {
      userData = [];
   } else {
      userData = JSON.parse(data);
   } 
   userData.push(concat);

   localStorage.setItem('User_Data', JSON.stringify(userData));

   // Reset value per submission
   description.value = '';
   amount.value = '';
   date.value = '';
});