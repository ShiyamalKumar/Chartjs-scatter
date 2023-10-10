import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import annotationZoom from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  annotationZoom
);

function ScatterChartWithZoom() {
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
      tooltipEl.style.color = "white";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";
      tooltipEl.style.display = 'flex';
      tooltipEl.style.flexDirection = 'row';

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    tooltip.labelColors[0].backgroundColor = "#ffffff";
    tooltip.labelColors[0].borderColor = "#ffffff";

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;

      chart.data.datasets.forEach((dataset) => {
        dataset.pointBackgroundColor = dataset.data.map(() => "#ED6E0C");
        dataset.pointBorderColor = dataset.data.map(() => "#ED6E0C");
        dataset.pointRadius = 5;
      });

      chart.update();
      return;
    }

    if (tooltip.body) {
      const { dataIndex } = tooltip.dataPoints[0];
      const dataset = chart.data.datasets[0];

      dataset.pointBackgroundColor = dataset.data.map((_, index) =>
        index === dataIndex ? "#ffffff" : "#ED6E0C"
      );

      dataset.pointBorderColor = dataset.data.map((_, index) =>
        index === dataIndex ? "#ED6E0C" : "#ED6E0C"
      );
      dataset.pointRadius = dataset.data.map((_, index) =>
        index === dataIndex ? 7.5 : 5
      );

      chart.update();
    }

    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableBody1 = document.createElement("tbody");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const tr1 = document.createElement("tr");
        tr1.style.backgroundColor = "inherit";
        tr1.style.borderWidth = 0;

        const text = document.createTextNode(title.split(":")[1]);
        const div = document.createTextNode(title.split(":")[0] + ":")
        tr1.appendChild(div);

        tr.appendChild(text);
        tableBody1.appendChild(tr1)
        tableBody1.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const tr1 = document.createElement("tr");
        tr1.style.backgroundColor = "inherit";
        tr1.style.borderWidth = 0;

        const tr2 = document.createElement("tr");
        tr2.style.backgroundColor = "inherit";
        tr2.style.borderWidth = 0;
        tr2.style.fontWeight = 700

        const tr3 = document.createElement("tr");
        tr3.style.backgroundColor = "inherit";
        tr3.style.borderWidth = 0;

        const text1 = document.createTextNode(body[0].split(":")[1]);
        const text2 = document.createTextNode(body[0].split(":")[0] + ":")

        const link = document.createElement("a");
        link.href = tooltip.dataPoints[i].parsed.link;
        link.target = "_blank";
        link.textContent = "Update Dashboard";
        link.style.cursor = "pointer";
        link.style.color = "#C6430C";

        link.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        link.addEventListener("mouseover", () => {
          link.style.textDecoration = "underline";
        });

        link.addEventListener("mouseout", () => {
          link.style.textDecoration = "none";
        });

        tr1.appendChild(text1);
        tr2.appendChild(text2);
        tr3.appendChild(link);

        tableBody.appendChild(tr2);
        tableBody.appendChild(tr1);
        tableBody.appendChild(tr3);
      });

      const tableRoot = tooltipEl.querySelector("table");

      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      tableRoot.appendChild(tableBody);

      tooltipEl.addEventListener("click", (e) => {
        console.log("Sfdsfsf");
      });
      tooltipEl.style.backgroundColor = "white";
      tooltipEl.style.color = "#43364C";
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    tooltipEl.style.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.1)";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 90 + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + 10 + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
    tooltipEl.style.pointerEvents = "auto";
  };

  const data = {
    datasets: [
      {
        label: "Food categories",
        data: [
          {
            x: 2500000,
            y: 10,
            category: "Appetizer - Mexican",
            z: 999,
          },
          {
            x: 4000000,
            y: 30,
            category: "Main Course - Italian",
            z: 999,
          },
          {
            x: 5500000,
            y: 50,
            category: "Dessert - French",
            z: 999,
          },
          {
            x: 8000000,
            y: 80,
            category: "Appetizer - Chinese",
            z: 999,
          },
          {
            x: 11000000,
            y: 100,
            category: "Main Course - Indian",
            z: 999,
          },
        ],
        backgroundColor: "#ED6E0C",
        borderColor: "#ED6E0C",
        borderWidth: 1,
        pointRadius: 5,
        pointStyle: "circle",
        pointBackgroundColor: "#ED6E0C",
        pointBorderColor: "#ED6E0C",
        pointBorderWidth: 3,
        z: 99999
      },
    ],
  }

  var annotation = {
    type: 'line',
    yMin: 60,
    yMax: 60,
    borderColor: 'rgb(45, 45, 46)',
    borderWidth: 2,
  }
  var annotation2 = {
    type: 'line',
    xMin: 7000000,
    xMax: 7000000,
    borderColor: 'rgb(45, 45, 46)',
    borderWidth: 2,
  }
  var annotation3 = {
    type: 'box',
    xMin: 7000000,
    xMax: Infinity,
    yMin: 60,
    yMax: 1200000,
    z: 2,
    borderColor: 'rgb(45, 45, 46)',
    backgroundColor: '#F1F0F3',
    borderWidth: 0,
    drawTime: "beforeDraw"
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 2000000,
        max: 12000000,
        title: {
          display: true,
          text: "Invoice Savings",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
        ticks: {
          callback: function (value) {
            return `$${Math.round(value / 1000000)}M`;
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        min: 0,
        max: 120,
        title: {
          display: true,
          text: "Client Payment",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
        ticks: {
          callback: function (value) {
            return `$${Math.round(value)}`;
          },
          precision: 0,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          annotation,
          annotation2,
          annotation3
        }
      },
      zoom: {
        limits:
        {
          x: { min: 2000000, max: 12000000 },
          y: { min: 0, max: 120 },
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
      tooltip: {
        events: ["click"],
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const point = context.raw;
            return `Category: ${point.category}`;
          },
          labelPointStyle: function (context) {
            return {
              pointStyle: 'triangle',
              rotation: 0
            };
          }
        },
        position: "nearest",
        enabled: false,
        external: externalTooltipHandler,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyFontColor: "white",
        bodyFontFamily: "Arial",
        bodyFontSize: 14,
        bodySpacing: 4,
        bodyFontStyle: "normal",
        padding: 15,
        cornerRadius: 3,
        displayColors: false,
      },
    },
    onBeforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xAxis = chart.scales.x;
      const yAxis = chart.scales.y;

      ctx.clearRect(0, 0, chart.width, chart.height);

      const centerY = yAxis.getPixelForValue((yAxis.max + yAxis.min) / 2);
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(xAxis.left, centerY);
      ctx.lineTo(xAxis.right, centerY);
      ctx.stroke();

      const centerX = xAxis.getPixelForValue((xAxis.max + xAxis.min) / 2);
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.beginPath();
      ctx.moveTo(centerX, yAxis.top);
      ctx.lineTo(centerX, yAxis.bottom);
      ctx.stroke();
    },
    tooltips: { enabled: false },
    hover: { mode: null },
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", height: "400px" }}>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default ScatterChartWithZoom;
