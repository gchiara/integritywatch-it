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
  page: 'tabB',
  loader: true,
  showInfo: true,
  showShare: true,
  showAllCharts: true,
  chartMargin: 40,
  travelFilter: 'all',
  charts: {
    istituzioni: {
      id: 'istituzioni',
      title: 'Istituzioni di appartenenza',
      info: 'Ogni fetta del grafico a torta indica, per ogni interesse privato riscontrato, l’istituzione di appartenenza dei Parlamentari e membri del Governo.'
    },
    partiti: {
      id: 'partiti',
      title: 'Partiti e movimenti',
      info: 'Ogni barra del grafico rappresenta, per ogni interesse privato riscontrato, il partito o movimento politico a cui appartengono i soggetti considerati. Cliccando su una singola barra, potrai visualizzare attraverso gli altri grafici informazioni più specifiche sui membri del Governo e/o del Parlamento, appartenenti al partito o movimento, che hanno ruoli e partecipazioni in aziende.'
    },
    fatturato: {
      id: 'fatturato',
      title: 'Fatturato',
      info: 'Ogni barra del grafico rappresenta un intervallo di fatturato delle aziende in cui membri del Governo e/o del Parlamento hanno degli interessi. Cliccando su una singola barra, potrai visualizzare attraverso gli altri grafici informazioni più specifiche sul loro ruolo nelle aziende selezionate.'
    },
    settore: {
      id: 'settore',
      title: 'Settore economico',
      info: 'Ogni fetta del grafico a torta rappresenta un macro settore economico a cui appartengono le aziende in cui membri del Governo e/o del Parlamento hanno degli interessi. Cliccando su un singolo settore, potrai visualizzare attraverso gli altri grafici informazioni più specifiche sulle aziende selezionate e i politici che hanno un ruolo in esse.'
    },
    ruolo: {
      id: 'ruolo',
      title: 'Quale ruolo hanno nelle aziende?',
      info: 'Ogni barra rappresenta, per ogni interesse privato riscontrato, lo specifico ruolo ricoperto dai membri del Governo e/o del Parlamento nelle singole aziende. Cliccando su una singola barra, potrai visualizzare nella tabella in basso i nomi di tutti coloro che ricoprono quella specifica carica.'
    },
    map: {
      id: 'map',
      title: 'Aziende per regione',
      info: 'Distribuzione delle aziende in cui membri del Governo e/o del Parlamento hanno degli interessi.  Ciccando su ogni singola regione, potrai visualizzare nella tabella in basso i nomi di tutti i politici che hanno un ruolo nelle aziende della regione.'
    },
    mainTable: {
      chart: null,
      type: 'table',
      title: 'INTERESSI PRIVATI',
      info: 'Nella tabella è riportato l’elenco dei singoli interessi e ruoli che i politici ricoprono in aziende private con un riepilogo delle infromazioni aggiuntive sui politici stessi e sull’azienda. Cliccando sul titolo di ogni colonna potrai ordinare l’elenco secondo il tuo interesse.'
    }
  },
  selectedElement: { "P": "", "Sub": ""},
  modalShowTable: '',
  colors: {
    ecPolicy: {			
      "Directors-General": "#395a75",
      "Commissioners": "#4081ae",
      "Cabinet Members": "#3b95d0"
    },
    generic: ["#3b95d0", "#4081ae", "#406a95", "#395a75" ],
    istituzioni: {
      "Camera dei Deputati": "#3dbeeb",
      "Senato della Repubblica": "#00a7e1",
      "Presidenza del Consiglio dei ministri": "#0e8fc0",
      "Ministero dello sviluppo economico": "#0d769c",
      "Ministero degli affari esteri e della cooperazione internazionale": "#065a77",
      "Ministero dell'interno": "#014962",
      "Ministero delle infrastrutture e dei trasporti": "#073849",
      "Ministero dell'istruzione, dell'università e della ricerca": "#1d86ac"
    },
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
  }
});

//Initialize info popovers
$(function () {
  $('[data-toggle="popover"]').popover({trigger: "hover"})
})

