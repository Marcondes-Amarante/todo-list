
document.getElementById("novaTarefa").onclick=function acionarModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function desativarModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active")
}

function buscarTarefas(){
    fetch('https://todo-list-xsra.onrender.com')
    .then((res) => res.json())
    .then((res) => {
        inserirTarefas(res);
    })
}

buscarTarefas();

function inserirTarefas(listaDeTarefas){
    if(listaDeTarefas.length>0){
        lista.innerHTML="";
        listaDeTarefas.map((tarefa)=>{
            lista.innerHTML+=`
            <li class="tarefa">
                <h4>${tarefa.titulo}<div class="actions" onclick="removerTarefa(${tarefa.id})"><box-icon name="trash"></box-icon></div></h4>
                <p>${tarefa.descricao}</p>
            </li>`;
        })
    }
}


//criar função para pegar conteúdo do form e armazenar o arquivo de api ao clicar em criar

function adicionarTarefa(){
    
    event.preventDefault();
    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;

    let tarefa ={
        titulo: titulo,
        descricao: descricao
    }

    fetch("https://todo-list-xsra.onrender.com", {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(tarefa)
    })

    .then(res => res.json())
    .then(res=>{
        desativarModal();
        buscarTarefas();
    })
}

function removerTarefa(id){
    event.preventDefault();
    fetch(`https://todo-list-xsra.onrender.com${id}`, {
        method: "DELETE",
    })

    .then(res=>res.json())
    .then(res=>{
        buscarTarefas()
    })
}

function pesquisarTarefa() {
    let lis=document.querySelectorAll("li");
    if(busca.value.length>0){
        lis.forEach(li=>{
            if(!li.children[0].innerText.includes(busca.value)){
                li.style.display="none";
            }else{
                li.style.display="initial";
            }
        })
    }else{
        buscarTarefas();
    }
}

