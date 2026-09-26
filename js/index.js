var avatarPreviewInput = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var nameInput = document.getElementById("contactName");
var phoneInput = document.getElementById("contactPhone");
var emailInput = document.getElementById("contactEmail");
var addressInput = document.getElementById("contactAddress");
var groupInput = document.getElementById("contactGroup");
var notesInput = document.getElementById("contactNotes");
var favoriteInput = document.getElementById("contactFavorite");
var emergencyInput = document.getElementById("contactEmergency");
var contactNameError = document.getElementById("contactNameError");
var contactPhoneError = document.getElementById("contactPhoneError");
var contactEmailError = document.getElementById("contactEmailError");
var contactsGrid = document.getElementById("contacts-grid");
var searchInput = document.getElementById("searchInput");
var contactArr = JSON.parse(localStorage.getItem("contactArr")) ?? [];
var total = document.getElementById("total");
var modal = document.getElementById("exampleModal");
var updatedIndex = -1;
displayContact();
function addContact(e) {
  if (e) {
    e.preventDefault();
  }

  if (!validateInputs()) {
    return;
  }

  var contact = {
    Name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    addres: addressInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    isfavorite: favoriteInput.isfavorite,
    isemergency: emergencyInput.isemergency,
  };
  if (updatedIndex === -1) {
    contactArr.push(contact);
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    contactArr[updatedIndex] = contact;
    Swal.fire({
      title: "update!",
      text: "Contact has been update successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    updatedIndex = -1;
  }
  localStorage.setItem("contactArr", JSON.stringify(contactArr));
  validateInputs();
  clear();
  displayContact();
}
function displayContact() {
  var cardContact = "";
  var emptyContacts = `
            <div class="empty-contacts">
              <div
                class="icone rounded-4 m-auto mb-3 d-flex align-items-center justify-content-center"
              >
                <i class="fa-solid fa-address-book"></i>
              </div>
              <p class="m-0">No contacts found</p>
              <p class="m-0 mt-1">Click "Add Contact" to get started</p>
            </div>
`;
  if (contactArr.length === 0) {
    contactsGrid.innerHTML = emptyContacts;
  } else {
    for (let i = 0; i < contactArr.length; i++) {
      cardContact += `
                    <div
                  class="card-contact bg-white rounded-4 overflow-hidden h-100 d-flex flex-column"
                >
                  <div class="header-contact flex-grow-1">
                    <div class="first-row d-flex align-items-center">
                      <div
                        class="icone flex-shrink-0 d-flex align-items-center justify-content-center fw-semibold text-white"
                      >
                        dd
                      </div>
                      <div class="text pt-1">
                        <h3 class="my-0 fw-semibold">${contactArr[i].Name}</h3>
                        <div class="phone d-flex align-items-center gap-2 mt-1">
                          <div
                            class="icone-phone d-flex align-items-center justify-content-center flex-shrink-0"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <span class="">${contactArr[i].phone}</span>
                        </div>
                      </div>
                    </div>
                    <div class="contact-details">
                      <div class="item d-flex align-items-center mb-2">
                        <div
                          class="icone mail d-flex align-items-center justify-content-center flex-shrink-0 rounded-2"
                        >
                          <i class="fa-solid fa-envelope"></i>
                        </div>
                        <span>${contactArr[i].email}</span>
                      </div>
                      <div class="item d-flex align-items-center mb-2">
                        <div
                          class="icone location d-flex align-items-center justify-content-center flex-shrink-0 rounded-2"
                        >
                          <i class="fa-solid fa-location-dot"></i>
                        </div>
                        <span>${contactArr[i].addres}</span>
                      </div>
                    </div>
                    <div class="group-info d-flex">
                      <span class="fw-medium">${contactArr[i].group}</span>
                    </div>
                  </div>
                  <div
                    class="footer-contact d-flex justify-content-between align-items-center"
                  >
                    <div class="footer-row d-flex align-items-center">
                      <a
                        class="phone d-flex align-items-center justify-content-center rounded-3 text-decoration-none"
                        href="tel:${contactArr[i].phone}"
                        title="Call"
                      >
                        <i class="fa-solid fa-phone"></i>
                      </a>
                      <button
                        onclick="emailContact('${contactArr[i].email}')"
                        class="mail d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Email"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </button>
                    </div>
                    <div class="footer-row d-flex align-items-center">
                      <button
                        class="fav d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Favorite"
                      >
                        <i class="fa-regular fa-star"></i>
                      </button>
                      <button
                        class="eme d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Emergency"
                      >
                        <i class="fa-regular fa-heart"></i>
                      </button>
                      <button
                        onclick="editContactHandler(${i})"
                        class="edit d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Edit"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onclick="deleteContactHandler(${i})"
                        class="del d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Delet"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
      `;
    }
    contactsGrid.innerHTML = cardContact;
  }
  total.innerHTML = contactArr.length;
}
function deleteContactHandler(index) {
  contactArr.splice(index, 1);
  localStorage.setItem("contactArr", JSON.stringify(contactArr));
  displayContact();
}
function editContactHandler(index) {
  updatedIndex = index;
  nameInput.value = contactArr[index].Name;
  phoneInput.value = contactArr[index].phone;
  emailInput.value = contactArr[index].email;
  addressInput.value = contactArr[index].addres;
  groupInput.value = contactArr[index].group;
  notesInput.value = contactArr[index].notes;
  favoriteInput.checked = contactArr[index].isfavorite;
  emergencyInput.checked = contactArr[index].isemergency;

  localStorage.setItem("contactArr", JSON.stringify(contactArr));
  displayContact();

  var contactModal = new bootstrap.Modal(modal);
  contactModal.show();
}
function searchContact() {
  var searchTerm = searchInput.value.toLowerCase().trim();
  var cardContact = "";
  for (var i = 0; i < contactArr.length; i++) {
    if (
      contactArr[i].Name.toLowerCase().includes(searchTerm) ||
      contactArr[i].phone.toLowerCase().includes(searchTerm) ||
      contactArr[i].email.toLowerCase().includes(searchTerm)
    ) {
      cardContact += `
                <div
                  class="card-contact bg-white rounded-4 overflow-hidden h-100 d-flex flex-column"
                >
                  <div class="header-contact flex-grow-1">
                    <div class="first-row d-flex align-items-center">
                      <div
                        class="icone flex-shrink-0 d-flex align-items-center justify-content-center fw-semibold text-white"
                      >
                        dd
                      </div>
                      <div class="text pt-1">
                        <h3 class="my-0 fw-semibold">${contactArr[i].Name}</h3>
                        <div class="phone d-flex align-items-center gap-2 mt-1">
                          <div
                            class="icone-phone d-flex align-items-center justify-content-center flex-shrink-0"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <span class="">${contactArr[i].phone}</span>
                        </div>
                      </div>
                    </div>
                    <div class="contact-details">
                      <div class="item d-flex align-items-center mb-2">
                        <div
                          class="icone mail d-flex align-items-center justify-content-center flex-shrink-0 rounded-2"
                        >
                          <i class="fa-solid fa-envelope"></i>
                        </div>
                        <span>${contactArr[i].email}</span>
                      </div>
                      <div class="item d-flex align-items-center mb-2">
                        <div
                          class="icone location d-flex align-items-center justify-content-center flex-shrink-0 rounded-2"
                        >
                          <i class="fa-solid fa-location-dot"></i>
                        </div>
                        <span>${contactArr[i].addres}</span>
                      </div>
                    </div>
                    <div class="group-info d-flex">
                      <span class="fw-medium">${contactArr[i].group}</span>
                    </div>
                  </div>
                  <div
                    class="footer-contact d-flex justify-content-between align-items-center"
                  >
                    <div class="footer-row d-flex align-items-center">
                      <a
                        class="phone d-flex align-items-center justify-content-center rounded-3 text-decoration-none"
                        href="tel:${contactArr[i].phone}"
                        title="Call"
                      >
                        <i class="fa-solid fa-phone"></i>
                      </a>
                      <button
                        onclick="emailContact('${contactArr[i].email}')"
                        class="mail d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Email"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </button>
                    </div>
                    <div class="footer-row d-flex align-items-center">
                      <button
                        class="fav d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Favorite"
                      >
                        <i class="fa-regular fa-star"></i>
                      </button>
                      <button
                        class="eme d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Emergency"
                      >
                        <i class="fa-regular fa-heart"></i>
                      </button>
                      <button
                        onclick="editContactHandler(${i})"
                        class="edit d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Edit"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onclick="deleteContactHandler(${i})"
                        class="del d-flex align-items-center justify-content-center rounded-3 border-0"
                        title="Delet"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>

            `;
    }
  }
  contactsGrid.innerHTML = cardContact;
}
function clear() {
  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
  groupInput.value = "";
  notesInput.value = "";
  favoriteInput.checked = false;
  emergencyInput.checked = false;
  document.getElementById("contactNameError").classList.add("d-none");
  document.getElementById("contactPhoneError").classList.add("d-none");
  document.getElementById("contactEmailError").classList.add("d-none");
}
function emailContact(email) {
  window.location.href = `mailto:@${email}`;
}
var regexPatterns = {
  name: /^[a-zA-Z\s]{2,50}$/,
  phone: /^01[0125][0-9]{8}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
function validateInputs() {
  var nameVal = nameInput.value.trim();
  var phoneVal = phoneInput.value.trim();
  var emailVal = emailInput.value.trim();

  if (!regexPatterns.name.test(nameVal)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
    });
    contactNameError.classList.remove("d-none");
    return false;
  }
  if (!regexPatterns.phone.test(phoneVal)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    contactPhoneError.classList.remove("d-none");
    return false;
  }
  if (emailVal !== "" && !regexPatterns.email.test(emailVal)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    contactEmailError.classList.remove("d-none");
    return false;
  }
  return true;
}
function validateName() {
  var isNameValid = regexPatterns.name.test(nameInput.value.trim());
  var nameError = document.getElementById("contactNameError");

  if (!isNameValid) {
    nameError.classList.remove("d-none");
  } else {
    nameError.classList.add("d-none");
  }
  return isNameValid;
}
function validatePhone() {
  var isPhoneValid = regexPatterns.phone.test(phoneInput.value.trim());
  var phoneError = document.getElementById("contactPhoneError");

  if (!isPhoneValid) {
    phoneError.classList.remove("d-none");
  } else {
    phoneError.classList.add("d-none");
  }
  return isPhoneValid;
}
function validateEmail() {
  var emailVal = emailInput.value.trim();
  var emailError = document.getElementById("contactEmailError");

  var isEmailValid = emailVal === "" || regexPatterns.email.test(emailVal);

  if (!isEmailValid) {
    emailError.classList.remove("d-none");
  } else {
    emailError.classList.add("d-none");
  }
  return isEmailValid;
}
