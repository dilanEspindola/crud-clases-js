export default class Productos {
  constructor(nombre, presentacion, cantidad, categoriaId, imagen) {
    this.nombre = nombre;
    this.presentacion = presentacion;
    this.cantidad = cantidad;
    this.categoriaId = categoriaId;
    this.imagen = imagen;
  }

  async mostrarProductos(url) {
    const { data } = await axios.get(url);
    const grid = document.getElementById("main");
    grid.innerHTML += "";

    const products = data.map((product) => {
      return `
        <div class="col-12 col-md-2 col-lg-3">
          <div class="card mb-4 shadow-sm">
            <img
              src="${product.imagen}"
              alt="${product.nombre}"
              class="card-img-top"
            >
            <div class="card-body">
              <h5 class="card-title">${product.nombre}</h5>
              <p class="card-text">${product.cantidad}</p>
              <p class="card-text">${product.presentacion}</p>
              <div class="d-flex justify-content-end align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-success editar"
                    id=${product.id}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"                    
                  >
                    Editar
                  </button>
                  <button
                    class="btn btn-sm btn-danger eliminar"
                    id=${product.id}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    grid.innerHTML = products;
  }

  async crearProducto(url) {
    try {
      await axios.post(url, this);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async editarProducto(url, id) {
    const { data } = await axios.get(url);
    const singleProduct = data.find((product) => product.id == id);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = singleProduct[input.name];
    });

    const btnEditar = document.querySelector("#btnEditar");
    btnEditar.addEventListener("click", () => {
      const updatedProduct = {
        nombre: document.getElementById("nombre").value,
        presentacion: document.getElementById("presentacion").value,
        cantidad: document.getElementById("cantidad").value,
        categoriaId: document.getElementById("categoriaId").value,
        imagen: document.getElementById("imagen").value,
      };

      axios
        .put(url + id, updatedProduct)
        .then((res) => {
          location.reload();
          return res;
        })
        .catch((error) => console.log(error));
    });
  }

  async eliminarProducto(url, id) {
    try {
      await axios.delete(url + id);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}
