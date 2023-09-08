const bcrypt = require('bcrypt');

// Middleware de hachage du mot de passe
const hashPassword = async (req, res, next) => {
  try {
    // Assurez-vous que vous avez un champ "password" dans req.body
    const password = req.body.password;

    // Générez un sel pour le hachage (plus la valeur est élevée, plus le hachage est sécurisé)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Remplacez le mot de passe en clair par le mot de passe haché dans req.body
    req.body.password = hashedPassword;

    // Passez à l'étape suivante du middleware
    next();
  } catch (error) {
    // En cas d'erreur, renvoyez une réponse d'erreur
    res.status(500).json({ error: 'Error hashing password' });
  }
};

module.exports = hashPassword;

