<template>
    <div class="stats-charts">
      <div id="points-chart" class="chart-container"></div>
      <div id="team-chart" class="chart-container"></div>
      <div id="runs-tries-chart" class="chart-container"></div>
    </div>
  </template>
  
  <script>
  import Highcharts from "highcharts";
  import { playerStats, teamStats } from "../assets/Data/Stats.js";

  
  export default {
    name: "StatsCharts",
    mounted() {
      this.renderPointsChart();
      this.renderTeamChart();
      this.renderRunsTriesChart();
    },
    methods: {
      renderPointsChart() {
        Highcharts.chart("points-chart", {
          chart: { type: "column" },
          title: { text: "Top 10 Players by Points", style: { color: "#c20d2d", fontWeight: "bold" } },
          xAxis: {
            categories: playerStats.sort((a, b) => b.points - a.points).slice(0, 10).map(p => p.name)
          },
          yAxis: { min: 0, title: { text: "Points" } },
          series: [{
            name: "Points",
            data: playerStats.sort((a, b) => b.points - a.points).slice(0, 10).map(p => p.points),
            color: "#c20d2d"
          }]
        });
      },
      renderTeamChart() {
        Highcharts.chart("team-chart", {
          chart: { type: "column" },
          title: { text: "Team Performance", style: { color: "#c20d2d", fontWeight: "bold" } },
          xAxis: { categories: teamStats.map(t => t.name) },
          yAxis: { min: 0, title: { text: "Total Stats" }, stackLabels: { enabled: true } },
          plotOptions: { column: { stacking: "normal" } },
          series: [
            { name: "Tries", data: teamStats.map(t => t.tries), color: "#ffd700" },
            { name: "Points", data: teamStats.map(t => t.points), color: "#c20d2d" },
            { name: "Tackles", data: teamStats.map(t => t.tackles), color: "#1e90ff" }
          ]
        });
      },
      renderRunsTriesChart() {
        Highcharts.chart("runs-tries-chart", {
          chart: { type: "scatter", zoomType: "xy" },
          title: { text: "Player Effectiveness: Runs vs Tries", style: { color: "#c20d2d", fontWeight: "bold" } },
          xAxis: { title: { text: "Runs (Total)" } },
          yAxis: { title: { text: "Tries (Total)" } },
          tooltip: {
            formatter: function () { return `<b>${this.point.name}</b><br>Runs: ${this.x}<br>Tries: ${this.y}`; }
          },
          series: [{
            name: "Players",
            data: playerStats.map(p => ({ x: p.runs, y: p.tries, name: p.name, team: p.team })),
            color: "#c20d2d",
            marker: { radius: 6 }
          }]
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    max-width: 900px;
    margin: 40px auto;
  }
  </style>
  