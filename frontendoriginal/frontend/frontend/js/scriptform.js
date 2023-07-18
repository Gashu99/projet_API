// // function redirectToIndex() {
// //   window.location.href = "index.html";
// // }



// // // // Récupérer la référence du bouton
// // // var btn = document.getElementById("bouton");

// // // // Ajouter un écouteur d'événement sur le clic du bouton
// // // btn.addEventListener("click", function() {
// // //   // Récupérer les valeurs du nom d'utilisateur et du mot de passe
// // //   var usernameInput = document.getElementById("username");
// // //   var passwordInput = document.getElementById("password");
// // //   var nom = usernameInput.value;
// // //   var motDePasse = passwordInput.value;

// // //   // Effectuer une vérification avec votre API
// // //   // Utilisez les valeurs "nom" et "motDePasse" pour effectuer une requête à votre API
// // //   // et vérifier si elles correspondent à un utilisateur enregistré

// // //   // Exemple de requête avec fetch()
// // //   fetch('https://localhost:3000/utilisateur', {
// // //     method: 'POST',
// // //     headers: {
// // //       'Content-Type': 'application/json'
// // //     },
// // //     body: JSON.stringify({
// // //       nom: nom,
// // //       motDePasse: motDePasse
// // //     })
// // //   })
// // //   .then(response => response.json())
// // //   .then(data => {
// // //     // Traitement de la réponse de l'API
// // //     // Ici, vous pouvez vérifier si les informations d'identification sont valides ou non
// // //     if (data.success) {
// // //       // Les informations d'identification sont valides
// // //       console.log("Utilisateur authentifié !");
// // //     } else {
// // //       // Les informations d'identification sont invalides
// // //       console.log("Identifiants incorrects !");
// // //     }
// // //   })
// // //   .catch(error => {
// // //     // Gestion des erreurs
// // //     console.error('Une erreur s\'est produite:', error);
// // //   });
// // // });


// // // Récupérer le bouton par son ID
// // const bouton = document.getElementById("bouton");

// // // Ajouter un gestionnaire d'événement au clic du bouton
// // bouton.addEventListener("click", function() {
// //   var usernameInput = document.getElementById("username");
// //   var passwordInput = document.getElementById("password");
// //   var nom = usernameInput.value;
// //   var motDePasse = passwordInput.value;
  
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
// //     if (data.success) {
// //       // Utilisateur authentifié
// //       var nomUtilisateur = data.nom;
// //       var roleUtilisateur = data.role;

// //       // Afficher le nom et le rôle de l'utilisateur sur la page
// //       document.getElementById("nomUtilisateur").textContent = nomUtilisateur;
// //       document.getElementById("roleUtilisateur").textContent = roleUtilisateur;

// //       // Rediriger vers la nouvelle page
// //       window.location.href = "index.html";
// //     } else {
// //       // Identifiants incorrects ou utilisateur non trouvé
// //       document.getElementById("messageErreur").textContent = "Identifiants incorrects ou utilisateur non trouvé.";
// //     }
// //   });
// // });


// // // Fonction pour récupérer l'utilisateur par nom d'utilisateur depuis l'API
// // const getUserByUsername = async (username) => {
// //   try {
// //     const response = await fetch('/utilisateur', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({ username })
// //     });
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Erreur lors de la récupération de l\'utilisateur');
// //   }
// // };

// // // Fonction pour comparer les mots de passe
// // const comparePassword = async (password, hashedPassword) => {
// //   try {
// //     const match = await bcrypt.compare(password, hashedPassword);
// //     return match;
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Erreur lors de la comparaison des mots de passe');
// //   }
// // };

// // // Fonction pour gérer le processus de connexion
// // const login = async (username, password) => {
// //   try {
// //     // Récupérer l'utilisateur par nom d'utilisateur
// //     const user = await getUserByUsername(username);

// //     if (!user) {
// //       throw new Error('Utilisateur non trouvé');
// //     }

