const express = require('express');

const app = express();
const axios = require('axios').default;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// ROTAS DE CADASTRO DE CATEGORIA
app.get('/cadastroCategoriasJogos', (req, res)=>{
    res.render('categoria/index');
});

//ROTA DE LISTAGEM DE CATEGORIAS
app.get('/listagemCategoriasJogo', (req, res)=>{
    
    const urlListagemCategoria = 'http://localhost:3000/listarCategoriaJogo';

    /*
    CHAMADA PELO AXIOS:
    1 - URL DA ROTA (urlListagemCategoria)
    2 - CALLBACK DA RESPOSTA DA CHAMADA
    */
    axios.get(urlListagemCategoria)
        .then(
            (response)=>{
                // console.log(response.data);
                // res.send(response.data);
                let categorias = response.data;
                res.render('categoria/listagemCategoriaJogo', {categorias});

        }); 
    });

    // ROTA DE LISTAGEM DE EDIÇÂO
    app.get('/formEdicaoCategoriasJogo/:id', (req, res)=>{
        let {id} = req.params;
        res.render('categoria/editarCategoriaJogo');
    });

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});