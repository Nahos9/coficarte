<html>
<head>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

</head>
<body>
    <h3>IDENTIFIANT DE CONNEXION COFI CARTE</h3>
    <p>Bonjour  {{$user['name']}}</p>
    <p>Merci de recevoir les identifiants de connexion a l'application ARRETES DE CAISSE <br />
    <p>IDENTIFIANT : {{$user['email']}}</p>
    <p>PASSWORD : {{$user['password']}}</p> <br />
    <a href="https://coficartega.cofinaonline.com/"> Clique ici pour accéder à l'application<a></p>
    <p>Cordialement</p>
</body>
</html>
