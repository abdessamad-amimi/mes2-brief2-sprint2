// Ma liste de courses — starter de la mise en situation.
// Fourni : données, affichage et ajout validé.
// À réaliser : statut, suppression, recherche, filtre, tri par prix, réinitialisation et localStorage.

const produitsInitiaux = [
  { id: 1, nom: "Lait entier", prix: 9, statut: "À acheter" },
  { id: 2, nom: "Pain complet", prix: 6, statut: "Acheté" },
  { id: 3, nom: "Lait demi-écrémé", prix: 8.5, statut: "À acheter" },
  { id: 4, nom: "Pommes", prix: 15, statut: "À acheter" },
  { id: 5, nom: "Œufs", prix: 18, statut: "Acheté" },
  { id: 6, nom: "Riz", prix: 14, statut: "À acheter" },
];
// let produits = produitsInitiaux.map((produit) => ({ ...produit }));
let prochainId = 7;

const formulaire = document.getElementById("formulaire-produit");
const champNom = document.getElementById("nom");
const champPrix = document.getElementById("prix");
const champRecherche = document.getElementById("recherche");
const filtreStatut = document.getElementById("filtre-statut");
const triPrix = document.getElementById("tri-prix");
const listeProduits = document.getElementById("liste-produits");
const message = document.getElementById("message");

function afficherProduits(liste) {
  listeProduits.replaceChildren();
  document.getElementById("etat-vide").hidden = liste.length > 0;
  document.getElementById("nombre-resultats").textContent =
    liste.length +
    (liste.length > 1 ? " produits affichés" : " produit affiché");

  liste.forEach((produit) => {
    const achete = produit.statut === "Acheté";
    const ligne = document.createElement("li");
    ligne.className = achete ? "product is-bought" : "product";

    const informations = document.createElement("div");
    informations.className = "product-info";
    const repere = document.createElement("span");
    repere.className = "product-marker";
    repere.setAttribute("aria-hidden", "true");
    const textes = document.createElement("div");
    const nom = document.createElement("h3");
    nom.className = "product-name";
    nom.textContent = produit.nom;
    const details = document.createElement("div");
    details.className = "product-meta";
    const prix = document.createElement("span");
    prix.className = "product-price";
    prix.textContent = Number(produit.prix).toFixed(2) + " DH";
    const statut = document.createElement("span");
    statut.className = achete ? "badge badge-bought" : "badge badge-pending";
    statut.textContent = produit.statut;
    const identifiant = document.createElement("span");
    identifiant.className = "product-id";
    identifiant.textContent = "#" + produit.id;
    details.append(prix, statut, identifiant);
    textes.append(nom, details);
    informations.append(repere, textes);

    const actions = document.createElement("div");
    actions.className = "product-actions";
    const boutonStatut = document.createElement("button");
    boutonStatut.type = "button";
    boutonStatut.className = "button button-status";
    boutonStatut.textContent = achete ? "Remettre à acheter" : "Marquer acheté";
    boutonStatut.setAttribute(
      "aria-label",
      boutonStatut.textContent + " : " + produit.nom,
    );
    boutonStatut.addEventListener("click", () => modifierStatut(produit.id));

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.className = "button button-delete";
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.setAttribute("aria-label", "Supprimer " + produit.nom);
    boutonSupprimer.addEventListener("click", () =>
      supprimerProduit(produit.id),
    );
    actions.append(boutonStatut, boutonSupprimer);
    ligne.append(informations, actions);
    listeProduits.append(ligne);
  });
}

function ajouterProduit(event) {
  event.preventDefault();
  const nom = champNom.value.trim();
  const prix = Number(champPrix.value);
  const erreurNom = document.getElementById("erreur-nom");
  const erreurPrix = document.getElementById("erreur-prix");
  erreurNom.textContent = "";
  erreurPrix.textContent = "";
  champNom.removeAttribute("aria-invalid");
  champPrix.removeAttribute("aria-invalid");
  message.textContent = "";
  let valide = true;
  if (nom === "") {
    erreurNom.textContent = "Saisissez un nom de produit.";
    champNom.setAttribute("aria-invalid", "true");
    valide = false;
  }
  if (!Number.isFinite(prix) || prix <= 0) {
    erreurPrix.textContent = "Saisissez un prix strictement positif.";
    champPrix.setAttribute("aria-invalid", "true");
    valide = false;
  }
  if (!valide) return;

  // produits.push({ id: prochainId, nom, prix, statut: "À acheter" });
  // prochainId++;

  sauvegarderProduits(nom, prix);
  actualiserAffichage();
  formulaire.reset();
  champNom.focus();
  message.textContent = "Produit ajouté à la liste.";
}

