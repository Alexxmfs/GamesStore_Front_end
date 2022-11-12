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

        // RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
        let {id} = req.params;
        console.log(id);

        //CHMADA DO AXIOS PARA A API
        const urlListagemCategoria = `http://localhost:3000/listarCategoriaJogo/${id}`;

        axios.get(urlListagemCategoria)
        .then(
            (response)=>{

                let categoria = response.data;
                res.render('categoria/editarCategoriaJogo', {categoria});

            }
        )
    });

    app.post('/alterarCategoriaJogo', (req, res)=>{

        const urlAlterarCategoria = 'http://localhost:3000/alterarCategoriaJogo';
        console.log(req.body);

        axios.put(urlAlterarCategoria, req.body)
        .then(
            res.send('ALTERADO!')
        )

    });

    // app.delete('/excluirCategoriaJogo/:id', (req, res)=>{

    //     let {id} = req.params;
    //     console.log(id);
    //     axios.delete(`http://localhost:3000/excluirCategoriaJogo/${id}`);

    // });

app.listen(3001, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:3001');
});