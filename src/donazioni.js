import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
require( 'datatables.net' )( window, $ )
require( 'datatables.net-dt' )( window, $ )

import underscore from 'underscore';
window.underscore = underscore;
window._ = underscore;

import '../public/vendor/js/popper.min.js'
import '../public/vendor/js/bootstrap.min.js'
import { csv } from 'd3-request'
import { json } from 'd3-request'

import '../public/vendor/css/bootstrap.min.css'
import '../public/vendor/css/dc.css'
import '/scss/main.scss';

import Vue from 'vue';
import Loader from './components/Loader.vue';
import ChartHeader from './components/ChartHeader.vue';


// Data object - is also used by Vue

var vuedata = {
  page: 'tabC',
  loader: true,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  travelFilter: 'all',
  charts: {
    tipoRicevente: {
      id: 'tipoRicevente',
      title: 'Chi sono i destinatari?',
      info: 'Ogni fetta del grafico a torta rappresenta la categoria a cui appartiene il soggettto che ha ricevuto il finanziamento da privati. Cliccando su ogni singola categoria, visualizzerai attraverso gli altri grafici informazioni dettagliate sui soggetti appartenenti a quella specifica categoria di destinatari.'
    },
    importoAnnuo: {
      id: 'importoAnnuo',
      title: 'Soldi ricevuti',
      info: 'Totale in euro dei contributi ricevuti per ogni singolo anno, a partire da gennaio 2018.'
    },
    topDonatori: {
      id: 'topDonatori',
      title: 'Top 10',
      info: 'I soggetti che hanno contribuito in misura maggiore a finanziare la politica. I colori diversi rispecchiano la categoria di appartenenza del donatore (es. società, persona, associazione, etc.).'
    },
    tipoDonatore: {
      id: 'tipoDonatore',
      title: 'Chi finanzia la politica?',
      info: 'Ogni fetta del grafico a torta rappresenta una tipologia specifica di donatore. Cliccando su una singola categoria, attraverso gli altri grafici potrai visualizzare informazioni più precise sui donatori appartenenti alla tipologia selezionata.'
    },
    affiliazioneAmt: {
      id: 'affiliazioneAmt',
      title: 'Totale delle donazioni per affiliazione politica',
      info: 'Ogni barra rappresenta la somma del valore delle donazioni riconducibili al singolo partito o movimento politico, ovvero quelli che hanno ricevuto direttamente o che hanno ricevuto i loro membri. Cliccando su una singola barra, potrai visualizzare nella tabella in basso i nomi di tutti i donatori.'
    },
    importo: {
      id: 'importo',
      title: 'Numero di donazioni per importo della donazione',
      info: 'Ogni barra rappresenta il numero totale di donazioni ricevuto per un dato intervallo di importo. Facendo click su una barra visualizzerai i nomi di tutti coloro che hanno fatto donazioni il cui ammontare è incluso in quel determinato range.'
    },
    mainTable: {
      id: 'mainTable',
      chart: null,
      type: 'table',
      title: 'DONAZIONI',
      info: 'Nella tabella è riportato l’elenco delle singole donazioni e un riepilogo delle infromazioni aggiuntive su destinatari e donatori. Cliccando sul titolo di ogni colonna potrai ordinare l’elenco secondo il tuo interesse.'
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
  totalDonations: {
    donatori: {},
    riceventi: {}
  },
  colors: {
    ecPolicy: {			
      "Directors-General": "#395a75",
      "Commissioners": "#4081ae",
      "Cabinet Members": "#3b95d0"
    },
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    ricevente: {
      "party": "#00a7e1",
      "person": "#0e8fc0",
      "committee": "#0d769c",
      "association": "#065a77",
      "parliament group": "#014962",
      "party list": "#013952",
      "Partito o movimento politico": "#00a7e1",
      "Parlamentare o membro del Governo": "#0d769c",
      "Gruppo parlamentare": "#014962",
      "Associazione, fondazione o comitato": "#20b7f1"
    },
    donatori: {
      "Parlamentare o membro del Governo": "#29e3d5",
      "Persona": "#19d3c5",
      "Società o professionista": "#16baad",
      "Associazione o fondazione": "#13a195",
      "Partito o movimento politico": "#039185",
      "Partito o movimento politico locale": "#90ece4",
      "Gruppo parlamentare": "#44dfd2",
      "Associazione, fondazione o comitato": "#038175",
      "Ente pubblico": "#037165",
      "Lista di partito": "#036155"
    },
    //"#90ece4", "#44dfd2", "#19d3c5", "#16baad", "#13a195"
    parties: {
      "Union Valdôtaine": "#59A2C3",
      "10 Volte Meglio": "#FF5732",
      "Articolo 1 - MDP": "#ED1C24",
      "Centristi per l'Europa": "#0081B8",
      "Civica Popolare": "#E00568",
      "Forza Italia": "#0C5D9D",
      "Fratelli d'Italia": "#074773",
      "Indipendente": "#A9A9A9",
      "Italia in Comune": "#008839",
      "Italia Viva": "#CC3C84",
      "Lega": "#0030AA",
      "Liberi e Uguali": "#ED1C24",
      "Movimento 5 Stelle": "#FBC02D",
      "Movimento Associativo Italiani all'Estero": "#212795",
      "Nessuna componente politica di riferimento": "#ccc",
      "Noi con l'Italia": "#236186",
      "Partito Autonomista Trentino Tirolese": "#131019",
      "Partito Democratico": "#2A963A",
      "Partito Socialista Italiano": "#D3031D",
      "Più Europa": "#30327F",
      "Sinistra Italiana": "#EF403D",
      "Südtiroler Volkspartei": "#231F20",
      "Unione Sudamericana Emigrati Italiani": "#E7E882",
      "-": "#ccc"
    },
    default: "#00a7e1",
    default2: "#19d3c5"
  }
}



//Set vue components and Vue app

Vue.component('chart-header', ChartHeader);
Vue.component('loader', Loader);

new Vue({
  el: '#app',
  data: vuedata,
  methods: {
    //Copy to clipboard
    copyToClipboard: function(elId) {
      var textToCopy = document.getElementById(elId);
      textToCopy.select();
      textToCopy.setSelectionRange(0, 99999);
      document.execCommand("copy");
      console.log("Copied: " + textToCopy.value);
    },
    //Share chart image
    shareChart: function(platform) {
      if(platform == 'twitter'){
        var shareText = $('#chartUrlString').val();
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
    },
    //Share
    share: function (platform) {
      if(platform == 'twitter'){
        var thisPage = window.location.href.split('?')[0];
        var shareText = 'Chi finanzia la politica italiana? Tutti i dati su #SoldiePolitica ' + thisPage;
        var shareURL = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);
        window.open(shareURL, '_blank');
        return;
      }
      if(platform == 'facebook'){
        var toShareUrl = 'https://www.soldiepolitica.it';
        var shareURL = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(toShareUrl);
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
        return;
      }
      if(platform == 'linkedin'){
        var shareURL = 'https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fsoldiepolitica.it&title=Soldi+e+Politica&summary=Soldi+e+Poltica&source=soldiepolitica.it';
        window.open(shareURL, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes');
      }
    },
    amtToString: function (x){
      if(!x) {
        return "/";
      }
      var val = x.toFixed(2);
      if(parseInt(val)){
        val = val.toString().replace('.', ',');
        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      return val + ' €';
    }
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover({trigger: "hover"})
})

//Charts
var charts = {
  tipoRicevente: {
    chart: dc.pieChart("#tiporicevente_chart"),
    type: 'pie',
    divId: 'tiporicevente_chart'
  },
  importoAnnuo: {
    chart: dc.rowChart("#importoannuo_chart"),
    type: 'row',
    divId: 'importoannuo_chart'
  },
  topDonatori: {
    chart: dc.rowChart("#topdonatori_chart"),
    type: 'row',
    divId: 'topdonatori_chart'
  },
  tipoDonatore: {
    chart: dc.pieChart("#tipodonatore_chart"),
    type: 'pie',
    divId: 'tipodonatore_chart'
  },
  affiliazioneAmt: {
    chart: dc.rowChart("#affiliazioneamt_chart"),
    type: 'row',
    divId: 'affiliazioneamt_chart'
  },
  importo: {
    chart: dc.rowChart("#importo_chart"),
    type: 'row',
    divId: 'importo_chart'
  },
  mainTable: {
    chart: null,
    type: 'table',
    divId: 'dc-data-table'
  }
}

//Functions for responsivness
var recalcWidth = function(divId) {
  return document.getElementById(divId).offsetWidth - vuedata.chartMargin;
};
var recalcWidthWordcloud = function() {
  //Replace element if with wordcloud column id
  var width = document.getElementById("party_chart").offsetWidth - vuedata.chartMargin*2;
  return [width, 550];
};
var recalcCharsLength = function(width) {
  return parseInt(width / 8);
};
var calcPieSize = function(divId) {
  var newWidth = recalcWidth(divId);
  var sizes = {
    'width': newWidth,
    'height': 0,
    'radius': 0,
    'innerRadius': 0,
    'cy': 0,
    'legendY': 0
  }
  if(newWidth < 300) { 
    sizes.height = newWidth + 170;
    sizes.radius = (newWidth)/2;
    sizes.innerRadius = (newWidth)/4;
    sizes.cy = (newWidth)/2;
    sizes.legendY = (newWidth) + 30;
  } else {
    sizes.height = newWidth*0.75 + 170;
    sizes.radius = (newWidth*0.75)/2;
    sizes.innerRadius = (newWidth*0.75)/4;
    sizes.cy = (newWidth*0.75)/2;
    sizes.legendY = (newWidth*0.75) + 30;
  }
  return sizes;
};
var resizeGraphs = function() {
  for (var c in charts) {
    if((c == 'gender' || c == 'age') && vuedata.showAllCharts == false){
      
    } else {
      var sizes = calcPieSize(charts[c].divId);
      var newWidth = recalcWidth(charts[c].divId);
      var charsLength = recalcCharsLength(newWidth);
      if(charts[c].type == 'row'){
        charts[c].chart.width(newWidth);
        charts[c].chart.label(function (d) {
          var thisKey = d.key;
          if(thisKey.indexOf('###') > -1){
            thisKey = thisKey.split('###')[0];
          }
          if(thisKey.length > charsLength){
            return thisKey.substring(0,charsLength) + '...';
          }
          return thisKey;
        })
        charts[c].chart.redraw();
      } else if(charts[c].type == 'bar') {
        charts[c].chart.width(newWidth);
        charts[c].chart.rescale();
        charts[c].chart.redraw();
      } else if(charts[c].type == 'pie') {
        charts[c].chart
          .width(sizes.width)
          .height(sizes.height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10));
        charts[c].chart.redraw();
      } else if(charts[c].type == 'cloud') {
        charts[c].chart.size(recalcWidthWordcloud());
        charts[c].chart.redraw();
      }
    }
  }
};

//Add dots to thousands
function adddots(x){
  if(parseInt(x)){
    return x.toString().replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return x;
}
//Custom date order for dataTables
var dmy = d3.timeParse("%d/%m/%Y");
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "date-eu-pre": function (date) {
    if(date.indexOf("Cancelled") > -1){
      date = date.split(" ")[0];
    }
      return dmy(date);
  },
  "date-eu-asc": function ( a, b ) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },
  "date-eu-desc": function ( a, b ) {
      return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
});
//Custom italian currency order for dataTables
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "currency-pre": function ( a ) {
      a = a.replace( ".", "" );
      a = a.replace( ",", "." );
      a = a.replace( " €", "" );
      return parseFloat( a );
  },
  "currency-asc": function ( a, b ) {
      return a - b;
  },
  "currency-desc": function ( a, b ) {
      return b - a;
  }
} );


//Totals for footer counters
var totalActivities = 0;
var totalGifts = 0;
var totalTravels = 0;

//Generate random parameter for dynamic dataset loading (to avoid caching)
var randomPar = '';
var randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for ( var i = 0; i < 5; i++ ) {
  randomPar += randomCharacters.charAt(Math.floor(Math.random() * randomCharacters.length));
}
//Load data and generate charts
csv('./data/interessi-privati.csv?' + randomPar, (err, interessi) => {
  csv('./data/persone.csv?' + randomPar, (err, persone) => {
    csv('./data/donazioni.csv?' + randomPar, (err, donazioni) => {
      //Get total donations for footer counter
      var totalDonations = 0;

      //Loop through data to aply fixes and calculations
      _.each(donazioni, function (d) {
        d.donorFullName = d.donor_name_01 + ' ' + d.donor_last_name_01;
        d.donorNameCode = d.donorFullName.trim().replace(/ /g, '_');
        d.recipientFullName = d.recipient_name + ' ' + d.recipient_last_name;
        d.recipientNameCode = d.recipientFullName.trim().replace(/ /g, '_');
        d.donation_range = d.donation_range.trim();
        d.amountNum = 0;
        if(d.donation_amount){
          var amountString = d.donation_amount;
          amountString = amountString.replace(" €", "");
          amountString = amountString.replace("€ ", "");
          d.amountNum = parseFloat(amountString);
          console.log(d.donation_amount + " - " + d.amountNum);
          totalDonations += d.amountNum;
        }
        //Get donor info if person id present
        if(d.person_id_transparency !== "") {
          d.donorInfo = _.find(persone, function (x) { return x.person_id_transparency == d.person_id_transparency });
        }
        //Get recipient info if person id present
        if(d.person_id_recipient !== "") {
          d.recipientInfo = _.find(persone, function (x) { return x.person_id_transparency == d.person_id_recipient });
        }
        //Add donor and recipient to the object for total donations calculation
        if(vuedata.totalDonations.donatori[d.donorNameCode]){
          vuedata.totalDonations.donatori[d.donorNameCode] += d.amountNum;
        } else {
          vuedata.totalDonations.donatori[d.donorNameCode] = d.amountNum;
        }
        if(vuedata.totalDonations.riceventi[d.recipientNameCode]){
          vuedata.totalDonations.riceventi[d.recipientNameCode] += d.amountNum;
        } else {
          vuedata.totalDonations.riceventi[d.recipientNameCode] = d.amountNum;
        }
      });

      //Set totals for footer counters
      $('.count-box-amount .total-count').html(adddots(Math.round(totalDonations)) + ' €');

      //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
      var ndx = crossfilter(donazioni);
      
      var searchDimension = ndx.dimension(function (d) {
          var entryString = d.recipient_name + ' ' + d.recipient_last_name + ' ' + d.recipient_party + ' ' + d.recipient_type + ' ' + d.donor_name_01 + ' ' + d.donor_last_name_01 + ' ' + d.donor_type + ' ' + d.donation_year;
          return entryString.toLowerCase();
      });

      //Set charts locale for number formatting
      var locale = {
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["", " €"]
      }
      d3.formatDefaultLocale(locale);

      //CHART 1
      var createTipoRiceventeChart = function() {
        var chart = charts.tipoRicevente.chart;
        var dimension = ndx.dimension(function (d) {
          return d.recipient_type; 
        });
        var group = dimension.group().reduceSum(function (d) { 
          return d.amountNum;
        });
        var sizes = calcPieSize(charts.tipoRicevente.divId);
        var height = $('#'+charts.tipoDonatore.divId + '_container').height();
        chart
          .width(sizes.width)
          .height(height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
            var thisKey = d.name;
            if(thisKey.length > 40){
              return thisKey.substring(0,40) + '...';
            }
            return thisKey;
          }))
          .title(function(d){
            var thisKey = d.key;
            return thisKey + ': € ' + d.value.toFixed(2);
          })
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.ricevente[d.key];
          })
          .group(group);
          /*
          .ordering(function(d) { return order.indexOf(d)})
          .colorCalculator(function(d, i) {
            return vuedata.colors.parties[d.key];
          });
          */
        chart.render();
      }

      //CHART 2
      var createImportoAnnuoChart = function() {
        var chart = charts.importoAnnuo.chart;
        var dimension = ndx.dimension(function (d) {
          return d.donation_year;
        });
        var group = dimension.group().reduceSum(function (d) {
            return d.amountNum;
        });
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(10).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var width = recalcWidth(charts.importoAnnuo.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(470)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.default;
          })
          /*
          .colorCalculator(function(d, i) {
            var level = getPolicyLevel(d.key);
            return vuedata.colors.ecPolicy[level];
          })
          */
          .label(function (d) {
              if(d.key && d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.key + ': ' + adddots(Math.round(d.value)) + '€';
          })
          .elasticX(true)
          .xAxis().ticks(4);
          chart.xAxis().tickFormat(d3.format('$,.2r'));
          chart.render();
      }

      //CHART 3
      var createTopDonatoriChart = function() {
        function getDonorType(donor) {
          var don = _.find(donazioni, function (x) { return x.donorFullName == donor });
          if(don) {
            return don.donor_type;
          }
          return ""; 
        }
        var chart = charts.topDonatori.chart;
        var dimension = ndx.dimension(function (d) {
          return d.donorFullName;
        });
        var group = dimension.group().reduceSum(function (d) {
            return d.amountNum;
        });
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(10).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var width = recalcWidth(charts.topDonatori.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(500)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            var type = getDonorType(d.key);
            return vuedata.colors.donatori[type];
          })
          .label(function (d) {
              if(d.key && d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.key + ': ' + adddots(Math.round(d.value)) + '€';
          })
          .elasticX(true)
          .xAxis().ticks(4);
          chart.xAxis().tickFormat(d3.format('$,.2r'));
          //chart.xAxis().tickFormat(numberFormat);
          chart.render();
      }

      //CHART 4
      var createTipoDonatoreChart = function() {
        var chart = charts.tipoDonatore.chart;
        var dimension = ndx.dimension(function (d) {
          return d.donor_type; 
        });
        var group = dimension.group().reduceSum(function (d) { 
          return d.amountNum; 
        });
        var sizes = calcPieSize(charts.tipoDonatore.divId);
        var height = $('#'+charts.tipoDonatore.divId + '_container').height();
        console.log(height);
        chart
          .width(sizes.width)
          //.height(sizes.height)
          .height(height)
          .cy(sizes.cy)
          .innerRadius(sizes.innerRadius)
          .radius(sizes.radius)
          .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
            var thisKey = d.name;
            if(thisKey.length > 40){
              return thisKey.substring(0,40) + '...';
            }
            return thisKey;
          }))
          .title(function(d){
            var thisKey = d.key;
            return thisKey + ': € ' + d.value.toFixed(2);
          })
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.donatori[d.key];
          })
          .group(group);
          /*
          .ordering(function(d) { return order.indexOf(d)})
          .colorCalculator(function(d, i) {
            return vuedata.colors.donatori[d.key];
            //var level = getPolicyLevel(d.key);
            //return vuedata.colors.ecPolicy[level];
          });
          */
        chart.render();
      }

      //CHART 5 
      var createAffiliazioneAmtChart = function() {
        var chart = charts.affiliazioneAmt.chart;
        var dimension = ndx.dimension(function (d) {
          return d.recipient_party;
        });
        var group = dimension.group().reduceSum(function (d) {
            return d.amountNum;
        });
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(30).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var width = recalcWidth(charts.affiliazioneAmt.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width - 20)
          .height(500)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.default;
          })
          .label(function (d) {
              if(d.key && d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.key + ': ' + adddots(Math.round(d.value)) + '€';
          })
          .elasticX(true)
          .xAxis().ticks(4);
          chart.render();
      };

      //CHART 6
      var createImportoChart = function() {
        var chart = charts.importo.chart;
        var dimension = ndx.dimension(function (d) {
          return d.donation_range;
        });
        var group = dimension.group().reduceSum(function (d) {
            return 1;
        });
        var filteredGroup = (function(source_group) {
          return {
            all: function() {
              return source_group.top(30).filter(function(d) {
                return (d.value != 0);
              });
            }
          };
        })(group);
        var order = ["0-500,00", "500,01-5000,00", "5000,01-10000,00", "10000,01-50000,00", "50000,01-100000,00", ">100000,01"];
        var width = recalcWidth(charts.importo.divId);
        var charsLength = recalcCharsLength(width);
        chart
          .width(width)
          .height(530)
          .margins({top: 0, left: 0, right: 0, bottom: 20})
          .group(filteredGroup)
          .dimension(dimension)
          .colorCalculator(function(d, i) {
            return vuedata.colors.default2;
          })
          .label(function (d) {
              if(d.key && d.key.length > charsLength){
                return d.key.substring(0,charsLength) + '...';
              }
              return d.key;
          })
          .title(function (d) {
              return d.key + ': ' + d.value;
          })
          .elasticX(true)
          .ordering(function(d) { return order.indexOf(d.key) })
          .xAxis().ticks(4);
          chart.render();
      }
      
      //TABLE
      var createTable = function() {
        var count=0;
        charts.mainTable.chart = $("#dc-data-table").dataTable({
          "columnDefs": [
            {
              "searchable": false,
              "orderable": false,
              "targets": 0,   
              data: function ( row, type, val, meta ) {
                return count;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 1,
              "defaultContent":"N/A",
              "data": function(d) {
                if(d.recipient_type == 'Persona' || d.recipient_type == 'Parlamentare o membro del Governo'){
                  return d.recipient_last_name.trim() + ' ' + d.recipient_name;
                }
                return d.recipient_last_name.trim();
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 2,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.recipient_party;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 3,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.recipient_type;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 4,
              "defaultContent":"N/A",
              "data": function(d) {
                if(d.donor_type == 'Persona' || d.donor_type == 'Parlamentare o membro del Governo'){
                  return d.donor_last_name_01.trim() + ' ' + d.donor_name_01;
                }
                return d.donor_last_name_01.trim();
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 5,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.donor_type;
              }
            },
            {
              "searchable": false,
              "orderable": true,
              "targets": 6,
              "defaultContent":"N/A",
              "data": function(d) {
                return d.donation_year;
              }
            },
            {
              "type": "currency",
              "searchable": false,
              "orderable": true,
              "targets": 7,
              "defaultContent":"N/A",
              "data": function(d) {
                return adddots(d.donation_amount);
              }
            }
          ],
          "iDisplayLength" : 25,
          "bPaginate": true,
          "bLengthChange": true,
          "bFilter": false,
          "order": [[ 1, "asc" ]],
          "bSort": true,
          "bInfo": true,
          "bAutoWidth": false,
          "bDeferRender": true,
          "aaData": searchDimension.top(Infinity),
          "bDestroy": true,
        });
        var datatable = charts.mainTable.chart;
        datatable.on( 'draw.dt', function () {
          var PageInfo = $('#dc-data-table').DataTable().page.info();
            datatable.DataTable().column(0, { page: 'current' }).nodes().each( function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
          });
          datatable.DataTable().draw();

        $('#dc-data-table tbody').on('click', 'tr', function () {
          var data = datatable.DataTable().row( this ).data();
          vuedata.selectedElement = data;
          $('#detailsModal').modal();
        });
      }
      //REFRESH TABLE
      function RefreshTable() {
        dc.events.trigger(function () {
          var alldata = searchDimension.top(Infinity);
          charts.mainTable.chart.fnClearTable();
          charts.mainTable.chart.fnAddData(alldata);
          charts.mainTable.chart.fnDraw();
        });
      }

      //SEARCH INPUT FUNCTIONALITY
      var typingTimer;
      var doneTypingInterval = 1000;
      var $input = $("#search-input");
      $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
      });
      $input.on('keydown', function () {
        clearTimeout(typingTimer);
      });
      function doneTyping () {
        var s = $input.val().toLowerCase();
        searchDimension.filter(function(d) { 
          return d.indexOf(s) !== -1;
        });
        throttle();
        var throttleTimer;
        function throttle() {
          window.clearTimeout(throttleTimer);
          throttleTimer = window.setTimeout(function() {
              dc.redrawAll();
          }, 250);
        }
      }

      //Reset charts
      var resetGraphs = function() {
        for (var c in charts) {
          if(charts[c].type !== 'table' && charts[c].chart.hasFilter()){
            charts[c].chart.filterAll();
          }
        }
        searchDimension.filter(null);
        $('#search-input').val('');
        dc.redrawAll();
      }
      $('.reset-btn').click(function(){
        resetGraphs();
      })
      
      //Render charts
      createTipoRiceventeChart();
      createImportoAnnuoChart();
      createTopDonatoriChart();
      createTipoDonatoreChart();
      createAffiliazioneAmtChart();
      createImportoChart();
      createTable();

      $('.dataTables_wrapper').append($('.dataTables_length'));

      //Toggle last charts functionality and fix for responsiveness
      vuedata.showAllCharts = false;
      $('#charts-toggle-btn').click(function(){
        if(vuedata.showAllCharts){
          resizeGraphs();
        }
      })

      //Hide loader
      vuedata.loader = false;

      //COUNTERS
      //Main counter
      var all = ndx.groupAll();
      var counter = dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all);
      counter.render();
      //Update datatables
      counter.on("renderlet.resetall", function(c) {
        RefreshTable();
      });

      //Custom counters
      function drawDonorsCounter() {
        var dim = ndx.dimension (function(d) {
          if (!d.donor_id_transparency) {
            return "";
          } else {
            //return d.donor_last_name_01 + ' ' + d.donor_name_01;
            return d.donor_id_transparency;
          }
        });
        var group = dim.group().reduce(
          function(p,d) {  
            p.nb +=1;
            if (!d.donor_id_transparency) {
              return p;
            }
            p.amount += +d.amountNum;
            return p;
          },
          function(p,d) {  
            p.nb -=1;
            if (!d.donor_id_transparency) {
              return p;
            }
            p.amount -= +d.amountNum;
            return p;
          },
          function(p,d) {  
            return {nb: 0, amount: 0}; 
          }
        );
        group.order(function(p){ return p.nb });
        var amount = 0;
        var counter = dc.dataCount(".count-box-donors")
        .dimension(group)
        .group({value: function() {
          amount = 0;
          return group.all().filter(function(kv) {
            if (kv.value.nb >0) {
              amount += +kv.value.amount;
            }
            return kv.value.nb > 0; 
          }).length;
        }})
        .renderlet(function (chart) {
          $(".amountnb").text(adddots(Math.round(amount)) + ' €');
        });
        counter.render();
      }

      function drawRecipientsCounter() {
        var dim = ndx.dimension (function(d) {
          if (!d.recipient_last_name) {
            return "";
          } else {
            return d.recipient_last_name + ' ' + d.recipient_name;
          }
        });
        var group = dim.group().reduce(
          function(p,d) {  
            p.nb +=1;
            if (!d.recipient_last_name) {
              return p;
            }
            return p;
          },
          function(p,d) {  
            p.nb -=1;
            if (!d.Id) {
              return p;
            }
            return p;
          },
          function(p,d) {  
            return {nb: 0}; 
          }
        );
        group.order(function(p){ return p.nb });
        var counter = dc.dataCount(".count-box-recipients")
        .dimension(group)
        .group({value: function() {
          return group.all().filter(function(kv) {
            if (kv.value.nb >0) {
            }
            return kv.value.nb > 0; 
          }).length;
        }})
        .renderlet(function (chart) {
        });
        counter.render();
      }

      drawDonorsCounter();
      drawRecipientsCounter();

      //Window resize function
      window.onresize = function(event) {
        resizeGraphs();
      };
    })
  })
})
