#!/bin/bash
# Double-clique sur ce fichier dans le Finder pour lancer LearnLang
# ET le rendre accessible depuis internet (pas juste le wifi maison),
# gratuitement, via un tunnel Cloudflare.

cd "$(dirname "$0")"

echo "🌐 LearnLang — démarrage"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js introuvable. Installe-le depuis https://nodejs.org puis réessaie."
  read -p "Appuie sur Entrée pour fermer..."
  exit 1
fi

echo "→ Démarrage du serveur local..."
node server.js &
SERVER_PID=$!

cleanup() {
  echo ""
  echo "→ Arrêt du serveur..."
  kill "$SERVER_PID" 2>/dev/null
}
trap cleanup EXIT

sleep 2

echo ""
echo "→ Ouverture du tunnel public (Cloudflare, gratuit)..."
echo "   Cherche la ligne qui contient une adresse en https://xxxxx.trycloudflare.com"
echo "   C'est CETTE adresse qu'il faut partager pour se connecter depuis internet."
echo "   (Elle change à chaque lancement — pense à la renvoyer si tu relances.)"
echo ""
echo "   Pour tout arrêter : ferme cette fenêtre ou fais Ctrl+C."
echo ""

./bin/cloudflared tunnel --url http://localhost:4321
