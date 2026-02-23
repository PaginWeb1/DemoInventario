// Usuario de prueba
const usuarioPrueba = {usuario: "Doctor Simi", clave: "1234"};

// Guardar usuario prueba si no existe
if(!localStorage.getItem("credenciales")) {
    localStorage.setItem("credenciales", JSON.stringify([usuarioPrueba]));
}

function login() {
    const usuarioInput = document.getElementById("usuario");
    const claveInput = document.getElementById("clave");

    const usuario = usuarioInput.value.trim();
    const clave = claveInput.value.trim();

    if(usuario === "" || clave === "") {
        alert("Completa todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("credenciales")) || [];

    const encontrado = usuarios.find(u => u.usuario === usuario);

    if(encontrado) {
        if(encontrado.clave === clave) {
            localStorage.setItem("negocio", usuario);
            window.location.href = "dashboard.html";
        } else {
            alert("Clave incorrecta");
        }
    } else {
        // Crear nuevo usuario
        usuarios.push({usuario, clave});
        localStorage.setItem("credenciales", JSON.stringify(usuarios));
        localStorage.setItem("negocio", usuario);
        window.location.href = "dashboard.html";
    }
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("negocio");
    window.location.href = "index.html";
}