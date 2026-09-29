// ====== 1. CONTROLE DA FOTO (PREVIEW) ======
const campoFoto = document.getElementById('foto');
let urlImagemSalva = ""; // Variável para guardar a imagem temporariamente

campoFoto.addEventListener('change', function() {
    const arquivo = this.files[0];
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            urlImagemSalva = e.target.result; // Guarda o link da foto na memória
        }
        leitor.readAsDataURL(arquivo);
    }
});

// ====== 2. CONTROLE DO FORMULÁRIO E CRIAÇÃO DO CARD ======
const formulario = document.getElementById('meuFormulario');

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar e sumir tudo!

    // Pegamos os valores digitados
    const nomeUsuario = document.getElementById('nome').value;
    
    // Identificamos se é o Cardan ou leitor comum
    let statusMembro = "Protagonista VIP 🌟";
    if (nomeUsuario.toLowerCase().includes('cardan')) {
        statusMembro = "Realeza de Elfhame 👑🍷";
    }

    // Jogamos os dados dentro da nossa Carteirinha do HTML
    document.getElementById('nome-salvo').innerText = nomeUsuario;
    document.getElementById('status-salvo').innerText = statusMembro;
    
    // Se o usuário escolheu uma foto, coloca ela, se não usa uma padrão
    if (urlImagemSalva) {
        document.getElementById('foto-salva').src = urlImagemSalva;
    } else {
        document.getElementById('foto-salva').src = "https://placeholder.com"; 
    }

    // FAZ A MÁGICA: Esconde o formulário antigo e mostra o Card Lindo na tela!
    formulario.style.display = 'none';
    document.getElementById('card-perfil-salvo').style.display = 'block';
});

// ====== 3. MÁSCARA AUTOMÁTICA DO CPF ======
const inputCPF = document.getElementById('cpf');
inputCPF.addEventListener('input', function() {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length > 3) valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
    if (valor.length > 6) valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (valor.length > 9) valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    this.value = valor;
});
