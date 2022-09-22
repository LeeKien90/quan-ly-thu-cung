"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");


// Hiển thị toàn bộ dữ liệu các thú cưng
renderTableData(petArr);

// Tìm kiếm thú cưng theo các trường dữ liệu
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  //   Hiển thị thú cưng thỏa mãn điều kiện tìm kiếm
  renderTableData(petArrFind);
});

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

// hiển thị các loại breed
renderBreed();

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
