// Protege la página
if(!localStorage.getItem("negocio")) {
    window.location.href = "index.html";
}

const negocio = localStorage.getItem("negocio");
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

function guardar() {
    localStorage.setItem(`productos_${negocio}`, JSON.stringify(productos));
}

function agregarProducto() {
    const nombre = document.getElementById("nombre").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precioCompra = parseInt(document.getElementById("precioCompra").value);
    const precioVenta = parseInt(document.getElementById("precioVenta").value);

    if(!nombre || !cantidad || !precioCompra || !precioVenta) {
        alert("Completa todos los campos");
        return;
    }

    productos.push({nombre, cantidad, precioCompra, precioVenta});
    guardar();
    mostrarProductos();
    limpiarFormulario();
}

function eliminarProducto(index) {
    if(confirm("¿Seguro que deseas eliminar este producto?")) {
        productos.splice(index, 1);
        guardar();
        mostrarProductos();
    }
}

function mostrarProductos() {
    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach((p, index) => {
        let alerta = "";
        if(p.cantidad <= 5) {
            alerta = "<p style='color:red;font-weight:bold;'>⚠ Stock Bajo</p>";
        }

        lista.innerHTML += `
            <div class="card">
                <h3>${p.nombre}</h3>
                <p>Cantidad: ${p.cantidad}</p>
                <p>Venta: $${p.precioVenta}</p>
                ${alerta}
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
        `;
    });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precioCompra").value = "";
    document.getElementById("precioVenta").value = "";
}

// Exportar PDF
async function exportarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Reporte de Inventario - ${negocio}`, 10, 10);
    let y = 20;

    productos.forEach(p => {
        doc.text(`${p.nombre} | Cant: ${p.cantidad} | Venta: $${p.precioVenta}`, 10, y);
        y += 10;
    });

    doc.save(`inventario_${negocio}.pdf`);
}

// Mostrar productos al cargar
mostrarProductos();