/**
 * Évite l’écran noir quand la traduction automatique du navigateur (Google Traduction dans Chrome) modifie la page :
 * elle remplace les textes par des <font>, puis React ne retrouve plus les nœuds qu’il veut retirer ou déplacer
 * (« removeChild… not a child of this node ») et toute l’app disparaît. On ignore ces opérations devenues impossibles.
 * Contournement connu (facebook/react#11538), à importer avant le premier rendu.
 */
if (typeof Node === "function" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

export {};
