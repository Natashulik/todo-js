// открытие и закрытие модального окна
const openModalButton = document.querySelector("#open-modal");
const modal = document.querySelector("#modal");
const closeButton = document.querySelector(".close");

openModalButton.addEventListener("click", function () {
  modal.classList.add("visible");
});

closeButton.addEventListener("click", function () {
  modal.classList.remove("visible");
});

// функция, которая создает задачу на основе введенного заголовка и описания
const taskList = document.querySelector("#task-list");

function addTask(title, description) {
  const li = document.createElement("li");
  li.classList.add("task-list__item");

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task-header");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const taskTitle = document.createElement("p");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = title;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button", "button");
  deleteButton.textContent = "✖";

  taskHeader.appendChild(checkbox);
  taskHeader.appendChild(taskTitle);
  taskHeader.appendChild(deleteButton);

  li.appendChild(taskHeader);

  // добавляем описание задачи, если оно есть
  if (description.trim() !== "") {
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description");

    const descriptionContent = document.createElement("p");
    descriptionContent.classList.add("description__content");
    descriptionContent.textContent = description;

    descriptionContainer.appendChild(descriptionContent);
    li.appendChild(descriptionContainer);
  }

  //вешаем слушателя на чекбокс
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskTitle.style.textDecoration = "line-through";
    } else {
      taskTitle.style.textDecoration = "none";
    }
  });

  //вешаем слушателя на кнопку удаления
  deleteButton.addEventListener("click", function () {
    li.remove();
  });

  taskList.appendChild(li);
}

// вешаем слушателя на кнопку "Добавить" в модальном окне, кот. добавляет задачу и  скрывает модальное окно
const addButton = document.querySelector("#add-task");

addButton.addEventListener("click", function () {
  const title = document.querySelector("#task-title").value;
  const description = document.querySelector("#task-description").value;

  if (title.trim() !== "") {
    addTask(title, description);
    modal.classList.remove("visible");
    document.querySelector("#task-title").value = "";
    document.querySelector("#task-description").value = "";
  }
});
