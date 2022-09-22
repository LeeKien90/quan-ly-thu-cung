"use strict";
// Bắt sự kien Click vào nút "Submit"
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const healthyBtn = document.getElementById("healthy-btn");
const tableBodyEl = document.getElementById("tbody");
// const deleteList = document.querySelectorAll(".btn.btn-danger");

renderTableData(petArr);

// Bật sự kiện khi chọn vào typeInput đúng loại Dog - Cat
typeInput.addEventListener("click", renderBreed);

//Hàm hiển thị các loại giống theo từng loại Dog - Cat
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ các Form Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // Validate dữ liệu

  const isValidate = validateData(data);

  if (isValidate) {
    // Thêm thú cưng vào danh sách
    petArr.push(data);
    saveToStorage('petArr', petArr);
    //Hiển th danh sách thú cưng
    renderTableData(petArr);
    // Xóa các dữ liệu nhập trong Form Input
    deleteForm();
  }
});

//Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight}</td>
      <td>${pet.length}</td>
      <td>${pet.breed}</td>
      <td>
          <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td><i class="bi
      ${pet.vaccinated ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
      <td><i class="bi
      ${pet.dewormed ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
      <td><i class="bi
      ${pet.sterilized ? `bi-check-circle-fill` : `bi-x-circle-fill`}"></i></td>
      <td>
      ${displayTime(pet.date).slice(8, 10)}
      /${displayTime(pet.date).slice(5, 7)}
      /${displayTime(pet.date).slice(0, 4)}
      </td>`;

    tableBodyEl.appendChild(row);
  });
}

// Hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

//  Xóa các dữ liệu đã nhập trên Form
function deleteForm() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#0000000";
  breedInput.value = "Select breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Xóa 1 thú cưng với id được truyền vào
function deletePet(petId) {
  // Confirm before deletePet
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTable(petArr);
        break;
      }
    }
  }
}

function validateData(data) {
  let isValidate = true;

  if (data.id.trim() === "") {
    alert("Please input for id");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("Please input for name");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Please input for age");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Please input for weight");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Please input for length");
    isValidate = false;
  }

  if (data.type === "Select Type") {
    alert("Please select type!");
    isValidate = false;
  }

  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }

  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
    }
  }

  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }

  return isValidate;
}

let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});
