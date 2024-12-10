console.log("hello world");

let api = "https://interpolice-omfr.onrender.com/api/delitos/";
let contenido = document.querySelector("#contenido");
let btnNuevoDelito = document.querySelector("#btnNuevoDelito");
let frmAction = "";
let frmDelitos = document.querySelector("#frmDelitos")

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

// carga la modal
const frmCrearDelito = new bootstrap.Modal(
    document.getElementById("frmCrearDelito")
  );

// disparar la modal
btnNuevoDelito.addEventListener("click", () => {
    nombre.value = "";
    grado.value = "";
    descripcion.value = "";
    frmAction = "crear";
    frmCrearDelito.show();
  });

  //mostrar elementos en la tabla
function listartodos() {
    fetch(api + "listartodos")
      .then((res) => res.json())
      .then((res) => {
        res.delitos.forEach((delitos) => {
          let fila = `<tr>
            <td>${delitos.iddelito}</td>
            <td>${delitos.nombre_delito}</td>
            <td>${delitos.descripcion_delito}</td>
            <td>${delitos.grado_delitos}</td>
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
  frmDelitos.addEventListener("submit", (e) => {
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
          descripcion: descripcion.value,
          grado: grado.value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("exito");
          frmCrearDelito.hide();
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
            descripcion: descripcion.value,
            grado: grado.value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status, res.respuesta);
          alert("exito");
          frmCrearDelito.hide();
          location.reload();
        });
    }
    frmCrearDelito.hide();
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
    let iddelito = fila.children[0].innerText;
    console.log(idform);
    idform = iddelito;
    nombre.value = fila.children[1].innerText;
    //grado.value = fila.children[2].innerText;
    descripcion.value = fila.children[3].innerText;
    frmCrearDelito.show();
  });