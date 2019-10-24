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
              <p>La piattaforma Soldi e Politica è stata realizzata per consentire a cittadini, giornalisti e società civile di monitorare al meglio le fonti di finanziamento alla politica in Italia e le informazioni sulle partecipazioni e sui ruoli in azienda dei membri del Governo (Presidente del Consiglio, Ministri, Vice Ministri, Sottosegretari) e del Parlamento. Grazie ai dati che abbiamo raccolto e pubblicato, la piattaforma permette di ricercare, classificare e filtrare tutte le informazioni in maniera intuitiva. Per questo motivo, Soldi e Politica contribuisce ad aumentare la trasparenza e migliora l’accesso alle informazioni, permettendo a tutti di monitorare potenziali conflitti d’interesse, influenze illecite e corruzione.</p>
              <p>I dati sul finanziamento alla politica li abbiamo raccolti grazie alle seguenti fonti pubbliche:</p>
              <ul>
                <li><strong>siti internet di partiti e movimenti politici nazionali</strong> e sul sito del <a href="http://parlamento18.camera.it/199" target="_blank">Parlamento</a> dove sono pubblicati l’elenco dei soggetti che hanno erogato finanziamenti o contributi di importo superiore, nell'anno, a euro 500;</li>
                <li><strong>dichiarazioni congiunte</strong> presentate dai partiti e dagli eletti al Parlamento per quanto riguarda i contributi erogati prima del 31 gennaio 2019 e che riportano l’elenco dei soggetti che hanno erogato finanziamenti o contributi di importo superiore, nell'anno, a euro 5.000 in favore dei partiti politici iscritti nel registro nazionale.</li>
              </ul>
              <p>I dati sui ruoli istituzionali e sugli interessi di parlamentari e membri del Governo nelle aziende sono stati raccolti grazie alla collaborazione con la fondazione Openpolis. Le fonti di riferimento sono state le seguenti:</p>
              <ul>
                <li><strong>Siti istituzionali di Camera e Senato</strong>: <a href="http://dati.camera.it/it/" target="_blank">dati.camera.it</a> e <a href="http://dati.senato.it/sito/home" target="_blank">dati.senato.it</a>. I dati si riferiscono ai parlamentari della XVIII Legislatura e ai membri dei Governi Conte I e II;</li>
                <li><strong>Registro Imprese.</strong></li>
              </ul>
              <p>I dati sono disponibili con licenza <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">Creative Commons NC BY 4.0</a>.</p>
              <p>La maggior parte delle informazioni proviene dalle dichiarazioni pubblicate dai partiti politici sui propri siti istituzionali e dai siti di Camera e Senato. Ci assicuriamo di aggiornare i dati ogni sei mesi. Se rilevi informazioni inesatte, incomplete o fuorvianti, segnalacelo e forniscici il link di una fonte affidabile. Se si utilizzano i dati per scopi di ricerca, giornalistici o di altro tipo, si prega di confrontare sempre i risultati con le informazioni originali sui siti istituzionali di partiti e movimenti politici, Camera dei Deputati e Senato, o richiedendo le informazioni sulle dichiarazioni congiunte al servizio Tesoreria della Camera dei Deputati.</p>
              <p>La piattaforma <i>Soldi e Politica</i> è stata lanciata per la prima volta ad Ottobre 2019 da Transparency International Italia. Questo progetto è cofinanziato dalla Commissione Europea. Né le istituzioni, né gli organi dell'Unione Europea, né qualsiasi persona che agisca per loro conto può essere ritenuta responsabile per l'uso che può essere fatto delle informazioni in essa contenute.</p>
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
                <h3>Finanziamenti politici</h3>
                <p>I partiti e movimenti politici sono tenuti a comunicare al Parlamento e a pubblicare sui propri siti l’elenco dei soggetti che hanno erogato finanziamenti o contributi di importo superiore, nell'anno, a euro 500 ai sensi dell'articolo 5, comma 3, del decreto-legge 149/2013, convertito, con modificazioni, dalla legge 13/2014 e successive modificazioni. </p>
                <p>Per quanto riguarda i contributi erogati prima del 31 gennaio 2019 (data di entrata in vigore delle modificazioni introdotte dall'articolo 1, comma 17, della legge 3/2019), abbiamo fatto riferimento ai dati riportati dalle dichiarazioni congiunte che riportano l’elenco dei soggetti che hanno erogato finanziamenti o contributi di importo superiore, nell'anno, a euro 5.000 in favore dei partiti politici iscritti nel registro nazionale, limitatamente a coloro i quali abbiano prestato in forma scritta il proprio consenso alla pubblicazione ai sensi dell’articolo 4 della legge 659/1981.</p>
                <p>La piattaforma <i>Soldi e Politica</i> raccoglie le informazioni dalle dichiarazioni originali presenti sui siti dei partiti e del Parlamento e dai documenti pubblici rilasciati su richiesta dal Servizio Tesoreria della Camera dei Deputati allo scopo di aggiornare regolarmente il proprio database. I partiti politici e le istituzioni citate sono responsabili per quanto riguarda le informazioni contenute nelle dichiarazioni originali. Transparency International Italia aggiornerà il proprio database con cadenza semestrale. Dato che le informazioni sono disponibili in formato .pdf o .jpeg anziché utilizzare un formato di dati aperto, le nostre informazioni potrebbero non essere accurate al 100%.</p>
                <h3>Interessi in aziende</h3>
                <p>La piattaforma Soldi e Politica, grazie alla collaborazione con la fondazione <a href="https://www.openpolis.it/" target="_blank">Openpolis</a>, raccoglie informazioni sulle partecipazioni e i ruoli ricoperti in aziende dai membri del Governo (Presidente del Consiglio, Ministri, Vice Ministri e Sottosegretari) e del Parlamento (Camera dei Deputati e Senato della Repubblica) a partire dalla XVIII legislatura e relativamente alle aziende con un fatturato maggiore di 100.000 euro e un numero totale di dipendenti maggiore di 2. Le fonti originali dei dati sono i siti istituzionali della Camera dei Deputati, del Senato della Repubblica Italiana (<a href="http://dati.camera.it/it/" target="_blank">dati.camera.it</a> e <a href="http://dati.senato.it/sito/home" target="_blank">dati.senato.it</a>) e il Registro delle Imprese.</p>
                <p>I dati sono disponibili con licenza <a href="" target="_blank">Creative Commons NC BY 4.0</a>.</p>
                <p>Sebbene abbiamo adottato tutte le misure necessarie per fare in modo che i dati che pubblichiamo siano il più precisi possibile, ti consigliamo di confrontare sempre qualsiasi dato della piattaforma con i dati forniti dai siti istituzionali.</p>
              </div>
            </div>
          </div>
          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">Contatti</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
              <p><a href="mailto:info@transparency.it">info@transparency.it</a></p>
              <p>
                <strong>Ufficio stampa:</strong><br />
                <a href="mailto:media@transparency.it">media@transparency.it</a>
              </p>
              <p><a href="www.transparency.it">www.transparency.it</a></p>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>