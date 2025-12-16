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

# Fonctionnement général

flowchart TD
    A[Démarrage du jeu] --> B[Chargement des assets]
    B --> B1[Sprites]
    B --> B2[Sons & musiques]
    B --> B3[Maps]
    B --> C[Initialisation du jeu]

    C --> D[Choix de la carte]
    D --> E[Lancement de la partie]

    E --> F[Initialisation UI]
    F --> F1[Argent]
    F --> F2[Vies]
    F --> F3[Vague actuelle]

    E --> G[Début des vagues]

    G --> H[Spawn des ennemis]
    H --> I[Déplacement des ennemis sur la map]

    I --> J{Ennemi atteint la fin ?}
    J -- Oui --> K[Perte de vie]
    J -- Non --> L[Attaque des tours]

    L --> M{Ennemi tué ?}
    M -- Oui --> N[Gain d'argent]
    M -- Non --> I

    K --> O{Vies > 0 ?}
    O -- Oui --> G
    O -- Non --> P[Défaite]

    N --> Q{Vague terminée ?}
    Q -- Non --> H
    Q -- Oui --> R{Dernière vague ?}

    R -- Non --> G
    R -- Oui --> S[Victoire]

    F --> T[Ouverture du menu de construction]
    T --> U[Sélection d'une tour]
    U --> V{Assez d'argent ?}
    V -- Oui --> W[Placement de la tour]
    V -- Non --> X[Action refusée]

    E --> Y[Pause]
    Y --> Z[Jeu et sons stoppés]
    Z --> AA[Reprendre ou recommencer]

(https://mermaid.live/edit#pako:eNpdVN1a4jAQfZV8uVhv0I9C-bEX7oeiiCuCouxq8CLbDpjdNu2mibr2432W5-DFNklpqXBFJ2fOmTkzSYb9OADs4UUYv_kvVEh0359zpH890t-sIyoEXQIKFPoF6hkdHp6gU3KmgUuIgEsUQIpomoJMn_O00xzjkGkimIS9cINMY56iLyhSKfuj9o-bZESTz7EzMuRMMhqylEoW86KUOc9RZxbV1zXF7F2Xg0KKfN0HbFn69vycXFPuFyUbTKIxDEqacwu72Bd7GG5pLvJzh_R051x-jjbIjJWtbGNNMqNLBYj6UkEY7isNjLs_VW7gq0GmJWJgEZfaQfrGLQA4h4gVCpf2fGgYkpD6u0FsYShVwrQY0aTkHNqcq-zcQhCVEpjO0qgF4-jrKkddaRQaK2bB38gEtI_Gr1dW2GkRN9oZg7gmPSmpHqNVl7ESuyauLWJUCEq1WZcyo6rMDRlQXUJwQKvOjqo6w4L0m_0cZ8ZudILqJeO4yjioxAqKiXFrQZncDeLGHtxm-ZwkiIjxzRpKzttq_mUlVujcZX0QnG3-CchHaFNz4F01eVCJFclTvTO-jJnYFZRvzj0Zq1dtvBL22unhKjMCX98bKZRv1nLr0b3FP5DpZh2Cn1-OA8XBTmKLebCYWdbTd_SjNLnscVYt6TuZVNbJ7EaFaFZt6Afp5XoCFirVpu1t9yOZUJUWO_NoY0_kChQCiVLzAqQyTpLNuljpJwvp9cgdJAJ4oHuPlWb340iX44N4xjW8FCzAnjYBajjS46LmE2eGYY7liy58jj39N6Di9xzP-UrnJJQ_xXFUpIlYLV-wt6Bhqr9UElAJfUaXgkZl1OiDOIsVl9hrdjpty4K9DL9jr9HuHLVbnZbbbLTarePjGv6LvUO3c1Q_dptdx3G7Dbfuuqsa_rCyzpHT7XS7jZbbaDt1p91t1TAETMZilD-89v1d_Qerw65C)
