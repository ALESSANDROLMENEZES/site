var express = require('express');
var admin = require('./../inc/admin');
var users = require('./../inc/users');
var categoriaProdutos = require('./../inc/categoriasProdutos');
var categoriaCestas = require('./../inc/categoriasCestas');
var unidadesMedidas = require('./../inc/unidadesMedidas');
var router = express.Router();

//------------LOGIN----------------------------
router.use(function (req, res, next) {
  if (['/login'].indexOf(req.url) == -1 && !req.session.user) {
    res.redirect('/admin/login');
  } else {
    next();
  }
});

router.get('/logout', function (req, res, next) {
  delete req.session.user;
  res.redirect('/admin/login');
});

router.get('/', function (req, res, next) {

  admin.dashboard().then(data => {
    res.render('admin/index', admin.getParams(req, {
      data,
      navbar: false
    }));
  }).catch(err => {
    console.log(err);
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.email) {
    users.render(req, res, 'Informe um email');
  } else if (!req.body.password) {
    users.render(req, res, 'Informe sua senha');
  } else {
    users.login(req.body.email, req.body.password).then(user => {

      req.session.user = user;
      res.redirect('/admin');

    }).catch(err => {
      users.render(req, res, err.message || err);
    });
  }
});

router.get('/login', function (req, res, next) {
  users.render(req, res, null);
});
//------------------------LOGIN--------------------------

//-------------------------CATEGORIAS DE PRODUTOS -------
router.get('/categoria-produtos', function (req, res, next) {
  categoriaProdutos.getCategorias().then(categoriasProd => {
    res.render('admin/categoria-produtos', admin.getParams(req, {
      navbar: true,
      categoriasProd,
      pagina: 'Categoria de Produtos',
      btnLabel: 'Nova Categoria'
    }));
  });
});

router.post('/categoria-produtos', function (req, res, next) {
  categoriaProdutos.save(req.fields).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

router.delete('/categoria-produtos/:id', function (req, res, next) {
  categoriaProdutos.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});
//------------------FIM DE CATEGORIAS DE PRODUTOS -------

//-------------------------CATEGORIAS DE CESTAS ---------
router.get('/categoria-cestas', function (req, res, next) {
  categoriaCestas.getCategorias().then(categoriasCestas => {
    res.render('admin/categoria-cestas', admin.getParams(req, {
      navbar: true,
      categoriasCestas,
      pagina: 'Categoria de Cestas',
      btnLabel: 'Nova Categoria'
    }));
  });
});

router.post('/categoria-cestas', function (req, res, next) {
  categoriaCestas.save(req.fields).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

router.delete('/categoria-cestas/:id', function (req, res, next) {
  categoriaCestas.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});
//------------------FIM DE CATEGORIAS DE CESTAS  --------

//------------------UNIDADES DE MEDIDAS -----------------
router.get('/unidades-medida', function (req, res, next) {
  unidadesMedidas.getUnidades().then(unidMedida => {
    res.render('admin/unidades-medida', admin.getParams(req, {
      navbar: true,
      unidMedida,
      pagina: 'Unidades de Medidas',
      btnLabel: 'Nova Unid. Medida'
    }));
  });
});

router.post('/unidades-medida', function (req, res, next) {
  unidadesMedidas.save(req.fields).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

router.delete('/unidades-medida/:id', function (req, res, next) {
  unidadesMedidas.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});
//------------------UNIDADES DE MEDIDAS -----------------




router.get('/emails', function (req, res, next) {
  res.render('admin/emails', admin.getParams(req));
});

router.get('/menus', function (req, res, next) {
  menus.getMenus().then(data => {
    res.render('admin/menus', admin.getParams(req, {
      data
    }));
  });
});

router.delete('/menus/:id', function (req, res, next) {
  menus.delete(req.params.id).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });
});

router.post('/menus', function (req, res, next) {

  menus.save(req.fields, req.files).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });

});

router.get('/reservations', function (req, res, next) {
  res.render('admin/reservations', admin.getParams(req, {
    date: {}
  }));
});

router.get('/users', function (req, res, next) {
  res.render('admin/users', admin.getParams(req));
});

module.exports = router;