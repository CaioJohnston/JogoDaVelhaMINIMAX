import { verificaVencedor, validarEmpate, attMapa } from './jogodavelha.js'
import { melhorJogada } from './minimax.js'

var divs = document.querySelectorAll('#jogo div')
var botao = document.getElementById('botao');
var jogador, mapa
var starter = 'O'

for (let div of divs) {
  div.onclick = (e) => {
    var coords = e.target.id.split('l')[1].split('c')
    var lin = parseInt(coords[0])
    var col = parseInt(coords[1])
    if (mapa[lin][col] == '') {
      mapa[lin][col] = jogador
      if (jogador == 'X') {
        jogador = 'O'
      } else {
        jogador = 'X'
      }
      var vencedor = verificaVencedor(mapa)
      if (vencedor) {
        setTimeout(() => { alert(vencedor + ' venceu!'); start(); }, 16)
      }
      else if (validarEmpate(mapa)) {
        setTimeout(() => { alert('Empate!'); start(); }, 16)
      }
      else if (jogador == starter) {
        const startTime = performance.now()
        IA()
        const endTime = performance.now()
        const executionTime = endTime - startTime
        console.log(executionTime)
      }
      attMapa(mapa)
    }
  }
}

function IA() {
  var jogada = melhorJogada(mapa, jogador)
  var div = document.getElementById('l'+jogada[0]+'c'+jogada[1])
  div.click()
}

botao.addEventListener('click', function() {
  starter = 'O'
  jogador = 'X'
  IA()
  mapa[0][0] = ''
  attMapa(mapa)
  var pensamentoAI = document.getElementById('numnos')
  pensamentoAI.innerHTML = 9
  starter = 'X'
  jogador = 'O'
})

function start() {
  jogador = 'X'
  mapa = [['','',''],['','',''],['','','']]
  var pensamentoAI = document.getElementById('numnos')
  pensamentoAI.innerHTML = ' '
  attMapa(mapa)
}
  
start()