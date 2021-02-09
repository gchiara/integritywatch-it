<template>
  <div class="chart-header row">
    <div class="chart-title col-8">{{ title }}</div>
    <div class="chart-header-buttons col-4">
      <button type="button" class="btn btn-secondary btn-info" data-container="body" data-toggle="popover" data-html="true" data-placement="bottom" :data-content="info">
        i
      </button>
      <button v-if="chartid" :id="'download-'+chartid" class='btn btn-secondary btn-download-chart'>
        <i class="material-icons">save_alt</i>
      </button>
      <button v-if="chartid" :id="'share-'+chartid" class='btn btn-secondary btn-download-chart'>
        <i class="material-icons">share</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartHeader',
  props: {
    title: String,
    info: String,
    bg: String,
    color: String,
    chartid: String
  },
  mounted: function () {
    var chartid = this.chartid;
    var thisTitle = this.title;
    function chartSavePrep(thisChartId) {
      $('#'+thisChartId).find('svg').attr( "overflow", "visible" );
      $('#'+thisChartId).find('svg').css( "overflow", "visible" );
      $('#'+thisChartId).find('.chart-header-buttons').hide();
      $('#'+thisChartId).addClass('hide-shadow');
      $("html").addClass("hide-scrollbar");
    }
    function chartSaveCleanup(thisChartId) {
      $("html").removeClass("hide-scrollbar");
      $('#'+thisChartId).removeClass('hide-shadow');
      $('#'+thisChartId).find('.chart-header-buttons').show();
    }
    $('#download-' + chartid).on('click', function(){
      var thisChartId = chartid.toLowerCase() + '_chart_container';
      chartSavePrep(thisChartId);
      html2canvas(document.querySelector('#'+thisChartId), {scrollY: -window.scrollY, backgroundColor: '#ffffff'}).then(canvas => {
        var filename = thisTitle;
        var downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = filename;
        //For Firefox
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
      chartSaveCleanup(thisChartId);
    });
    $('#share-' + chartid).on('click', function(){
      var thisChartId = chartid.toLowerCase() + '_chart_container';
      chartSavePrep(thisChartId);
      html2canvas(document.querySelector('#'+thisChartId), {scrollY: -window.scrollY, backgroundColor: '#ffffff'}).then(canvas => {
        var imgUri = canvas.toDataURL();
        $.post( "save-image.php", { imgUri: imgUri })
        .done(function( data ) {
          var urlBase = location.href.substring(0, location.href.lastIndexOf("/")+1)
          var imgUrlString = urlBase + 'images/charts/' + data + '.png';
          //var imgUrlString = window.location.origin + '/images/charts/' + data + '.png';
          //Save chart id and show share modal 
          $('#chartShareModal .chart-img-preview').attr('src', imgUrlString);
          $('#chartShareModal #chartUrlString').val(imgUrlString);
          $('#chartShareModal').modal();
        });
      });
      chartSaveCleanup(thisChartId);
    });
  }
}

</script>

<style scoped lang="scss">
$color_TI: #205d85;
.chart-header {
  padding: 10px 2px 10px 5px;
  margin: 0;
  background: #fafafa;
  .chart-title {
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-weight: 600;
    font-size: 20px;
    text-align: left;
    color: $color_TI;
    @media only screen and (max-width: 1400px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 1250px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 20px;
    }
  }
  .chart-header-buttons {
    text-align: right;
    .btn-info {
      height: 23px;
      width: 23px;
      padding: 0;
      padding-top: 1px;
      text-align: center;
      border-radius: 2px;
      font-weight: 600;
      font-size: 14px;
      background: $color_TI;
      border: none;
    }
    .btn-download-chart {
      height: 23px;
      width: 23px;
      padding: 2px 2px;
      border-radius: 2px;
      font-weight: 600;
      background: $color_TI;
      border: none;
      margin-left: 2px;
      text-align: center;
      i {
        font-size: 19px;
      }
    }
  }
}
</style>

