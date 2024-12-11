console.log("hello world");

let idactual

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



let api = "https://interpolice-omfr.onrender.com/api/citizen/";
let apiSpecie = "https://interpolice-omfr.onrender.com/api/species/"

let frmAction = "";

listartodos();

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
  cleanInput()
  frmAction = "crear";
  frmCrearCitizen.show();
});

function cleanInput(){
  let idform = "";
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  apodo.value = "";
  fecha.value = "";
}

function showSpecies(){
  especie.innerHTML = `<option selected hidden value="0">Seleccione la especie</option>`
  fetch(apiSpecie + "listarespecies")
    .then((res) => res.json())
    .then((res) => {
      res.species.forEach((species) => {
        console.log(species);
        especie.innerHTML += `<option value="${species.idespecie}" >${species.nombre_especie}</option> `;
      });
    });
}


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
        <td><button class="btnBorrar btn btn-danger" data-action-type='eliminar' rel="${citizen.idciudadano}"><i class="bi bi-trash"></i></button></td>
        <td><button class="btnEditar btn btn-primary" data-action-type='editar' rel="${citizen.idciudadano}"><i class="bi bi-pencil-square"></i></button></td>
        </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}

function crearCitizen(){
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
        foto: "img",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("exito");
        frmCrearCitizen.hide();
        location.reload();
      });
}

function editarCitizen(id){
  fetch(api + "editar/" + id, {
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
      password: password.value,
      especie: especie.value,
      rol: rol.value,
      foto: "img",
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

document.addEventListener("DOMContentLoaded", () => {
  showSpecies()
});

// boton submit
frmCitizen.addEventListener("submit", (e) => {
  e.preventDefault();
  // crear ciudadano
  if (frmAction === "crear") {
    crearCitizen()
  }

  // editar ciudadano
  if (frmAction === "editar") {
   editarCitizen(idactual)
  }
});

on(document, "click", ".btnBorrar", (e) => {
  let idCitizen = e.target.closest("button").getAttribute("rel");
  let respuesta = window.confirm(
    `seguro que desea eliminar el registro con id: ${idCitizen}`
  );

  if (respuesta) {
    fetch(api + "borrar/" + idCitizen, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }
});

// llamar formulario de edición
on(document, "click", ".btnEditar", (e) => {
  let idCitizen = e.target.closest("button").getAttribute("rel");
  idactual = idCitizen
  fetch(api + "listarid/" + idCitizen) 
  .then((res) => res.json())
    .then((res) => {
      citizen = res.citizen[0]
      console.log(citizen);
      nombre.value = citizen.nombre_ciudadano;
      apellido.value = citizen.apellido_ciudadano;
      email.value = citizen.email_ciudadano;
      apodo.value = citizen.apodo_ciudadano;
      password.value = citizen.password_ciudadano;
      fecha.value = citizen.fechaorigen;
      especie.innerHTML += `<option selected hidden value="${citizen.especies_idespecie}" >${citizen.nombre_especie}</option> `;
      rol.innerHTML += `<option selected hidden value="${citizen.roles_idrol}" >${citizen.nombre_rol}</option> `;
      frmAction = "editar";
      frmCrearCitizen.show();
    })
});
