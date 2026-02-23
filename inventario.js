let productos = JSON.parse(localStorage.getItem("productos_" + usuarioActivo)) || [];

function guardar(){
    localStorage.setItem("productos_" + usuarioActivo, JSON.stringify(productos));
    actualizarDashboard();
}

function agregarProducto(){
    const nombre = document.getElementById("nombre").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precioCompra = parseFloat(document.getElementById("precioCompra").value);
    const precioVenta = parseFloat(document.getElementById("precioVenta").value);

    if(!nombre || isNaN(cantidad) || isNaN(precioCompra) || isNaN(precioVenta)) return;

    productos.push({nombre, cantidad, precioCompra, precioVenta});
    guardar();
    mostrarProductos();
    limpiarFormulario();
}

function mostrarProductos(){
    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";
    productos.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <p><strong>${p.nombre}</strong></p>
            <p>Cantidad: <span class="${p.cantidad <=5 ? 'stock-bajo':''}">${p.cantidad}</span></p>
            <p>Compra: $${p.precioCompra}</p>
            <p>Venta: $${p.precioVenta}</p>
            <button onclick="editarProducto(${index})">✏️ Editar</button>
            <button onclick="eliminarProducto(${index})">🗑 Eliminar</button>
        `;
        lista.appendChild(div);
    });
}

function limpiarFormulario(){
    document.getElementById("nombre").value="";
    document.getElementById("cantidad").value="";
    document.getElementById("precioCompra").value="";
    document.getElementById("precioVenta").value="";
}

function eliminarProducto(index){
    if(confirm("¿Seguro quieres eliminar este producto?")){
        productos.splice(index,1);
        guardar();
        mostrarProductos();
    }
}

function editarProducto(index){
    const p = productos[index];
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("cantidad").value = p.cantidad;
    document.getElementById("precioCompra").value = p.precioCompra;
    document.getElementById("precioVenta").value = p.precioVenta;

    const btn = document.querySelector(".btn-agregar");
    btn.textContent = "💾 Guardar";
    btn.onclick = function(){
        p.nombre = document.getElementById("nombre").value.trim();
        p.cantidad = parseInt(document.getElementById("cantidad").value);
        p.precioCompra = parseFloat(document.getElementById("precioCompra").value);
        p.precioVenta = parseFloat(document.getElementById("precioVenta").value);
        guardar();
        mostrarProductos();
        limpiarFormulario();
        btn.textContent = "+";
        btn.onclick = agregarProducto;
    };
}

function exportarPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Reporte de Inventario - ${usuarioActivo}`,14,22);
    doc.setFontSize(12);
    const fecha = new Date().toLocaleDateString();
    doc.text(`Fecha: ${fecha}`,14,30);

    const filas = productos.map(p => [
        p.nombre,
        p.cantidad,
        `$${p.precioCompra}`,
        `$${p.precioVenta}`,
        p.cantidad <=5 ? "⚠ Bajo" : ""
    ]);

    doc.autoTable({
        head: [['Producto','Cantidad','Compra','Venta','Stock']],
        body: filas,
        startY:40,
        theme:'grid',
        headStyles:{fillColor:[33,150,243]},
        styles:{fontSize:10},
        alternateRowStyles:{fillColor:[240,240,240]}
    });

    let totalValorizado = productos.reduce((acc,p)=>acc+p.cantidad*p.precioVenta,0);
    let ganancia = productos.reduce((acc,p)=>acc+(p.precioVenta-p.precioCompra)*p.cantidad,0);
    doc.text(`Total productos: ${productos.length}`,14,doc.lastAutoTable.finalY+10);
    doc.text(`Total valorizado: $${totalValorizado}`,14,doc.lastAutoTable.finalY+16);
    doc.text(`Ganancia potencial: $${ganancia}`,14,doc.lastAutoTable.finalY+22);

    doc.save(`inventario_${usuarioActivo}_${fecha}.pdf`);
}

mostrarProductos();