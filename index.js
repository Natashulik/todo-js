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

  filter();
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

// вешаем обработчики на кнопки, кот. фильтруют задачи
const allButton = document.querySelector(".filters__all");
const activeButton = document.querySelector(".filters__active");
const completedButton = document.querySelector(".filters__completed");

let currentFilter = "all";

allButton.addEventListener("click", function () {
  currentFilter = "all";

  allButton.classList.add("selected");
  if (activeButton.classList.contains("selected")) {
    activeButton.classList.remove("selected");
  }
  if (completedButton.classList.contains("selected")) {
    completedButton.classList.remove("selected");
  }

  filter();
});

activeButton.addEventListener("click", function () {
  currentFilter = "active";

  activeButton.classList.add("selected");
  if (allButton.classList.contains("selected")) {
    allButton.classList.remove("selected");
  }
  if (completedButton.classList.contains("selected")) {
    completedButton.classList.remove("selected");
  }

  filter();
});

completedButton.addEventListener("click", function () {
  currentFilter = "completed";

  completedButton.classList.add("selected");
  if (allButton.classList.contains("selected")) {
    allButton.classList.remove("selected");
  }
  if (activeButton.classList.contains("selected")) {
    activeButton.classList.remove("selected");
  }

  filter();
});

// функция фильтрации задач
function filter() {
  const tasks = document.querySelectorAll(".task-list__item");
  tasks.forEach(function (task) {
    const checkbox = task.querySelector(".checkbox");
    const isCompleted = checkbox.checked;

    if (currentFilter === "all") {
      task.style.display = "block";
    } else if (currentFilter === "active" && !isCompleted) {
      task.style.display = "block";
    } else if (currentFilter === "completed" && isCompleted) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
