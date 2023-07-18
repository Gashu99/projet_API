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



// document.addEventListener('DOMContentLoaded', function() {
//   // Vérifier si un token est présent dans le localStorage
//   const token = localStorage.getItem('token');

//   if (token) {
//     // Un token est présent, masquer le bouton "Se Connecter" et afficher le nom d'utilisateur et le bouton de déconnexion
//     const se_connecter = document.getElementById('se_connecter');
//     const username_deconnecter = document.getElementById('username_deconnecter');
//     const username = document.getElementById('username');

//     se_connecter.style.display = 'none';
//     username_deconnecter.style.display = 'block';
//     const decodedToken =  parseJwt(token);
//     username.textContent = decodedToken.nom

//     // Gestionnaire d'événements pour le bouton de déconnexion
//     const se_deconnecter = document.getElementById("deconnecter")
//     se_deconnecter.addEventListener('click', function() {
//       // Supprimer le token du localStorage
//       localStorage.removeItem('token');
//       // Rediriger vers la page de connexion
//       window.location.href = 'index.html';
//     });
//   } else {
//     // Aucun token n'est présent, afficher le bouton "Se Connecter" et masquer le bouton de déconnexion et le nom d'utilisateur
//     const se_connecter = document.getElementById('se_connecter');
//     const username_deconnecter = document.getElementById('username_deconnecter');
//     const username = document.getElementById('username');

//     se_connecter.style.display = 'block';
//     username_deconnecter.style.display = 'none';
//     username.textContent = '';
//   }


document.addEventListener('DOMContentLoaded', function() {
  const userInfoDiv = document.getElementById('user-info');
  const se_connecter = document.getElementById('se_connecter');
  const username_deconnecter = document.getElementById('username_deconnecter');

  // Vérifier si un token est présent dans le localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Un token est présent, masquer le bouton "Se Connecter" et afficher le nom d'utilisateur et le bouton de déconnexion
    se_connecter.style.display = 'none';
    username_deconnecter.style.display = 'block';
    const decodedToken = parseJwt(token);
    if (userInfoDiv) {
      userInfoDiv.textContent = decodedToken.nom;
    }

    // Gestionnaire d'événements pour le bouton de déconnexion
    const se_deconnecter = document.getElementById("deconnecter");
    if (se_deconnecter) {
      se_deconnecter.addEventListener('click', function() {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion
        window.location.href = 'index.html';
      });
    }
  } else {
    // Aucun token n'est présent, afficher le bouton "Se Connecter" et masquer le bouton de déconnexion et le nom d'utilisateur
    se_connecter.style.display = 'block';
    username_deconnecter.style.display = 'none';
    if (userInfoDiv) {
      userInfoDiv.textContent = '';
    }
  }

  // Fonction pour extraire le nom d'utilisateur à partir du token
  function parseJwt(token) {
    // ...
  }



  // Fonction pour extraire le nom d'utilisateur à partir du token
  function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
});


// // Code JavaScript
// document.addEventListener('DOMContentLoaded', function() {
//   // Vérifier si un token est présent dans le localStorage
//   const token = localStorage.getItem('token');

//   if (token) {
//     // Un token est présent, masquer le bouton "Se Connecter" et afficher le nom d'utilisateur et le bouton de déconnexion
//     const se_connecter = document.getElementById('se_connecter');
//     const username_deconnecter = document.getElementById('username_deconnecter');
//     const username = document.getElementById('user-info');

//     se_connecter.style.display = 'none';
//     username_deconnecter.style.display = 'block';
//     const decodedToken = parseJwt(token);
//     username.textContent = "Bonjour",decodedToken.nom;

//     // Gestionnaire d'événements pour le bouton de déconnexion
//     const se_deconnecter = document.getElementById("deconnecter");
//     se_deconnecter.addEventListener('click', function() {
//       // Supprimer le token du localStorage
//       localStorage.removeItem('token');
//       // Rediriger vers la page de connexion
//       window.location.href = 'index.html';
//     });
//   } else {
//     // Aucun token n'est présent, afficher le bouton "Se Connecter" et masquer le bouton de déconnexion et le nom d'utilisateur
//     const se_connecter = document.getElementById('se_connecter');
//     const username_deconnecter = document.getElementById('username_deconnecter');
//     const username = document.getElementById('user-info');

//     se_connecter.style.display = 'block';
//     username_deconnecter.style.display = 'none';
//     username.textContent = '';
//   }

//   // Fonction pour extraire le nom d'utilisateur à partir du token
//   function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
//   }
// });
