/* Ingredientes y alérgenos — datos de picoteos.net/alérgenos-e-ingredientes */
(function () {
  "use strict";
  var ALG = [
    ["gluten", "Gluten"], ["crustaceos", "Crustáceos"], ["huevo", "Huevo"], ["pescado", "Pescado"],
    ["cacahuetes", "Cacahuetes"], ["soja", "Soja"], ["lacteos", "Lácteos"], ["frutos", "Frutos de cáscara"],
    ["apio", "Apio"], ["mostaza", "Mostaza"], ["sesamo", "Sésamo"], ["sulfitos", "Sulfitos"],
    ["altramuces", "Altramuces"], ["moluscos", "Moluscos"]
  ];
  var NOMBRE = {}; ALG.forEach(function (a) { NOMBRE[a[0]] = a[1]; });

  var DATA = [
    { s: "Complementos", r: [
      ["Tortilla con cebolla", "Patatas, huevo, sal, aceite y cebolla.", ["huevo"]],
      ["Tortilla de patatas", "Patatas, huevo y sal.", ["huevo"]],
      ["Patatas alioli", "Patatas, leche, sal, ajo, perejil, aceite de oliva, aceite de girasol y sal.", ["lacteos"]]
    ]},
    { s: "Platos fríos", r: [
      ["Ensaladilla de gambas", "Patatas, gambas, delicias de mar, mayonesa, sal y cebolla.", ["sulfitos", "moluscos", "huevo"]],
      ["Aliño de patatas", "Patata, tomate, caballa, cebolla, pimiento, huevo, aceite de oliva, vinagre y sal.", ["pescado", "sulfitos", "huevo"]],
      ["Salmorejo", "Tomate, ajo, sal, aceite de oliva, aceite de girasol, jamón, huevo duro y pan.", ["gluten", "huevo"]],
      ["Pastel vegetal", "Lechuga, atún, huevo duro, mayonesa, leche, sal, limón, vinagre, aceite de girasol, aceite de oliva, ketchup, tomate frito, pimienta, pan de sándwich y brandy.", ["lacteos", "pescado", "gluten", "sulfitos", "huevo"]],
      ["Aliño de pulpo", "Cebolla, tomate, pimiento, pulpo, aceite de oliva, vinagre y sal.", ["sulfitos", "moluscos"]],
      ["Salpicón de marisco", "Cebolla, pimiento, tomate, delicias de mar, langostinos, aceite de oliva, vinagre y sal.", ["sulfitos", "moluscos"]],
      ["Ensaladilla rusa", "Patata, zanahoria, guisante, atún, huevo duro, sal, mayonesa, vinagre y limón.", ["pescado", "sulfitos", "huevo"]],
      ["Aliño de huevas", "Tomate, pimiento, cebolla, huevas, vinagre, sal y aceite de oliva.", ["pescado", "sulfitos"]],
      ["Ensalada completa", "Lechuga, tomate, espárragos, huevo, zanahoria, atún y maíz.", ["pescado", "huevo"]],
      ["Ensalada de pasta", "Pasta, cebolla, pimiento, atún, vinagre, maíz, zanahoria, sal, aceite de oliva, delicias de mar y huevo duro.", ["gluten", "sulfitos", "crustaceos", "pescado", "huevo"]],
      ["Pimientos asados", "Pimientos, cebolla, melva, aceite de oliva, sal y vinagre.", ["pescado"]],
      ["Ensalada de pollo asado", "Lechuga, maíz, zanahoria y pollo asado.", []],
      ["Cocktail de marisco", "Lechuga, delicias de mar y langostinos.", ["crustaceos", "pescado", "moluscos"]]
    ]},
    { s: "Pastas", r: [
      ["Berenjena rellena", "Berenjena, ajo, cebolla, pimiento rojo, pimiento verde, magro de pollo, tomate frito, especias, aceite de oliva, brandy, queso y sal.", ["lacteos"]],
      ["Macarrones boloñesa", "Pasta, cebolla, ajo, aceite de oliva, magro de pollo, tomate frito, tomate triturado, orégano, brandy, sal y pimienta.", ["gluten"]],
      ["Lasaña", "Tomate frito, pasta, cebolla, ajo, aceite de oliva, orégano, pimienta, magro de pollo, queso, brandy y sal.", ["gluten", "lacteos"]],
      ["Pasta de la casa", "Pasta, cebolla, ajo, pimiento verde y rojo, pollo asado, brandy, salsa de soja, azúcar, aceite de oliva y sal.", ["soja", "gluten"]]
    ]},
    { s: "Postres", r: [
      ["Natillas", "Leche, canela, limón, azúcar, preparado de natillas y galletas.", ["lacteos", "soja", "huevo", "gluten"]]
    ]},
    { s: "Carnes", r: [
      ["Solomillo al Whisky", "Solomillo de cerdo, aceite de oliva, ajo, vino, brandy, pimienta, sal y zumo de limón.", ["sulfitos"]],
      ["Pechuga al Whisky", "Solomillo de cerdo, aceite de oliva, ajo, vino, brandy, pimienta, sal y zumo de limón.", ["sulfitos"]],
      ["Pechuga Roquefort", "Pechuga de pollo, leche, sal, pimienta, limón, aceite de oliva, margarina, maizena y queso roquefort.", ["lacteos"]],
      ["Lomo al Whisky", "Lomo de cerdo, aceite de oliva, ajo, vino, brandy, pimienta, sal y zumo de limón.", ["sulfitos"]],
      ["Solomillo al Pedro Ximénez", "Solomillo, cebolla, uvas pasas, sal, aceite de oliva, maizena y vino Pedro Ximénez.", ["sulfitos"]]
    ]},
    { s: "Guisos", r: [
      ["Espinacas con garbanzos", "Espinacas, ajo, especias, garbanzos, aceite de oliva, vinagre, pan y sal.", ["sulfitos", "gluten"]],
      ["Albóndigas en salsa", "Albóndigas de pollo, cebolla, ajo, pimiento rojo y verde, sal, colorante alimenticio, tomate frito, brandy, zanahoria, guisantes, pan rallado y aceite de oliva.", ["gluten"]],
      ["Mini salchichas encebolladas", "Salchichas de pollo, cebolla, ajo, sal y vino.", ["sulfitos"]],
      ["Bacalao con tomate", "Bacalao, pimiento rojo, pimiento verde, ajo, cebolla, sal, aceite de oliva, tomate frito y tomate triturado.", ["pescado"]],
      ["Merluza en salsa verde", "Merluza, ajo, aceite de oliva, sal, limón y perejil.", ["pescado"]],
      ["Merluza a la marinera", "Merluza, calamar, salsa de carabineros, cebolla, pimiento, tomate, ajo, aceite de oliva, sal, vino, brandy y gambas.", ["crustaceos", "pescado", "moluscos"]],
      ["Gambas al ajillo con anguriñas", "Gambas, anguriñas, aceite de oliva, ajo, sal, vino y salsa de carabineros.", ["crustaceos", "huevo", "moluscos", "pescado", "soja"]],
      ["Chipirón en salsa verde", "Chipirón, ajo, aceite de oliva virgen extra, limón, perejil y sal.", ["moluscos"]],
      ["Carrillada en salsa", "Carrillada de cerdo, aceite de oliva, ajo, vino, brandy, pimienta, sal y zumo de limón.", []],
      ["Pisto", "Pimiento rojo y verde, cebolla, ajo, berenjena, calabacín, aceite de oliva, tomate frito y sal.", []],
      ["Habas con jamón y ajetes", "Habas, ajetes tiernos, jamón, aceite de oliva, sal, cebolla, pimentón y brandy.", []],
      ["Garbanzos con gambas", "Garbanzos, cebolla, ajo, pimentón, aceite de oliva, sal, pimiento rojo, brandy, salsa de carabineros y gambas.", ["crustaceos"]],
      ["Pez espada en salsa verde", "Pez espada, ajo, aceite de oliva, sal, limón y perejil.", []],
      ["Higaditos de pollo al jerez", "Higaditos de pollo, ajo, aceite de oliva, especias, brandy y sal.", []],
      ["Pollo a la cerveza", "Contramuslos de pollo sin hueso, champiñones, cebolla, ajo, aceite de oliva, sal, brandy, cerveza y especias.", []],
      ["Migas con chorizo", "Pan, aceite de oliva, ajo, pimiento, panceta, chorizo y sal.", ["gluten"]],
      ["Patatas panaderas", "Patatas, sal, pimiento rojo y verde, cebolla, ajo y aceite de oliva.", []],
      ["Champiñón en salsa verde", "Champiñones, ajo, aceite de oliva, sal, limón y perejil.", []],
      ["Arroz con leche", "Arroz, leche, azúcar, limón y canela.", ["lacteos"]]
    ]},
    { s: "Salsas", r: [
      ["Salsa rosa", "Mayonesa, ketchup, brandy y pimienta.", ["huevo"]],
      ["Salsa alioli", "Leche, sal, ajo, perejil, aceite de girasol y aceite de oliva.", ["lacteos"]]
    ]}
  ];

  var ico = function (id, cls) { return '<svg class="alg-ico ' + (cls || "") + '" role="img" aria-label="' + NOMBRE[id] + '"><use href="#alg-' + id + '"/></svg>'; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };

  // alérgenos presentes en la carta
  var usados = {};
  DATA.forEach(function (sec) { sec.r.forEach(function (r) { r[2].forEach(function (a) { usados[a] = true; }); }); });

  // leyenda / filtros
  var grid = document.getElementById("alg-grid");
  grid.innerHTML = ALG.map(function (a) {
    var dis = !usados[a[0]];
    return '<button type="button" class="alg-btn" data-alg="' + a[0] + '" aria-pressed="false"' + (dis ? ' disabled title="Ningún plato de la lista lo contiene"' : "") + ">" +
      '<svg class="alg-ico" aria-hidden="true"><use href="#alg-' + a[0] + '"/></svg><span>' + a[1] + "</span></button>";
  }).join("");

  // listado
  var list = document.getElementById("recetas");
  list.innerHTML = DATA.map(function (sec, si) {
    return '<section class="alg-section reveal" data-sec="' + si + '">' +
      '<div class="alg-section__title"><img src="assets/icono-carta.svg" alt="" aria-hidden="true"><h2>' + esc(sec.s) + "</h2></div>" +
      '<ul class="platos">' + sec.r.map(function (r) {
        var chips = r[2].length
          ? r[2].map(function (a) { return '<span class="chip">' + ico(a) + "<span>" + NOMBRE[a] + "</span></span>"; }).join("")
          : '<span class="chip chip--none">Sin alérgenos declarados</span>';
        return '<li class="receta" data-alg="' + r[2].join(" ") + '" data-q="' + esc(norm(r[0] + " " + r[1])) + '"><h3>' + esc(r[0]) + "</h3><p>" + esc(r[1]) + '</p><div class="receta__alg" aria-label="Alérgenos">' + chips + "</div></li>";
      }).join("") + "</ul></section>";
  }).join("");

  // filtrado: "sin estos alérgenos" + búsqueda
  var excl = {}, q = "";
  var estado = document.getElementById("filtro-estado"), vacio = document.getElementById("sin-resultados");
  var aplicar = function () {
    var ex = Object.keys(excl), total = 0;
    document.querySelectorAll(".alg-section").forEach(function (sec) {
      var vis = 0;
      sec.querySelectorAll(".receta").forEach(function (li) {
        var al = li.dataset.alg ? li.dataset.alg.split(" ") : [];
        var ok = ex.every(function (e) { return al.indexOf(e) === -1; }) && (!q || li.dataset.q.indexOf(q) !== -1);
        li.hidden = !ok; if (ok) vis++;
      });
      sec.hidden = vis === 0; total += vis;
    });
    vacio.classList.toggle("show", total === 0);
    if (ex.length) {
      estado.innerHTML = "Mostrando <b>" + total + "</b> platos sin " + ex.map(function (e) { return NOMBRE[e].toLowerCase(); }).join(", ") + '<button type="button" id="limpiar">Quitar filtros</button>';
      document.getElementById("limpiar").onclick = function () {
        excl = {}; grid.querySelectorAll(".alg-btn").forEach(function (b) { b.setAttribute("aria-pressed", "false"); }); aplicar();
      };
    } else {
      estado.textContent = total + " recetas" + (q ? " encontradas" : "");
    }
  };
  grid.addEventListener("click", function (e) {
    var b = e.target.closest(".alg-btn"); if (!b || b.disabled) return;
    var id = b.dataset.alg, on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", on ? "true" : "false");
    if (on) excl[id] = true; else delete excl[id];
    aplicar();
  });
  document.getElementById("buscar").addEventListener("input", function (e) { q = norm(e.target.value.trim()); aplicar(); });
  aplicar();
})();
