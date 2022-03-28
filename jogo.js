//Variaveis para definirmos e acompanharmos o tamanho útil da tela.
var altura = 0
var largura = 0

// variavel para controlar os pontos de vida do jogador
var vidas = 1

// variavel para controlar o tempo
var tempo = 10

// variavel de tempo para criação das moscas de acordo com o nível do jogo.
var criaMosquitoTempo = 1500

// variavel de nivel para indicar o nivel de dificuldade do jogo.
var nivel = window.location.search.replace('?','')

// Dependendo do retorno do valor 'nivel' o tempo de criação das moscas será alterado.

if (nivel === 'Normal') {
	var criaMosquitoTempo = 1500
}

if (nivel === 'Dificil') {
	var criaMosquitoTempo = 1000
}

if (nivel === 'MuitoDificil') {
	var criaMosquitoTempo = 700
}

//função que retorna, constantemente, os valores de heigth e width da área útil do broswer (BOM).
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	//            X        Y
	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//Essa variavel 
var cronometro = setInterval(function (){

	tempo -= 1

	if (tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosca)

		window.location.href = 'vitoria.html'

	} else {
		document.getElementById('cronometro').innerHTML = tempo + 's'
	}	
	
}, 1000)

//Devido as questões de procedencia, criamos essa função e chamamos ela dentro do body no arquivo HTML
function PosicaoRandomica() {

	//Removendo a imagem da mosca anterior (caso ela exista)
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//Caso o usuario perca as vidas que possui.
		if (vidas > 3) {
			window.location.href = 'fim_de_jogo.html'
		} else { // Alterando a imagem de vidas, substituindo o coração cheiro pelo vazio.
			document.getElementById('V' + vidas).src = "imagens/coracao_vazio.png"
			vidas++
		}
		
	}

	//Criando as posições aleatórias da mosca que o usuário irá "matar".
	//Obs.: O Math.random() cria números randômidos de 0-1, então, multiplicamos esse número pela altura (Y) e largura (X), para termos o posicionamento da mosca na tela do usuário.
	// O -90 é para garantir que a posição da mosca fique dentro do tamanho da página e a barra de rolagem não apareça.
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY =  Math.floor(Math.random() * altura) - 90

	// Como estamos subtraindo 90 das coordenadas, para garantir que não surja numero negativos e a mosca não apareça na tela, estamos zerando o valor das coordenadas.
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	//Criando o elemento html no body - moscas aparecendo randomicamente.
	var mosquito = document.createElement('img') // Cria o elemento img
	mosquito.src = 'imagens/mosca.png' // atribuindo à variavel mosquito a imagem que queremos.
	mosquito.className = TamanhoVariado() + ' ' + LadoVariado() // Aplicando as classes da imagem atraves de uma funcao
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'

	//Criando a função para remover a imagem assim que clicada.
	// o this.remove irá atuar no elemento html da respectiva função. 
	mosquito.onclick = function () {
		this.remove()
	}

	document.body.appendChild(mosquito) //Inserimos esse elemento dentro do body.
}

// função para atribuir tamanhos variados à mosca 
function TamanhoVariado() {

	//Como teremos 3 tamanhos diferentes, multiplicamos o numeros randomicos gerados pela funcao math.random por 3
	var classe = Math.floor(Math.random() * 3)

	//conforme o numero é gerado, o switch valida se ele está dentro das condições e retorna o valor da string especificada no return''.
	switch (classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

function LadoVariado() {
	//Como teremos 2 lados diferentes, multiplicamos o numeros randomicos gerados pela funcao math.random por 2
	var classe = Math.floor(Math.random() * 2)

	//conforme o numero é gerado, o switch valida se ele está dentro das condições e retorna o valor da string especificada no return''.
	switch (classe) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'

	}
}

