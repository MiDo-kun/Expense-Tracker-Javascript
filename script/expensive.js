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
const submit = document.querySelector('#submit');
// Table
const tbody = document.querySelector('.data');
// Modal 
const closeEdit = document.querySelector('#close');
const carousel = document.querySelector('.carousel');
const editUser = document.querySelector('.user-edit #submit');
const editDescription = document.querySelector('#edit_description');
const editAmount = document.querySelector('#edit_amount');
const editDate = document.querySelector('#edit_date');

window.addEventListener('DOMContentLoaded', () => {
   loadData();

   // DISABLE SUBMIT (if no input);
   input.forEach((data) => {
      submit.disabled = true;
      data.addEventListener('keyup', () => {
         if (input[0].value.trim() != "" && input[1].value.trim() != "") {
            submit.disabled = false;
         }
         else {
            submit.disabled = true;
         }
      });
   });
});


// ADD
submit.addEventListener('click', () => {
   let data = localStorage.getItem('User-Data')
   let concat = description.value + "," + amount.value + "," + date.value;
   if (data == null) {
      userData = [];
   } else {
      userData = JSON.parse(data);
   } 
   userData.push(concat);
   localStorage.setItem('User-Data', JSON.stringify(userData));

   // Reset value per submission
   submit.disabled = true;
   description.value = '';
   amount.value = '';
   date.value = '';

   loadData();
});

// REMOVE
function deleteUser(index) {
   let data = localStorage.getItem('User-Data');
   // JSON.parse(data);
   let newArray = JSON.parse(data);
   let filteredArray = newArray.reverse().filter((element, filteredIndex) =>{
      return index != filteredIndex; // Create a new array excluding the element of index;
   });

   localStorage.setItem('User-Data', JSON.stringify(filteredArray.reverse()));
   loadData();
}

// EDIT
function edit(index) {
   carousel.style.display = 'block';
   closeEdit.addEventListener('click', () => {
      carousel.style.display = 'none';
   });

   let data = localStorage.getItem('User-Data');
   userData = JSON.parse(data).reverse()[index];

   editDescription.value = userData.split(',')[0];
   editAmount.value = userData.split(',')[1];
   editDate.value = userData.split(',')[2];
}

// LOAD DATA
function loadData() {
   formatDate(); // Get current Date
   let data = localStorage.getItem('User-Data');

   if (data == null){
      userData = [];
   } else {
      userData = JSON.parse(data);
   }

   tbody.innerHTML = userData.reverse().map((user, index) => {
      const formatNumber = parseInt(user.split(',')[1]);
      return `<tr>
                  <td>${user.split(',')[0]}</td>
                  <td>₱ ${formatNumber.toLocaleString('en-US')}</td>
                  <td>${user.split(',')[2]}</td>
                  <td><i class="fa-solid fa-pencil" onclick=edit(${index})></i></td>
                  <td><i class="fa-solid fa-trash-can" onclick=deleteUser(${index})></i></td>
               </tr>`;
   }).join('');
}

function formatDate() {
   let currentDate = new Date();
   function checkDate(date) {
      if (date < 9) {
         return `0` + date;
      }
      return date;
   }
   date.value = currentDate.getFullYear() + "-" + checkDate(currentDate.getMonth() + 1) + "-" + checkDate(currentDate.getDate());
}