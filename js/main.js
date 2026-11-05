/* Picoteo's — interacción y animaciones */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Navegación: se oculta al bajar y aparece al subir ---------- */
  var nav = $("#nav");
  if (nav) {
    var lastY = window.scrollY, ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > 160 && y > lastY + 4) nav.classList.add("is-hidden");
        else if (y < lastY - 4 || y < 160) nav.classList.remove("is-hidden");
        lastY = y; ticking = false;
      });
    }, { passive: true });
    nav.addEventListener("focusin", function () { nav.classList.remove("is-hidden"); });

    // enlace activo según la sección visible
    var links = $$('.nav__links a[href^="#"]');
    var map = links.map(function (a) { return [a, document.getElementById(a.getAttribute("href").slice(1))]; }).filter(function (p) { return p[1]; });
    if ("IntersectionObserver" in window && map.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          map.forEach(function (p) { p[0].classList.toggle("is-active", p[1] === e.target); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      map.forEach(function (p) { io.observe(p[1]); });
    }
  }

  /* ---------- Revelado al hacer scroll ---------- */
  var revealEls = $$(".reveal, .zoom-in, .hero, .ticket-slot");
  if ("IntersectionObserver" in window && !reduce) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); rio.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { rio.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }
  var hero = $(".hero");
  if (hero) requestAnimationFrame(function () { setTimeout(function () { hero.classList.add("is-in"); }, 80); });

  /* ---------- Parallax suave ---------- */
  if (!reduce) {
    var heroImg = $("[data-parallax]");
    var planBg = $("[data-parallax-bg]");
    var planCard = planBg && planBg.closest(".plan__card");
    if (heroImg && window.matchMedia("(pointer: fine)").matches) {
      hero.addEventListener("mousemove", function (ev) {
        var r = hero.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
        heroImg.style.transform = "translate3d(" + (x * -18) + "px," + (y * -12) + "px,0)";
      });
      hero.addEventListener("mouseleave", function () { heroImg.style.transform = ""; });
      heroImg.style.transition = "transform .8s cubic-bezier(.22,1,.36,1), opacity 1.2s";
    }
    if (planBg) {
      var onScroll = function () {
        var r = planCard.getBoundingClientRect(), vh = window.innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        planBg.style.transform = "scale(1.03) translate3d(0," + (p * 10).toFixed(1) + "px,0)";
      };
      window.addEventListener("scroll", function () { requestAnimationFrame(onScroll); }, { passive: true });
      onScroll();
    }
  }

  /* ---------- Carta con pestañas ---------- */
  var tabsEl = $("#tabs"), platosEl = $("#platos"), seccionEl = $("#carta-seccion"), panel = $("#carta-panel");
  if (tabsEl && window.CARTA) {
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    window.CARTA.forEach(function (sec, i) {
      var b = document.createElement("button");
      b.className = "tab"; b.type = "button"; b.setAttribute("role", "tab");
      b.id = "tab-" + sec.id; b.textContent = sec.nombre;
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.setAttribute("aria-controls", "carta-panel");
      b.tabIndex = i === 0 ? 0 : -1;
      b.addEventListener("click", function () { select(i, true); });
      tabsEl.appendChild(b);
    });
    var tabs = $$(".tab", tabsEl);
    var current = 0;
    var render = function (i) {
      var sec = window.CARTA[i];
      seccionEl.textContent = sec.nombre;
      platosEl.innerHTML = sec.platos.map(function (p, k) {
        return '<li class="plato in" style="animation-delay:' + (k * 0.035).toFixed(3) + 's"><div class="plato__info"><p class="plato__nombre">' + esc(p[0]) +
          '</p><p class="plato__desc">' + esc(p[1]) + '</p></div><p class="plato__precio">' + esc(p[2]) + "</p></li>";
      }).join("");
    };
    var select = function (i, focus) {
      if (i === current) return;
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); t.tabIndex = k === i ? 0 : -1; });
      panel.setAttribute("aria-labelledby", tabs[i].id);
      if (focus) tabs[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
      current = i;
      if (reduce) { render(i); return; }
      platosEl.classList.add("is-switching");
      seccionEl.style.transition = "opacity .2s"; seccionEl.style.opacity = "0";
      setTimeout(function () { render(i); platosEl.classList.remove("is-switching"); seccionEl.style.opacity = "1"; }, 180);
    };
    tabsEl.addEventListener("keydown", function (e) {
      var k = e.key, n = tabs.length, i = current;
      if (k === "ArrowRight") i = (current + 1) % n; else if (k === "ArrowLeft") i = (current - 1 + n) % n;
      else if (k === "Home") i = 0; else if (k === "End") i = n - 1; else return;
      e.preventDefault(); select(i, true); tabs[i].focus();
    });
  }

  /* ---------- FAQ: botones minimizar / maximizar ---------- */
  $$(".faq__item").forEach(function (item) {
    var btn = $(".faq__q", item), tog = $(".toggle", item);
    btn.addEventListener("click", function () {
      var open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      tog.setAttribute("data-name", open ? "botón minimizar" : "botón maximizar");
    });
  });

  /* ---------- Horario: día de hoy + abierto/cerrado (hora de Madrid) ---------- */
  var dias = $$(".dia[data-dia]");
  if (dias.length) {
    var ahora = (function () {
      try {
        var f = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
        var o = {}; f.forEach(function (p) { o[p.type] = p.value; });
        var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
        return { d: wd, m: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
      } catch (e) { var n = new Date(); return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() }; }
    })();
    var hoy = $('.dia[data-dia="' + ahora.d + '"]');
    if (hoy) {
      hoy.classList.add("hoy"); hoy.setAttribute("aria-current", "date");
      // cada día puede tener dos turnos (mediodía y noche)
      var abierto = $$(".dia__h", hoy).some(function (el) {
        var r = el.textContent.match(/(\d{2}):(\d{2})\D+(\d{2}):(\d{2})/);
        if (!r) return false;
        var a = +r[1] * 60 + +r[2], c = +r[3] * 60 + +r[4];
        return ahora.m >= a && ahora.m < c;
      });
      var estado = $("#estado");
      if (estado) {
        estado.textContent = abierto ? "Abierto ahora" : "Cerrado ahora";
        estado.classList.toggle("abierto", abierto);
        estado.hidden = false;
      }
    } else { dias[0].classList.add("hoy"); }
  }

  /* ---------- Formulario → monochromejoseantonio@gmail.com (FormSubmit) ---------- */
  var form = $("#form");
  if (form) {
    var msg = $("#form-msg"), btn = $(".btn-enviar", form);
    var showErr = function (field, text) {
      var wrap = field.closest(".field"); if (!wrap) return;
      wrap.classList.add("has-error");
      var s = $(".field__err", wrap);
      if (!s) { s = document.createElement("span"); s.className = "field__err"; wrap.appendChild(s); }
      s.textContent = text;
      field.setAttribute("aria-invalid", "true");
    };
    var clearErr = function (field) {
      var wrap = field.closest(".field"); if (!wrap) return;
      wrap.classList.remove("has-error"); field.removeAttribute("aria-invalid");
      var s = $(".field__err", wrap); if (s) s.remove();
    };
    $$("input, select, textarea", form).forEach(function (f) { f.addEventListener("input", function () { clearErr(f); }); f.addEventListener("change", function () { clearErr(f); }); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.className = "form__msg"; msg.textContent = "";
      var ok = true, first = null;
      $$("input:not([type=hidden]):not(.hp), select, textarea", form).forEach(function (f) {
        if (f.type === "checkbox") return;
        clearErr(f);
        if (!f.checkValidity()) {
          ok = false; first = first || f;
          var t = f.validity.valueMissing ? "Este campo es obligatorio." : (f.type === "email" ? "Revisa el email, parece incorrecto." : (f.type === "tel" ? "Revisa el teléfono." : "Revisa este campo."));
          showErr(f, t);
        }
      });
      var acepta = $('input[type=checkbox]', form);
      if (!acepta.checked) { ok = false; msg.className = "form__msg ko"; msg.textContent = "Para enviar el mensaje tienes que aceptar la política de privacidad."; first = first || acepta; }
      if (!ok) { first.focus(); return; }
      if ($(".hp", form).value) return; // bot

      btn.disabled = true; btn.classList.add("is-loading");
      var data = new FormData(form);
      data.append("_replyto", data.get("email"));
      fetch("https://formsubmit.co/ajax/monochromejoseantonio@gmail.com", { method: "POST", headers: { Accept: "application/json" }, body: data })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === "false" || j.success === false) throw new Error(j.message || "error"); return j; }); })
        .then(function () {
          form.reset();
          msg.className = "form__msg ok";
          msg.textContent = "¡Gracias! Hemos recibido tu mensaje y te responderemos lo antes posible.";
        })
        .catch(function () {
          msg.className = "form__msg ko";
          msg.innerHTML = 'No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos a <a href="mailto:monochromejoseantonio@gmail.com">monochromejoseantonio@gmail.com</a>.';
        })
        .then(function () { btn.disabled = false; btn.classList.remove("is-loading"); });
    });
  }

  /* ---------- Instagram (widget Jotform) ---------- */
  var feed = $("#feed");
  if (feed) {
    var holder = $('[id^="JFWebsiteWidget-"]', feed);
    var clicks = 0;
    var check = function () {
      if (!holder) return false;
      var cards = holder.querySelectorAll(".jf-social-feed-card").length;
      // el widget carga 6 publicaciones: pedimos más hasta tener las 8 del diseño
      if (cards > 0 && cards < 8 && clicks < 3) {
        var more = holder.querySelector(".jf-social-feed-load-more-button");
        if (more && !more.disabled) { clicks++; more.click(); }
      }
      if (cards >= 8 || (cards > 0 && clicks >= 3)) { feed.classList.add("widget-ready"); return true; }
      return false;
    };
    if (holder && "MutationObserver" in window) {
      var mo = new MutationObserver(function () { if (check()) mo.disconnect(); });
      mo.observe(holder, { childList: true, subtree: true, attributes: true });
      var tries = 0, iv = setInterval(function () { if (check() || ++tries > 40) clearInterval(iv); }, 500);
    }
  }

  /* ---------- Testimonios en forma de ticket ---------- */
  var strip = $("#strip");
  if (strip) {
    var resenas = [
      ["Rosa Borrallo", "Ha sido todo un descubrimiento! Nos encantó la comida.. Muy buena calidad. Repetiremos sin dudarlo.", -1.5],
      ["Joaquín Soler Cabrera", "Hice un pedido grande para un evento y la experiencia fue magnífica. Gracias a David y todo su equipo por la atención tan amable. Súper recomendable", 1.2],
      ["Marina Bravo", "Probablemente las mejores migas que me he comido nunca y María Jesús es maravillosa. Sin duda me salvan las comidas en el trabajo todos los días y como como en casa♥️", -0.8],
      ["Juanma Espinola", "La comida es toda casera y el trato del personal estupendo. 100% recomendable", 1.8],
      ["Ana Jimenez", "Nuestra experiencia de alta categoría, pedazo de paella para 18 a 20 personas muy recomendable", -1.2],
      ["Sergio Doblas", "Comida fabulosa y muy variada. Trato cercano, correcto y profesional de su personal. Siempre sales contento.", 0.9],
      ["Patricia Puerta", "Llevo años comprando el pollo asado allí y es mi favorito. Siempre es comida recién hecha y el servicio es excelente. Para los días o horarios de mucha venta es recomendable hacer el pedido por teléfono.", -2],
      ["Maribel Uncala", "Había tiempo que no compraba. No recordaba buena experiencia. Pero compré ensaladilla y lágrimitas de pollo y estaban buenísimas. Repetiré sin lugar a dudas. Muy recomendable.", 1.4],
      ["Carlos.B", "Rico, barato y te atienden genial. Platos a probar la pasta de la casa y la ensaladilla rusa. Increibles", -0.6],
      ["MONTSE MONTSE", "Simplemente me encanta....la ensaladilla....la ensalada de langostinos....local amplio....limpio....ves como cocinan....y precios buenos....tienen tortillas de patatas y pollos asados....más comida variada", 2.2],
      ["Belén Yécora", "Comida casera, amabilidad y confianza. Sitio de referencia cuando no quiero cocinar para la semana.", -1.7],
      ["ana gil", "Comida casera de calidad, está todo buenísimo y el trato a los clientes excelente!! Lo recomiendo ", 0.7],
      ["Mary Mary", "Buenas comidas y de calidad, Ensaladilla de gambas deliciosa y pollo asado exquisito. Trato inmejorable.", -1],
      ["Martín Fernández", "Para comidas preparadas es el mejor sitio que he visto en mi vida. TODO lo que preparan está genial, las raciones son muy abundantes. Recomiendo sobre todo las habas con jamón y el hígado al jerez que es UNA PASADA.", 1.6],
      ["Mariangeles Melero", "Comida buenísima y de buenísima calidad, atención rápida y eficiente. Volveremos sin duda.", -0.4]
    ];
    var dash = "- - - - - - - - - - - - - - - - - - - - -", eq = "= = = = = = = = = = = = = = = = = = = = =";
    var e2 = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    strip.innerHTML = resenas.map(function (r, i) {
      var n = String(i + 1).padStart(3, "0");
      return '<div class="ticket-slot" style="--delay:' + ((i % 6) * 0.09).toFixed(2) + 's">' +
        '<article class="ticket" style="--rot:' + r[2] + 'deg" aria-label="Reseña de ' + e2(r[0]) + ', 5 estrellas">' +
        '<img class="ticket__logo" src="assets/logo-ticket.svg" alt="Picoteo\'s">' +
        '<p class="ticket__dash ticket__dash--pad" aria-hidden="true">' + dash + '</p>' +
        '<p class="ticket__stars" aria-hidden="true">★ ★ ★ ★ ★</p>' +
        '<div class="ticket__row ticket__row--meta"><span>Google Review</span><span aria-hidden="true">✓</span></div>' +
        '<p class="ticket__dash ticket__dash--pad8" aria-hidden="true">' + eq + '</p>' +
        '<p class="ticket__quote">"' + e2(r[1]) + '"</p>' +
        '<p class="ticket__dash ticket__dash--pad8" aria-hidden="true">' + dash + '</p>' +
        '<div class="ticket__row ticket__row--name"><strong>' + e2(r[0]) + '</strong><span>#' + n + '</span></div>' +
        '<p class="ticket__dash ticket__dash--end" aria-hidden="true">' + dash + '</p>' +
        '<p class="ticket__thanks">Gracias por su visita</p>' +
        '<p class="ticket__bars" aria-hidden="true">||||| |||| ||||| |||| ||||| ||||</p>' +
        "</article></div>";
    }).join("");

    // impresión escalonada de tickets al entrar en pantalla
    var slots = $$(".ticket-slot", strip);
    if ("IntersectionObserver" in window && !reduce) {
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("printed"); tio.unobserve(e.target); } });
      }, { root: null, threshold: .25 });
      slots.forEach(function (s) { tio.observe(s); });
    } else slots.forEach(function (s) { s.classList.add("printed"); });

    // arrastrar para desplazar (ratón) con inercia
    var down = false, startX = 0, startL = 0, moved = 0, v = 0, lastX = 0, raf;
    strip.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      down = true; moved = 0; startX = lastX = e.clientX; startL = strip.scrollLeft; v = 0;
      cancelAnimationFrame(raf); strip.setPointerCapture(e.pointerId);
    });
    strip.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) strip.classList.add("is-dragging");
      v = e.clientX - lastX; lastX = e.clientX;
      strip.scrollLeft = startL - dx;
    });
    var end = function () {
      if (!down) return; down = false; strip.classList.remove("is-dragging");
      if (reduce) return;
      var step = function () { v *= .94; strip.scrollLeft -= v; if (Math.abs(v) > .4) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    strip.addEventListener("pointerup", end); strip.addEventListener("pointercancel", end);

    // flechas del indicador "desliza para leer más"
    $$(".swipe button").forEach(function (b) {
      b.addEventListener("click", function () {
        strip.scrollBy({ left: +b.dataset.dir * Math.min(strip.clientWidth * .8, 726), behavior: reduce ? "auto" : "smooth" });
      });
    });
    strip.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault(); strip.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * 242, behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  /* ---------- Índice de páginas legales: sección activa ---------- */
  var toc = $$(".toc a");
  if (toc.length && "IntersectionObserver" in window) {
    var secs = toc.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    var tio2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        toc.forEach(function (a, i) { a.classList.toggle("is-active", secs[i] === e.target); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    secs.forEach(function (s) { if (s) tio2.observe(s); });
  }
})();
