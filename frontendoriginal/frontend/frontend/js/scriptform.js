// function redirectToIndex() {
//   window.location.href = "index.html";
// }



// // // Récupérer la référence du bouton
// // var btn = document.getElementById("bouton");

// // // Ajouter un écouteur d'événement sur le clic du bouton
// // btn.addEventListener("click", function() {
// //   // Récupérer les valeurs du nom d'utilisateur et du mot de passe
// //   var usernameInput = document.getElementById("username");
// //   var passwordInput = document.getElementById("password");
// //   var nom = usernameInput.value;
// //   var motDePasse = passwordInput.value;

// //   // Effectuer une vérification avec votre API
// //   // Utilisez les valeurs "nom" et "motDePasse" pour effectuer une requête à votre API
// //   // et vérifier si elles correspondent à un utilisateur enregistré

// //   // Exemple de requête avec fetch()
// //   fetch('https://localhost:3000/utilisateur', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //       nom: nom,
// //       motDePasse: motDePasse
// //     })
// //   })
// //   .then(response => response.json())
// //   .then(data => {
// //     // Traitement de la réponse de l'API
// //     // Ici, vous pouvez vérifier si les informations d'identification sont valides ou non
// //     if (data.success) {
// //       // Les informations d'identification sont valides
// //       console.log("Utilisateur authentifié !");
// //     } else {
// //       // Les informations d'identification sont invalides
// //       console.log("Identifiants incorrects !");
// //     }
// //   })
// //   .catch(error => {
// //     // Gestion des erreurs
// //     console.error('Une erreur s\'est produite:', error);
// //   });
// // });


// // Récupérer le bouton par son ID
// const bouton = document.getElementById("bouton");

// // Ajouter un gestionnaire d'événement au clic du bouton
// bouton.addEventListener("click", function() {
//   var usernameInput = document.getElementById("username");
//   var passwordInput = document.getElementById("password");
//   var nom = usernameInput.value;
//   var motDePasse = passwordInput.value;
  
//   fetch('https://localhost:3000/utilisateur', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       nom: nom,
//       motDePasse: motDePasse
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.success) {
//       // Utilisateur authentifié
//       var nomUtilisateur = data.nom;
//       var roleUtilisateur = data.role;

//       // Afficher le nom et le rôle de l'utilisateur sur la page
//       document.getElementById("nomUtilisateur").textContent = nomUtilisateur;
//       document.getElementById("roleUtilisateur").textContent = roleUtilisateur;

//       // Rediriger vers la nouvelle page
//       window.location.href = "index.html";
//     } else {
//       // Identifiants incorrects ou utilisateur non trouvé
//       document.getElementById("messageErreur").textContent = "Identifiants incorrects ou utilisateur non trouvé.";
//     }
//   });
// });


// Fonction pour récupérer l'utilisateur par nom d'utilisateur depuis l'API
const getUserByUsername = async (username) => {
  try {
    const response = await fetch('/utilisateur', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération de l\'utilisateur');
  }
};

// Fonction pour comparer les mots de passe
const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la comparaison des mots de passe');
  }
};

// Fonction pour gérer le processus de connexion
const login = async (username, password) => {
  try {
    // Récupérer l'utilisateur par nom d'utilisateur
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Comparer le mot de passe
    const passwordMatch = await comparePassword(password, user.mot_de_passe);

    if (!passwordMatch) {
      throw new Error('Mot de passe incorrect');
    }

    // Stocker les informations de session dans le token d'authentification
    const token = jwt.sign({ username: user.username, role: user.role }, 'secret-key', { expiresIn: '1h' });

    // Renvoyer les informations utilisateur et le token d'authentification
    return {
      success: true,
      message: 'Connexion réussie',
      username: user.username,
      role: user.role,
      token: token
    };
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la connexion');
  }
};

// Gestionnaire d'événement pour le clic du bouton de connexion
const btn = document.getElementById("bouton");
btn.addEventListener("click", async () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    // Effectuer le processus de connexion
    const loginResult = await login(username, password);

    if (loginResult.success) {
      // Redirection vers la page d'index
      window.location.href = 'index.html';
    } else {
      // Affichage du message d'erreur
      document.getElementById('messageErreur').textContent = loginResult.message;
    }
  } catch (error) {
    console.error(error);
    // Affichage du message d'erreur
    document.getElementById('messageErreur').textContent = 'Une erreur s\'est produite lors de la connexion';
  }
});
