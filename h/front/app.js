const API_URL = 'http://localhost:3000';

function carregarListas() {
    fetch(`${API_URL}/pacientes`)
    .then(response => response.json())
    .then(pacientes => {
        const lista = document.getElementById('lista-pacientes');
        lista.innerHTML = ''; 
        pacientes.forEach(c => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${c.nomePaciente} 
               <button onclick="prepararEdicao(${c.id}, '${c.nomePaciente}')">Editar</button>
                <button onclick="deletarPaciente(${c.id})">Excluir</button>
            `;
            lista.appendChild(li);
        });
    });

    fetch(`${API_URL}/medicos`)
    .then(response => response.json())
    .then(x => {
        const lista = document.getElementById('lista-medicos');
        lista.innerHTML = ''; 

        x.forEach(c => {
            const li = document.createElement('li'); 
            li.innerHTML = `${c.nome} - ${c.especialidade}`;
            lista.appendChild(li);
        });
    });
}

async function buscarNome() {
    const nomeDigitado = document.getElementById('nomePaciente').value.toLowerCase();
    
    const pacientes = await fetch(`${API_URL}/pacientes`).then(r => r.json());
    const medicos = await fetch(`${API_URL}/medicos`).then(r => r.json());
    const consultas = await fetch(`${API_URL}/consultas`).then(r => r.json());

    const resultado = consultas.map(consulta => {
        const paciente = pacientes.find(p => p.id === consulta.idPaciente);
        const medico = medicos.find(m => m.id === consulta.idMedico);
    
        return {
            nomePaciente: paciente?.nomePaciente || "Paciente não encontrado", 
            nomeMedico: medico?.nome,
            especialidade: medico?.especialidade,
            data: consulta?.data
        };
    })
    .filter(item => item.nomePaciente.toLowerCase().includes(nomeDigitado));

    const apresentar = document.getElementById('filtro-pesquisa');
    apresentar.innerHTML = '';

    resultado.forEach(item => {
        const li = document.createElement('li'); 
        li.innerHTML = `${item.nomePaciente} - ${item.nomeMedico} - ${item.especialidade} ${item.data}`;
        apresentar.appendChild(li);
    });
}

function cadastrarPaciente() {
    const pacienteNovo = document.getElementById('novo-paciente').value;
    
    fetch(`${API_URL}/pacientes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomePaciente: pacienteNovo
        })
    })
    .then(response => response.json())
    .then(dados => {
        alert('Paciente Cadastrado com sucesso!');
        document.getElementById('novo-paciente').value = ''; 
        carregarListas(); 
    });
}

function prepararEdicao(id, nomeAtual) {
    document.getElementById('paciente-id').value = id;
    document.getElementById('novo-paciente').value = nomeAtual;
    
    document.getElementById('titulo-form').innerText = "Editar Paciente";
    document.getElementById('btn-salvar').innerText = "Atualizar";
    document.getElementById('btn-salvar').setAttribute('onclick', 'atualizarPaciente()');
}

function cancelarEdicao() {
    document.getElementById('paciente-id').value = '';
    document.getElementById('novo-paciente').value = '';
    
    document.getElementById('titulo-form').innerText = "Cadastrar Paciente";
    document.getElementById('btn-salvar').innerText = "Cadastrar";
    document.getElementById('btn-salvar').setAttribute('onclick', 'cadastrarPaciente()');
}

async function atualizarPaciente() {
    const idInput = document.getElementById('paciente-id');
    const nomeInput = document.getElementById('novo-paciente');
    const id = idInput.value;
    const novoNome = nomeInput.value;
    
    if (!id) {
        alert('Clique por gentileza no editar primeiro');
        return; 
    } 
    
    await fetch(`${API_URL}/pacientes/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomePaciente: novoNome })
    });
      
    alert("Usuário atualizado com sucesso");
    cancelarEdicao(); 
    carregarListas(); 
}

async function deletarPaciente(id) {
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
       await fetch(`${API_URL}/pacientes/${id}`, {
            method: 'DELETE'
        })
        
    }
}

carregarListas();