// Dados simulados
let currentUser = null;  // Usuário atual
let vehicles = [];  // Lista de veículos
let logs = [];  // Histórico de ações

// Papéis de usuários
const roles = {
    ADMIN: 'Administrador',
    OPERATOR: 'Operador',
    CONSULTANT: 'Consultor'
};

// Usuários simulados
const users = [
    { id: 1, name: 'João', role: roles.CONSULTANT },
    { id: 2, name: 'Maria', role: roles.ADMIN },
    { id: 3, name: 'Carlos', role: roles.OPERATOR }
];

// Funções de navegação
function showHome() {
    document.getElementById("content").innerHTML = `
        <div class="hero">
            <h1>Bem-vindo ao Sistema de Gerenciamento de Veículos</h1>
            <p>Gerencie seus veículos de maneira fácil e intuitiva.</p>
            <button onclick="showLogin()">Login</button>
        </div>
    `;
}

function showLogin() {
    document.getElementById("content").innerHTML = `
        <h2>Login</h2>
        <select id="userSelect">
            <option value="1">João (Consultor)</option>
            <option value="2">Maria (Administrador)</option>
            <option value="3">Carlos (Operador)</option>
        </select>
        <button onclick="login()">Entrar</button>
    `;
}

function login() {
    const userId = parseInt(document.getElementById("userSelect").value);
    currentUser = users.find(user => user.id === userId);
    alert(`Bem-vindo, ${currentUser.name}`);
    updateMenu();
    showHome();
}

// Atualiza o menu conforme o papel do usuário
function updateMenu() {
    if (currentUser) {
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "inline-block";
        
        if (currentUser.role === roles.ADMIN) {
            document.getElementById("cadastro").style.display = "inline-block";
            document.getElementById("listar").style.display = "inline-block";
            document.getElementById("registros").style.display = "inline-block";
        } else if (currentUser.role === roles.OPERATOR) {
            document.getElementById("cadastro").style.display = "inline-block";
            document.getElementById("listar").style.display = "inline-block";
            document.getElementById("registros").style.display = "none";
        } else {
            document.getElementById("cadastro").style.display = "none";
            document.getElementById("listar").style.display = "inline-block";
            document.getElementById("registros").style.display = "none";
        }
    }
}

// Função de logout
function logout() {
    currentUser = null;
    updateMenu();
    showHome();
}

// Função para adicionar um veículo
function showCadastro() {
    if (!currentUser || (currentUser.role !== roles.ADMIN && currentUser.role !== roles.OPERATOR)) {
        alert('Você não tem permissão para cadastrar veículos!');
        return;
    }

    document.getElementById("content").innerHTML = `
        <h2>Cadastrar Veículo</h2>
        <input type="text" id="marca" placeholder="Marca" />
        <input type="text" id="modelo" placeholder="Modelo" />
        <input type="number" id="ano" placeholder="Ano" />
        <input type="text" id="cor" placeholder="Cor" />
        <input type="text" id="registro" placeholder="Número de Registro" />
        <button onclick="addVehicle()">Adicionar</button>
    `;
}

function addVehicle() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const cor = document.getElementById('cor').value;
    const registro = document.getElementById('registro').value;

    const newVehicle = {
        marca, modelo, ano, cor, registro, 
        addedBy: currentUser.name, 
        dateAdded: new Date().toLocaleString()
    };

    vehicles.push(newVehicle);
    logs.push(`${currentUser.name} cadastrou o veículo ${marca} ${modelo}.`);

    alert('Veículo cadastrado com sucesso!');
    showListar();
}

// Função para listar os veículos
function showListar() {
    document.getElementById("content").innerHTML = `
        <h2>Veículos Cadastrados</h2>
        <div class="vehicle-list">
            ${vehicles.map(vehicle => `
                <div class="vehicle-item">
                    <h3>${vehicle.marca} ${vehicle.modelo}</h3>
                    <p>Ano: ${vehicle.ano}</p>
                    <p>Cor: ${vehicle.cor}</p>
                    <p>Registro: ${vehicle.registro}</p>
                    <p>Adicionado por: ${vehicle.addedBy} em ${vehicle.dateAdded}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Função para visualizar os registros de atividade
function showRegistros() {
    document.getElementById("content").innerHTML = `
        <h2>Histórico de Ações</h2>
        <ul>
            ${logs.map(log => `<li>${log}</li>`).join('')}
        </ul>
    `;
}
