console.log("hello world");

let api = "https://interpolice-omfr.onrender.com/api/antecedentes/";
let contenido = document.querySelector("#contenido");
let btnNuevo = document.querySelector("#btnNuevo");
let frmAction = "";
let frmAnt = document.querySelector("#frmAnt")

const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

// carga la modal
const frmCrearAnt = new bootstrap.Modal(
    document.getElementById("frmCrearAnt")
  );

// disparar la modal
btnNuevo.addEventListener("click", () => {
    frmAction = "crear";
    frmCrearAnt.show();
  });

  //mostrar elementos en la tabla
function listartodos() {
    fetch(api + "listartodos")
      .then((res) => res.json())
      .then((res) => {
        res.antecedentes.forEach((antecedentes) => {
          let fila = `<tr>
            <td>${antecedentes.idantecedente}</td>
            <td>${antecedentes.fecha}</td>
            <td>${antecedentes.descripcion}</td>
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
  frmAnt.addEventListener("submit", (e) => {
    e.preventDefault();
    // crear 
    if (frmAction === "crear") {
      fetch(api + "crear", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            fecha: fecha.value,
          ciudadano: ciudadano.value,
          delito: delito.value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("exito");
          frmCrearAnt.hide();
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
            fecha: fecha.value,
          ciudadano: ciudadano.value,
          delito: delito.value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status, res.respuesta);
          alert("exito");
          frmCrearAnt.hide();
          location.reload();
        });
    }
    frmCrearAnt.hide();
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
    let idantecedente = fila.children[0].innerText;
    console.log(idform);
    idform = idrado;
    fecha.value = fila.children[1].innerText;
    descripcion.value = fila.children[2].innerText;
    frmCrearAnt.show();
  });