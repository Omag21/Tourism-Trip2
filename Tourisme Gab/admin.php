<?php
session_start();
if(isset($_POST['connexion']))
{
    if( !empty($_POST['email']) AND !empty($_POST['password']))
    {
        $pseudo_par_defaut = "admin";
        $password_par_defaut = "admin24";

        $pseudo_saisi = htmlspecialchars($_POST['email']);
        $password_saisi = htmlspecialchars($_POST['password']);

        //verification du mot de passe
        if($pseudo_saisi == $pseudo_par_defaut AND $password_saisi == $password_par_defaut)
        {
            $_SESSION['password'] = $password_saisi;
            header('Location: admin.html');
        }
        else{
            echo "Email ou mot de  passe incorrect!";
        }
    }
    else{
        echo "Veuillez remplir tous les champs!";
    }
}
?>