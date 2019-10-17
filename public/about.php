<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>About</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,600,700|Barlow+Semi+Condensed:400,700|Roboto:400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="static/about.css">
</head>
<body>
    <div id="app">   
      <?php include 'header.php' ?> 
      <div class="container">
        <div class="panel-group" id="accordion">
          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">1. Info sul progetto</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>La piattaforma Integrity Watch Italia è stata realizzata per consentire a cittadini, giornalisti e alla società civile di monitorare al meglio le fonti di finanziamento alla politica in Italia e le informazioni riguardo partecipazioni e ruoli in azienda di membri del Governo (Presidente del Consiglio, Ministri, Vice Ministri, Sottosegretari) e membri del Parlamento. Grazie ai dati che sono stati raccolti e pubblicati, la piattaforma permette ai cittadini di ricercare, classificare e filtrare tutte le informazioni in maniera intuitiva. Per questo motivo, ITA Integrity Watch contribuisce ad aumentare la trasparenza e la parità di accesso alle informazioni e a monitorare potenziali conflitti d’interessi, influenze illecite e corruzione.</p>
                <p>La tecnologia a supporto della piattaforma (<a href="http://d3js.org/">D3.js</a>) è stata realizzata dal New York Times con l’obiettivo di rendere accessibili a un pubblico più vasto i datasets di difficile fruizione.</p>
                <p>I dati sul finanziamento alla politica e sulle partecipazioni di membri del Governo e del Parlamento in aziende private, sono stati raccolti attraverso le seguenti fonti</p>
                <ul>
                  <li>Pubblicazione sui siti internet dei partiti politici dei contributi ricevuti in base alla Legge n. 3/2019 o sul sito del parlamento per quanto riguarda il finanziamento alla politica. (mettere link)</li>
                  <li>Dichiarazioni congiunte presentate dai partiti, dagli eletti, dalle liste e comitati al Parlamento in base alla legge xxx</li>
                  <li>Siti istituzionali di Camera e Senato per accedere alle informazioni su membri del Governo e membri del Parlamento (mettere link)</li>
                  <li>Registro delle Imprese per quanto riguarda i dati sulle partecipazioni e i ruoli aziendali di membri del Governo e del Parlamento.</li>
                </ul>
                <p>La maggior parte delle informazioni proviene dalle dichiarazioni pubblicate dai partiti politici sui propri siti istituzionali e dai siti di istituzionali di Camera e Senato. Ci assicuriamo di aggiornare i dati ogni sei mesi e di rendere visibile la data dell’ultimo aggiornamento. Se rilevi informazioni inesatte, incomplete o fuorvianti, segnala tali casi e forniscici il link di una fonte affidabile. Se si utilizzano i dati per scopi di ricerca, giornalistici o di altro tipo, si prega di confrontare sempre i risultati con le informazioni originali sui siti Web istituzionali di partiti e movimenti politici, Camera dei Deputati e Senato, o richiedendo le informazioni sulle dichiarazioni congiunte al servizio Tesoreria della Camera dei Deputati.</p>
                <p>La piattaforma ITA Integrity Watch è stata lanciata per la prima volta ad Ottobre 2019 da Transparency International Italia. Questo progetto è cofinanziato dalla Commissione Europea. Né le istituzioni, né gli organi dell'Unione Europea, né qualsiasi persona che agisca per loro conto può essere ritenuta responsabile per l'uso che può essere fatto delle informazioni in essa contenute.</p>
                <p>Design e sviluppo applicazione: <a href="http://www.chiaragirardelli.net">Chiara Girardelli</a><br /></p>
                <div class="about-eu-funding">
                  <img class="logo" src="./images/flag_yellow_low.jpg" />
                  <p style="font-family: Arial">This online platform was funded by the European Union’s Internal Security Fund – Police</p>
                </div>
              </div>
            </div>
          </div>
          <!-- BLOCK 2 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">2. Disclaimers</a>
              </h1>
            </div>
            <div id="collapse2" class="panel-collapse collapse in">
              <div class="panel-body">
                <h3>Finanziamento alla politica</h3>
                <p>La legge n. 3 del 2019, modificando l’articolo 5 comma 3 della legge n 13 del 2014 stabilisce che i partiti politici devono pubblicare sul loro sito internet l’elenco dei soggetti che hanno erogato finanziamenti o contributi di importo superiore ai 500 euro.</p>
                <p>La piattaforma Integrity Watch raccoglie le informazioni dalle dichiarazioni originali presenti sui siti web dei partiti per aggiornare regolarmente il proprio database. I partiti politici sono responsabili per quanto riguarda le informazioni contenute nelle dichiarazioni originali. Transparency International Italia aggiornerà il proprio database con cadenza semestrale. Dato che i partiti politici pubblicano le proprie dichiarazioni in formato Pdf o Jpeg anziché utilizzare un formato di dati aperto le nostre informazioni potrebbero non essere accurate al 100%.</p>
                <h3>Ruoli in aziende</h3>
                <p>La piattaforma Integrity Watch, grazie alla collaborazione con la fondazione Openpolis, raccoglie informazioni sulla partecipazione e i ruoli ricoperti in aziende dai membri del Governo (Presidente del Consiglio dei Ministri, Ministri, Vice Ministri e Sottosegretari) e del Parlamento (Camera dei Deputati e Senato della Repubblica) a partire dalla XVIII legislatura e relativamente alle aziende con un fatturato maggiore di 100.000 euro e un numero totale di dipendenti maggiore di 2. Le fonti originali dei dati sono i istituzionali della Camera dei Deputati, del Senato della Repubblica Italiana e dal Registro delle Imprese (link).</p>
                <p>Sebbene abbiamo adottato tutte le misure necessarie per fare in modo che i dati che pubblichiamo siano il più precisi possibile, ti consigliamo di confrontare sempre qualsiasi dato della piattaforma con i dati forniti dai siti istituzionali.</p>
              </div>
            </div>
          </div>
          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">Contact Details</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
              <p>Lorem ipsum sit dolor amet:</p>
              <p>
                <strong>Lorem Ipsum</strong><br />
                Adipiscit elur<br />
                +00 000000000<br />
                <a href="mailto:loremipsum@loremipsum.com">loremipsum@loremipsum.com</a>
              </p>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>