// //     // Comparer le mot de passe
// //     const passwordMatch = await comparePassword(password, user.mot_de_passe);

// //     if (!passwordMatch) {
// //       throw new Error('Mot de passe incorrect');
// //     }

// //     // Stocker les informations de session dans le token d'authentification
// //     const token = jwt.sign({ username: user.username, role: user.role }, 'secret-key', { expiresIn: '1h' });

// //     // Renvoyer les informations utilisateur et le token d'authentification
// //     return {
// //       success: true,
// //       message: 'Connexion réussie',
// //       username: user.username,
// //       role: user.role,
// //       token: token
// //     };
// //   } catch (error) {
// //     console.error(error);
// //     throw new Error('Erreur lors de la connexion');
// //   }
// // };

// // // Gestionnaire d'événement pour le clic du bouton de connexion
// // const btn = document.getElementById("bouton");
// // btn.addEventListener("click", async () => {
// //   const usernameInput = document.getElementById("username");
// //   const passwordInput = document.getElementById("password");
// //   const username = usernameInput.value;
// //   const password = passwordInput.value;

// //   try {
// //     // Effectuer le processus de connexion
// //     const loginResult = await login(username, password);

// //     if (loginResult.success) {
// //       // Redirection vers la page d'index
// //       window.location.href = 'index.html';
// //     } else {
// //       // Affichage du message d'erreur
// //       document.getElementById('messageErreur').textContent = loginResult.message;
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     // Affichage du message d'erreur
// //     document.getElementById('messageErreur').textContent = 'Une erreur s\'est produite lors de la connexion';
// //   }
// // });


// const bcrypt = require('bcrypt');
// const { Pool } = require('pg');


// const pool = new Pool({
//   user: 'fatou',
//   host: 'localhost',
//   database: 'dall_diamm_api',
//   password: 'fatou',
//   port: 5432, // default PostgreSQL port
// });




// // Récupérer le bouton par son ID après le chargement du DOM
// document.addEventListener("DOMContentLoaded", function() {
//   const btn = document.getElementById("bouton");

//   // Ajouter un gestionnaire d'événement au clic du bouton
//   btn.addEventListener("click", function(event) {
//     event.preventDefault(); // Empêche le comportement par défaut du formulaire

//     var usernameInput = document.getElementById("username");
//     var passwordInput = document.getElementById("password");
//     var nom = usernameInput.value;
//     var motDePasse = passwordInput.value;
  
//     // Effectuer ici les actions souhaitées avec les valeurs 'nom' et 'motDePasse'
//     // Par exemple, vérifier les informations d'identification avec une API
  
//     console.log("Nom d'utilisateur:", nom);
//     console.log("Mot de passe:", motDePasse);
//   });
// });


// const getUserByUsername = async (username) => {
//   try {
//     const response = await fetch('http://localhost:3000/utilisateur', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username })
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Erreur lors de la récupération de l\'utilisateur');
//   }
// };

// // Fonction pour comparer les mots de passe
// const comparePassword = async (password, hashedPassword) => {
//   try {
//     const match = await bcrypt.compare(password, hashedPassword);
//     return match;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Erreur lors de la comparaison des mots de passe');
//   }
// };
//  // Fonction pour gérer le processus de connexion
//  const login = async (username, password) => {
//   try {
//     // Récupérer l'utilisateur par nom d'utilisateur
//     const user = await getUserByUsername(username);

//     if (!user) {
//       throw new Error('Utilisateur non trouvé');
//     }

//     // Comparer le mot de passe
//     const passwordMatch = await comparePassword(password, user.password);

//     if (!passwordMatch) {
//       throw new Error('Mot de passe incorrect');
//     }

//     // Stocker les informations de session dans le token d'authentification
//     const token = jwt.sign({ username: user.username, role: user.role }, 'secret-key', { expiresIn: '1h' });