// FONCTIONS À COMPLÉTER — aucune solution n'est fournie ci-dessous.

function modifierStatut(id) {
  // TODO : changer uniquement le statut du bon produit dans les deux sens.
  // Le nom, le prix et l'id ne changent pas.
  // Mettre à jour la sauvegarde et l'affichage selon les critères actifs.

  let FullData = JSON.parse(localStorage.getItem("data"));

  // let ModifiedObjet = 
  FullData.forEach((data) => {
    if (data.id === id) {
      if (data.statut === "Acheté") data.statut = "À acheter";
      else data.statut = "Acheté";
    }
  })

  localStorage.setItem("data", JSON.stringify(FullData));

  actualiserAffichage();
}

function supprimerProduit(id) {

  // TODO : demander confirmation et retirer uniquement le bon produit.
  // Mettre à jour la sauvegarde et l'affichage si la suppression est confirmée.
  if (confirm("Sur de supprimer ?")) {
    let FullData = JSON.parse(localStorage.getItem("data"));

    FullData = FullData.filter((data) => data.id != id);

    localStorage.setItem("data", JSON.stringify(FullData));
  }
  actualiserAffichage();

}

function appliquerCriteres() {
  // TODO : combiner la recherche et le statut, puis appliquer triPrix.value.
  // Trier numériquement les résultats sur une copie, sans modifier produits.
  // Modes : initial, croissant et decroissant.
  // Retourner les résultats sans modifier le tableau complet produits.
  // Le retour ci-dessous affiche provisoirement toute la liste.
  let data = JSON.parse(localStorage.getItem("data"));

  data = data.filter((d) => d.nom.toLowerCase().startsWith(champRecherche.value.toLowerCase()));

  if (filtreStatut.value !== "tous") data = data.filter(d => d.statut.toLowerCase() === filtreStatut.value.toLowerCase());

  if(triPrix.value !== "initial"){
    if(triPrix.value === "croissant") data = triInsertioncroissant(data);
    else data = triInsertionDecroissant(data);
  }

  return data;
}

function reinitialiserCriteres() {
  // TODO : vider la recherche, sélectionner tous les produits et l'ordre initial.
  // Actualiser l'affichage, sans modifier les produits ni leur sauvegarde.

  filtreStatut.value = "tous";
  champRecherche.value = "";
  triPrix.value = "tous";
  actualiserAffichage();
}

function sauvegarderProduits(nom, prix) {
  // TODO : sauvegarder le tableau complet produits dans localStorage.
  // Cette fonction est déjà appelée après un ajout.

  prochainId = JSON.parse(localStorage.getItem("prochainId"));

  produits = JSON.parse(localStorage.getItem("data"));
  produits.push({ id: prochainId, nom: nom, prix: prix, statut: "À acheter" });
  localStorage.setItem("data", JSON.stringify(produits));

  prochainId++;
  localStorage.setItem("prochainId", JSON.parse(prochainId));
}

function chargerProduits() {
  if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(produitsInitiaux));
  }

  if (!localStorage.getItem("prochainId")) {
    localStorage.setItem("prochainId", JSON.stringify(prochainId));
  }
  // TODO : récupérer la sauvegarde dans produits si elle existe.
  // En l'absence de sauvegarde, conserver les données initiales.
  // Une sauvegarde contenant [] doit rester une liste vide.
}

// Connexions fournies : compléter les fonctions appelées, sans les dupliquer.
function actualiserAffichage() {
  afficherProduits(appliquerCriteres());
}
formulaire.addEventListener("submit", ajouterProduit);
champRecherche.addEventListener("input", actualiserAffichage);
filtreStatut.addEventListener("change", actualiserAffichage);
triPrix.addEventListener("change", actualiserAffichage);
document
  .getElementById("reinitialiser-criteres")
  .addEventListener("click", reinitialiserCriteres);

chargerProduits();
// prochainId = Math.max(0, ...produits.map((produit) => produit.id)) + 1;
actualiserAffichage();


function triInsertioncroissant(tableau) {
  for (let i = 1; i < tableau.length; i++) {
    for (let j = i; j > 0; j--) {

      if (tableau[j].prix < tableau[j - 1].prix) {
        let temp = tableau[j];
        tableau[j] = tableau[j - 1];
        tableau[j - 1] = temp;
      } else {
        break;
      }
    }
  }

  return tableau;
}

function triInsertionDecroissant(tableau) {
  for (let i = 1; i < tableau.length; i++) {
    for (let j = i; j > 0; j--) {

      if (tableau[j].prix > tableau[j - 1].prix) {
        let temp = tableau[j];
        tableau[j] = tableau[j - 1];
        tableau[j - 1] = temp;
      } else {
        break;
      }
    }
  }

  return tableau;
}