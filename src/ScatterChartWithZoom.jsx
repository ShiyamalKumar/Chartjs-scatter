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
  Chart
} from "chart.js";
import { Line, Scatter } from "react-chartjs-2";
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
  const chartRef = React.useRef(null);

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
      tooltipEl.style.borderRadius = "3px";
      tooltipEl.style.color = "white";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";

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

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement("thead");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement("span");
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = "2px";
        span.style.marginRight = "10px";
        span.style.height = "10px";
        span.style.width = "10px";
        span.style.display = "inline-block";

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = 0;

        const td = document.createElement("td");
        td.style.borderWidth = 0;

        const text = document.createTextNode(body);

        const link = document.createElement("a");
        link.href = tooltip.dataPoints[i].parsed.link;
        link.target = "_blank";
        link.textContent = "Open Link";
        link.style.cursor = "pointer";

        link.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        link.addEventListener("mouseover", () => {
          link.style.textDecoration = "underline";
        });

        link.addEventListener("mouseout", () => {
          link.style.textDecoration = "none";
        });

        td.appendChild(span);
        td.appendChild(text);
        td.appendChild(link);

        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
    tooltipEl.style.pointerEvents = "auto";
  };


  const data = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          {
            x: 2500000,
            y: 10,
            category: "Appetizer - Mexican",
            link: "http://example1.com",
          },
          {
            x: 4000000,
            y: 30,
            category: "Main Course - Italian",
            link: "http://example2.com",
          },
          {
            x: 5500000,
            y: 50,
            category: "Dessert - French",
            link: "http://example3.com",
          },
          {
            x: 8000000,
            y: 80,
            category: "Appetizer - Chinese",
            link: "http://example4.com",
          },
          {
            x: 11000000,
            y: 100,
            category: "Main Course - Indian",
            link: "http://example5.com",
          },
        ],
        backgroundColor: "#ED6E0C",
        borderColor: "#ED6E0C",
        borderWidth: 1,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointStyle: "circle",
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
    borderColor: 'rgb(45, 45, 46)',
    backgroundColor: 'rgba(147, 146, 148, 0.3)',
    borderWidth: 2,
  }
  const options = {
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
        ticks: {
          callback: function (value) {
            return `$${(value / 1000000).toFixed(2)}M`;
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.7)",
          lineWidth: 2,
          drawOnChartArea: false,
          borderDash: [5, 5],
        },
      },
      y: {
        min: 0,
        max: 120,
        title: {
          display: true,
          text: "Client Payment",
        },
        ticks: {
          callback: function (value) {
            return `$${value}`;
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.7)",
          lineWidth: 2,
          drawOnChartArea: false,
          borderDash: [5, 5],
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
        callbacks: {
          label: function (context) {
            const point = context.raw;
            return `Category: ${point.category} | Link: ${point.link}`;
          },
        },
        position: "nearest",
        enabled: false,
        external: externalTooltipHandler,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyFontColor: "white",
        bodyFontFamily: "Arial",
        bodyFontSize: 12,
        bodySpacing: 4,
        bodyFontStyle: "normal",
        padding: 8,
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
  }
  return <Scatter data={data} options={options} />
}

export default ScatterChartWithZoom;
