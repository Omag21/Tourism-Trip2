const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const compteRoutes = require('./compte');
const appRoutes = require('./app');
const volRoutes = require('./VolRoutes.js');
const volUtilisateurRoutes = require('./Vol_utilisateur');
const siteRoutes = require('./site');
const mailRoutes = require('./mail');
const UserRoutes = require('./User');
const PassagersDesistantsRoutes = require('./PassagersDesistants');
const NbrPassagersRoutes = require('./NbrPassagers');
const profileImageRoutes = require("./profileImage");




const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); 
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

//app.set('view engine', 'ejs');

//app.use("/uploads", express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
app.use('/compte', compteRoutes);
app.use('/', appRoutes);
app.use('/vols', volRoutes);
app.use('/vol_utilisateur', volUtilisateurRoutes);
app.use('/api', siteRoutes); 
app.use('/mail', mailRoutes);
app.use('/User', UserRoutes);
app.use('/PassagersDesistants', PassagersDesistantsRoutes);
app.use('/NbrPassagers', NbrPassagersRoutes);
app.use('/profileImage',profileImageRoutes);


app.use("/uploads", express.static("public/uploads"));
app.set('views', './views');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});
