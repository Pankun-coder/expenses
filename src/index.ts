document.addEventListener("DOMContentLoaded", (event) => {
  const categorySelect = document.getElementById("category");
  if (!categorySelect) {
    throw new Error("category select not found");
  }

  [1, 2, 3].forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.id = `caetgory-option-${option}`;
    optionElement.innerText = `カテゴリ${option}`;
    categorySelect.appendChild(optionElement);
  });

  const formElement = document.getElementById("form");
  if (!formElement) {
    throw new Error("form element not found");
  }
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("submitted");
  });
});
