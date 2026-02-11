const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".div04 button");
const peopleInput = document.getElementById("people");
const tipAmountDisplay = document.getElementById("resultadoperson");
const totalAmountDisplay = document.getElementById("totalperson");
const resetButton = document.querySelector("#secresultado button");
const peopleError = document.getElementById("people-error");
const peopleContainer = document.querySelector(".div06");

let selectedTip = null;

/* =========================
   SELECCIÓN DE BOTÓN DE PROPINA
========================= */

tipButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        selectedTip = parseFloat(btn.textContent) / 100;

        calculate();
    });
});

/* =========================
   ESCUCHAR CAMBIOS EN LOS INPUTS
========================= */

billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

/* =========================
   FUNCIÓN DE CÁLCULO
========================= */

function calculate() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    // VALIDACIÓN: número de personas
    if (!people || people <= 0) {
        peopleError.classList.remove("hidden");
        peopleContainer.classList.add("error-border");

        tipAmountDisplay.textContent = "$0.00";
        totalAmountDisplay.textContent = "$0.00";
        return;
    } else {
        peopleError.classList.add("hidden");
        peopleContainer.classList.remove("error-border");
    }

    // Si no hay cuenta válida o no se ha seleccionado propina
    if (isNaN(bill) || selectedTip === null) {
        tipAmountDisplay.textContent = "$0.00";
        totalAmountDisplay.textContent = "$0.00";
        return;
    }

    const tipPerPerson = (bill * selectedTip) / people;
    const totalPerPerson = (bill / people) + tipPerPerson;

    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

/* =========================
   BOTÓN RESET
========================= */

resetButton.addEventListener("click", () => {

    billInput.value = "";
    peopleInput.value = "";
    selectedTip = null;

    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";

    peopleError.classList.add("hidden");
    peopleContainer.classList.remove("error-border");
});
