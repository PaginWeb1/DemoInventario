let usuarioActivo = localStorage.getItem("usuarioActivo");
if(!usuarioActivo){
    window.location.href = "index.html";
} else {
    document.getElementById("nombreNegocio").textContent = usuarioActivo;
    document.getElementById("nombreNegocioInv")?.textContent = usuarioActivo;
}

let productos = JSON.parse(localStorage.getItem("productos_" + usuarioActivo)) || [];

function actualizarDashboard(){
    let totalProductos = productos.length;
    let totalValorizado = productos.reduce((acc, p) => acc + p.cantidad * p.precioVenta, 0);
    let ganancia = productos.reduce((acc, p) => acc + (p.precioVenta - p.precioCompra) * p.cantidad, 0);

    document.getElementById("totalProductos").textContent = totalProductos;
    document.getElementById("totalValorizado").textContent = "$" + totalValorizado;
    document.getElementById("ganancia").textContent = "$" + ganancia;
}

actualizarDashboard();