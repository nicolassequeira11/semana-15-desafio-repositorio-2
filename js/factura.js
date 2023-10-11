document.addEventListener("DOMContentLoaded", () => {
  let productos = []; // Declarar la variable productos

  // Función para cargar los productos en el select
  function cargarProductos(productos) {
    const selector = document.getElementById("products");
    productos.forEach(element => {
      let valores = {
        "name": element.producto,
        "precio": element.precio,
        "id": element.id
      };
      selector.innerHTML += `
        <option value='${JSON.stringify(valores)}'>${element.producto}</option>
      `;
    });
  }

  // Obtener productos de la API o archivo JSON
  const url = "api/productos.json";

  function obtener(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return { status: "ok", data: data };
      })
      .catch(error => {
        return { status: "error", data: error };
      });
  }

  // Obtener y cargar los productos
  obtener(url).then(resultado => {
    if (resultado.status === "ok") {
      productos = resultado.data;
      cargarProductos(productos);
    }
  });

  // Agregar evento al botón "Agregar"
  const agregar = document.getElementById("btn");
  const selector = document.getElementById("products");
  const detalleContainer = document.getElementById("detalle-container");

  agregar.addEventListener("click", () => {
    // Obtener el índice de la opción seleccionada en el elemento de selección
    const selectedIndex = selector.selectedIndex;

    // Verificar si se ha seleccionado una opción válida
    if (selectedIndex !== -1) {
      // Obtener el valor de la opción seleccionada, que es un objeto JSON en forma de cadena
      const optionValue = selector.options[selectedIndex].value;

      // Analizar el objeto JSON y almacenarlo en una variable llamada 'objeto'
      const objeto = JSON.parse(optionValue);

      const name = objeto.name;
      const precio = objeto.precio;

      // Agregar a la lista
      detalleContainer.innerHTML += `
      <div class="d-flex m-auto my-3 container col-12">
        <p class="col-8 m-auto">
          <strong>Producto:</strong> ${name}</p>
        <p class="col-2 m-auto">
          <strong>Precio:</strong> $${precio}</p>
        <div class="col-2 justify-content-end d-flex">
          <button class="btn btn-danger">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
      <hr class="m-auto mt-2">
      `;
    }
  });
});
