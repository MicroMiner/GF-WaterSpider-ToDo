// ** Funktion zum Speichern eines neuen To-Do-Items **
window.saveTodo = function(selectedData) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (Object.keys(selectedData).length > 0) {
        todos.push(selectedData);
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log("✅ To-Do gespeichert:", selectedData);
    } else {
        console.warn("⚠️ To-Do ist leer und wurde nicht gespeichert.");
    }
};

// ** Funktion zum Laden der To-Do-Liste **
window.loadTodos = function() {
    const todoContainer = document.getElementById("todoContainer");
    if (!todoContainer) return;

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log("📂 Geladene To-Do-Liste:", todos);

    if (todos.length === 0) {
        console.warn("⚠️ Keine gespeicherten To-Do-Items gefunden.");
        return;
    }

    // ** Container leeren, bevor neue Items geladen werden **
    todoContainer.innerHTML = "";

    todos.forEach(todo => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        if (todo["Kategorie"] === "Abholung") {
            todoItem.classList.add("pickUp");
        } else if (todo["Kategorie"] === "Lieferung") {
            todoItem.classList.add("delivery");
        } else if (todo["Kategorie"] === "Info") {
            todoItem.classList.add("info");
        }

        let content = "";
        Object.keys(todo).forEach(key => {
            content += `<span><strong>${key}:</strong> ${todo[key]}</span>`;
        });

        todoItem.innerHTML = `
            ${content}
            <button class="close-btn">X</button>
        `;

        // ** Löschen-Button für To-Do-Item **
        todoItem.querySelector(".close-btn").addEventListener("click", () => {
            deleteTodo(todo);
            todoItem.remove();
        });

        todoContainer.appendChild(todoItem);
    });
};

// ** Funktion zum Löschen eines To-Do-Items **
window.deleteTodo = function(todoToDelete) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => JSON.stringify(todo) !== JSON.stringify(todoToDelete));
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("🗑️ To-Do gelöscht:", todoToDelete);
};

// ** To-Do-Liste sofort beim Laden aufrufen **
document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
});
