document.addEventListener("DOMContentLoaded", () => {
    const stepCategory = document.getElementById("step-category");
    const stepTableNr = document.getElementById("step-tableNr");
    const stepInfo = document.getElementById("step-info");
    const summarySection = document.getElementById("summary");

    const summaryCategory = document.getElementById("summary-category");
    const summaryTableNr = document.getElementById("summary-tableNr");
    const summaryInfo = document.getElementById("summary-info");

    let selectedCategory = "";
    let selectedTableNr = "";
    let selectedInfo = "";

    // Deaktivieren von Elementen mit leerem data-value
    document.querySelectorAll("#step-category .box, #step-tableNr .box, #step-info .box").forEach(box => {
        if (box.getAttribute("data-value") === "") {
            box.style.pointerEvents = "none"; // Klicks deaktivieren
            box.style.opacity = "0.5"; // Visuell ausgrauen (optional)
        } else {
            box.addEventListener("click", () => {
                let step = box.closest(".stepWrapper").id;
                if (step === "step-category") {
                    selectedCategory = box.getAttribute("data-value");
                    summaryCategory.innerText = selectedCategory;
                    stepCategory.style.display = "none";
                    stepTableNr.style.display = "grid";
                } else if (step === "step-tableNr") {
                    selectedTableNr = box.getAttribute("data-value");
                    summaryTableNr.innerText = selectedTableNr;
                    stepTableNr.style.display = "none";
                    stepInfo.style.display = "grid";
                } else if (step === "step-info") {
                    selectedInfo = box.getAttribute("data-value");
                    summaryInfo.innerText = selectedInfo;
                    stepInfo.style.display = "none";
                    summarySection.style.display = "grid";
                }
            });
        }
    });

    // Dynamische Event Delegation für den Speicher-Button
    document.addEventListener("click", (event) => {
        if (event.target && event.target.id === "saveTodo") {
            console.log("Speicher-Button geklickt!");

            let newTodo = {
                category: document.getElementById("summary-category").innerText,
                tableNr: document.getElementById("summary-tableNr").innerText,
                info: document.getElementById("summary-info").innerText
            };

            let todos = JSON.parse(localStorage.getItem("todos")) || [];
            todos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(todos));

            console.log("Gespeicherte Todos:", localStorage.getItem("todos"));

            window.location.href = "index.html";
        }
    });

    //* Wiedergabe der Daten
    const todoContainer = document.getElementById("todoContainer");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <span>${todo.category}</span>
            <span>${todo.tableNr}</span>
            <span>${todo.info}</span>
            <button class="close-btn">X</button>
        `;

        // Löschen-Button Funktionalität
        todoItem.querySelector(".close-btn").addEventListener("click", () => {
            todos = todos.filter(t => t !== todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            todoItem.remove();
        });

        todoContainer.appendChild(todoItem);
    });
});
