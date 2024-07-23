// *** Carrito de compras2 (con Array) ***  //

const carrito = document.getElementById("carrito")
const template = document.getElementById("template")
const footer = document.getElementById("footer")
const templateFooter = document.getElementById("templateFooter")
const fragment = document.createDocumentFragment()
// const btnBotones = document.querySelectorAll(".card .btn") // los botones se usarán de otra forma

// Pruebas
// console.log(carrito)
// console.log(template)
// console.log(fragment)
// console.log(btnBotones)

document.addEventListener("click", (e) => {

    // console.log(e.target.matches(".card .btn-outline-primary"))
    if (e.target.matches(".card .btn-outline-primary")) {
        // console.log('ejecutar agregar al carro') // Prueba
        agregarAlCarrito(e) // Es una buena práctica pasar como parámetro a una función, el evento que lo está desencadenando
    }
    // console.log(e.target.matches(".list-group-item .btn-success"))  //para probar si el boton que aparece funciona al clickear
    if (e.target.matches("#carrito .list-group-item .btn-success")) {
        btnAumentar(e)
    }
    if (e.target.matches("#carrito .list-group-item .btn-danger")) {
        btnDisminuir(e)
    }
})

let carritoObjeto = []

const agregarAlCarrito = (e) => {

    // console.log(e.target.dataset.fruta) // Prueba

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    }
    // if(carritoObjeto.hasOwnProperty(producto.titulo)){
    //     producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1
    // }
    // carritoObjeto[producto.titulo] = producto
    // console.log(carritoObjeto) // prueba

    // console.log(producto) // Prueba

    const indice = carritoObjeto.findIndex((item) => item.id === producto.id)

    // // console.log(indice) // Prueba

    if (indice === -1) {
        carritoObjeto.push(producto)
    } else {
        carritoObjeto[indice].cantidad++
        // carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio
    }
    // console.log(carritoObjeto) // prueba

    mostrarCarrito()
}
const mostrarCarrito = () => {
    carrito.textContent = ""  // Siempre es bueno limipar primero los elementos para evitar que se repitan los elementos cuando se hace un forEach().
    // Object.values(carritoObjeto).forEach(item => { // se utilizó cuando usamos un objeto
    // foreEach itera sobre un array, no sobre un objeto
    carritoObjeto.forEach(item => {
        const clone = template.content.cloneNode(true)
        clone.querySelector(".text-white .lead").textContent = item.titulo
        clone.querySelector(".badge").textContent = item.cantidad
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad
        clone.querySelector(".btn-danger").dataset.id = item.id
        clone.querySelector(".btn-success").dataset.id = item.id
        fragment.appendChild(clone)
    })
    carrito.appendChild(fragment)

    mostrarFooter()
}
// btnBotones.forEach((btn) => btn.addEventListener("click", agregarAlCarrito)) // se hará de otra forma con Delegación de Eventos

const mostrarFooter = () => {
    // console.log("mostrar Footer")
    footer.textContent = ""

    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.cantidad * current.precio,
        0
    )

    const clone = templateFooter.content.cloneNode(true)
    clone.querySelector("span").textContent = total
    // no es necesario ocupar el fragment, por que no hay una iteración, se puede pasar directo del clone al footer, a traves del método appendChild()
    footer.appendChild(clone)
}

const btnAumentar = (e) => {
    // console.log("Click", e.target.dataset.id) //prueba
    carritoObjeto = carritoObjeto.map(item => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++
        }
         return item
    })
    mostrarCarrito();
}

const btnDisminuir = (e) => {
    // console.log("Click", e.target.dataset.id) //prueba
    carritoObjeto = carritoObjeto.filter(item => {
        if (item.id === e.target.dataset.id) {
            if(item.cantidad > 0){
            item.cantidad--
            if(item.cantidad === 0){
                return
            }
            return item
            }
        } else {
         return item
        }
    })
    mostrarCarrito();
}

// //Otra forma de hacerlo
// const btnDisminuir = (e) =>{
//     // console.log("Click", e.target.dataset.id) // Prueba
//     carritoObjeto = carritoObjeto.filter(item =>{
//         if (item.id === e.target.dataset.id){
//             if (item.cantidad > 0) {
//                 item.cantidad--
//                 if (item.cantidad === 0) {
//                       return 
//                 }
//                 return item
//             }
//         } else {
//               return item
//         }
//     })
//     mostrarCarrito();
// }

