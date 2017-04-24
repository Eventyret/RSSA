function quotes() {
  var quotes = [
    'I\'ll be back (The Terminator)',
    'I\'ll make him an offer he can\'t refuse. (Godfather)',
    'Why so serious? (The Dark Knight)',
    'The name\'s Bond. James Bond. (Dr. No)',
    'He-e-e-e-re\'s Johnny! (The Shining)',
    'We\'re gonna need a bigger boat. (Jaws)',
    'You can\'t handle the truth! (A Few Good Men)',
    'Was it over when the German\'s bombed Pearl harbour (Animal house)',
    'To infinity - and Beyond. (Toy Story)',
    'Say hello to my little friend! (Scarface)',
    'Frankly, my dear, I don\'t give a damn! (Gone With the Wind)',
    'Here\'s looking at you, kid. (Casablanca)',
    'You talkin\' to me? (Taxi Driver)',
    'I see dead people. (The Sixth Sense)',
    'Hasta la vista, baby. (Terminator 2: Judgment Day)',
    'You want to be a big cop in a small town? F@ck off up the model village then (Hot Fuzz)',
    'My precious. (The Lord of the Rings)',
    'I love the smell of napalm in the morning. (Apocalypse Now)',
    'Did everyone see that, because I will not be doing it again? (Pirates of the Caribbean: On Strabger Tides)',
    'Life is like a box of chocolates. (Forrest Gump)',
    'I\'m the King of the World! (Titanic)',
    'Houston - we have a problem. (Apollo 13)',
    'I am your father. (The Empire Strikes Back)'
  ];
  var random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quotes").innerHTML = random;
}