//Charts
var charts = {
  istituzioni: {
    chart: dc.pieChart("#istituzioni_chart"),
    type: 'pie',
    divId: 'istituzioni_chart'
  },
  partiti: {
    chart: dc.rowChart("#partiti_chart"),
    type: 'row',
    divId: 'partiti_chart'
  },
  fatturato: {
    chart: dc.rowChart("#fatturato_chart"),
    type: 'row',
    divId: 'fatturato_chart'
  },
  settore: {
    chart: dc.pieChart("#settore_chart"),
    type: 'pie',
    divId: 'settore_chart'
  },
  ruolo: {
    chart: dc.rowChart("#ruolo_chart"),
    type: 'row',
    divId: 'ruolo_chart'
  },
  map: {
    chart: dc.geoChoroplethChart("#map_chart"),
    type: 'map',
    divId: 'map_chart'
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
    var sizes = calcPieSize(charts[c].divId);
    var newWidth = recalcWidth(charts[c].divId);
    var charsLength = recalcCharsLength(newWidth);
    if(charts[c].type == 'map') {
      var newProjection = d3.geoMercator()
        .center([11,45])
        .translate([newWidth/2 - (newWidth/10), 120])
        .scale(newWidth*3);
      if(newWidth <= 558) {
        newProjection = d3.geoMercator()
        .center([11,45]) 
        .translate([newWidth/2 - (newWidth/10), 120])
        .scale(newWidth*4);
      } else if(newWidth <= 610) {
        newProjection = d3.geoMercator()
        .center([11,45])
        .translate([newWidth/2 - (newWidth/10), 120])
        .scale(newWidth*3.5);
      }
      charts[c].chart.width(newWidth);
      charts[c].chart.projection(newProjection);
      charts[c].chart.redraw();
    } else if(charts[c].type == 'row'){
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
        //.legend(dc.legend().x(0).y(sizes.legendY).gap(10));
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
          var thisKey = d.name;
          if(thisKey.length > charsLength){
            return thisKey.substring(0,charsLength) + '...';
          }
          return thisKey;
        }))
      if(charts[c].divId == 'settore_chart') {
        charts[c].chart
        .legend(dc.legend().x(0).y(sizes.legendY).gap(10).autoItemWidth(true).horizontal(true).legendWidth(sizes.width).legendText(function(d) { 
          var thisKey = d.name;
          if(thisKey.length > charsLength){
            return thisKey.substring(0,charsLength) + '...';
          }
          return thisKey;
        }))
      }
      charts[c].chart.redraw();
    } else if(charts[c].type == 'cloud') {
      charts[c].chart.size(recalcWidthWordcloud());
      charts[c].chart.redraw();
    }
  }
};

