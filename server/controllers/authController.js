const db = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // Configuration SMTP pour l'envoi d'e-mails
  service: "gmail",
  auth: {
    user: "mbulalwanga81@gmail.com",
    pass: "kqfw yuym nyug woym",
  },
});

const singup = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    const existinUser = await db.Users.findOne({ where: { email } });

    if (existinUser) {
      return res.status(406).json({ message: "cette email est déjà utilisé" });
    }

    const confirmationEmail = {
      from: "mbulalwanga81@gmail.com",
      to: email,
      subject: "Confirmation d'inscription",
      text: `Merci de vous être inscrit, ${firstName} ${lastName}! Veuillez cliquer sur le lien suivant pour confirmer votre compte : http://localhost:5000/login`,
    };

    await transporter.sendMail(confirmationEmail);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = db.Users.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "inscription réussie",
      User: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Une erreur s'est produite lors de l'inscription :", error);
    return res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de l'inscription." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    } 
    const emaill = user.email;
    return res.status(200).json({ emaill });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la connexion :", error);
    return res
      .status(500)
      .json({ message: "Une erreur s'est produite lors de la connexion." });
  }
};

const miningsignup = async (req, res) => {
  try {
    const { logo, nom, description } = req.body;

    const existinEntreprise = await db.Entreprises.findOne({ where: { nom } });

    if (existinEntreprise) {
      return res.status(406).json({ message: "Cette entreprise existe déjà" });
    }

    const newMing = db.Entreprises.create({
      logo,
      nom,
      description,
    });

    return res.status(201).json({
      message: "Inscription Mining réussie",
      User: {
        firstName: newMing.logo,
        lastName: newMing.nom,
        phone: newMing.description,
      },
    });
  } catch {}
};

module.exports = { singup, login, miningsignup };
