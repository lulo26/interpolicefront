console.log("hello world");

let contenido = document.querySelector("#contenido");
let frmCitizen = document.querySelector("#frmCitizen");
let btnNuevo = document.querySelector("#btnNuevo");

// ... ... ... ... ... ... ... ... ... ... ... ... ... //
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let apodo = document.querySelector("#apodo");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let fecha = document.querySelector("#fecha");
let especie = document.querySelector("#especie");
let rol = document.querySelector("#rol");
let foto = document.querySelector("#foto");
// ... ... ... ... ... ... ... ... ... ... ... ... ... //

let frmAction = "";

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

// carga la modal
const frmCrearCitizen = new bootstrap.Modal(
  document.getElementById("frmCrearCitizen")
);

// disparar la modal
btnNuevo.addEventListener("click", () => {
  // limpiar los input
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  apodo.value = "";
  fecha.value = "";
  especie.value = "";
  rol.value = "";
  foto.value = "";
  frmAction = "crear";
  frmCrearCitizen.show();
});

let api = "http://localhost:4200/api/citizen/";

// mostrar elementos en la tabla
function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      res.citizen.forEach((citizen) => {
        let fila = `<tr>
        <td>${citizen.idciudadano}</td>
        <td>${citizen.nombre_ciudadano}</td>
        <td>${citizen.apellido_ciudadano}</td>
        <td>${citizen.email_ciudadano}</td>
        <td>${citizen.apodo_ciudadano}</td>
        <td>${citizen.fechaorigen}</td>
        <td>${citizen.nombre_especie}</td>
        <td>${citizen.nombre_rol}</td>
        <td><button class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
        <td><button class="btnEditar btn btn-primary"><i class="bi bi-pencil-square"></i></button></td>
        </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  listartodos();
});

// boton submit
frmCitizen.addEventListener("submit", (e) => {
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
        apellido: apellido.value,
        email: email.value,
        apodo: apodo.value,
        fecha: fecha.value,
        password: password.value,
        especie: especie.value,
        rol: rol.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("exito");
        frmCrearCitizen.hide();
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
        apellido: apellido.value,
        email: email.value,
        apodo: apodo.value,
        fecha: fecha.value,
        especie: especie.value,
        rol: rol.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        alert("exito");
        frmCrearCitizen.hide();
        location.reload();
      });
  }
  frmCrearCitizen.hide();
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
  apellido.value = fila.children[2].innerText;
  email.value = fila.children[3].innerText;
  apodo.value = fila.children[4].innerText;
  fecha.value = fila.children[5].innerText;
  especie.value = fila.children[6].innerText;
  rol.value = fila.children[7].innerText;
  frmAction = "editar";
  frmCrearCitizen.show();
});
