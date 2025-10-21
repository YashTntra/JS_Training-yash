const form = document.getElementById("userForm");
const jsonDisplay = document.getElementById("jsonDisplay");
const themeToggle = document.getElementById("themeToggle");
let jsonData = [];
let editIndex = null; 

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const country = document.getElementById("country").value;

  let hobbies = [];
  document.querySelectorAll('input[name="hobbies"]:checked').forEach(hobby => {
    hobbies.push(hobby.value);
  });

  let isValid = true;

  if (name.length < 2 || name.length > 50) {
    showError("nameError", "Name must be between 2 and 50 characters.");
    isValid = false;
  }
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    showError("emailError", "Please enter a valid email address.");
    isValid = false;
  }
  if (age < 1 || age > 120 || isNaN(age)) {
    showError("ageError", "Age must be between 1 and 120.");
    isValid = false;
  }
  if (!dob) {
    showError("dobError", "Date of Birth is required.");
    isValid = false;
  } else {
    const today = new Date();
    const inputDate = new Date(dob);
    if (inputDate > today) {
      showError("dobError", "Date of Birth cannot be in the future.");
      isValid = false;
    }
  }
  if (!gender) {
    showError("genderError", "Please select your gender.");
    isValid = false;
  }
  if (hobbies.length === 0) {
    showError("hobbiesError", "Please select at least one hobby.");
    isValid = false;
  }
  if (country === "") {
    showError("countryError", "Please select a country.");
    isValid = false;
  }

  if (!isValid) return;

  const userData = {
    name: name,
    email: email,
    age: Number(age),
    dob: dob,
    gender: gender.value,
    hobbies: hobbies,
    country: country
  };

  if (editIndex !== null) {
    jsonData[editIndex] = userData;
    editIndex = null;
  } else {
    jsonData.push(userData);
  }

  displayData();
  form.reset();
});

function displayData() {
  jsonDisplay.innerHTML = "";

  if (jsonData.length === 0) {
    jsonDisplay.textContent = "[]";
    return;
  }

  jsonData.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("data-item");
    div.innerHTML = `
      <pre>${JSON.stringify(item, null, 2)}</pre>
      <button onclick="editData(${index})">Edit</button>
      <button onclick="deleteData(${index})">Delete</button>
      <hr>
    `;
    jsonDisplay.appendChild(div);
  });
}

function editData(index) {
  const user = jsonData[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("age").value = user.age;
  document.getElementById("dob").value = user.dob;
  document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;

  document.querySelectorAll('input[name="hobbies"]').forEach(hobby => {
    hobby.checked = user.hobbies.includes(hobby.value);
  });

  document.getElementById("country").value = user.country;
  editIndex = index;
}

function deleteData(index) {
  jsonData.splice(index, 1);
  displayData();
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach(e => (e.textContent = ""));
}

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});
