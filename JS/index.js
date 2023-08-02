const frm = document.querySelector("form")
const listaCompras = document.querySelector("#ulCompras")
const botaoLimpar = document.querySelector("#btLimpar")
const botaoSalvar = document.querySelector("#btSalvar")

function novoProduto(novo) {
    const html = `
    <li class= "list-group-item d-flex justify-content-between my-1">
        <span>${novo}</span>
        <i class="bi bi-trash delete"></i>
        </li`
    return html
}

listaCompras.addEventListener("click", (e) => {
    //se o item clicado contem a class delete
    if (e.target.classList.contains("delete")) {
        //remove o pai deste elemento (no caso, o li)
        e.target.parentElement.remove()
    }
})

//quando o formulário for enviado(enter na entrada)
frm.addEventListener("submit", (e) => {
    //evita a execução padrão (default) do form que é enviar

    e.preventDefault()

    const produto = frm.inProduto.value;

    listaCompras.innerHTML += novoProduto(produto)

    //limpa o form
    frm.reset()
})

//quando nao tem produto
botaoSalvar.addEventListener("click", () =>{
    if (listaCompras.children.length == 0){
        alert("Não há produtos para serem salvos.")
        return
    }
    let produtos = []

    for (const item of listaCompras.children){
        produtos.push(item.innerText)
    }

    localStorage.setItem("compras", produtos.join(";")) //********* */
})

window.addEventListener("load", () =>{
    //se tiver dados armazenados em local storage
    //split converte o texto em elementos de vetor a cada ocorrencia ";"
    if(localStorage.getItem("compras")){
        const produtos = localStorage.getItem("compras").split(";")

        for(const produto of produtos){
            listaCompras.innerHTML += novoProduto(produto)
        }

    }
})