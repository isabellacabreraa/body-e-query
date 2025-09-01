
// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

// Importar Lista de Array
import dados from "./src/data/dados.js";
const { bruxos,varinhas,pocoes,animais } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

//Adicionar o bruxo na minha lista 
//é usar o BODY para capturar info
//mudar o nodemon oara node no package
//Verbo: POST

app.post("/bruxos", (req,res) => {
    const{nome, casa, ano, varinha, mascote, patrono,especialidade, vivo} = req.body;

    // Quais itens seriam obrigatórios?
    if (!nome || !casa) {
        return res.status(400).json({
            success:false,
            message: "Nome e casa são obrigatórios para um bruxo!",
        });
    }

    // Criar o bruxo
    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha,
        mascote,
        patrono,
        especialidade: especialidade || "Ainda não atribuido!",
        vivo: vivo
    }

    bruxos.push(novoBruxo);

    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts",
        data: novoBruxo,
    });
})

app.get("/varinhas", (req, res) => {
    const { material, nucleo, comprimento} = req.query;
    let filtroVarinhas = varinhas;

    if (material) {
        filtroVarinhas = filtroVarinhas.filter((m) => m.material.toLowerCase().includes(material.toLowerCase()));
    }

    if (nucleo) {
        filtroVarinhas = filtroVarinhas.filter((n) => n.nucleo == nucleo);
    }

    if (comprimento) {
        filtroVarinhas = filtroVarinhas.filter((c) => c.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
    }

    res.status(200).json({
        total: filtroVarinhas.length,
        data: filtroVarinhas,
    });
});

app.post("/varinhas", (req,res) => {
    const{material, nucleo, comprimento} = req.body;

    if (!material || !nucleo) {
        return res.status(400).json({
            success:false,
            message: "material e nucleo são obrigatórios para uma varinha!",
        });
    }

    const novaVarinha = {
        id: varinhas.length + 1,
        material,
        nucleo: nucleo,
        comprimento:parseInt(comprimento),
    }

    varinhas.push(novaVarinha);

    res.status(201).json({
        success: true,
        message: "Nova varinha adicionada com sucesso",
        data: novaVarinha,
    });
})


app.get("/pocoes", (req, res) => {
    const { nome, efeito, } = req.query;
    let filtroPocoes = pocoes;

    if (nome) {
        filtroPocoes = filtroPocoes.filter((n) => n.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (efeito) {
        filtroPocoes = filtroPocoes.filter((e) => e.efeito == efeito);
    }


    res.status(200).json({
        total: filtroPocoes.length,
        data: filtroPocoes,
    });
});

app.get("/animais", (req, res) => {
    const { nome, tipo, } = req.query;
    let filtroAnimais = animais;

    if (nome) {
        filtroAnimais = filtroAnimais.filter((n) => n.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (tipo) {
        filtroAnimais = filtroAnimais.filter((t) => t.tipo == tipo);
    }


    res.status(200).json({
        total: filtroAnimais.length,
        data: filtroAnimais,
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});

