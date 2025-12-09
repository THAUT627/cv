# Titre du projet : Défense Volcanique

# Concept du jeu
Le joueur doit protéger un village situé au pied d’un volcan en éruption contre des vagues de créatures de lave.
Pour y parvenir, il place des tours élémentaires le long du chemin qui mène au village.
Chaque tour attaque automatiquement les monstres à portée avec des projectiles de roche, de glace ou d’énergie magique.
À chaque vague, le volcan devient plus instable : la lave coule plus vite, les ennemis sont plus nombreux et plus puissants.

# Objectif du joueur

Résister le plus longtemps possible.
Placer et améliorer les tours de manière stratégique pour stopper la progression des monstres de lave et protéger le village.

# Mécaniques principales
## Placement de tours

Le joueur clique sur des zones de terrain pour construire des tours.
Chaque tour coûte un certain nombre de cristaux d’énergie volcanique.
Il faut choisir entre placer plusieurs tours faibles ou quelques tours puissantes.

## Vagues d’ennemis

Les créatures de magma apparaissent par vagues successives et suivent un chemin tracé:

- Les ennemis deviennent plus rapides,
- Certains laissent derrière eux des traces de feu ralentissant les tirs des tours.

## Attaques automatiques

Les tours détectent les ennemis proches et tirent automatiquement :

- Tour de roche : lente mais puissante, inflige de gros dégâts.
- Tour de glace : tir rapide, peut ralentir les ennemis de lave.
- Tour magique : A voir si je le garde ou non

## Gestion des ressources

Chaque monstre détruit rapporte des cristaux utilisables pour :
Construire de nouvelles tours et améliorer celles déjà placées.

## Défaite

Si trop de créatures atteignent le village, celui-ci s’embrase et le joueur perd la partie.

# Autres éléments

Types d’ennemis variés :
- Golem de lave (lent mais solide),
- Esprit de feu (rapide mais fragile),
- Titan de magma (boss de fin).
Système d’amélioration de tours (niveaux de puissance).

# Avancement du projet
## 18/11/25
J'ai fait un autre niveau en rapport avec la lave, j'ai réaliser les décors sur libresprite (je pars sur un niveau  pixel art, les ennemies sont à venir).
Je n'ai pas réussi à le faire fonctionner.
## 22/11/25
J'ai réussi à le faire foncitonner (affichage de la carte avec mes graphismes), il y avait un probleme de dimension non respecté et des fihciers mal nommmés.

## testProjet1
J'ai fait un autre niveau en rapport avec la lave, j'ai réaliser les décors sur libresprite (je pars sur un niveau  pixel art, les ennemies sont à venir). J'ai réussi à le faire foncitonner (affichage de la carte avec mes graphismes), il y avait un probleme de dimension non respecté et des fihciers mal nommmés.

## testProjet2
J'ai ajouté le son de fond lorsque l'on lance le jeu.

## testProjet3








## Diagramme de flux

flowchart TD

    %% --- ÉTATS PRINCIPAUX ---
    A[Accueil / Menu] --> B[Démarrer la partie]

    B --> C[Initialisation du jeu<br/>• Charger les assets<br/>• Générer les cartes<br/>• Appliquer la difficulté]

    C --> D[Affichage des cartes<br/>sur la scène]

    D --> E[Attente du joueur]

    %% --- LOGIQUE DE JEU ---
    E -->|Clique sur une carte| F[Révéler 1ʳᵉ carte]

    F --> E2[Attente du deuxième clic]

    E2 -->|Clique sur une carte| G[Révéler 2ᵉ carte]

    G --> H{Cartes identiques ?}

    %% MATCH
    H -->|Oui| I[Valider la paire<br/>• Désactiver les cartes<br/>• Ajouter au score]
    I --> J{Toutes les paires trouvées ?}

    J -->|Oui| K[Fin de partie<br/>• Calcul du temps<br/>• Enregistrer les données<br/>• Afficher écran final]

    J -->|Non| E[Continuer la partie]

    %% PAS MATCH
    H -->|Non| L[Erreur<br/>• Attendre un délai<br/>• Retourner les cartes]
    L --> E

    %% FIN
    K --> M[Aller à l'historique / Rejouer]
