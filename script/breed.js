"use strict";
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

//Hiển thị danh sách
renderTableBreed(breedArr)

submitBtn.addEventListener("click", function () {
  console.log('bat kasjfaskf')
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  }

  console.log('hien breedArr=======',breedArr)
  // Validate dữ liệu
  const isValidate = validate(data);

  if (isValidate) {
    console.log('ggggggggggggggggggg')
    //  thêm dữ liệu vào breed
    breedArr.push(data)
    console.log("breedArr",breedArr)
    // cập nhập dữ liệu
    saveToStorage("breedArr", breedArr);
    // hiển thị bảng thông tin các breed
    renderTableBreed(breedArr);
    // xóa thông tin trên Form nhập
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;

  //  Breed để trống thì báo lỗi
  if (breedInput.value.trim().length === 0) {
    alert("Please input for Breed!");
    isValidate = false;
  }

  //   chưa chọn Type thì báo lỗi
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }


  return isValidate;
}

// Xóa thông tin Form
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

// Hiện thị thông tin các Breed lên bảng

function renderTableBreed() {
  tableBodyEl.innerHTML = "";

  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>;
    <td scope="col">${breedItem.breed}</td>;
    <td scope="col">${breedItem.type}</td>
    <td>
    <button type="button" onclick="deleteBreed('${
      breedItem.breed
    }')" class="btn btn-danger">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  });
}


// xóa các breed
function deleteBreed(breed) {
  // xác nhận xóa
  const isDeleted = confirm("Are you sure?");

  if (isDeleted) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
      }
    }
  }
}
