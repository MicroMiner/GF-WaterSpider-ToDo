document.addEventListener("DOMContentLoaded", () => {
    const stepCategory = document.getElementById("step-category");
    const stepObject = document.getElementById("step-object");
    const stepTableNr = document.getElementById("step-tableNr");
    const stepInfo = document.getElementById("step-info");
    const stepVerbrauch = document.getElementById("step-verbrauch"); // ✅ Fix für richtige ID
    const summarySection = document.getElementById("summary");
    const summaryContainer = document.getElementById("summary-content");
    const infoTextInput = document.getElementById("infoText");
    const confirmInfoBtn = document.getElementById("confirmInfo");
    const tableTitle = document.getElementById("tableTitle");

    let selectedData = {}; 
    let fromTableNrSelected = false;

    // ** Fix: Alle Schritte außer `step-category` beim Laden ausblenden **
    if (stepCategory) {
        stepCategory.style.display = "flex";
    } else {
        console.error("❌ FEHLER: 'step-category' wurde nicht gefunden.");
    }

    if (stepObject) stepObject.style.display = "none";
    if (stepTableNr) stepTableNr.style.display = "none";
    if (stepInfo) stepInfo.style.display = "none";
    if (stepVerbrauch) stepVerbrauch.style.display = "none"; // **Fix: Verbrauch von Anfang an ausblenden**
    if (summarySection) summarySection.style.display = "none";

    // ** Sicherstellen, dass der Bestätigungsbutton existiert **
    if (confirmInfoBtn) {
        confirmInfoBtn.addEventListener("click", () => {
            selectedData["Info"] = infoTextInput.value.trim() || "Keine Notiz";
            stepInfo.style.display = "none";
            updateSummary();
        });
    }

    // ** Kategorie auswählen **
    document.querySelectorAll("#step-category .box").forEach(box => {
        box.addEventListener("click", () => {
            selectedData["Kategorie"] = box.getAttribute("data-value");

            stepCategory.style.display = "none";
            stepObject.style.display = "none";

            if (selectedData["Kategorie"] === "Abholung" || selectedData["Kategorie"] === "Lieferung") {
                stepObject.style.display = "flex"; 
            } else if (selectedData["Kategorie"] === "Info") {
                stepInfo.style.display = "flex";  
            }
        });
    });

    // ** Objekt auswählen **
    document.querySelectorAll("#step-object .box").forEach(box => {
        box.addEventListener("click", () => {
            selectedData["Was"] = box.getAttribute("data-value");
            stepObject.style.display = "none";

            if (selectedData["Was"] === "Verbrauchsgütter") {
                stepVerbrauch.style.display = "flex"; // ✅ **Verbrauchsauswahl anzeigen**
            } else if (selectedData["Kategorie"] === "Lieferung") {
                stepTableNr.style.display = "flex"; 
            } else if (selectedData["Kategorie"] === "Info") {
                stepInfo.style.display = "flex";  
            } else {
                stepTableNr.style.display = "flex"; 
            }
        });
    });

    // ** Verbrauchsgüter auswählen **
    document.querySelectorAll("#step-verbrauch .box").forEach(box => {
        box.addEventListener("click", () => {
            selectedData["Verbrauchsgut"] = box.getAttribute("data-value");
            stepVerbrauch.style.display = "none"; 

            if (selectedData["Kategorie"] === "Lieferung" || selectedData["Kategorie"] === "Abholung") {
                selectedData["Zu Tisch"] = ""; // Sicherstellen, dass es existiert
                stepTableNr.style.display = "flex"; // **Nur "Zu Tisch" anzeigen**
            } else {
                stepInfo.style.display = "flex"; 
            }
        });
    });

    // ** Tischnummer auswählen (mit Titelwechsel) **
    document.querySelectorAll("#step-tableNr .box").forEach(box => {
        box.addEventListener("click", () => {
            let tableNr = box.getAttribute("data-value");

            if (selectedData["Kategorie"] === "Abholung") {
                if (!fromTableNrSelected) {
                    selectedData["Von Tisch"] = tableNr;
                    fromTableNrSelected = true;
                    if (tableTitle) tableTitle.innerText = "Zu Tisch auswählen:";
                } else {
                    selectedData["Zu Tisch"] = tableNr;
                    stepTableNr.style.display = "none";
                    updateSummary();
                }
            } else {
                selectedData["Zu Tisch"] = tableNr;
                stepTableNr.style.display = "none";
                updateSummary();
            }
        });
    });

    // ** Summery aktualisieren **
    function updateSummary() {
        summaryContainer.innerHTML = ""; 

        if (Object.keys(selectedData).length === 0) {
            console.warn("Summery enthält keine Daten, wird nicht angezeigt.");
            return;
        }

        Object.keys(selectedData).forEach(key => {
            let p = document.createElement("p");
            p.innerHTML = `<strong>${key}:</strong> ${selectedData[key]}`;
            summaryContainer.appendChild(p);
        });

        summarySection.style.display = "flex"; 
    }

    // ** Speicherung & Weiterleitung **
    document.addEventListener("click", (event) => {
        if (event.target && event.target.id === "saveTodo") {
            saveTodo(selectedData);
            window.location.href = "index.html";
        }
    });
});
