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

    %% Placement des tours
    F --> T[Ouverture du menu de construction]
    T --> U[Sélection d'une tour]
    U --> V{Assez d'argent ?}
    V -- Oui --> W[Placement de la tour]
    V -- Non --> X[Action refusée]

    %% Menu pause
    E --> Y[Pause]
    Y --> Z[Jeu et sons stoppés]
    Z --> AA[Reprendre ou recommencer]


    [![Mon diagramme de flux](https://mermaid.ink/img/pako:eNpdVF1X4jAQ_Ss5OWfXF_RYKF99cA-CIiqCouxq8CHbDphdmnbTRF17-D_L7-CPbZLSUuGJTu7cO3MnkxT7UQDYw_Nl9Oa_UCHRfW_Gkf51SG-zDqkQdAEoUOgXqGd0eHiCTklXAxcQApcogATRJAGZPGdppxnGIZNYMAl74SqZRDxBX1GoEvZH7R_XyJDGn2NdMuBMMrpkCZUs4nkpM56huhbV0zVF7F2Xg5YU-boP2LL07PkZuabcz0s2mFhjGBQ0ZxZ2vi_2MNjSnGfnDunozrn8HK2SKSta2cZqZEoXChD1pYLlcl-pb9z9qTIDXw0yKRB9i7jQDtI3bgHAOYQsV7iw5wPDEC-pvxvEFoYSJUyLIY0LzoHNuUzPLARRKYHpLI2aM46-rTLUpUahkWIWfEXGoH00fr2y3E6LuNHOGMQ16UhJ9RituoyU2DVxbRHDXFCqzbqQGZZlbkif6hKCA1p2dljWGeSkV_ZzlBq70Qk6LhhHZcZ-KZZTjI1bc8rkbhA39uA2zeYkQYSMb9ZQcN6W8y9KsVznLu2B4GzzT0A2QpuaAe_Kyf1SLE-e6Dvjy4iJXUFfvqDxp3laR8u36p6M1KseihJ2JTVQmfH4eqekUL65slv_7i3-gUw26yX42eIcKA6Wc4t5sJhp2tH7-1EMoOh_Wi73OymXZu5NiWhabvYH6WR6AuYq0YaW-xuaimOqEigvwyMZm9CW7dHGnsglKAQSJebBSGQUx5t1vgFPFtLpkDuIBfBA2xEpLehHoa7QB_GMK3ghWIA97QtUcKinS80nTg3DDMsX3csMe_pvQMXvGZ7xlc6JKX-KojBPE5FavGBvTpeJ_lJxQCX0GF0IGhZRow-iGykusVdruI5lwV6K37FXbTSPGvVm3a1V6416u13Bf7F36DaPjttureU4bqvqHrvuqoI_rKxz5LSarVa13mw69Xaj3mhVMARMRmKYvdP2uV79B1iAvNs?type=png)](https://mermaid.live/edit#pako:eNpdVF1X4jAQ_Ss5OWfXF_RYKF99cA-CIiqCouxq8CHbDphdmnbTRF17-D_L7-CPbZLSUuGJTu7cO3MnkxT7UQDYw_Nl9Oa_UCHRfW_Gkf51SG-zDqkQdAEoUOgXqGd0eHiCTklXAxcQApcogATRJAGZPGdppxnGIZNYMAl74SqZRDxBX1GoEvZH7R_XyJDGn2NdMuBMMrpkCZUs4nkpM56huhbV0zVF7F2Xg5YU-boP2LL07PkZuabcz0s2mFhjGBQ0ZxZ2vi_2MNjSnGfnDunozrn8HK2SKSta2cZqZEoXChD1pYLlcl-pb9z9qTIDXw0yKRB9i7jQDtI3bgHAOYQsV7iw5wPDEC-pvxvEFoYSJUyLIY0LzoHNuUzPLARRKYHpLI2aM46-rTLUpUahkWIWfEXGoH00fr2y3E6LuNHOGMQ16UhJ9RituoyU2DVxbRHDXFCqzbqQGZZlbkif6hKCA1p2dljWGeSkV_ZzlBq70Qk6LhhHZcZ-KZZTjI1bc8rkbhA39uA2zeYkQYSMb9ZQcN6W8y9KsVznLu2B4GzzT0A2QpuaAe_Kyf1SLE-e6Dvjy4iJXUFfvqDxp3laR8u36p6M1KseihJ2JTVQmfH4eqekUL65slv_7i3-gUw26yX42eIcKA6Wc4t5sJhp2tH7-1EMoOh_Wi73OymXZu5NiWhabvYH6WR6AuYq0YaW-xuaimOqEigvwyMZm9CW7dHGnsglKAQSJebBSGQUx5t1vgFPFtLpkDuIBfBA2xEpLehHoa7QB_GMK3ghWIA97QtUcKinS80nTg3DDMsX3csMe_pvQMXvGZ7xlc6JKX-KojBPE5FavGBvTpeJ_lJxQCX0GF0IGhZRow-iGykusVdruI5lwV6K37FXbTSPGvVm3a1V6416u13Bf7F36DaPjttureU4bqvqHrvuqoI_rKxz5LSarVa13mw69Xaj3mhVMARMRmKYvdP2uV79B1iAvNs)

