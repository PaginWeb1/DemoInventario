// Protege la página
if(!localStorage.getItem("negocio")) {
    window.location.href = "index.html";
}

const negocio = localStorage.getItem("negocio");
document.getElementById("nombreNegocio").innerText = negocio;

// Inventario del negocio
let productos = JSON.parse(localStorage.getItem(`productos_${negocio}`)) || [];

// Productos de ejemplo para Doctor Simi
if(negocio === "Doctor Simi" && productos.length === 0) {
    productos = [
        {nombre:"Jarabe para la tos", cantidad:10, precioCompra:2000, precioVenta:3500},
        {nombre:"Vitamina C", cantidad:8, precioCompra:1500, precioVenta:2500},
        {nombre:"Termómetro digital", cantidad:5, precioCompra:5000, precioVenta:8000}
    ];
    localStorage.setItem(`productos_${negocio}`, JSON.stringify(productos));
}

document.getElementById("totalProductos").innerText = productos.length;

let totalValorizado = 0;
let ganancia = 0;

productos.forEach(p => {
    totalValorizado += p.cantidad * p.precioVenta;
    ganancia += (p.precioVenta - p.precioCompra) * p.cantidad;
});

document.getElementById("totalValorizado").innerText = "$" + totalValorizado;
document.getElementById("ganancia").innerText = "$" + ganancia;