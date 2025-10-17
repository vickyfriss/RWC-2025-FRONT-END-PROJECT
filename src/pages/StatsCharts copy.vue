<template>
  <div class="p-4 sm:p-8 w-[95%] mx-auto">
    <div class="charts-grid">
      <!-- Top Players Chart -->
      <div class="chart-card">
        <h2 class="section-title">Top 20 Players by Points</h2>
        <div ref="pointsChart" class="chart-container"></div>
      </div>

      <!-- Team Tries Chart -->
      <div class="chart-card">
        <h2 class="section-title">Team Tries Comparison</h2>
        <div ref="teamTriesChart" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Highcharts from "highcharts";
import { playerStats } from "../assets/Data/Stats.js";
import { groups } from "../assets/Data/PoolsData.js";

const pointsChart = ref(null);
const teamTriesChart = ref(null);

const teamStats = groups
  .flatMap((g) =>
    g.teams.map((t) => ({
      name: t.name,
      flag: t.flag,
      tries: t.triesFor,
    }))
  )
  .sort((a, b) => b.tries - a.tries);

const teamColors = {
  England: "#ffffff",
  "New Zealand": "#000000",
  Canada: "#ff0000",
  France: "#0055a4",
  Australia: "#ffcc00",
  USA: "#b22234",
  Scotland: "#0065bd",
  Ireland: "#009a44",
  Italy: "#0033a0",
  Japan: "#bc002d",
  Spain: "#ff0000",
  Fiji: "#00bfff",
  Wales: "#ff0000",
  Brazil: "#ffcc29",
  Samoa: "#00205b",
  "South Africa": "#006b3f",
};

Highcharts.setOptions({ lang: { locale: "en" } });

const initCharts = () => {
  if (!pointsChart.value || !teamTriesChart.value) return;

  const isMobile = window.innerWidth < 640;
  const chartHeight = isMobile ? 280 : 420;
  const marginBottom = isMobile ? 20 : 140; // <-- dynamic bottom margin

  // ---- Top Players Chart ----
  const topPlayers = [...playerStats]
    .sort((a, b) => b.points - a.points)
    .slice(0, 20);

  const categories = topPlayers.map((p) => {
    const parts = p.name.split(" ");
    if (parts.length > 1) {
      return parts[0][0].toUpperCase() + ". " + parts.slice(1).join(" ");
    }
    return p.name;
  });

  const pointsData = topPlayers.map((p) => ({
    y: p.points,
    color: p.team === "England" ? "#ffffff" : teamColors[p.team] || "#7cb5ec",
    borderColor: p.team === "England" ? "#d62728" : null,
    borderWidth: p.team === "England" ? 2 : 0,
    player: p,
  }));

  Highcharts.chart(pointsChart.value, {
    chart: { 
      type: "column", 
      backgroundColor: "transparent", 
      height: chartHeight, 
      marginBottom: isMobile ? 95 : 140,
    },
    title: null,
    credits: { enabled: false },
    legend: { enabled: false },
    plotOptions: { column: { borderRadius: 4, pointPadding: isMobile ? 0.05 : 0.1, groupPadding: isMobile ? 0.05 : 0.1 } },
    xAxis: {
      categories,
      labels: { 
        rotation: isMobile ? -80 : -80, 
        style: { fontSize: isMobile ? "10px" : "clamp(11px,1vw,15px)" }, 
        y: isMobile ? 10 : 10
      },
      lineWidth: 1,
      tickLength: 0,
      title: { text: null },
    },
    yAxis: { visible: true, gridLineWidth: 1, lineWidth: 1, tickLength: 5, title: { text: null }, labels: { enabled: false } },
    series: [{ name: "# of Points", data: pointsData }],
    tooltip: {
      useHTML: true,
      style: { fontSize: isMobile ? "10px" : "clamp(12px,1vw,15px)" },
      formatter() {
        const p = this.point.player;
        let html = `<b>${p.name}</b><br>`;
        for (const key in p) if (key !== "name") html += `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${p[key]}<br>`;
        return html;
      },
    },
  });

  // ---- Team Tries Chart ----
  const flagWidth = isMobile ? 18 : 28;
  const staggerOffset = isMobile ? 6 : 0;

  Highcharts.chart(teamTriesChart.value, {
    chart: { type: "column", backgroundColor: "transparent", height: chartHeight, marginBottom: marginBottom },
    title: null,
    credits: { enabled: false },
    legend: { enabled: false },
    plotOptions: { column: { borderRadius: 4, pointPadding: isMobile ? 0.05 : 0.1, groupPadding: isMobile ? 0.05 : 0.1 } },
    xAxis: {
      categories: teamStats.map((t) => t.name),
      labels: {
        useHTML: true,
        rotation: 0,
        style: { fontSize: "0px" },
        formatter() {
          const team = teamStats[this.pos];
          const offset = isMobile && this.pos % 2 === 1 ? staggerOffset : 0;
          return `<div style="display:flex;justify-content:center;margin-top:${offset}px;">
                    <img src="${team.flag}" alt="${team.name}" width="${flagWidth}" style="height:auto;" />
                  </div>`;
        },
        y: 10,
      },
      lineWidth: 1,
      tickLength: 0,
      title: { text: null },
    },
    yAxis: { visible: true, gridLineWidth: 1, lineWidth: 1, tickLength: 5, title: { text: null }, labels: { enabled: false } },
    series: [{ name: "# of Tries", color: "#1976d2", data: teamStats.map((t) => ({ y: t.tries, team: t })) }],
    tooltip: {
      useHTML: true,
      style: { fontSize: isMobile ? "10px" : "clamp(12px,1vw,15px)" },
      formatter() {
        const t = this.point.team;
        return `<b>${t.name}</b><br>Tries: ${t.tries}`;
      },
    },
  });
};

onMounted(async () => {
  await nextTick();
  initCharts();
  window.addEventListener("resize", () => initCharts());
});
</script>

<style scoped>
.charts-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}
.chart-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.section-title {
  font-size: clamp(1.25rem,2vw,1.8rem);
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 15px;
  text-align: center;
}
.chart-container {
  width: 100%;
  min-height: 300px;
  overflow: visible;
}
@media (min-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
}
</style>
