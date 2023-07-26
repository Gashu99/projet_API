

document.addEventListener('DOMContentLoaded', function(event) {
  event.preventDefault();

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const userInfoDiv = document.getElementById('info_utilisateur');
  const se_connecter = document.getElementById('se_connecter');
  const username_deconnecter = document.getElementById('se_deconnecter');
  const role_user=document.getElementById('user_role')

  const ds=document.getElementById('produit')
  const liste=document.getElementById('liste')
  const image=document.getElementById('image_user')

  // Vérifier si un token est présent dans le localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Un token est présent, masquer le bouton "Se Connecter" et afficher le nom d'utilisateur et le bouton de déconnexion
    se_connecter.style.display = 'none';
    username_deconnecter.style.display = 'block';

    const decodedToken = parseJwt(token);
    const role=decodedToken.role
    console.log(decodedToken);

    userInfoDiv.textContent = decodedToken.full_name;

    if (role===1){
        role_user.textContent='ADMIN'
        ds.textContent="Dashboard"
        ds.href= "../dashboard/template/index.html";
        
        liste.textContent="proposition Editeurs"
        liste.href= "admin.html";
        image.src='shuga.jpeg'
    }
    if (role===2){
        role_user.textContent='EDITEUR'
        image.src='aby.jpeg'

        ds.textContent="liste des produits edités "
       


         // Récupérer toutes les balises <a> ayant la classe "edit-link" et contenant le texte "Edit"
          const editLinks = document.querySelectorAll('#btn_edit');
          console.log(editLinks)


        // Parcourir les balises récupérées et faire quelque chose avec chacune d'elles
         editLinks.forEach(link => {
        // Faites ce que vous voulez avec chaque balise <a> ayant la valeur "Edit"
        link.addEventListener("click",function(event){
          event.preventDefault(); 
         
          // link.setAttribute('href','editer.html')
          
        
      const data = JSON.parse(localStorage.getItem('data') )

         
          // Remplir les champs du formulaire avec les informations récupérées
          const nomInput = document.getElementById('nom');
          const prixInput = document.getElementById('prix');
          const imageInput = document.getElementById('image');
          nomInput.value=data['nom'];
          prixInput.value =data['prix'];
          imageInput.value = data['image'];


          window.location.href = 'editer.html';
})
      });

    }
    
  

    // Gestionnaire d'événements pour le bouton de déconnexion
    username_deconnecter.addEventListener('click', function() {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion
        window.location.href = 'index.html';
    });
  }
  


  // Fonction pour extraire le nom d'utilisateur à partir du token
 
});

