# my-eth-wallet-app
**Instructions pour installer et lancer l'application localement :**

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/votre-utilisateur/my-eth-wallet-app.git
   cd my-eth-wallet-app
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   npm install react react-dom next ethers
   npm install @ethersproject/providers@latest
   ```

3. **Configurer MetaMask :**
   - Assurez-vous que MetaMask est installé dans votre navigateur.
   - Connectez-vous à MetaMask et assurez-vous d'avoir des ETH (Ethereum) pour effectuer des transactions.

4. **Lancer l'application :**
   ```bash
   npm run dev
   ```
   L'application sera accessible à l'adresse http://localhost:3000 dans votre navigateur.

5. **Utilisation :**
   - Connectez votre portefeuille MetaMask en cliquant sur le bouton "Se connecter au portefeuille".
   - Entrez l'adresse d'un contrat ERC-20 dans le champ dédié et cliquez sur "Obtenir les informations du token".
   - Remplissez les champs pour le transfert de tokens et cliquez sur "Transférer".

---

**Choix Techniques et Compromis :**

1. **Next.js :** J'ai choisi Next.js pour la facilité de mise en place d'une application React avec le routage intégré et le support du rendu côté serveur.

2. **ethers.js et MetaMask :** J'ai utilisé ethers.js pour interagir avec Ethereum. MetaMask est utilisé pour la gestion des comptes et la signature des transactions. Wagmi m'a causé des bugs !!

3. **Web3Provider :** Initialement, j'ai utilisé `ethers.providers.Web3Provider` pour accéder à MetaMask. Cependant, il semble y avoir des problèmes de compatibilité. J'ai ensuite changé vers `@metamask/providers` en tant que solution alternative.

4. **Gestion des Erreurs :** J'ai inclus une gestion des erreurs pour informer l'utilisateur en cas d'échec de connexion au portefeuille, d'erreur de récupération d'informations du token, ou d'échec de transfert de tokens.

5. **Pas de Style Élaboré :** Étant donné que l'accent était mis sur la fonctionnalité, le style de l'application est minimaliste. Pour une application de production, davantage d'efforts seraient nécessaires pour améliorer l'expérience utilisateur.

**Choses non traitées par manque de temps :**

1. **Tests Unitaires et Tests d'Intégration :** Pour garantir une qualité de code élevée, l'ajout de tests aurait été bénéfique mais n'a pas été inclus en raison de contraintes de temps.

2. **Sécurité :** Bien que j'aie mentionné la nécessité de la sécurité, des audits de sécurité approfondis, la gestion des autorisations, et d'autres aspects auraient dû être pris en compte pour une application de production.

3. **Meilleure Gestion des Erreurs :** En production, des erreurs plus détaillées et conviviales devraient être fournies à l'utilisateur, tout en enregistrant des journaux appropriés côté serveur.

4. **Interface Utilisateur Améliorée :** Une interface utilisateur plus soignée et réactive aurait été implémentée avec plus de temps. Des messages d'état plus visuels pour les transactions auraient été ajoutés.

5. **Optimisation des Performances :** Des améliorations de la performance, telles que le chargement asynchrone des bibliothèques, auraient été effectuées pour une application en production.

Ces points représentent des opportunités d'amélioration et ne compromettent pas la fonctionnalité de base de l'application.
