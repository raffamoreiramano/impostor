const randomizar = (total) => {
  return Math.floor(Math.random() * total)
}

window.onload = () => {
  const formularios = {
    jogadores: document.querySelector('#jogadores'),
    senhas: document.querySelector('#senhas'), 
    turnos: document.querySelector('#turnos')
  }

  const mostrar =  formularios.turnos.querySelector('button')

  // mostrar.addEventListener('mousedown', e => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // })

  mostrar.addEventListener('mouseup', e => {
    e.preventDefault()
    e.stopPropagation()
    e.target.blur()
  })

  // mostrar.addEventListener('touchstart', e => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // })

  mostrar.addEventListener('touchend', e => {
    e.preventDefault()
    e.stopPropagation()
    e.target.blur()
  })

  const fim = document.querySelector('#fim')

  const embaralhar = () => {
    const output = document.querySelector('output')
    output.innerText = "..."
    
    const senhas = Array.from(formularios.senhas.querySelectorAll('input').values())
    const turnos = Array.from(formularios.turnos.querySelectorAll('input').values())
    const corte = senhas.length
    const total = turnos.length
    
    if (senhas.length > 1) {
      const passada = senhas.findIndex(senha => senha.spellcheck)
      const proxima = randomizar(corte)
      
      senhas[passada].parentElement.remove()
      senhas[proxima].spellcheck = true
    } else {
      senhas.forEach((s) => s.spellcheck = true)
    }
        
    const passado = turnos.findIndex(turno => turno.spellcheck)
    const impostor = randomizar(total)
    
    turnos[passado].spellcheck = false
    turnos[impostor].spellcheck = true
  }

  fim.addEventListener('click', () => {
    embaralhar()
  })

  formularios.jogadores.addEventListener('submit', e => {
    e.preventDefault()

    const input = e.target.querySelector('input')
    const value = Math.abs(Number(input.value))
    const nomes = Array(value).keys().map((n) => `Jogador ${n + 1}`)
    
    const impostor = randomizar(value)
    const chave = randomizar(value)

    formularios.senhas.innerHTML = ''
    formularios.turnos.innerHTML = ''

    const turnos = document.createElement('ul')
    const button = document.createElement('button')
    const output = document.createElement('output')

    button.setAttribute('type', 'button')
    button.textContent = "Mostrar senha"
    output.innerText = "..."
    

    nomes.forEach((nome, index) => {
      const div = document.createElement('div')
      const password = document.createElement('input')
      
      password.setAttribute('type', 'password')
      password.setAttribute('name', `senha-${index}`)
      password.setAttribute('spellcheck', chave === index)

      div.appendChild(password)

      formularios.senhas.appendChild(div)
      
      const li = document.createElement('li')
      const label_radio = document.createElement('label')
      const radio = document.createElement('input')

      label_radio.textContent = nome
      label_radio.style = `--cor: var(--cor-${index + 1});`
      
      radio.setAttribute('type', 'radio')
      radio.setAttribute('name', 'jogador')
      radio.setAttribute('spellcheck', impostor === index)
      radio.value = index

      // password.addEventListener('keyup', e => {
      //   if (radio.checked) { 
      //     output.innerText = e.target.value.trim()
      //   }
      // })

      radio.addEventListener('change', () => {
        let palavra = formularios.senhas.querySelector('input[spellcheck=true]').value.trim()

        if (radio.spellcheck) {
          palavra = 'IMPOSTOR'
        }
        
        output.innerText = palavra.length === 0 ? '...' : palavra
      })

      label_radio.appendChild(radio)
      li.appendChild(label_radio)
      turnos.appendChild(li)
    })

    const segredo = document.createElement('div')
    segredo.appendChild(button)
    segredo.appendChild(output)

    formularios.turnos.appendChild(turnos)
    formularios.turnos.appendChild(segredo)
  })
}

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};