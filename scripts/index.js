import Product from "./crud.js";

const url = "https://backend-licores.herokuapp.com/productos/";
const product = new Product();

window.addEventListener("DOMContentLoaded", () => {
  return product.mostrarProductos(url);
});

const form = document.querySelector("#formAdd");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombre = document.getElementById("nombre").value;
  let presentacion = document.getElementById("presentacion").value;
  let cantidad = document.getElementById("cantidad").value;
  let categoriaId = document.getElementById("categoriaId").value;
  let imagen = document.getElementById("imagen").value;
  product.nombre = nombre;
  product.presentacion = presentacion;
  product.cantidad = cantidad;
  product.categoriaId = categoriaId;
  product.imagen = imagen;
  product.crearProducto(url);

  form.reset();
});

const main = document.querySelector("#main");
main.addEventListener("click", (e) => {
  const id = e.target.id;
  if (e.target.classList.contains("editar")) {
    product.editarProducto(url, id);
  }
  if (e.target.classList.contains("eliminar")) {
    product.eliminarProducto(url, id);
  }
});
