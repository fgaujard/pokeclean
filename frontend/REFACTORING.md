# Restructuration du code en composants atomiques

## ✅ Composants créés

### Atoms (composants de base réutilisables)

1. **ProfilePicture** (`/components/atoms/ProfilePicture.tsx`)

   - Affiche la photo de profil (sprite Pokémon) avec ombre
   - Props: `sprite`, `alt`, `size` ("small" | "large")
   - Styles: `/components/atoms/ProfilePicture.scss`

2. **StartButton** (`/components/atoms/StartButton.tsx`)
   - Bouton "COMMENCER" avec style GameBoy
   - Props: `onClick`, `children`
   - Styles: `/components/atoms/StartButton.scss`

### Molecules (composants composés)

3. **PlayerCard** (`/components/molecules/PlayerCard.tsx`)

   - Carte joueur en format paysage (état compact)
   - Utilise: `ProfilePicture`
   - Props: `name`, `aka`, `sprite`, `onClick`, `animationDelay`
   - Styles: `/components/molecules/PlayerCard.scss`

4. **Modal** (`/components/molecules/Modal.tsx`) ⭐ **GÉNÉRIQUE & RÉUTILISABLE**
   - Modal réutilisable avec overlay et animation
   - Props: `isOpen`, `onClose`, `children`
   - Peut contenir n'importe quel contenu via `children`
   - Styles: `/components/molecules/Modal.scss`
   - **Exemple d'utilisation:**
     ```tsx
     <Modal isOpen={isOpen} onClose={handleClose}>
       <YourCustomContent />
     </Modal>
     ```

### Templates (templates de contenu)

5. **PlayerModalContent** (`/components/templates/PlayerModalContent.tsx`)
   - Contenu de la modal (header, bio, bouton)
   - Utilise: `ProfilePicture`, `StartButton`
   - Props: `name`, `aka`, `sprite`, `bio`, `onClose`, `onStartGame`
   - Styles: `/components/templates/PlayerModalContent.scss`

## 📝 Page Home mise à jour

Le fichier `Home.tsx` a été simplifié:

- Import des composants `PlayerCard`, `Modal` (générique), et `PlayerModalContent`
- Suppression du code dupliqué
- Utilisation de la **Modal générique** avec `PlayerModalContent` comme enfant
- Pattern de composition : `<Modal><PlayerModalContent /></Modal>`

## ⚠️ À faire manuellement

Le fichier `Home.scss` contient encore beaucoup de styles dupliqués qui devraient être supprimés car ils sont maintenant dans les composants. Vous pouvez:

1. Garder seulement les styles spécifiques à la page Home:

   - `.home-container`
   - `.stars`, `.star`
   - `.logo`, `.logo-text`, `.subtitle`
   - `.players-container`
   - `.press-start`
   - `.pokeball`
   - Media queries pour ces éléments uniquement

2. Supprimer tous les styles de composants (maintenant externalisés):
   - `.player-card` et ses variantes
   - `.overlay`
   - `.player-sprite`, `.sprite-shadow`
   - `.expanded-*`
   - `.close-button`
   - `.start-game-button`
   - `.player-bio`
   - etc.

## 🎯 Avantages de cette structure

- ✅ **Modal générique réutilisable** - Peut être utilisée partout dans l'app avec n'importe quel contenu
- ✅ **Pattern de composition** - Flexibilité maximale via `children`
- ✅ Composants réutilisables
- ✅ Code mieux organisé (Atomic Design)
- ✅ Styles encapsulés par composant
- ✅ Maintenance facilitée
- ✅ Testabilité améliorée

## 💡 Exemples d'utilisation de la Modal générique

```tsx
// Avec PlayerModalContent
<Modal isOpen={isOpen} onClose={handleClose}>
  <PlayerModalContent name="..." aka="..." ... />
</Modal>

// Avec n'importe quel contenu personnalisé
<Modal isOpen={isDeleteModalOpen} onClose={handleCloseDelete}>
  <div>
    <h2>Confirmer la suppression ?</h2>
    <button onClick={confirmDelete}>Oui</button>
  </div>
</Modal>
```
