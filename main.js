// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const purposeInput = document.querySelector('#purpose')
const categoryInput = document.querySelector('#category');
const msg = document.querySelector('.msg');
//const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(amountInput.value === '' || purposeInput.value === '' || categoryInput.value === '') 
  {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  }

  else
  {
    // Create new list item with user
    //const li = document.createElement('li');

    // Add text node with input values
    //li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>: ${emailInput.value}`;

    // Append to ul
    //userList.appendChild(li);

    //Local Storage
    // localStorage.setItem('name:',nameInput.value);
    // localStorage.setItem('email:',emailInput.value);

    // Storing input values
    const amou = e.target.amount.value;
    const purpo = e.target.purpose.value;
    const categry = e.target.category.value;

    // Creating Object
    let userDetails = {
      amou,
      purpo,
      categry
    }

    // convert object to String
    let userDetails_serialized = JSON.stringify(userDetails);

    // Objects to Local Storage
    localStorage.setItem(userDetails.categry, userDetails_serialized);

    // if we want String to Objects then
    // let userDetails_deserialized = JSON.parse(localStorage.getItem('userDetails'));

    showListofRegisteredUser(userDetails);

    // Clear fields
    amountInput.value = '';
    purposeInput.value = '';
    categoryInput.value = '';
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  Object.keys(localStorage).forEach(key => {
      const user = JSON.parse(localStorage.getItem(key))
      showListofRegisteredUser(user)
  })
})

function showListofRegisteredUser(user) {
  const parentNode = document.getElementById('users');
  const createNewUserHtml = `<li id='${user.categry}'> ${user.amou} - ${user.purpo} - ${user.categry}
  <button onclick=editUser('${user.categry}') style="color:blue" >Edit</button>
  <button onclick=deleteUser('${user.categry}') style="color:red" >Delete</button> </li>`;
  //console.log(createNewUserHtml)
  
  console.log('');

  parentNode.innerHTML +=  createNewUserHtml;
  //console.log(parentNode.innerHTML)
}

function deleteUser(categry) {
  localStorage.removeItem(categry)
  removeItemFromScreen(categry)
}

function removeItemFromScreen(categry) {
  const parentNode = document.getElementById('users');
  const elem = document.getElementById(categry)
  parentNode.removeChild(elem);
}

function editUser(categry) {
  
  // in local storage values are in String so, we convert it into Object and store it into temporary variable
  var temp1 = JSON.parse(localStorage.getItem(categry))

  // after getting values in object, we store that values into temporary variable
  var temp2 = Object.values(temp1);

  // now storing the respective value's to the respective variable's
  var tempAmou = temp2[0];
  var tempPurpo = temp2[1];
  var tempCategry = temp2[2];

  // now assign a variable's for respective input field's
  var amountSpan = document.getElementById('amount');
  var purposeSpan = document.getElementById('purpose');
  var categorySpan = document.getElementById('category');

  // now set the values(edited text values) to the input field
  amountSpan.value = tempAmou;
  purposeSpan.value = tempPurpo;
  categorySpan.value = tempCategry;

  // console log for checking
  // console.log(amountSpan);
  // console.log(purposeSpan);
  
  // console.log('Name: [' + tempName + ']  Number: [' + tempNumber + ']  Email: [' + tempEmail + ']');

  // remove data from local storage as well as list present in the screen(interface)
  localStorage.removeItem(categry)
  removeItemFromScreen(categry)
}