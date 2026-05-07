const express = require('express')
const app = express()
const PORT = 3000

const cors = require('cors')
app.use(express.json())
app.use(cors())

const pacientes = [
  { id: 1, nomePaciente: "João Silva" },
  { id: 2, nomePaciente: "Maria Souza" },
  { id: 3, nomePaciente: "Carlos Oliveira" },
  { id: 4, nomePaciente: "Ana Santos" },
  { id: 5, nomePaciente: "Pedro Lima" },
  { id: 6, nomePaciente: "Juliana Alves" },
  { id: 7, nomePaciente: "Fernanda Costa" },
  { id: 8, nomePaciente: "Rafael Pereira" },
  { id: 9, nomePaciente: "Bruna Rocha" },
  { id: 10, nomePaciente: "Lucas Martins" }
];

const medicos = [
  { id: 1, nome: "Dr. Roberto", especialidade: "Cardiologia" },
  { id: 2, nome: "Dra. Camila", especialidade: "Dermatologia" },
  { id: 3, nome: "Dr. Henrique", especialidade: "Ortopedia" },
  { id: 4, nome: "Dra. Paula", especialidade: "Pediatria" },
  { id: 5, nome: "Dr. Marcos", especialidade: "Neurologia" },
  { id: 6, nome: "Dra. Renata", especialidade: "Ginecologia" },
  { id: 7, nome: "Dr. Eduardo", especialidade: "Urologia" },
  { id: 8, nome: "Dra. Aline", especialidade: "Endocrinologia" },
  { id: 9, nome: "Dr. Felipe", especialidade: "Psiquiatria" },
  { id: 10, nome: "Dra. Beatriz", especialidade: "Oftalmologia" }
];

const consultas = [
  { id: 1, idPaciente: 1, idMedico: 2, data: "2026-05-01" },
  { id: 2, idPaciente: 2, idMedico: 1, data: "2026-05-02" },
  { id: 3, idPaciente: 3, idMedico: 3, data: "2026-05-03" },
  { id: 4, idPaciente: 4, idMedico: 4, data: "2026-05-04" },
  { id: 5, idPaciente: 5, idMedico: 5, data: "2026-05-05" },
  { id: 6, idPaciente: 6, idMedico: 6, data: "2026-05-06" },
  { id: 7, idPaciente: 7, idMedico: 7, data: "2026-05-07" },
  { id: 8, idPaciente: 8, idMedico: 8, data: "2026-05-08" },
  { id: 9, idPaciente: 9, idMedico: 9, data: "2026-05-09" },
  { id: 10, idPaciente: 10, idMedico: 10, data: "2026-05-10" }
];


app.get('/', (req, res) => {
res.json({mensagem: "API Funiconando Perfeitamente"})
})

app.get('/pacientes', (req, res) => {
    res.json(pacientes)
    })

app.post('/pacientes', (req, res) =>{

        const novoPaciente = {

          id: pacientes.length + 1,
          nomePaciente: req.body.nomePaciente
        }
      
        pacientes.push(novoPaciente)

        res.status(201).json({mensagem:"Paciente Cadastrado", pacientes:novoPaciente })

})

app.get('/medicos', (req, res) => {
    res.json(medicos)
    })

app.get('/consultas', (req, res) => {
    res.json(consultas)
    })


app.listen(PORT, () =>{
    console.log(`API rodando na porta ${PORT}`);
})

app.put('/pacientes/:id',(req,res)=>{

    const id = parseInt(req.params.id)

    const usuarioIndex = pacientes.findIndex(u => u.id === id )
    if(usuarioIndex === 1){
        return res.status(404).json({mensagem:"Usuário não encontrado "})
    }

    pacientes[usuarioIndex] ={
        ...pacientes[usuarioIndex],
        nomePaciente:req.body.nomePaciente
    }
    res.status.json({mensagem:"Usuário Atualizado ",usuario:[usuarioIndex]})
})

app.delete('/pacientes/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    
    const index = pacientes.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Paciente não encontrado" });
    }

    pacientes.splice(index, 1);
    
    res.status(200).json({ mensagem: "Paciente excluído com sucesso!" });
});