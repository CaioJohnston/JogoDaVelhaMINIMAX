var divs = document.querySelectorAll('#jogo div')
var jogador, mapa

export function duplicarMapa(mapa) {
  return JSON.parse(JSON.stringify(mapa))
}

export function attMapa(mapa) {
  for (var lin in mapa) {
    for (var col in mapa[lin]) {
      var pos = 'l' + lin + 'c' + col
      var div = document.getElementById(pos)
      div.innerText = mapa[lin][col]
    }    
  }
}

export function validarEmpate(mapa) {
  for (var lin in mapa) {
    for (var col in mapa[lin]) {
      if (mapa[lin][col] == '') return false
    }
  }
  return true
}

export function verificaVencedor(mapa) {
  const winMaps = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const opcao of winMaps) {
    const [a, b, c] = opcao;
    if (mapa[a[0]][a[1]] && mapa[a[0]][a[1]] === mapa[b[0]][b[1]] && mapa[a[0]][a[1]] === mapa[c[0]][c[1]]) {
      return mapa[a[0]][a[1]];
    }
  }

  return null;
}