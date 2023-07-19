const loginButton = document.querySelector('#connecter');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageContainer = document.getElementById('message-container');

loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
    const mail = emailInput.value;
    const password = passwordInput.value;
  
    // Effectuer la requête d'authentification
    try {
      const response = await fetch('http://localhost:3000/utilisateur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail, password })
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        // Connexion réussie
        const token = data.token;

        console.log("connexion reussi");
  
        // Stocker le token d'authentification dans le localStorage ou les cookies
        localStorage.setItem('token', token);
        // Rediriger vers la page d'accueil ou une autre page sécurisée
        window.location.href = 'index.html';
      }
      
    } catch {
      console.error('Une erreur s\'est produite lors de la requête d\'authentification :', error);
      //     // Afficher un message d'erreur générique
          messageContainer.textContent = 'Une erreur s\'est produite lors de la connexion.';
      }
    
})



