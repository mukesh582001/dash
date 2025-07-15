const leadData = [
  { source: "IBS Leads", total: 572, connected: 152, notInterested: 22, notConnected: 398, meetings: 98, quote: 12, converted: 9, revenueNew: 12028, revenueExisting: 0, percentConverted: 9.18 },
  { source: "Non-IBS Leads", total: 141, connected: 94, notInterested: 19, notConnected: 28, meetings: 91, quote: 18, converted: 17, revenueNew: 33609, revenueExisting: 55480, percentConverted: 18.68 },
  { source: "Do Not Meet Leads", total: 107, connected: 16, notInterested: 5, notConnected: 86, meetings: 4, quote: 0, converted: 0, revenueNew: 0, revenueExisting: 0, percentConverted: 0.00 },
  { source: "Lost Client Leads", total: 27, connected: 4, notInterested: 2, notConnected: 21, meetings: 2, quote: 1, converted: 2, revenueNew: 0, revenueExisting: 700, percentConverted: 100.00 },
  { source: "Decreased Revenue", total: 10, connected: 3, notInterested: 0, notConnected: 7, meetings: 1, quote: 1, converted: 1, revenueNew: 0, revenueExisting: 36225, percentConverted: 100.00 },
  { source: "Total", total: 857, connected: 269, notInterested: 48, notConnected: 540, meetings: 196, quote: 31, converted: 29, revenueNew: 46087, revenueExisting: 92405, percentConverted: "-" }
];

// Populate Table
document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('#lead-table tbody');
  leadData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.source}</td>
      <td>${row.total}</td>
      <td>${row.connected}</td>
      <td>${row.notInterested}</td>
      <td>${row.notConnected}</td>
      <td>${row.meetings}</td>
      <td>${row.quote}</td>
      <td>${row.converted}</td>
      <td>${row.revenueNew.toLocaleString()}</td>
      <td>${row.revenueExisting.toLocaleString()}</td>
      <td>${row.percentConverted === "-" ? "-" : row.percentConverted + "%"}</td>
    `;
    tbody.appendChild(tr);
  });

  // Chart.js - Bar Chart: Total Leads by Lead Source
  const barCtx = document.getElementById('barChart').getContext('2d');
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: leadData.slice(0, -1).map(d => d.source),
      datasets: [{
        label: 'Total Leads',
        data: leadData.slice(0, -1).map(d => d.total),
        backgroundColor: '#4f8cff',
        borderRadius: 8,
        maxBarThickness: 38
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 100 } }
      }
    }
  });

  // Chart.js - Bar Chart: % Demo Converted per Lead Source
  const percentCtx = document.getElementById('percentChart').getContext('2d');
  new Chart(percentCtx, {
    type: 'bar',
    data: {
      labels: leadData.slice(0, -1).map(d => d.source),
      datasets: [{
        label: '% Demo Converted',
        data: leadData.slice(0, -1).map(d => d.percentConverted),
        backgroundColor: '#00c49a',
        borderRadius: 8,
        maxBarThickness: 38
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
      }
    }
  });

  // Chart.js - Pie Chart: Revenue Distribution (New vs Existing Clients)
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const totalNew = leadData.slice(0, -1).reduce((sum, d) => sum + d.revenueNew, 0);
  const totalExisting = leadData.slice(0, -1).reduce((sum, d) => sum + d.revenueExisting, 0);
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['New Clients', 'Existing Clients'],
      datasets: [{
        data: [totalNew, totalExisting],
        backgroundColor: ['#4f8cff', '#ffb347'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 14 } }
        }
      }
    }
  });

  // --- Stacked Bar Chart: Lead Status Breakdown ---
  const stackedBarCtx = document.getElementById('stackedBarChart').getContext('2d');
  new Chart(stackedBarCtx, {
    type: 'bar',
    data: {
      labels: leadData.slice(0, -1).map(d => d.source),
      datasets: [
        {
          label: 'Connected',
          data: leadData.slice(0, -1).map(d => d.connected),
          backgroundColor: '#4f8cff',
        },
        {
          label: 'Not Interested',
          data: leadData.slice(0, -1).map(d => d.notInterested),
          backgroundColor: '#ffb347',
        },
        {
          label: 'Not Connected',
          data: leadData.slice(0, -1).map(d => d.notConnected),
          backgroundColor: '#e0e7ff',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });

  // --- Doughnut Chart: Converted Leads by Source ---
  const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
  new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
      labels: leadData.slice(0, -1).map(d => d.source),
      datasets: [{
        data: leadData.slice(0, -1).map(d => d.converted),
        backgroundColor: [
          '#4f8cff', '#00c49a', '#ffb347', '#e57373', '#a283e6'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 14 } }
        }
      }
    }
  });

  // --- Horizontal Bar Chart: Meetings vs Quotes ---
  const horizontalBarCtx = document.getElementById('horizontalBarChart').getContext('2d');
  new Chart(horizontalBarCtx, {
    type: 'bar',
    data: {
      labels: leadData.slice(0, -1).map(d => d.source),
      datasets: [
        {
          label: 'Meetings Performed',
          data: leadData.slice(0, -1).map(d => d.meetings),
          backgroundColor: '#4f8cff',
        },
        {
          label: 'Quote Requested',
          data: leadData.slice(0, -1).map(d => d.quote),
          backgroundColor: '#00c49a',
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: {
        x: { beginAtZero: true }
      }
    }
  });

  // --- Radar Chart: Lead Source Comparison ---
  const radarCtx = document.getElementById('radarChart').getContext('2d');
  new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: ['Connected', 'Meetings', 'Converted'],
      datasets: leadData.slice(0, -1).map((d, i) => ({
        label: d.source,
        data: [d.connected, d.meetings, d.converted],
        fill: true,
        backgroundColor: [
          'rgba(79,140,255,0.12)',
          'rgba(0,196,154,0.12)',
          'rgba(255,179,71,0.12)',
          'rgba(229,115,115,0.12)',
          'rgba(162,131,230,0.12)'
        ][i],
        borderColor: [
          '#4f8cff', '#00c49a', '#ffb347', '#e57373', '#a283e6'
        ][i],
        pointBackgroundColor: [
          '#4f8cff', '#00c49a', '#ffb347', '#e57373', '#a283e6'
        ][i]
      }))
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 13 } }
        }
      },
      elements: {
        line: { borderWidth: 2 }
      }
    }
  });
}); 