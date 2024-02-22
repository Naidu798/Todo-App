let todoItemsContainer = document.getElementById("todoItemsContainer");

function todoListFromLocalStorage() {
  let stringifiedTodoListFromLocalStorage = localStorage.getItem("todoList");
  let parsedList = JSON.parse(stringifiedTodoListFromLocalStorage);

  if (parsedList === null) {
    return [];
  } else {
    return parsedList;
  }
}

let todoList = todoListFromLocalStorage();

function saveToLocalStorage() {
  let stringifiedTodoList = JSON.stringify(todoList);
  localStorage.setItem("todoList", stringifiedTodoList);
}

function onChangeLabelStatus(labelId, todoId) {
  let labelEl = document.getElementById(labelId);
  labelEl.classList.toggle("checked");

  let index = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  if (todoList[index].isChecked === true) {
    todoList[index].isChecked = false;
  } else {
    todoList[index].isChecked = true;
  }
}

function deleteTodoTask(todoId) {
  let todoTaskItem = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoTaskItem);

  let deleteElementIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function () {
    onChangeLabelStatus(labelId, todoId);
  };
  if (todo.isChecked === true) {
    inputElement.checked = true;
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelElement.id = labelId;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    deleteTodoTask(todoId);
  };
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

function addTodoItem() {
  let todosCounter = todoList.length;
  todosCounter = todosCounter + 1;

  let todoUserInput = document.getElementById("todoUserInput");

  let newTodo = {
    text: todoUserInput.value,
    uniqueNo: todosCounter,
    isChecked: false,
  };

  todoList.push(newTodo);

  createAndAppendTodo(newTodo);
  todoUserInput.value = "";
}

let addTodoButton = document.getElementById("addTodoButton");
addTodoButton.onclick = function () {
  addTodoItem();
};

let saveButton = document.getElementById("saveButton");
saveButton.onclick = function () {
  saveToLocalStorage();
};
