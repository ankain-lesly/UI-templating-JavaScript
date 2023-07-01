let is_card = false;
let is_card_items = false;

let app_storage = {};
const KEY_PROFILE_IMAGE = "profile_image";
const KEY_INPUT_DATA = "input_data";

const APP_STORAGE_KEY = "app_storage_data";

$("#profile_cover").on("change", (e) => {
  const input = e.target;
  const reff = input.dataset.inpReff;

  let file = "";
  // let file = URL.createObjectURL(input.files[0]);

  const reader = new FileReader();

  reader.readAsDataURL(input.files[0]);

  reader.addEventListener("load", () => {
    file = reader.result;
    $(".profile_img_preview").attr("src", file);
    setupProfileImage(reff, file);
  });
});

$("[data-inp-reff]").on("keyup", (e) => {
  const text_content = e.target.value;
  const reff = e.target.dataset.inpReff;

  setupInputContent(reff, text_content);
});

$(".reset-data").on("click", (e) => {
  const confirm_info = confirm("Do you want to reset all data?");

  if (!confirm_info) return;

  clearStorage();
  window.location.reload();
});
function _log(content) {
  console.log(content);
}
// console.log($("[data-inp-reff]"));

// Display Profile Image
const setupInputContent = (reff, text_content, isFromStorage = false) => {
  if (!is_card_items) set_is_card_items();

  if (!is_card) set_is_card();

  $(reff).text(text_content);

  if (!isFromStorage) setStorage(KEY_INPUT_DATA, reff, text_content);
};
const setupProfileImage = (placeholder, file, isFromStorage = false) => {
  if (!is_card) set_is_card();

  const image_data = `<div class="placeholder">
    <img src="${file}" alt="Profile" />
  </div>`;

  $(placeholder).html(image_data);
  // console.log(KEY_PROFILE_IMAGE, reff, file);
  if (!isFromStorage) setStorage(KEY_PROFILE_IMAGE, placeholder, file);
};

// Set Card
const set_is_card = () => {
  is_card = true;
  $(".ui-template").show();
};

// Set Card Items
const set_is_card_items = () => {
  is_card_items = true;
  $(".card_btn").show();
  $(".card_icons").show();
};

// Set Storage
const setStorage = (parent, key, value) => {
  // app_storage[parent] = { [key]: value };
  const temp = app_storage[parent] ?? {};
  console.log(temp);

  temp[key] = value;

  app_storage[parent] = temp;

  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(app_storage));
};

// Clear storage
const clearStorage = () => localStorage.setItem(APP_STORAGE_KEY, "");

// Use storage content
const useStorageData = () => {
  let data = localStorage.getItem(APP_STORAGE_KEY);
  data = data ? JSON.parse(data) : {};
  // console.log(data);
  const profile_data = data[KEY_PROFILE_IMAGE] ?? false;
  const input_data = data[KEY_INPUT_DATA] ?? false;

  app_storage = data;
  console.log(app_storage);

  if (profile_data)
    $.each(profile_data, (key, value) => {
      setupProfileImage(key, value, true);
      $(`.profile_img_preview`).attr("src", value);
    });
  if (input_data)
    $.each(input_data, (key, value) => {
      setupInputContent(key, value, true);
      $(`[data-inp-reff='${key}'`).val(value);
    });

  // _log(profile_data);
};
useStorageData();
