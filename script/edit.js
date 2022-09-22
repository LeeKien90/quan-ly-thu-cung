"use strict";

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

const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

// Hiển thị dữ liệu các thú cưng trong bảng
renderTableData(petArr);

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
    </td>
    <td>
    <button onclick="editPet('${pet.id}')" type="button" style="background-color: #ffc107; color: #000; class="btn btn-danger">Edit</button>
    </td>`;

    tableBodyEl.appendChild(row);
  });
}

function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}


// Hàm chỉnh sửa thông tin thú cưng
function editPet(id) {
  //Hiện lại form nhập dữ liệu
  formEl.classList.remove("hide");
  //tìm đến dữ liệu thú cưng cần edit
  var pet = petArr.find((petItem) => petItem.id === id);

  //   Hiển thị những thông tin thú cưng trên form nhập
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
//hiển thị đúng các loại giống cho từng loại Dog - Cat
  renderBreed();
//hiển thị các dữ liệu ban đầu trước khi edit
  breedInput.value = `${pet.breed}`;
}

// Click vào typeInput, sau đó hiển thị các loại giống cho từng loại Dog - Cat
typeInput.addEventListener("click", renderBreed);

// Hàm hiển thị giống thú cưng theo từng loại Dog - Cat nhất định
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  if (typeInput.value === "Dog") {
    var breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      let option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    var breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      let option = document.createElement("option");
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
  };

  // Validate dữ liệu

  let validate = validateData(data);

  if (validate) {
    let index = petArr.findIndex((pet) => pet.id == data.id);
    // giữ lại ngày thêm thú cưng
    data.date = petArr[index].date;
    // cập nhập dữ liệu của thú cưng
    petArr[index] = data;

    // lưu dữ liệu
    saveToStorage("petArr", petArr);

    // ẩn forn đi và hiện lại bảng dữ liệu thú cưng
    formEl.classList.add("hide");

    renderTableData(petArr);
  }
});

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