//     // Renvoyer les informations utilisateur et le token d'authentification
//     return {
//       success: true,
//       message: 'Connexion réussie',
//       username: user.username,
//       role: user.role,
//       token: token
//     };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Erreur lors de la connexion');
//   }
// };

//  // Gestionnaire d'événement pour le clic du bouton de connexion
//  const btn = document.getElementById("bouton");
//  btn.addEventListener("click", async () => {
//    const usernameInput = document.getElementById("username");
//    const passwordInput = document.getElementById("password");
//    const username = usernameInput.value;
//    const password = passwordInput.value;
//    console.log(username,password)

//    try {
//      // Effectuer le processus de connexion
//      const loginResult = await login(username, password);

//      if (loginResult.success) {
//        // Redirection vers la page d'index
//        window.location.href = 'index.html';
//      } else {
//        // Affichage du message d'erreur
//        document.getElementById('messageErreur').textContent = loginResult.message;
//      }
//    } catch (error) {
//      console.error(error);
//      // Affichage du message d'erreur
//      document.getElementById('messageErreur').textContent = 'Une erreur s\'est produite lors de la connexion';
//    }
//  });



// Récupérer le bouton de connexion
// const loginButton = document.getElementById('bouton');
// const emailInput = document.getElementById('username');
// const passwordInput = document.getElementById('password');
// const messageContainer = document.getElementById('message-container');
// const mail = emailInput.value;
// const password = passwordInput.value;
// console.log(mail,password);

// console.log(loginButton.value);

// // Gérer le clic sur le bouton de connexion
// loginButton.addEventListener('click', async function(event) {
//   // event.preventDefault(); // Empêcher le rechargement de la page

//   // Récupérer les valeurs des champs email et mot de passe
//   const mail = emailInput.value;
//   const password = passwordInput.value;
//   console.log(mail,password);

//   // Effectuer la requête d'authentification
//   try {
//     const response = await fetch('http://localhost:3000/utilisateur', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ mail, password })
//     });

//     const data = await response.json();
//     console.log(data);

//     if (response.ok) {
//       // Connexion réussie
//       const token = data.token;

//       // Stocker le token d'authentification dans le localStorage ou les cookies
//       localStorage.setItem('token', token);
//       // Rediriger vers la page d'accueil ou une autre page sécurisée
//       window.location.href = 'index.html';

//        const gettoken = localStorage.getItem('token');

//       // Vérifier si l'utilisateur est connecté (a un token valide)
//       // if (gettoken) {
//       //   // Effectuer une requête à l'API pour récupérer les informations de l'utilisateur
//       //   fetch('http://localhost:3000/utilisateur', {
//       //     method: 'GET',
//       //     headers: {
//       //       'Authorization': `Bearer ${gettoken}`
//       //     }
//       //   })
//       //   .then(response => response.json())
//       //   .then(data => {
//       //     // Mettre à jour le contenu du div avec les informations de l'utilisateur
//       //     const userInfoDiv = document.getElementById('user-info');
//       //     userInfoDiv.textContent = `Bonjour ${data.nom}, vous êtes connecté en tant que ${data.role_id}.`;
//       //   })
//       //   .catch(error => {
//       //     console.error('Erreur lors de la récupération des informations utilisateur :', error);
//       //   });
//       // }

//           } else {
//             // Afficher un message d'erreur
//             messageContainer.textContent = data.message;
//           }
//   } catch (error) {
//     console.error('Une erreur s\'est produite lors de la requête d\'authentification :', error);
//     // Afficher un message d'erreur générique
//     messageContainer.textContent = 'Une erreur s\'est produite lors de la connexion.';
//   }
// });








const loginButton = document.getElementById('bouton');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageContainer = document.getElementById('message-container');
loginButton.addEventListener('click', async () => {
    const mail = emailInput.value;
    const password = passwordInput.value;
    console.log(mail,password);
  
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
