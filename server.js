import express, { request, response } from 'express';
const app = express();

app.use(express.json());
console.log("--- COMEÇO")

let produtos = [
    {
id: 1,
nome: "Notebook",
categoria: "Informática",
preco: 3500,
estoque: 8
},
{
id: 2,
nome: "Mouse",
categoria: "Informática",
preco: 80,
estoque: 25
},
{
id: 3,
nome: "Teclado",
categoria: "Informática",
preco: 150,
estoque: 15
},
{
id: 4,
nome: "Cadeira Gamer",
categoria: "Móveis",
preco: 1200,
estoque: 5
},
{
id: 5,
nome: "Mesa para Escritório",
categoria: "Móveis",
preco: 750,
estoque: 4
}
];

// atividade 1
app.get('/listar', (request, response) => {
    response.json(produtos)
});



// atividade 2
app.get('/SF-ID/:id', (request, response) => {
    const userID = Number(request.params.id)
    console.log(userID)

    if(isNaN(userID)){
        return response.status(404).json({Error: "ID não é um número."})
    }

    const final = produtos.find(u => u.id === userID)
    console.log(final)

    if(!final){
        return response.status(404).json({Error: "ID não encontado"})
    }

    response.json(final)
})



// atividade 3
app.get('/SF-category/:categoria', (request, response) => {
    const userInput = String(request.params.categoria)
    console.log(userInput)

    const final = produtos.find(u => u.categoria == userInput)

    if(!final){
        return response.status(404).json({Error: "Categoria não encontrada"})
    }

    response.json(final)
})



// atividade 4, 5 e 6
app.post('/AddObj', (request, response) => {
    const {nome, categoria, preco, estoque} = (request.body)

    if(produtos.find(u=>u.nome === nome)){
        return response.status(400).json({Error: 'Esse nome já consta no cadastro'})
    }
    if(!nome){
        return response.status(400).json({Error: 'Por favor insira um nome'})
    }
    if(!categoria){
        return response.status(400).json({Error: 'Por favor insira uma categoria'})
    }
    if(!preco){
        return response.status(400).json({Error: 'Por favor insira um preco'})
    }
    if(!estoque){
        return response.status(400).json({Error: 'Por favor insira um estoque'})
    }

    let proximoId = 6

    const novoAddObj = {
        id: proximoId++,
        nome: nome,
        categoria: categoria,
        preco: preco,
        estoque: estoque
    }
    //console.log(novoAddObj)

    produtos.push(novoAddObj)
    return response.status(201).json(novoAddObj)
})



// atividade 7
app.put('/PutObj/:id', (request, response) => {
    const {id} = (request.params)
    const {nome, categoria, preco, estoque} = (request.body)
    
    let produto = (produtos.find(u=>u.id === Number(id)))

    if(!produto){ return response.status(404).json({Error: 'id não encontrado'}) }

    if(nome){
        produto.nome = nome
    }
    if(categoria){
        produto.categoria = categoria
    }
    if(preco){
        produto.preco = preco
    }
    if(estoque){
        produto.estoque = estoque
    }

    return response.status(202).json(produto)
})



// atividade 8
app.patch('/PatchObj/:id', (request, response) => {
    const {id} = (request.params)
    const {nome, categoria, preco, estoque} = (request.body)
    
    let produto = (produtos.find(u=>u.id === Number(id)))

    if(!produto){ return response.status(404).json({Error: 'id não encontrado'}) }

    if(nome){
        produto.nome = nome
    } else{ return response.status(404).json({Error: 'campo NOME não preenchido '}) }

    if(categoria){
        produto.categoria = categoria
    } else{ return response.status(404).json({Error: 'campo CATEGORIA não preenchido '}) }
    
    if(preco){
        produto.preco = preco
    } else{ return response.status(404).json({Error: 'campo PRECO não preenchido '}) }

    if(estoque){
        produto.estoque = estoque
    } else{ return response.status(404).json({Error: 'campo ESTOQUE não preenchido '}) }

    return response.status(202).json(produto)
})



// atividade 9
app.delete('/DeleteObj/:id', (request, response) => {
    const {id} = request.params

    let produto = (produtos.find(u=>u.id === Number(id)))

    if(!produto){ return response.status(404).json({Error: 'id não encontrado'}) }

    const indice = produtos.findIndex(u => u.id === Number(id))
    console.log(indice)

    produtos.splice(indice, 1)
    
    return response.status(202).json(`id ${id} deletado`)
})



// atividade 10
app.get('/Estoque/Baixo', (request, response) => {
    const achar = produtos.filter(u => u.estoque <= 5)
    
    return response.status(200).json(achar)
})



// atividade 11
app.get('/produtos/preco', (request, response) => {
    const {min, max} = request.query
    console.log(min)
    console.log(max)

    const achar = produtos.filter(u => u.preco >= min && u.preco <= max)

    return response.status(200).json(achar)
})



// atividade 12
app.post('/produtos/:id/venda', (request,response) => {
    const {id} = request.params
    const {venda} = request.body
    //console.log(venda)
    
    let produto = produtos.find(u => u.id === Number(id))
    console.log(produto)
    
    if(!produto){ return response.status(400).json('ID não encontrado') }

    produto.estoque = produto.estoque - venda 


    return response.status(200).json(produto)
})



// atividade 13
app.get('/produtos/resumo', (request, response) => {
    const totalprotudos = produtos.length

    const totalestoque = produtos.reduce((acumulador, item) => {
        return acumulador + item.estoque
    }, 0)
    
    const totalpreco = produtos.reduce((acumulador, item) => {
        return acumulador + item.preco
    }, 0)

    return response.status(200).json({totalprotudos, totalestoque, totalpreco})
})



app.listen(6767, () => console.log('--- FIM'));
// rodando na porta 6767