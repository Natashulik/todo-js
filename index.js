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

// добавление и удаление задачи
const addButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");

function addTask(title, description) {
  const li = document.createElement("li");

  if (description.trim() !== "") {
    li.innerHTML = `<div class="task-list__item">
        <div class="task-header"> 
        <input type="checkbox" class="checkbox">
          <p class="task-title">${title}</p>
          <button class="delete-button button">✖</button>
        </div>   
        <div class="description">
          <p class="description__content">${description}</p>
        </div>        
      </div>`;
  } else {
    li.innerHTML = `<div class="task-list__item">
    <div class="task-header"> 
    <input type="checkbox" class="checkbox">
      <p class="task-title">${title}</p>
      <button class="delete-button button">✖</button>
    </div>          
  </div>`;
  }

  const checkbox = li.querySelector(".checkbox");
  const taskTitle = li.querySelector(".task-title");
  const deleteButton = li.querySelector(".delete-button");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskTitle.style.textDecoration = "line-through";
    } else {
      taskTitle.style.textDecoration = "none";
    }
  });

  deleteButton.addEventListener("click", function () {
    li.remove();
  });

  taskList.appendChild(li);
}

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

// удаление задачи
