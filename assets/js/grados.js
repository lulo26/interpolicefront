console.log("hello world");

let api = "https://interpolice-omfr.onrender.com/api/grados/";
let contenido = document.querySelector("#contenido");
let btnNuevo = document.querySelector("#btnNuevo");
let frmAction = "";
let frmGrados = document.querySelector("#frmGrados")

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
            <td>${grados.descripción_grado}</td>
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
          alert("exito");
          frmCrearGrado.hide();
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
    let idrado = fila.children[0].innerText;
    console.log(idform);
    idform = idrado;
    grado.value = fila.children[1].innerText;
    descripcion.value = fila.children[2].innerText;
    frmCrearGrado.show();
  });