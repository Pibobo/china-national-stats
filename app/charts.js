/* China in Numbers — hand-rolled SVG charts.
   No library, no network: every chart is drawn from the numbers in
   data.js as inline SVG, so the page works fully offline. */
"use strict";

var Charts = (function () {
  var NAVY = "#14365e";
  var RED = "#c8102e";
  var GOLD = "#b98a2f";
  var TEAL = "#177a6c";
  var SLATE = "#5b6b7f";
  var GRID = "#e6e0d2";
  var PALETTE = [NAVY, RED, GOLD, TEAL, "#7a4a8f", "#2e6f9e"];

  function num(n, decimals) {
    var parts = Number(n).toFixed(decimals === undefined ? 0 : decimals).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function yTicks(max, count) {
    var step = max / count;
    var out = [];
    for (var i = 0; i <= count; i++) out.push(i * step);
    return out;
  }

  /* Vertical bar chart. opts: labels, values, format, color,
     height, yLabel. Returns an SVG string. */
  function barChart(opts) {
    var labels = opts.labels;
    var values = opts.values;
    var fmt = opts.format || function (v) { return num(v); };
    var color = opts.color || NAVY;
    var W = 640, H = opts.height || 280;
    var padL = 56, padR = 12, padT = 26, padB = 34;
    var max = Math.max.apply(null, values) * 1.12;
    var iw = W - padL - padR, ih = H - padT - padB;
    var bw = iw / values.length;
    var s = "";
    s += '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Bar chart">';
    yTicks(max, 4).forEach(function (t) {
      var y = padT + ih - (t / max) * ih;
      s += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + SLATE + '">' + esc(fmt(t)) + "</text>";
    });
    values.forEach(function (v, i) {
      var bh = (v / max) * ih;
      var x = padL + i * bw + bw * 0.18;
      var y = padT + ih - bh;
      s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (bw * 0.64).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + color + '"><title>' + esc(labels[i]) + ": " + esc(fmt(v)) + "</title></rect>";
      s += '<text x="' + (x + bw * 0.32).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="' + NAVY + '">' + esc(fmt(v)) + "</text>";
      s += '<text x="' + (x + bw * 0.32).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="11" fill="' + SLATE + '">' + esc(labels[i]) + "</text>";
    });
    s += '<line x1="' + padL + '" y1="' + (padT + ih).toFixed(1) + '" x2="' + (W - padR) + '" y2="' + (padT + ih).toFixed(1) + '" stroke="' + SLATE + '" stroke-width="1.2"/>';
    s += "</svg>";
    return s;
  }

  /* Horizontal bar chart, for ranked lists. opts: labels, values,
     format, color, height. */
  function hbarChart(opts) {
    var labels = opts.labels;
    var values = opts.values;
    var fmt = opts.format || function (v) { return num(v); };
    var color = opts.color || NAVY;
    var rowH = 34, padL = 108, padR = 92, padT = 8;
    var W = 640, H = padT + values.length * rowH + 8;
    var max = Math.max.apply(null, values) * 1.08;
    var iw = W - padL - padR;
    var s = "";
    s += '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Ranked bar chart">';
    values.forEach(function (v, i) {
      var y = padT + i * rowH;
      var bw = (v / max) * iw;
      var fill = i === 0 ? RED : color;
      s += '<text x="' + (padL - 10) + '" y="' + (y + 19) + '" text-anchor="end" font-size="12" fill="' + NAVY + '">' + esc(labels[i]) + "</text>";
      s += '<rect x="' + padL + '" y="' + (y + 6) + '" width="' + bw.toFixed(1) + '" height="18" rx="3" fill="' + fill + '"><title>' + esc(labels[i]) + ": " + esc(fmt(v)) + "</title></rect>";
      s += '<text x="' + (padL + bw + 8).toFixed(1) + '" y="' + (y + 20) + '" font-size="12" font-weight="600" fill="' + NAVY + '">' + esc(fmt(v)) + "</text>";
    });
    s += "</svg>";
    return s;
  }

  /* Line chart with area fill and dot labels. opts: labels,
     values, format, color, height, yMin. */
  function lineChart(opts) {
    var labels = opts.labels;
    var values = opts.values;
    var fmt = opts.format || function (v) { return num(v); };
    var color = opts.color || RED;
    var W = 640, H = opts.height || 280;
    var padL = 56, padR = 16, padT = 26, padB = 34;
    var min = opts.yMin !== undefined ? opts.yMin : Math.min.apply(null, values) * 0.92;
    var max = Math.max.apply(null, values) * 1.06;
    var iw = W - padL - padR, ih = H - padT - padB;
    function X(i) { return padL + (i / (values.length - 1)) * iw; }
    function Y(v) { return padT + ih - ((v - min) / (max - min)) * ih; }
    var s = "";
    s += '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Line chart">';
    yTicks(max - min, 4).forEach(function (t) {
      var v = min + t;
      var y = Y(v);
      s += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + SLATE + '">' + esc(fmt(v)) + "</text>";
    });
    var area = "M" + X(0).toFixed(1) + "," + Y(values[0]).toFixed(1);
    var line = area;
    for (var i = 1; i < values.length; i++) {
      line += " L" + X(i).toFixed(1) + "," + Y(values[i]).toFixed(1);
    }
    area = line + " L" + X(values.length - 1).toFixed(1) + "," + (padT + ih).toFixed(1) + " L" + X(0).toFixed(1) + "," + (padT + ih).toFixed(1) + " Z";
    s += '<path d="' + area + '" fill="' + color + '" fill-opacity="0.08"/>';
    s += '<path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round"/>';
    values.forEach(function (v, i) {
      s += '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(v).toFixed(1) + '" r="4" fill="#fff" stroke="' + color + '" stroke-width="2.5"><title>' + esc(labels[i]) + ": " + esc(fmt(v)) + "</title></circle>";
      s += '<text x="' + X(i).toFixed(1) + '" y="' + (Y(v) - 10).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="' + NAVY + '">' + esc(fmt(v)) + "</text>";
      s += '<text x="' + X(i).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="11" fill="' + SLATE + '">' + esc(labels[i]) + "</text>";
    });
    s += "</svg>";
    return s;
  }

  /* Grouped bars, two series side by side. opts: labels, series
     [{name, values, color}], format. */
  function groupedBars(opts) {
    var labels = opts.labels;
    var series = opts.series;
    var fmt = opts.format || function (v) { return num(v); };
    var W = 640, H = opts.height || 280;
    var padL = 56, padR = 12, padT = 26, padB = 34;
    var all = [];
    series.forEach(function (srs) { all = all.concat(srs.values); });
    var max = Math.max.apply(null, all) * 1.12;
    var iw = W - padL - padR, ih = H - padT - padB;
    var gw = iw / labels.length;
    var bw = gw * 0.32;
    var s = "";
    s += '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Grouped bar chart">';
    yTicks(max, 4).forEach(function (t) {
      var y = padT + ih - (t / max) * ih;
      s += '<line x1="' + padL + '" y1="' + y.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + y.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<text x="' + (padL - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + SLATE + '">' + esc(fmt(t)) + "</text>";
    });
    labels.forEach(function (lab, i) {
      series.forEach(function (srs, j) {
        var v = srs.values[i];
        var bh = (v / max) * ih;
        var x = padL + i * gw + gw * 0.5 - bw + j * bw;
        var y = padT + ih - bh;
        s += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + srs.color + '"><title>' + esc(lab) + " " + esc(srs.name) + ": " + esc(fmt(v)) + "</title></rect>";
        s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="' + NAVY + '">' + esc(fmt(v)) + "</text>";
      });
      s += '<text x="' + (padL + i * gw + gw * 0.5).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="11" fill="' + SLATE + '">' + esc(lab) + "</text>";
    });
    s += '<g font-size="12" fill="' + NAVY + '">';
    series.forEach(function (srs, j) {
      var lx = padL + j * 150;
      s += '<rect x="' + lx + '" y="4" width="12" height="12" rx="2" fill="' + srs.color + '"/>';
      s += '<text x="' + (lx + 18) + '" y="14">' + esc(srs.name) + "</text>";
    });
    s += "</g></svg>";
    return s;
  }

  /* Donut chart. opts: segments [{label, value, color}], center
     (two lines), size. A legend is rendered beside it by the
     caller through donutLegend. */
  function donut(opts) {
    var segs = opts.segments;
    var size = opts.size || 220;
    var cx = size / 2, cy = size / 2, r = size / 2 - 12, inner = r * 0.62;
    var total = 0;
    segs.forEach(function (g) { total += g.value; });
    var s = "";
    s += '<svg viewBox="0 0 ' + size + " " + size + '" role="img" aria-label="Donut chart" style="max-width:' + size + 'px">';
    var a0 = -Math.PI / 2;
    segs.forEach(function (g, i) {
      var frac = g.value / total;
      var a1 = a0 + frac * Math.PI * 2;
      var large = frac > 0.5 ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
      var xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
      var color = g.color || PALETTE[i % PALETTE.length];
      s += '<path d="M' + x0.toFixed(1) + "," + y0.toFixed(1) + " A" + r + "," + r + " 0 " + large + " 1 " + x1.toFixed(1) + "," + y1.toFixed(1) + " L" + xi1.toFixed(1) + "," + yi1.toFixed(1) + " A" + inner.toFixed(1) + "," + inner.toFixed(1) + " 0 " + large + " 0 " + xi0.toFixed(1) + "," + yi0.toFixed(1) + ' Z" fill="' + color + '"><title>' + esc(g.label) + ": " + esc(num(g.value, 1)) + "%</title></path>";
      a0 = a1;
    });
    if (opts.center) {
      s += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="22" font-weight="700" fill="' + NAVY + '">' + esc(opts.center[0]) + "</text>";
      s += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="' + SLATE + '">' + esc(opts.center[1]) + "</text>";
    }
    s += "</svg>";
    return s;
  }

  function donutLegend(segs) {
    var s = '<ul class="legend">';
    segs.forEach(function (g, i) {
      var color = g.color || PALETTE[i % PALETTE.length];
      s += '<li><span class="swatch" style="background:' + color + '"></span><strong>' + esc(g.label) + "</strong> — " + esc(num(g.value, 1)) + "%</li>";
    });
    return s + "</ul>";
  }

  return {
    num: num,
    esc: esc,
    barChart: barChart,
    hbarChart: hbarChart,
    lineChart: lineChart,
    groupedBars: groupedBars,
    donut: donut,
    donutLegend: donutLegend,
    colors: { navy: NAVY, red: RED, gold: GOLD, teal: TEAL, slate: SLATE }
  };
})();
