// Usuarios ejemplo con claves
const usuarios = [
    {usuario: "Doctor Simi", clave: "simi123"},
    {usuario: "Farmacia ABC", clave: "abc123"}
];

function login() {
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();
    const mensaje = document.getElementById("mensajeError");

    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.clave === clave);

    if(usuarioValido){
        localStorage.setItem("usuarioActivo", usuarioValido.usuario);
        window.location.href = "dashboard.html";
    } else {
        mensaje.textContent = "Usuario o clave incorrecta";
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
}