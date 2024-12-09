let api = "http://localhost:4200/api/species/";
let contenido = document.querySelector("#contenido");
let btnNuevaEspecie = document.querySelector("#btnNuevaEspecie");

//mostrar elementos en la tabla
function listartodos() {
  fetch(api + "listarespecies")
    .then((res) => res.json())
    .then((res) => {
      res.species.forEach((species) => {
        let fila = `<tr>
          <td>${species.idespecie}</td>
          <td>${species.nombre_especie}</td>
          <td><button class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
          <td><button class="btnEditar btn btn-primary"><i class="bi bi-pencil-square"></i></button></td>
          </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}

window.addEventListener("DOMContentLoaded", (e) => {
  listartodos();
});

// carga la modal
const frmCrearEspecie = new bootstrap.Modal(
  document.getElementById("frmCrearEspecie")
);

// disparar la modal
btnNuevaEspecie.addEventListener("click", () => {
  // limpiar los input
  nombre.value = "";
  frmAction = "crear";
  frmCrearEspecie.show();
});