//Add commas to thousands
function addcommas(x){
  if(parseInt(x)){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      csv('./data/regioni.csv?' + randomPar, (err, regioni) => {
        //Loop through data to apply fixes and calculations
        _.each(persone, function (d) {
          //Count and save number of interests per person
          var personInterests = _.filter(interessi, function (x) { return x.person_id_transparency == d.person_id_transparency });
          d.interestsNum = personInterests.length;
        });
        _.each(interessi, function (d) {
          d.person = _.find(persone, function (x) { return x.person_id_transparency == d.person_id_transparency });
          d.provinceInfo = _.find(regioni, function (x) { return x.provincia_code == d.company_headquarter_province });
          if(d.provinceInfo) {
            d.regionCode = d.provinceInfo.istat_code;
          } else {
            console.log(d.company_headquarter_province);
          }
        });
      

        //Set totals for footer counters
        $('.count-box-activities .total-count').text(totalActivities);
        $('.count-box-gifts .total-count').text(totalGifts);
        $('.count-box-travels .total-count').text(totalTravels);

        //Set dc main vars. The second crossfilter is used to handle the travels stacked bar chart.
        var ndx = crossfilter(interessi);
        
        var searchDimension = ndx.dimension(function (d) {
            var entryString = d.company_name + ' ' + d.company_transparency_sector + ' ' + d.person_company_role + ' ' + d.person.person_name + ' ' + d.person.person_last_name + ' ' + d.person.person_political_party + ' ' + d.person.government_or_legislature + ' ' + d.person.person_institution;
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
        var createIstituzioniChart = function() {
          //var reducer = reductio();
          var chart = charts.istituzioni.chart;
          var dimension = ndx.dimension(function (d) {
            return d.person.person_institution; 
          });
          //var group = dimension.group().reduceSum(function (d) { return 1; });
          //Custom reducer
          var customGroup =  dimension.group().reduce(
            function(p, d) { 
              if(d.person_id_transparency in p.ids){
                  p.ids[d.person_id_transparency]++;
              }
              else {
                  p.ids[d.person_id_transparency] = 1;
                  p.uniquecount++;
              }
              return p;
            },
            function (p, d) {
              p.ids[d.person_id_transparency]--;
              if(p.ids[d.person_id_transparency] === 0){
                  delete p.ids[d.person_id_transparency];
                  p.uniquecount--;
              }
              return p;
            },
            function () {
              return {
                uniquecount: 0,
                ids: {}
              };
            }
          );
          var sizes = calcPieSize(charts.istituzioni.divId);
          var charsLength = recalcCharsLength(sizes.width);
          var height = $('#'+charts.istituzioni.divId + '_container').height();
          chart
            .width(sizes.width)
            .height(height)
            .cy(sizes.cy)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > charsLength){
                return thisKey.substring(0,charsLength) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value.uniquecount;
            })
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              return vuedata.colors.istituzioni[d.key];
            })
            .group(customGroup)
            .valueAccessor(function(d){ return d.value.uniquecount; });
            /*
            .ordering(function(d) { return order.indexOf(d)})
            .colorCalculator(function(d, i) {
              return vuedata.colors.parties[d.key];
            });
            */
          chart.render();
        }

        //CHART 2
        var createPartitiChart = function() {
          var chart = charts.partiti.chart;
          var dimension = ndx.dimension(function (d) {
              return d.person.person_political_party;
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.top(20).filter(function(d) {
                  return (d.value != 0);
                });
              }
            };
          })(group);
          var width = recalcWidth(charts.partiti.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(500)
            .margins({top: 0, left: 0, right: 0, bottom: 20})
            .group(filteredGroup)
            .dimension(dimension)
            .colorCalculator(function(d, i) {
              //return vuedata.colors.parties[d.key];
              return vuedata.colors.default;
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
            .xAxis().ticks(4);
            chart.render();
        }

        //CHART 3
        var createFatturatoChart = function() {
          var chart = charts.fatturato.chart;
          var dimension = ndx.dimension(function (d) {
              return d.company_turnover_range;
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.top(20).filter(function(d) {
                  return (d.value != 0);
                });
              }
            };
          })(group);
          var width = recalcWidth(charts.fatturato.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
            .height(500)
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
            .xAxis().ticks(4);
            chart.render();
        }

        //CHART 4
        var createSettoreChart = function() {
          var chart = charts.settore.chart;
          var dimension = ndx.dimension(function (d) {
            return d.company_transparency_sector; 
          });
          var group = dimension.group().reduceSum(function (d) { return 1; });
          var customGroup =  dimension.group().reduce(
            function(p, d) { 
              if(d.company_id_transparency in p.ids){
                  p.ids[d.company_id_transparency]++;
              }
              else {
                  p.ids[d.company_id_transparency] = 1;
                  p.uniquecount++;
              }
              return p;
            },
            function (p, d) {
              p.ids[d.company_id_transparency]--;
              if(p.ids[d.company_id_transparency] === 0){
                  delete p.ids[d.company_id_transparency];
                  p.uniquecount--;
              }
              return p;
            },
            function () {
              return {
                uniquecount: 0,
                ids: {}
              };
            }
          );
          var sizes = calcPieSize(charts.settore.divId);
          var height = $('#'+charts.settore.divId + '_container').height();
          chart
            .width(sizes.width)
            .height(height)
            .cy(sizes.cy)
            .cap(10)
            .innerRadius(sizes.innerRadius)
            .radius(sizes.radius)
            .legend(dc.legend().x(0).y(sizes.legendY).gap(10).gap(10).autoItemWidth(true).horizontal(true).legendWidth(sizes.width).legendText(function(d) { 
              var thisKey = d.name;
              if(thisKey.length > 40){
                return thisKey.substring(0,40) + '...';
              }
              return thisKey;
            }))
            .title(function(d){
              var thisKey = d.key;
              return thisKey + ': ' + d.value.uniquecount;
            })
            .colors(d3.scaleOrdinal().range(["#d5f5f2", "#c4faf5", "#adf9f2", "#8ceae2", "#67cfc7", "#53c1b7", "#2da399", "#199389", "#047f74", "#016e64", "#01675e"]))
            .dimension(dimension)
            .group(customGroup)
            .valueAccessor(function(d){ console.log(d.value);return d.value.uniquecount; })
            .ordering(function(b) {
              return -b.value.uniquecount;
            });

          //Fix for using cap with custom valueAccessor
          chart.cappedValueAccessor = function(d, i) {
            if (d.others) {
              return d.value.uniquecount;
            }
            return chart.valueAccessor()(d, i);
          };
          chart.othersGrouper(function(topItems, restItems) {
            var restItemsSum = d3.sum(restItems, chart.valueAccessor()),
              restKeys = restItems.map(chart.keyAccessor());
            if (restItemsSum > 0) {
              topItems = topItems.concat([{
                others: restKeys,
                key: chart.othersLabel(),
                value: {
                  uniquecount: restItemsSum
                }
              }]);
            }
            return topItems;
          });
          chart.render();
        }

        //CHART 5
        var createRuoloChart = function() {
          var chart = charts.ruolo.chart;
          var dimension = ndx.dimension(function (d) {
              return d.person_company_role;
          });
          var group = dimension.group().reduceSum(function (d) {
              return 1;
          });
          var filteredGroup = (function(source_group) {
            return {
              all: function() {
                return source_group.top(20).filter(function(d) {
                  return (d.value != 0);
                });
              }
            };
          })(group);
          var width = recalcWidth(charts.ruolo.divId);
          var charsLength = recalcCharsLength(width);
          chart
            .width(width)
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
                return d.key + ': ' + d.value;
            })
            .elasticX(true)
            .xAxis().ticks(4);
            chart.render();
        }

        //MAP CHART
        var createMapChart = function() {
          json('./data/limits_IT_regions.topo.json', (err, jsonmap) => {
            var chart = charts.map.chart;
            var width = recalcWidth(charts.map.divId);
            var mapDimension = ndx.dimension(function (d) {
              return d.regionCode;
            });
            var group = mapDimension.group().reduceSum(function (d) { return 1; });
            var dpt = topojson.feature(jsonmap, jsonmap.objects.regions).features;
            var projection = d3.geoMercator()
              .center([11,45])
              .scale(width*2.9)
              .translate([width/2 - 50, 120]);
            var centered;
            function clicked(d) {
            }
            var height = $('#'+charts.map.divId + '_container').height();
            chart
              .width(width)
              .height(height)
              .dimension(mapDimension)
              .group(group)
              .projection(projection)
              .colors(d3.scaleQuantize().range(["#b9efea", "#6be5db", "#44dfd2", "#19d3c5", "#16baad", "#13a195", "#10877d", "#0d6e66"]))
              //.colors(d3.scaleQuantize().range(["#dae6ff", "#b3cbff", "#89adfa", "#7b9be0", "#6d8ac7", "#5f78ad", "#516694", "#43557a", "#354361"]))
              .colorDomain([1, 50])
              .colorCalculator(function (d) { return (!d || d == 0) ? '#eee' : chart.colors()(d);})
              .overlayGeoJson(dpt, "region", function (d) { return d.properties.reg_istat_code_num.toString(); })
              .title(function (d) {
                return  _.find(dpt, function (m) {return m.properties.reg_istat_code_num==d.key}).properties.reg_name + ': ' + d.value + ' interessi';
              })
              .on('renderlet', function(chart) {});
            chart.render();
          });
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
                  if(d.person){
                    return d.person.person_last_name + ' ' + d.person.person_name;
                  }
                  return "N/A";
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 2,
                "defaultContent":"N/A",
                "data": function(d) {
                  if(d.person){
                    return d.person.person_political_party;
                  }
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 3,
                "defaultContent":"N/A",
                "data": function(d) {
                  if(d.person){
                    return d.person.person_institution;
                  }
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 4,
                "defaultContent":"N/A",
                "data": function(d) {
                  if(d.person){
                    return d.person.government_or_legislature;
                  }
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 5,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.company_name;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 6,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.person_company_role;
                }
              },
              {
                "searchable": false,
                "orderable": true,
                "targets": 7,
                "defaultContent":"N/A",
                "data": function(d) {
                  return d.company_transparency_sector;
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
        createIstituzioniChart();
        createPartitiChart();
        createFatturatoChart();
        createSettoreChart();
        createRuoloChart();
        createMapChart();
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
        function drawAziendeCounter() {
          var dim = ndx.dimension (function(d) {
            if (!d.company_id_openpolis) {
              return "";
            } else {
              return d.company_id_openpolis;
            }
          });
          var group = dim.group().reduce(
            function(p,d) {  
              p.nb +=1;
              if (!d.company_id_openpolis) {
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
          var counter = dc.dataCount(".count-box-aziende")
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

        function drawPersoneCounter() {
          var dim = ndx.dimension (function(d) {
            if (!d.person_id_openpolis) {
              return "";
            } else {
              return d.person_id_openpolis;
            }
          });
          var group = dim.group().reduce(
            function(p,d) {  
              p.nb +=1;
              if (!d.person_id_openpolis) {
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
          var counter = dc.dataCount(".count-box-legislatori")
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

        drawAziendeCounter();
        drawPersoneCounter();

        //Window resize function
        window.onresize = function(event) {
          resizeGraphs();
        };
      })
    })
  })
});
