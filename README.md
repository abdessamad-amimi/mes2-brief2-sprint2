# Mise en situation — Ma liste de courses

**Travail individuel · Durée indicative : 35 à 40 minutes**

## Mission

Compléter une application qui permet de préparer ses achats et de distinguer
les produits déjà achetés de ceux restant à acheter.

Chaque produit possède un identifiant unique, un nom, un prix et un statut :
`À acheter` ou `Acheté`. Un nouveau produit commence au statut `À acheter`.

## Starter fourni

- `index.html` : formulaire, liste, recherche, filtre, tri, réinitialisation et message d'état vide.
- `style.css` : interface responsive et styles des deux statuts.
- `script.js` : six produits fictifs, affichage dynamique et ajout avec validation.

Ouvrir `index.html` dans un navigateur ou avec Live Server. Aucune installation
ni bibliothèque n'est nécessaire. Les boutons de statut et de suppression sont
visibles et reliés aux fonctions à compléter. La recherche, le filtre et le tri sont
également reliés à l'actualisation de l'affichage.

## Travail à réaliser

### 1. Modifier le statut

Compléter `modifierStatut(id)` :

- Passer de `À acheter` à `Acheté` et inversement.
- Modifier le bon produit sans changer son nom, son prix ou son identifiant.
- Actualiser la sauvegarde et l'affichage avec les critères actifs.

### 2. Supprimer un produit

Compléter `supprimerProduit(id)` :

- Demander confirmation avant suppression.
- Annuler ne modifie pas les données.
- Confirmer retire uniquement le produit choisi.
- Actualiser la sauvegarde et l'affichage avec les critères actifs.

### 3. Combiner recherche filtre et tri

Compléter `appliquerCriteres()` :

- Recherche par nom pendant la saisie, sans distinction de casse.
- Ignorer les espaces au début et à la fin du texte recherché.
- Filtre : tous les produits, à acheter ou achetés.
- La recherche et le filtre doivent fonctionner ensemble.
- Trier les résultats par prix croissant ou décroissant, avec une comparaison numérique.
- Le tri ne doit pas modifier le tableau source : travailler sur une copie.
- Le choix `Ordre initial` rétablit l’ordre des produits dans le tableau source,
  en conservant la recherche et le filtre.
- Renvoyer les résultats, sans remplacer ni supprimer la liste complète.

L'affichage fourni gère déjà le message lorsque les résultats sont vides.
Effacer la recherche conserve le filtre actif. Choisir `Tous les produits`
conserve le texte recherché.

### 4. Réinitialiser les critères

Compléter `reinitialiserCriteres()` pour le bouton `Réinitialiser` :

- Vider le champ de recherche.
- Remettre le filtre sur `Tous les produits` (valeur `tous`).
- Remettre le tri sur `Ordre initial` (valeur `initial`).
- Actualiser immédiatement l'affichage de la liste complète dans son ordre source.
- Conserver les produits, leurs statuts et leur sauvegarde. Ne pas effacer localStorage.

### 5. Conserver les données

Compléter `sauvegarderProduits()` et `chargerProduits()` :

- Sauvegarder le tableau complet avec JSON dans localStorage.
- Enregistrer après l'ajout, le changement de statut et la suppression.
- Charger la sauvegarde au démarrage lorsqu'elle existe.
- Charger les exemples uniquement si aucune sauvegarde n'existe.
- Une liste volontairement vidée doit rester vide après rechargement.

Le démarrage fourni recalcule le prochain identifiant après le chargement.
La persistance des critères de recherche, de filtre et de tri n'est pas demandée.

## Vérifications

1. Rechercher `lait`, sélectionner `À acheter` et marquer un résultat comme acheté.
   Il disparaît de cette vue et apparaît dans `Achetés`, avec la même recherche.
2. Revenir au statut initial : le nom et le prix du produit restent identiques.
3. Supprimer un produit dans une vue filtrée : c'est le bon produit qui disparaît.
4. Annuler une suppression : la liste et les données restent identiques.
5. Ajouter deux produits portant le même nom : chacun garde son propre id.
6. Modifier le statut de l'un, supprimer l'autre : les actions restent indépendantes.
7. Recharger après un ajout, un changement de statut et une suppression : les données
   sont conservées. Le rechargement peut réinitialiser recherche, filtre et tri.
8. Vider la liste puis recharger : les exemples ne reviennent pas.
9. Après rechargement, ajouter un produit : son identifiant reste unique.

10. Rechercher `lait`, choisir `À acheter` puis `Prix croissant` :
    le lait à 8,50 DH précède celui à 9 DH.
11. Avec tous les produits, vérifier que 6 DH précède 18 DH en ordre croissant
    et que l’ordre décroissant est inversé.
12. Changer un statut ou supprimer un produit pendant le tri : les critères
    restent appliqués. Revenir à `Ordre initial` rétablit l’ordre source.

13. Après une recherche avec filtre et tri, cliquer sur `Réinitialiser` : les trois
    contrôles reviennent à leur état initial et tous les produits réapparaissent,
    sans annuler les achats ni les suppressions.

## Repères

| Élément | Identifiant |
| --- | --- |
| Formulaire | `formulaire-produit` |
| Nom / prix | `nom` / `prix` |
| Recherche | `recherche` |
| Filtre | `filtre-statut` |
| Tri par prix | `tri-prix` |
| Réinitialisation | `reinitialiser-criteres` |
| Liste | `liste-produits` |
| Retour utilisateur | `message` |
| Résultats / état vide | `nombre-resultats` / `etat-vide` |

Le HTML et le CSS ne sont pas à refaire. Aucun changement de nom ou de prix
par un formulaire de modification n'est demandé. Aucune recherche, aucun filtre, tri ou stockage
fonctionnel n'est encore implémentée dans le starter.

À expliquer : où les données sont modifiées, pourquoi l'id est nécessaire et
pourquoi les résultats d'une recherche ne doivent pas remplacer le tableau complet.
