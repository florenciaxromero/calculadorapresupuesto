console.log("✅ Script cargado correctamente");


const gastosFijos = ["Alquiler", "Comida", "Transporte"];
let ingresos = 0;
let egresos = [];

window.addEventListener("DOMContentLoaded", () => {
  const ingresoInput = document.getElementById("ingresoInput");
  const egresosContainer = document.getElementById("egresosContainer");
  const formulario = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");

  crearInputsGastos();
  cargarDesdeLocalStorage();

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    ingresos = parseFloat(ingresoInput.value);
    egresos = [];

    if (isNaN(ingresos) || ingresos <= 0) {
      mostrarResultado("⚠️ Ingresá un ingreso válido mayor que cero.");
      return;
    }

    let error = false;
    gastosFijos.forEach((_, i) => {
      const valor = parseFloat(document.getElementById(`gasto-${i}`).value);
      if (isNaN(valor) || valor < 0) {
        error = true;
      }
      egresos.push(valor || 0);
    });

    if (error) {
      mostrarResultado("⚠️ Revisá que todos los gastos sean números válidos.");
      return;
    }

    guardarEnLocalStorage();
    mostrarBalance();
  });

  function crearInputsGastos() {
    gastosFijos.forEach((gasto, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <label for="gasto-${index}">${gasto}:</label>
        <input type="number" id="gasto-${index}" min="0" />
      `;
      egresosContainer.appendChild(div);
    });
  }

  function mostrarBalance() {
    const totalGastos = egresos.reduce((acc, val) => acc + val, 0);
    const balance = ingresos - totalGastos;

    let mensaje = `💰 Ingresos: $${ingresos.toFixed(2)}\n🧾 Gastos totales: $${totalGastos.toFixed(2)}\n`;

    if (balance > 0) {
      mensaje += `✅ ¡Te sobran $${balance.toFixed(2)} este mes!`;
    } else if (balance < 0) {
      mensaje += `❌ ¡Estás en déficit de $${Math.abs(balance).toFixed(2)}!`;
    } else {
      mensaje += `😐 ¡Tu balance es cero!`;
    }

    mostrarResultado(mensaje);
  }

  function mostrarResultado(mensaje) {
    resultado.textContent = mensaje;
  }

  function guardarEnLocalStorage() {
    const data = {
      ingresos,
      egresos
    };
    localStorage.setItem("presupuesto", JSON.stringify(data));
  }

  function cargarDesdeLocalStorage() {
    const data = JSON.parse(localStorage.getItem("presupuesto"));
    if (!data) return;

    ingresoInput.value = data.ingresos;

    data.egresos.forEach((val, i) => {
      const input = document.getElementById(`gasto-${i}`);
      if (input) input.value = val;
    });

    ingresos = data.ingresos;
    egresos = data.egresos;
    mostrarBalance();
  }
});

