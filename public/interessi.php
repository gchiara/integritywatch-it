<html lang="en">
<head>
    <?php include 'gtag.php' ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Interessi Privati | Soldi e Politica</title>
    <!-- Add twitter and og meta here -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Soldi e Politica | Interessi privati" />
    <meta property="og:description" content="Una panoramica sulle partecipazioni e i ruoli in aziende assunti da membri del Governo e del Parlamento italiano a partire dalla XVIII legislatura." />
    <meta property="og:image" content="https://www.transparency.it/soldiepolitica/images/preview.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:400,600,700|Barlow+Semi+Condensed:400,700|Roboto:400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="static/interessiPrivati.css">
    <!-- temporary fix for table arrows path -->
    <style>
      table.dataTable thead .sorting {
        background-image: url("./images/dt/sort_both.png");
      }
      table.dataTable thead .sorting_asc {
        background-image: url("./images/dt/sort_asc.png");
      }
      table.dataTable thead .sorting_desc {
        background-image: url("./images/dt/sort_desc.png");
      }
      table.dataTable thead .sorting_asc_disabled {
        background-image: url("./dt/sort_asc_disabled.png");
      }
      table.dataTable thead .sorting_desc_disabled {
        background-image: url("./dt/sort_desc_disabled.png");
      }
    </style>
</head>
<body>
    <div id="app" class="tabA">   
      <?php include 'header.php' ?>
      <div class="container-fluid dashboard-container-outer">
        <div class="row dashboard-container">
          <!-- ROW FOR INFO AND SHARE -->
          <div class="col-md-12">
            <div class="row">
              <!-- INFO -->
              <div class="col-md-8 chart-col" v-if="showInfo">
                <div class="boxed-container description-container">
                  <h1>SOLDI E POLITICA – INTERESSI PRIVATI</h1>
                  <p>Una panoramica sulle partecipazioni e i ruoli in aziende assunti da membri del Governo e del Parlamento italiano a partire dalla XVIII legislatura.</p> 
                  <p>Con un semplice click sui grafici è possibile classificare, ordinare e filtrare tutte le informazioni.</p>
                  <i class="material-icons close-btn" @click="showInfo = false">close</i>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - LEFT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container">
                <div class="subrow-title">POLITICI</div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container interessi_1">
                  <chart-header :title="charts.istituzioni.title" :info="charts.istituzioni.info" ></chart-header>
                  <div class="chart-inner" id="istituzioni_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container interessi_2">
                  <chart-header :title="charts.partiti.title" :info="charts.partiti.info" ></chart-header>
                  <div class="chart-inner" id="partiti_chart"></div>
                </div>
              </div>
              <div class="col-md-12 chart-col">
                <div class="boxed-container chart-container interessi_5">
                  <chart-header :title="charts.ruolo.title" :info="charts.ruolo.info" ></chart-header>
                  <div class="chart-inner" id="ruolo_chart"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- CHARTS - FIRST ROW - RIGHT -->
          <div class="col-md-6 chart-subrow">
            <div class="row chart-subrow-row">
              <div class="col-md-12 subrow-title-container subrow-title-container-right">
                <div class="subrow-title subrow-title-right">AZIENDE</div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container interessi_3">
                  <chart-header :title="charts.fatturato.title" :info="charts.fatturato.info" ></chart-header>
                  <div class="chart-inner" id="fatturato_chart"></div>
                </div>
              </div>
              <div class="col-md-6 chart-col">
                <div class="boxed-container chart-container interessi_4">
                  <chart-header :title="charts.settore.title" :info="charts.settore.info" ></chart-header>
                  <div class="chart-inner" id="settore_chart"></div>
                </div>
              </div>
              <div class="col-md-12 chart-col">
                <div class="boxed-container chart-container interessi_6">
                  <chart-header :title="charts.map.title" :info="charts.map.info" ></chart-header>
                  <div class="chart-inner" id="map_chart"></div>
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
                      <th class="header">Politico</th>
                      <th class="header">Partito</th>
                      <th class="header">Istituzione</th> 
                      <th class="header">Governo o legislatura</th> 
                      <th class="header">Azienda</th>
                      <th class="header">Ruolo</th>
                      <th class="header">Settore</th>
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
                <div class="">INTERESSI PRIVATI</div>
              </div>
              <button type="button" class="close" data-dismiss="modal"><i class="material-icons">close</i></button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 details-left"  v-if="selectedElement.person">
                    <div class="details-title details-title-left">POLITICO</div>
                    <div class="details-line"><span class="details-line-title">Nome:</span> {{ selectedElement.person.person_name }} {{ selectedElement.person.person_last_name }}</div>
                    <div class="details-line"><span class="details-line-title">Istituzione:</span> {{ selectedElement.person.person_institution }}</div>
                    <div class="details-line"><span class="details-line-title">Ruolo istituzionale:</span> {{ selectedElement.person.person_institutional_role }}</div>
                    <div class="details-line"><span class="details-line-title">Partito:</span> {{ selectedElement.person.person_political_party }}</div>
                    <div class="details-line"><span class="details-line-title">Numero di interessi dichiarati:</span> {{ selectedElement.person.interestsNum }}</div>
                    <!-- {{ selectedElement.person_company_share_% }} -->
                  </div>
                  <div class="col-md-6 details-right">
                    <div class="details-title details-title-right">AZIENDA</div>
                    <div class="details-line"><span class="details-line-title">Azienda:</span> {{ selectedElement.company_name }}</div>
                    <div class="details-line"><span class="details-line-title">Settore:</span> {{ selectedElement.company_transparency_sector }}</div>
                    <div class="details-line"><span class="details-line-title">Ruolo:</span> {{ selectedElement.person_company_role }} <span v-if="selectedElement.person_company_role == 'Azionista'">{{ selectedElement['person_company_share_%'] }} %</span></div>
                    <div class="details-line" v-if="selectedElement.provinceInfo"><span class="details-line-title">Regione:</span> {{ selectedElement.provinceInfo.regione }}</div>
                    <div class="details-line"><span class="details-line-title">Fatturato:</span> {{ selectedElement.company_turnover_range }}</div>
                    <div class="details-line"><span class="details-line-title">Personale:</span> {{ selectedElement.company_employees_range }}</div>
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
            <div class="count-box count-box-legislatori">
              <div class="filter-count lgnb">0</div> su <strong class="total-count">0</strong> POLITICI
            </div>
            <div class="dc-data-count count-box count-box-interessi">
              <div class="filter-count">0</div>su <strong class="total-count">0</strong> INTERESSI
            </div>
            <div class="count-box count-box-aziende">
              <div class="filter-count aznb">0</div> su <strong class="total-count">0</strong> AZIENDE
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
    <script type="text/javascript" src="vendor/js/topojson.v1.min.js"></script>
    <script src="static/interessiPrivati.js"></script>

 
</body>
</html>