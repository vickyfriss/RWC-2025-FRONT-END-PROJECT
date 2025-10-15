<template>
  <div class="p-4 w-full mx-auto">
    <div class="charts-grid">
      <!-- Top Players by Points -->
      <div class="chart-card">
        <h2 class="section-title">Top Players by Points</h2>
        <div ref="pointsChart" class="chart-container"></div>
      </div>

      <!-- Team Tries Comparison -->
      <div class="chart-card">
        <h2 class="section-title">Team Tries Comparison</h2>
        <div ref="teamTriesChart" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import Highcharts from "highcharts";
import { playerStats, teamStats } from "../assets/Data/Stats.js";

export default {
  name: "StatsCharts",
  setup() {
    const pointsChart = ref(null);
    const teamTriesChart = ref(null);

    onMounted(async () => {
      await nextTick();
      Highcharts.setOptions({ lang: { locale: 'en-US' } });

      const teamColors = {
        England: '#ffffff',
        "New Zealand": '#000000',
        Canada: '#ff0000',
        France: '#0055a4',
        Australia: '#ffcc00',
        USA: '#b22234',
        Scotland: '#0065bd',
        Ireland: '#009a44',
        Italy: '#0033a0',
        Japan: '#bc002d',
        Spain: '#ff0000',
        Fiji: '#00bfff',
        Wales: '#ff0000',
        Brazil: '#ffcc29',
        Samoa: '#00205b',
        "South Africa": '#006b3f'
      };

      // Top Players by Points
      Highcharts.chart(pointsChart.value, {
        chart: { type: 'column', backgroundColor: 'transparent', height: 400 },
        title: null,
        xAxis: {
          categories: playerStats.map(p => p.name),
          labels: { rotation: -45, style: { fontSize: '11px' } },
          title: { text: null }
        },
        yAxis: { min: 0, title: { text: null } },
        series: [{
          name: 'Points',
          data: playerStats.map(p => {
            if (p.team === 'England') {
              return { 
                y: p.points, 
                color: '#ffffff', 
                borderColor: '#d62728', 
                borderWidth: 2 
              };
            }
            return { 
              y: p.points, 
              color: teamColors[p.team] || '#7cb5ec' 
            };
          })
        }],
        tooltip: {
          formatter() {
            return `<b>${this.point.category}</b><br>Team: ${playerStats[this.point.index].team}<br>Points: ${this.y}`;
          }
        },
        credits: { enabled: false },
        plotOptions: { column: { borderRadius: 4 } }
      });

      // Team Tries Comparison
      Highcharts.chart(teamTriesChart.value, {
        chart: { type: 'column', backgroundColor: 'transparent', height: 400 },
        title: null,
        xAxis: { categories: teamStats.map(t => t.name), title: { text: null } },
        yAxis: { min: 0, title: { text: null } },
        series: [{
          name: 'Tries',
          data: teamStats.map(t => {
            if (t.name === 'England') {
              return { 
                y: t.tries, 
                color: '#ffffff', 
                borderColor: '#d62728', 
                borderWidth: 2 
              };
            }
            return { 
              y: t.tries, 
              color: teamColors[t.name] || '#7cb5ec' 
            };
          })
        }],
        credits: { enabled: false },
        plotOptions: { column: { borderRadius: 4 } }
      });
    });

    return { pointsChart, teamTriesChart };
  }
};
</script>

<style scoped>
.charts-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

.chart-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

/* Section title style matching Venues page */
.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

.chart-container {
  width: 100%;
  height: 400px;
}

/* Responsive: side by side on large screens */
@media (min-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
