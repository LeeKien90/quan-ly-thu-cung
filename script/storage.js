"use strict";

//  Thêm 1 Animation khi click vào Sidebar
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});


//lấy dữ liệu petArr
if (!getFromStorage('petArr')){
  //gắn dữ liệu
saveToStorage('petArr',[])
}

//lấy dữ liệu breed
if (!getFromStorage('breedArr')){
  //gắn dữ liệu
  saveToStorage('breedArr',[])
}
const petArr = getFromStorage("petArr");
const breedArr = getFromStorage("breedArr");


// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
