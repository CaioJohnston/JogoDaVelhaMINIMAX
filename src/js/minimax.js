import { verificaVencedor, validarEmpate, duplicarMapa } from './jogodavelha.js'

function heuristica(mapa, jogador) {
	var h = 0;
  	var oponente = jogador == 'X' ? 'O' : 'X';
  	for (var i = 0; i < 3; i++) {
      if (mapa[i][0] != oponente && mapa[i][1] != oponente && mapa[i][2] != oponente)
	      h += Math.pow((mapa[i][0] == jogador) + (mapa[i][1] == jogador) + (mapa[i][2] == jogador), 2);
    }
  	for (var i = 0; i < 3; i++) {
      if (mapa[0][i] != oponente && mapa[1][i] != oponente && mapa[2][i] != oponente)
	      h += Math.pow((mapa[0][i] == jogador) + (mapa[1][i] == jogador) + (mapa[2][i] == jogador), 2);
    }
    if (mapa[0][0] != oponente && mapa[1][1] != oponente && mapa[2][2] != oponente)
  		h += Math.pow((mapa[0][0] == jogador) + (mapa[1][1] == jogador) + (mapa[2][2] == jogador), 2);
    if (mapa[0][2] != oponente && mapa[1][1] != oponente && mapa[2][0] != oponente)
	  	h += Math.pow((mapa[0][2] == jogador) + (mapa[1][1] == jogador) + (mapa[2][0] == jogador), 2);

  	for (var i = 0; i < 3; i++) {
      if (mapa[i][0] != jogador && mapa[i][1] != jogador && mapa[i][2] != jogador)
	      h -= Math.pow((mapa[i][0] == oponente) + (mapa[i][1] == oponente) + (mapa[i][2] == oponente), 2);
    }
  	for (var i = 0; i < 3; i++) {
      if (mapa[0][i] != jogador && mapa[1][i] != jogador && mapa[2][i] != jogador)
	      h -= Math.pow((mapa[0][i] == oponente) + (mapa[1][i] == oponente) + (mapa[2][i] == oponente), 2);
    }
    if (mapa[0][0] != jogador && mapa[1][1] != jogador && mapa[2][2] != jogador)
  		h -= Math.pow((mapa[0][0] == oponente) + (mapa[1][1] == oponente) + (mapa[2][2] == oponente), 2);
    if (mapa[0][2] != jogador && mapa[1][1] != jogador && mapa[2][0] != jogador)
	  	h -= Math.pow((mapa[0][2] == oponente) + (mapa[1][1] == oponente) + (mapa[2][0] == oponente), 2);

  	return h;
}

function jogada(mapa, pos, jogador) {
	var novoMapa = duplicarMapa(mapa)
  	novoMapa[pos[0]][pos[1]] = jogador
  	return novoMapa
}

function jogadasPossiveis(mapa) {
	var jogadas = [];
    for (var lin in mapa) {
      for (var col in mapa) {
		    if (mapa[lin][col] == ''){
          jogadas.push([lin,col])
        }
      }      
    }
  	return jogadas; 
}

function minimax(mapa, jogador, eu, maxdepth=9) {
	var vencedor = verificaVencedor(mapa)
  if (vencedor == eu) return 999
  if (vencedor && vencedor != eu) return -999
  if (!vencedor && validarEmpate(mapa)) return 0
  if (maxdepth == 0) return heuristica(mapa, eu)
  	
  
	var jogadas = jogadasPossiveis(mapa);

  	if (jogador == eu) {	//MAX
	  	let melhorValor = -Infinity
        for (let i in jogadas) {
          let resultado = jogada(mapa, jogadas[i], jogador);
          let valor = minimax(resultado, jogador == 'X' ? 'O' : 'X', eu, maxdepth-1)
          if (valor > melhorValor) {
            melhorValor = valor
          }
        }
      	return melhorValor      
    }
  	else {	//MIN
	  	let melhorValor = Infinity
        for (var i in jogadas) {
          let resultado = jogada(mapa, jogadas[i], jogador);
          let valor = minimax(resultado, jogador == 'X' ? 'O' : 'X', eu, maxdepth-1);
          if (valor < melhorValor) {
            melhorValor = valor
          }
        }
      	return melhorValor            
    }
}

export function melhorJogada(mapa, eu) {
	var jogadas = jogadasPossiveis(mapa)
  	var melhorJogada = -Infinity
  	var melhorMelhorJogada = null
  	for (var i in jogadas) {
      var resultado = jogada(mapa, jogadas[i], eu)
      var valor = minimax(resultado, eu == 'X' ? 'O' : 'X', eu, 1)
      console.log(resultado, valor)
      var pensamentoAI = document.getElementById('numnos')
      pensamentoAI.innerHTML = jogadas.length
      if (valor > melhorJogada) {
        melhorJogada = valor;
        melhorMelhorJogada = jogadas[i]
      }
    }
  	return melhorMelhorJogada
}