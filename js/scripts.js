$(document).ready(function(){
  console.log ('DOM loaded');

  //Highcharts graph showing income vs BPE exemptions
  Highcharts.chart('money-chart', {

    title: {
      text: 'Median Household Income vs. Percent Increase in Personal Belief Expemptions '
    },

    subtitle: {
      text: 'Source: AJPH Reseach: Sociodemographic Predictors of Vaccination Exemptions on the Basis of Personal Belief in California'
    },

    yAxis: {
      title: {
        text: 'PBE Percentage Increase'
      }
    },
    xAxis: {
      title: {
        text: 'Median Household Income Increase'
      },
      categories: ['$25,000 - $50,000', '$50,000 - $75,000', '$75,000 - $100,000', '$100,000 - $125,000', '$125,000 - $150,000']

    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 0
      }
    },

    series: [{
      name: 'Percent Increase in PBEs',
      data: [.155, .176, .2, .228, .259]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }); //close highchart

  // variables for ajax call to table  on private and public school vaccine exemptions
  var url = './js/kids.json';
  var kids = [];
  var html = '';

  // ajax call to table
  $.ajax({
    type:'GET',
    dataType:'json',
    data: kids,
    url: url,
    error: function(kids, white){ console.log('Your ajax call failed. Sorry fam.'); console.log(white)},
    async:true,
    success: function(kids){
      console.log(kids);
      html += '<table>';
      html += '<div class="chart">';
      html += '<tr><th class="sticky stickyhead">Category</th><th>All 2016-17</th><th>Public 2016-17</th><th>Private 2016-17</th><th>All 2015-16</th><th>Public 2015-16</th><th>Private 2015-16</th></tr>';
      html +=   '<div class="kids-list">';
      kids.forEach(function(kids){
        html += '<tr>';
        html += '<td class="sticky">' + kids.Category  + '</td><td>' + kids["All 2016-17"] + '</td><td>' + kids["Public 2016-17"] + '</td><td>' + kids["Private 2016-17"] + '</td><td>' + kids["All 2015-2016"] + '</td><td>' + kids["Public 2015-2016"] + '</td><td>' + kids["Private 2015-2016"] + '</td>';
        html += '</tr>';
      });
      html +=   '</div>';
      html += '</div>';
      html += '</table>';
      $('#kids').append(html);
    } // close kids function
  });//close AJAX call

  // highchart that shows white population vs PBEs

  Highcharts.chart('white-chart', {

    title: {
      text: 'Percentage Increase of White Population vs. Percent Increase in Personal Belief Expemptions'
    },

    subtitle: {
      text: 'Source: AJPH Reseach: Sociodemographic Predictors of Vaccination Exemptions on the Basis of Personal Belief in California'
    },

    yAxis: {
      title: {
        text: 'PBE Percentage Increase'
      }
    },
    xAxis: {
      title: {
        text: 'Percentage Increase of White Population'
      },
      categories: ['5% to 20%', '20% to 35%', '35% to 50%', '50% to 65%', '$65% to 80%', '80% to 95%']

    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 0
      }
    },

    series: [{
      name: 'Percent Increase in PBEs',
      data: [.283, .357, .451, .569, .719, .908]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }); //close highchart

  //variables to Tauchart scatterplot that shows percent white vs percent vaccinated in the united states
  var vaxurl = './js/usvaxx.json';
  var usvaxx = [];
  //ajax call to make Tauchart scatterplot
  $.ajax({
    type:'GET',
    url: vaxurl,
    data: usvaxx,
    async: true,
    dataType:'json',
    success:function(usvaxx){
      console.log('load scatterplot');
      var chart = new Taucharts.Chart({
        guide: {
          x: {
            label:'Percent White Population'},  // custom label for X axis
            y: {
              label:'Percent Vaccinated with 1 or more MMR at 35 months',
              min: 80,
              max: 100,
              nice: false },    // custom label for Y axis
              padding: {b:40,l:40,t:10,r:10},   // chart paddings
              size: {
                minSize: 1,
                maxSize: 50
              }
            },
            data: usvaxx,
            type: 'scatterplot',
            x: 'PercentWhite',
            y: 'PercentVax',
            color: 'PercentUrban',
            size: 'PercentPoverty',
            plugins: [
              Taucharts.api.plugins.get('tooltip')({
                fields:['Location', 'PercentWhite', 'PercentVax', 'PercentPoverty', 'PercentUrban']
              }),
              Taucharts.api.plugins.get('legend')({
                position: 'bottom',
              }),
            ]
          }); // close tauchart
          chart.renderTo('#results');
          window.dispatchEvent(new Event('resize'));
        } //close success
      }); //close ajax
    }); // close document
