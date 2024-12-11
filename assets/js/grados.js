console.log("hello world");

let idactual;

let api = "https://interpolice-omfr.onrender.com/api/grados/";
let contenido = document.querySelector("#contenido");
let btnNuevo = document.querySelector("#btnNuevo");
let frmAction = "";
let frmGrados = document.querySelector("#frmGrados")

let grado = document.querySelector("#grado")
let descripcion = document.querySelector("#descripcion")

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

// carga la modal
const frmCrearGrado = new bootstrap.Modal(
    document.getElementById("frmCrearGrado")
  );

// disparar la modal
btnNuevo.addEventListener("click", () => {
    frmAction = "crear";
    frmCrearGrado.show();
  });

   //mostrar elementos en la tabla
function listartodos() {
    fetch(api + "listartodos")
      .then((res) => res.json())
      .then((res) => {
        res.grados.forEach((grados) => {
          let fila = `<tr>
            <td>${grados.idgrado_delito}</td>
            <td>${grados.grado_delito}</td>
            <td>${grados.descripcion_grado}</td>
            <td><button class="btnBorrar btn btn-danger" data-action-type='eliminar' rel="${grados.idgrado_delito}"><i class="bi bi-trash"></i></button></td>
            <td><button class="btnEditar btn btn-primary" data-action-type='editar' rel="${grados.idgrado_delito}"><i class="bi bi-pencil-square"></i></button></td>
            </tr><br>`;
          contenido.innerHTML += fila;
        });
      });
  }
  
  window.addEventListener("DOMContentLoaded", (e) => {
    listartodos();
  });
  
  // boton submit
  frmGrados.addEventListener("submit", (e) => {
    e.preventDefault();
    // crear ciudadano
    if (frmAction === "crear") {
      fetch(api + "crear", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          grado: grado.value,
          descripcion: descripcion.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
            console.log(res.status, res.respuesta);
          alert("exito");
          frmCrearGrado.hide();
          location.reload();
        });
    }
  
    // editar ciudadano
    if (frmAction === "editar") {
      fetch(api + "editar/" + idactual, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
  
        body: JSON.stringify({
            grado: grado.value,
            descripcion: descripcion.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status, res.respuesta);
          alert("exito");
          frmCrearGrado.hide();
          location.reload();
        });
    }
    frmCrearGrado.hide();
  });
  
  on(document, "click", ".btnBorrar", (e) => {
    let idGrados = e.target.closest("button").getAttribute("rel");
    let respuesta = window.confirm(
      `seguro que desea eliminar el registro con id: ${idGrados}`
    );
  
    if (respuesta) {
      fetch(api + "borrar/" + idGrados, {
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
    let idGrados = e.target.closest("button").getAttribute("rel");
    idactual = idGrados;
    fetch(api + "listarid/" + idGrados) 
      .then((res) => res.json())
      .then((res) => {
        grados = res.grados[0]
        console.log(grados);
        grado.value = grados.grado_delito;
        descripcion.value = grados.descripcion_grado;
        frmAction = "editar";
        frmCrearGrado.show();
  })
})
