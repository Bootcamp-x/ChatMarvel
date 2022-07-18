// logica para formatear fechas
function insertarHora() {
  let d = new Date();
  let hora24 = d.getHours();
  let hora12 = hora24 % 12;
  hora12 = (hora12 < 10 ? "0" : "") + hora12;
  let min = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  let horaActual;
  if (hora24 < 12) {
    horaActual = hora12 + ":" + min + " am";
  } else {
    horaActual = hora12 + ":" + min + " pm";
  }
  console.log(horaActual);
  return horaActual;
}
