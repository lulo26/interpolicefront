let api = "https://interpolice-omfr.onrender.com/api/species/";
let contenido = document.querySelector("#contenido");
let btnNuevaEspecie = document.querySelector("#btnNuevaEspecie");
let frmAction = "";

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

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

// boton submit
frmSpecies.addEventListener("submit", (e) => {
  e.preventDefault();
  // crear ciudadano
  if (frmAction === "crear") {
    fetch(api + "crear", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("exito");
        frmCrearEspecie.hide();
        location.reload();
      });
  }

  // editar ciudadano
  if (frmAction === "editar") {
    fetch(api + "editar", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        nombre: nombre.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        alert("exito");
        frmCrearEspecie.hide();
        location.reload();
      });
  }
  frmCrearEspecie.hide();
});

on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `seguro que desea eliminar el registro con id: ${idform}`
  );
  console.log(idform);

  if (respuesta) {
    fetch(api + "borrar/" + idform, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }
});

// llamar formulario de edición
let idform = "";
on(document, "click", ".btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  console.log(fila);
  let idciudadano = fila.children[0].innerText;
  console.log(idform);
  idform = idciudadano;
  nombre.value = fila.children[1].innerText;
  frmCrearEspecie.show();
});