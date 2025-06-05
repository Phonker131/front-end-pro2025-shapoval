const btn = document.getElementById("generate-btn");
const container = document.getElementById("container");

function clearContainer() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function createMultiplicationTable() {
    clearContainer();

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");

    const blankCell = document.createElement("th");
    blankCell.textContent = "";
    headerRow.appendChild(blankCell);

    for (let col = 1; col <= 10; col++) {
        const th = document.createElement("th");
        th.textContent = col;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let row = 1; row <= 10; row++) {
        const tr = document.createElement("tr");

        const rowHeader = document.createElement("th");
        rowHeader.textContent = row;
        tr.appendChild(rowHeader);

        for (let col = 1; col <= 10; col++) {
            const td = document.createElement("td");
            td.textContent = row * col;
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    container.appendChild(table);
}

btn.addEventListener("click", createMultiplicationTable);
