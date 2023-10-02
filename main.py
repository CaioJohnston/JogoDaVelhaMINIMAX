from flask import *

usuario = ''

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('menu.html')


@app.route('/setar', methods=['POST'])
def processar():
    esc = request.form['botao']
    global usuario
    if esc == 'usuario':
        usuario = 'Usuário'
    elif esc == 'agente':
        usuario = 'Agente'
    return render_template('jogo.html')


def quem_comeca():
    return usuario


app.run()
