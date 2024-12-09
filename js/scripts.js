// Simule une base de données temporaire pour tester
const users = [];

function registerUser(event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!fullname || !email || !password) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("Un compte avec cet email existe déjà !");
    } else {
        users.push({ fullname, email, password });
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        
        // Redirection vers la page de connexion
        window.location.href = "login.html"; // Remplace par le nom correct de ta page de connexion
    }
}


// Fonction pour la connexion
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Connexion réussie !");
        window.location.href = "profile.html";
    } else {
        alert("Email ou mot de passe incorrect !");
    }
}

// Fonction pour montrer les détails d'un service
function showDetails(serviceName) {
    alert(`Détails sur le service : ${serviceName}`);
}

// Fonction pour modifier la photo de profil (placeholder)
function uploadPhoto() {
    alert("Fonction de modification de la photo de profil à implémenter.");
}
