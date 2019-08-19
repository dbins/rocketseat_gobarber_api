const hooks = require("hooks");
const faker = require("faker");
const fs = require("fs");
const mysql = require("mysql");

var jwt = {
  token: null
};

var login_prestador = false;
var gravar_imagem = true;
var codigo_prestador = 2;
var codigo_imagem = 0;
var codigo_agendamento = 0;

var cadastro = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

var login_servico = {
	email: 'teste@teste.com.br',
	password: '123456'
}

var atualizar = {
  name: cadastro.name,
  email: cadastro.email,
  oldPassword: cadastro.password,
  password: cadastro.password,
  confirmPassword: cadastro.password
}

hooks.before("Usuário > Usuário > Criar Usuário", function(transaction) {
  transaction.request.body = JSON.stringify(cadastro);
});

hooks.before(
  "Files > Imagens dos prestadores de serviços > Imagem do prestador",
  function(transaction) {
    var codigo_imagem = 25;
    let url = transaction.fullPath;
    transaction.fullPath = url.replace("1", codigo_imagem);
    console.log(transaction.fullPath);
  }
);

hooks.before(
  "Files > Imagens dos prestadores de serviços > Apagar Imagem",
  function(transaction) {
	if (codigo_imagem === 0){   
		transaction.skip = true;
	} else {
		let url = transaction.fullPath;
		transaction.fullPath = url.replace("1", codigo_imagem);
	}
  }
);

hooks.before("Usuário > Login > Login do usuário", function(transaction) {
  if (login_prestador) {
	transaction.request.body = JSON.stringify(login_servico);
  } else {	  
	let login = {
		email: cadastro.email,
		password: cadastro.password
	}  
	transaction.request.body = JSON.stringify(login);
  }
});



hooks.after("Usuário > Login > Login do usuário", function(transaction) {
  jwt.token = JSON.parse(transaction.real.body).token;
});

hooks.beforeEach(function(transaction) {
  console.log("nome da rota");
  console.log(transaction.name);
});

hooks.afterEach(function(transaction) {
  //console.log(transaction.name);
});

hooks.before("Usuário > Usuário > Atualizar Usuário", function(transaction) {
	if (login_prestador){
		transaction.skip = true;
	} else {	
		//transaction.skip = true;
		transaction.request.body = JSON.stringify(atualizar);
	}
});


hooks.before("Usuário > Esqueceu senha > Esqueceu senha", function(transaction) {
	//transaction.skip = true;
});

hooks.before("Usuário > Validar Token > Validar Token", function(transaction) {
	//transaction.skip = true;
});

hooks.before("Files > Imagens dos prestadores de serviços > Imagem do prestador", function(transaction) {
	transaction.skip = true;
});

hooks.before("Files > Imagens dos prestadores de serviços > Atualizar imagem", function(transaction) {
	transaction.skip = true;
});


hooks.before("Files > Enviar imagem do prestador > Enviar imagem do prestador", function(transaction) {
	transaction.skip = true;
});

hooks.before("Providers > Listagem de prestadores > Listagem de prestadores", function(transaction) {
	//transaction.skip = true;
});

hooks.before("Providers > Horários de atendimento > Horários de atendimento", function(transaction) {
	let url = transaction.fullPath;
	transaction.fullPath = url.replace("1", codigo_prestador);
	//transaction.skip = true;
});

hooks.before("Providers > Dias de atendimento > Dias de atendimento", function(transaction) {
	let url = transaction.fullPath;
	transaction.fullPath = url.replace("1", codigo_prestador);
	//transaction.skip = true;
});

hooks.before("Appointments > Agendamentos > Listagem de agendamentos", function(transaction) {
	//transaction.skip = true;
});

hooks.before("Appointments > Agendamentos > Novo Agendamento", function(transaction) {
	if (login_prestador){
		transaction.skip = true;
	} else {	
		//transaction.skip = true;
	}
});

hooks.after("Appointments > Agendamentos > Novo Agendamento", function(transaction) {
	if (!login_prestador){
		codigo_agendamento = JSON.parse(transaction.real.body).id;
	}
});

hooks.before("Appointments > Agendamentos > Apagar Agendamento", function(transaction) {
	if (login_prestador){
		transaction.skip = true;
	} else {	
		if (codigo_agendamento === 0){
			transaction.skip = true;
		} else {
			let url = transaction.fullPath;
			transaction.fullPath = url.replace("1", codigo_agendamento);
		}
	}
});

hooks.before("Notification > Listagem > Listagem", function(transaction) {
	if (login_prestador){
		//transaction.skip = true;
		let url = transaction.fullPath;
		transaction.fullPath = url.replace("1", codigo_prestador);
	} else {	
		transaction.skip = true;
	}
});

hooks.before("Notification > Marcar como visto > Marcar como visto", function(transaction) {
	if (login_prestador){
		//transaction.skip = true;
	} else {	
		transaction.skip = true;
	}
});

hooks.before("Schedule > Agenda > Agenda", function(transaction) {
	if (login_prestador){
		//transaction.skip = true;
	} else {	
		transaction.skip = true;
	}
});

hooks.beforeEach(function(transaction) {
  if (jwt.token != null) {
    transaction.request.headers["Authorization"] = `Bearer ${jwt.token}`;
  }
  //Apenas para fins de testes, criar uma imagem no banco para testar a rotina de apagar
  if (gravar_imagem){
	  if (codigo_imagem === 0) {
		const connection = mysql.createConnection({
		  host: "127.0.0.1",
		  user: "root",
		  password: "",
		  database: "gobarber"
		});
		connection.connect();
		const StrSQL =
		  "INSERT INTO files (name,path, created_at, updated_at) VALUES ('teste/teste.jpg', '" + faker.system.filePath() + "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";

		var query = connection.query(StrSQL, function(err, result) {
			if (err){
				gravar_imagem = false;
				console.log(err);
			} else {
				codigo_imagem = result.insertId;
			}
		});

		connection.end();
	  }
  }
});
