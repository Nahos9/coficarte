<html>
<head>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

</head>
<body>
<h3>Bonjour {{ $user['name'] }},</h3>
<p>Vos identifiants pour l'application COFI CARTE :</p>
<ul>
    <li>Email : <strong>{{ $user['login'] }}</strong></li>
    <li>Mot de passe temporaire : <strong>{{ $user['password'] }}</strong></li>
</ul>
<p>Merci de changer votre mot de passe dès votre première connexion.</p>
    <a href="https://coficartega.cofinaonline.com/"> Clique ici pour accéder à l'application<a></p>
    <p>Cordialement</p>
</body>
</html>
