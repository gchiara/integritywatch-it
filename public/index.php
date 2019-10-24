<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Finanziamenti Politici | Soldi e Politica</title>
    <!-- Add twitter and og meta here -->
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,600,700|Barlow+Semi+Condensed:400,700|Roboto:400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="static/donazioni.css">
</head>
<body>
    <div id="app" class="tabB">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>SOLDI E POLITICA – FINANZIAMENTI POLITICI</h1>
                  <p>Una panoramica unica sui contributi ricevuti dai partiti e movimenti politici nazionali e dai membri del Parlamento e del Governo. </p> 
                  <p>Con un semplice click sui grafici, è possibile classificare, ordinare e filtrare tutte le informazioni.</p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - LEFT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container">
                <div class="subrow-title">DESTINATARI</div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container donazioni_1">
                  <chart-header :title="charts.tipoRicevente.title" :info="charts.tipoRicevente.info" ></chart-header>
                  <div class="chart-inner" id="tiporicevente_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container donazioni_2">
                  <chart-header :title="charts.importoAnnuo.title" :info="charts.importoAnnuo.info" ></chart-header>
                  <div class="chart-inner" id="importoannuo_chart"></div>
                </div>
              </div>
              <div class="col-md-12 chart-col">
                <div class="boxed-container chart-container donazioni_5">
                  <chart-header :title="charts.affiliazione.title" :info="charts.affiliazione.info" ></chart-header>
                  <div class="chart-inner" id="affiliazione_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - RIGHT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container subrow-title-container-right">
                <div class="subrow-title subrow-title-right">DONATORI</div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container donazioni_3">
                  <chart-header :title="charts.topDonatori.title" :info="charts.topDonatori.info" ></chart-header>
                  <div class="chart-inner" id="topdonatori_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container donazioni_4">
                  <chart-header :title="charts.tipoDonatore.title" :info="charts.tipoDonatore.info" ></chart-header>
                  <div class="chart-inner" id="tipodonatore_chart"></div>
                </div>
              </div>
              <div class="col-md-12 chart-col">
                <div class="boxed-container chart-container donazioni_6">
                  <chart-header :title="charts.importo.title" :info="charts.importo.info" ></chart-header>
                  <div class="chart-inner" id="importo_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- TABLE -->
          <div class="col-12 chart-col">
            <div class="boxed-container chart-container chart-container-table">
              <chart-header :title="charts.mainTable.title" :info="charts.mainTable.info" ></chart-header>
              <div class="chart-inner chart-table">
                <table class="table table-hover dc-data-table" id="dc-data-table">
                  <thead>
                    <tr class="header">
                      <th class="header">Nr</th> 
                      <th class="header">Ricevente</th>
                      <th class="header">Affiliazione politica</th>
                      <th class="header">Tipo di ricevente</th> 
                      <th class="header">Donatore</th> 
                      <th class="header">Tipo di donatore</th>
                      <th class="header">Anno</th>
                      <th class="header">Importo</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DETAILS MODAL -->
      <div class="modal" id="detailsModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-title">
                <div class="">Anno: {{ selectedElement.donation_year }}</div>
                <div class="">Importo: {{ selectedElement.donation_amount }}</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 details-left">
                    <div class="details-title details-title-left">RICEVENTE</div>
                    <div class="details-line"><span class="details-line-title">Nome:</span> {{ selectedElement.recipient_name }} {{ selectedElement.recipient_last_name }}</div>
                    <div class="details-line"><span class="details-line-title">Tipologia:</span> {{ selectedElement.recipient_type }}</div>
                    <div class="details-line"><span class="details-line-title">Affiliazione politica:</span> {{ selectedElement.recipient_party }}</div>
                    <div class="details-line" v-if="selectedElement.recipientInfo"><span class="details-line-title">Istituzione:</span> {{ selectedElement.recipientInfo.person_institution }}</div>
                    <div class="details-line" v-if="selectedElement.recipientInfo"><span class="details-line-title">Ruolo istituzionale:</span> {{ selectedElement.recipientInfo.person_institutional_role }}</div>
                    <div class="details-line"><span class="details-line-title">Importo totale delle donazioni:</span> {{ amtToString(totalDonations.riceventi[selectedElement.recipientNameCode]) }} </div>
                    <!-- {{ selectedElement.person_company_share_% }} -->
                  </div>
                  <div class="col-md-6 details-right">
                    <div class="details-title details-title-right">DONATORE</div>
                    <div class="details-line"><span class="details-line-title">Donatore:</span> {{ selectedElement.donor_name_01 }} {{ selectedElement.donor_last_name_01 }}</div>
                    <div class="details-line"><span class="details-line-title">Tipologia:</span> {{ selectedElement.donor_type }}</div>
                    <div class="details-line"><span class="details-line-title">Importo:</span> {{ selectedElement.donation_amount }}</div>
                    <div class="details-line"><span class="details-line-title">Anno:</span> {{ selectedElement.donation_year }}</div>
                    <div class="details-line"><span class="details-line-title">Importo totale delle donazioni:</span> {{ amtToString(totalDonations.donatori[selectedElement.donorNameCode]) }} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="container-fluid footer-bar">
        <div class="row">
          <div class="footer-col col-12 col-sm-12 footer-counts">
            <div class="count-box count-box-recipients">
              <div class="filter-count lgnb">0</div> su <strong class="total-count">0</strong> RICEVENTI
            </div>
            <div class="dc-data-count count-box count-box-donazioni">
              <div class="filter-count">0</div>su <strong class="total-count">0</strong> DONAZIONI
            </div>
            <div class="count-box count-box-donors">
              <div class="filter-count aznb">0</div> su <strong class="total-count">0</strong> DONATORI
            </div>
            <div class="count-box count-box-amount count-box-importo">
              <div class="filter-count amountnb">0</div> su <strong class="total-count">0</strong> IMPORTO
            </div>
            <div class="footer-input">
              <input type="text" id="search-input" placeholder="Filtra">
              <i class="material-icons">search</i>
            </div>
          </div>
        </div>
        <!-- Reset filters -->
        <button class="reset-btn"><i class="material-icons">settings_backup_restore</i><span class="reset-btn-text"></span></button>
        <div class="footer-buttons-right">
          <!-- <button><i class="material-icons">cloud_download</i></button> -->
          <button class="btn-twitter" @click="share('twitter')"><img src="./images/twitter.png" /></button>
          <button class="btn-fb" @click="share('facebook')"><img src="./images/facebook.png" /></button>
          <button class="btn-linkedin" @click="share('linkedin')"><img src="./images/linkedin.png" /></button>
        </div>
      </div>
      <!-- Loader -->
      <loader v-if="loader" :text="'Caricamento ...'" />
    </div>

    <script type="text/javascript" src="vendor/js/d3.v5.min.js"></script>
    <script type="text/javascript" src="vendor/js/d3.layout.cloud.js"></script>
    <script type="text/javascript" src="vendor/js/crossfilter.min.js"></script>
    <script type="text/javascript" src="vendor/js/dc.js"></script>
    <script type="text/javascript" src="vendor/js/dc.cloud.js"></script>
    <script src="static/donazioni.js"></script>

 
</body>
</html>