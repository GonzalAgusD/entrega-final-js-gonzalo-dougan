let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
    productos = data;
    cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){} 
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// wp flotante

var menuToggle = document.querySelector(".whatsapp-float"),
	wrapperMenu = document.querySelector(".nav-whatsapp"),
	closeWA = document.querySelector(".closeWA");
var inputs = document.querySelectorAll('.Fcontrol input[type=text], .Fcontrol input[type=email], .Fcontrol textarea');

menuToggle.onclick = function() {
wrapperMenu.classList.toggle('active');
}
closeWA.onclick = function() {
wrapperMenu.classList.remove('active');
};

for (var i = 0; i < inputs.length; i++) {
var input = inputs[i];
input.addEventListener('input', function() {
    var bg = this.value ? 'show' : 'none';
    this.setAttribute('class', bg);
});
}

function sendToWhatsApp() {
 
var name = document.getElementById("cName").value;
var email = document.getElementById("cEmail").value;
var subject = document.getElementById("cSubject").value;
var massage = document.getElementById("cMessage").value;
var postLink = window.location.href;
  
var error_name = document.getElementById("error_name"),
    error_email = document.getElementById("error_email"),
    error_message = document.getElementById("error_message");
var text;
if (name == "") {
    text = 'Please enter your name';
    error_name.setAttribute('data-text', text);
    return false;
}
if (email.indexOf("@") == -1 || email.length < 6) {
    text = 'Please enter valid email';
    error_email.setAttribute('data-text', text);
    return false;
}
if (massage == "") {
    text = 'Please enter your Massage';
    error_message.setAttribute('data-text', text);
    return false;
}

  var message = "New message from " + name + "\n\n";
message += "*Name:* " + name + "\n";
message += "*Email:* " + email + "\n";
message += "*Subject:* " + subject + "\n";
message += "*Massage:* " + massage + "\n\n";
message += "=============================" + "\n";
message += "*Form:* " + postLink + "\n";
message += "=============================";
  
var walink = 'https://wa.me/2664648793',
    phoneNumber = '2664648793'; 
var encodedMessage = encodeURIComponent(message);
var whatsappUrl = walink + "?phone=" + phoneNumber + "&text=" + encodedMessage;
window.open(whatsappUrl, '_blank');
return true;
}