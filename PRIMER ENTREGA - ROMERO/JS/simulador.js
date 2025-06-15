// -------------------- VARIABLES Y CONSTANTES --------------------
const gastosFijos = ["Alquiler", "Comida", "Transporte"];
let ingresos = 0;
let egresos = [];


// -------------------- FUNCIONES PRINCIPALES --------------------

// Entrada de datos
function pedirIngresos() {
  let input = prompt("¿Cuánto ganás por mes?");
  ingresos = parseFloat(input);

  while (isNaN(ingresos) || ingresos <= 0) {
    input = prompt("⚠️ Ingresá un número válido mayor que 0 para tus ingresos:");
    ingresos = parseFloat(input);
  }

  console.log("✔ Ingresos registrados: $" + ingresos);
}

// Procesamiento de datos
function pedirEgresos() {
  egresos = []; 

  for (let i = 0; i < gastosFijos.length; i++) {
    let gastoInput = prompt(`¿Cuánto gastás por mes en ${gastosFijos[i]}?`);
    let gasto = parseFloat(gastoInput);

    while (isNaN(gasto) || gasto < 0) {
      gastoInput = prompt(`⚠️ Ingresá un número válido para ${gastosFijos[i]}:`);
      gasto = parseFloat(gastoInput);
    }

    egresos.push(gasto);
    console.log(`✔ ${gastosFijos[i]}: $${gasto}`);
  }
}

// Salida de resultados
function calcularBalance() {
  const totalGastos = egresos.reduce((acc, gasto) => acc + gasto, 0);
  const balance = ingresos - totalGastos;

  let mensaje = `💰 Ingresos: $${ingresos.toFixed(2)}\n🧾 Gastos totales: $${totalGastos.toFixed(2)}\n`;

  if (balance > 0) {
    mensaje += `✅ ¡Te sobran $${balance.toFixed(2)} este mes!`;
  } else if (balance < 0) {
    mensaje += `❌ ¡Estás en déficit de $${Math.abs(balance).toFixed(2)}!`;
  } else {
    mensaje += `😐 ¡Tu balance es cero!`;
  }

  alert(mensaje);
  console.log("✔ Balance final:", balance);
}

// Confirmación para continuar
function iniciarSimulador() {
  const continuar = confirm("¿Querés iniciar el simulador de presupuesto?");

  if (continuar) {
    pedirIngresos();
    pedirEgresos();
    calcularBalance();
  } else {
    alert("🚫 Simulación cancelada.");
  }
}

// -------------------- EJECUCIÓN --------------------
iniciarSimulador();