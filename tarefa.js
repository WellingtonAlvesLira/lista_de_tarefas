//Seleção DOM
var tarefa = document.getElementById('tarefa');
var btn_salvar = document.getElementById('btn-salvar');
var container_lista = document.getElementById('container-lista');
var tarefa_li = document.getElementsByTagName('li');
var feedback = document.getElementById('feedback');
var qtd_tarefa = document.getElementById('qtd-tarefa');
var qtd_tarefa_concluida = document.getElementById('qtd-tarefa-concluida');

//Eventos
btn_salvar.addEventListener('click', salvar_tarefa, false);
container_lista.addEventListener('click', deletar_tarefa, false);


//Funções
function criandoElemento() {
    // criando novos elementos html
    var div = document.createElement('div');
    div.classList.add('lista')

    var tarefa_ul = document.createElement('ul');
    tarefa_ul.classList.add('tarefa-lista');

    var tarefa_li = document.createElement('li');
    var valor = document.createTextNode(tarefa.value);
    tarefa_li.appendChild(valor);
    var botao_deletar = document.createElement('button');
    botao_deletar.classList.add('botao-deletar');
    botao_deletar.innerHTML = 'Deletar';

    var botao_concluir = document.createElement('button');
    botao_concluir.innerHTML = 'Concluir';
    botao_concluir.classList.add('botao-concluir');

    // Atribuindo os novos elementos criados para seus respectivos destinos
    div.appendChild(tarefa_ul);
    tarefa_ul.appendChild( tarefa_li);
    div.appendChild(botao_deletar);
    div.appendChild(botao_concluir);
    container_lista.appendChild(div);

}

function salvar_tarefa(event) {
    event.preventDefault();

    for (var i = 0; i < tarefa_li.length; i++) {
        if (tarefa_li[i].firstChild.nodeValue === tarefa.value) {
            var existeItem = true;
        }
    }
    if (tarefa.value == '') {
        feedback.innerHTML = 'O campo inserir tarefa não pode está vazio.';
        feedback.className = 'feedback-erro';
        tarefa.focus();
        time_feedback();
    }
    else if (existeItem) {
        feedback.innerHTML = 'Você já inseriu essa tarefa!';
        feedback.className = 'feedback-idem';
        tarefa.focus();
        time_feedback();

    }
    else {
        criandoElemento();
        feedback.innerHTML = 'Tarefa Salva com sucesso.';
        feedback.className = 'feedback-sucesso';
        tarefa.value = '';
        tarefa.focus();
        time_feedback();
        qtd_tarefa.innerHTML = document.querySelectorAll('.lista').length;
        /*Para adicionar uma ou mais classes em um elemento HTML,
         basta selecioná-lo e chamar o método classList.add*/
         qtd_tarefa.classList.add('qtd-tarefas');


    }

}
/*Para adicionar uma ou mais classes em um elemento HTML, 
basta selecioná-lo e chamar o método classList.add, passando uma String como argumento. 
É interessante notar que podemos adicionar multiplas classes de uma só vez.
*/
var lista;
function deletar_tarefa(event) {
    var item_alvo = event.target
        //verifica se o alvo contém a class 'botao-deletar'
    if (item_alvo.classList.contains("botao-deletar")){
        lista = item_alvo.parentNode;
        var deletar_confirmado = confirm('Tem certeza ?');
        if (deletar_confirmado) {
            lista.remove()
            alert('Tarefa deletada com sucesso');
            qtd_tarefa.innerHTML = document.querySelectorAll('.lista').length -= 0;

            if (document.querySelectorAll('.lista').length == 0){
                /*Além de adicionar novas classes, vez por outra você vai precisar também remover classes já existentes. 
                Para isso, temos o método classList.remove*/
                qtd_tarefa.classList.remove('qtd-tarefas');
                qtd_tarefa.innerHTML = '';
                qtd_tarefa_concluida.classList.remove('qtd-tarefas-concluidas');
                qtd_tarefa_concluida.innerHTML = ''; 
            }


        }

    } 
    
    //Uma classList pode conter mais de uma class, então o [0] está representando a primeira class a ser encontrada
    if(item_alvo.classList[0] == 'botao-concluir'){
        lista = item_alvo.parentNode;
       var tarefa_concluida_true = lista.classList.toggle('tarefa-concluida');
           if(tarefa_concluida_true){
               item_alvo.innerHTML = 'Concluída';
               qtd_tarefa_concluida.innerHTML = document.querySelectorAll('.tarefa-concluida').length;
               qtd_tarefa_concluida.className = 'qtd-tarefas-concluidas';
           }if(!tarefa_concluida_true){
               item_alvo.innerHTML = 'Concluir';
               qtd_tarefa_concluida.innerHTML -= 1; 

           }

    }
}

function time_feedback(){
     setTimeout(() => {
        feedback.innerHTML = ''
     }, 3000);
}





