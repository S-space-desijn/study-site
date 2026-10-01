/* ============================================================
   初中学习助手 · 全站交互脚本
   功能：章节折叠 / 搜索定位 / 目录高亮 / 阅读进度 /
        返回顶部 / 移动端菜单 / 掌握度打卡（localStorage）
   ============================================================ */
(function () {
  "use strict";

  var body = document.body;

  /* ---------- 1. 章节折叠 / 展开 ---------- */
  var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));

  function setChapterOpen(ch, open) {
    var bodyEl = ch.querySelector(".chapter-body");
    if (!bodyEl) return;
    if (open) {
      ch.classList.add("open");
      bodyEl.style.maxHeight = bodyEl.scrollHeight + "px";
    } else {
      ch.classList.remove("open");
      bodyEl.style.maxHeight = "0px";
    }
  }

  chapters.forEach(function (ch, i) {
    var head = ch.querySelector(".chapter-head");
    if (!head) return;
    // 默认：每一年级分组的第一章展开
    if (i === 0) setChapterOpen(ch, true);
    head.addEventListener("click", function (e) {
      if (e.target.classList.contains("ch-master")) return;
      setChapterOpen(ch, !ch.classList.contains("open"));
    });
  });

  // 展开后内容变化（窗口尺寸变化）时重算高度
  window.addEventListener("resize", function () {
    chapters.forEach(function (ch) {
      if (ch.classList.contains("open")) {
        var b = ch.querySelector(".chapter-body");
        if (b) b.style.maxHeight = b.scrollHeight + "px";
      }
    });
  });

  var btnExpand = document.getElementById("expandAll");
  var btnCollapse = document.getElementById("collapseAll");
  if (btnExpand) {
    btnExpand.addEventListener("click", function () {
      chapters.forEach(function (ch) { setChapterOpen(ch, true); });
    });
  }
  if (btnCollapse) {
    btnCollapse.addEventListener("click", function () {
      chapters.forEach(function (ch) { setChapterOpen(ch, false); });
    });
  }

  /* ---------- 2. 掌握度打卡（localStorage） ---------- */
  var subject = body.getAttribute("data-subject") || "default";
  var storeKey = "study:mastered:" + subject;
  var totalKey = "study:total:" + subject;

  function loadMastered() {
    try { return JSON.parse(localStorage.getItem(storeKey) || "[]"); }
    catch (e) { return []; }
  }
  function saveMastered(arr) {
    localStorage.setItem(storeKey, JSON.stringify(arr));
    localStorage.setItem(totalKey, String(chapters.length));
  }

  var mastered = loadMastered();

  // 给每个章节分配 id
  chapters.forEach(function (ch, idx) {
    if (!ch.id) ch.id = "ch-" + subject + "-" + idx;
    var btn = ch.querySelector(".ch-master");
    if (mastered.indexOf(ch.id) !== -1) ch.classList.add("mastered");
    if (btn) {
      btn.title = "点击标记为已掌握";
      btn.textContent = "✓";
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        ch.classList.toggle("mastered");
        var list = chapters
          .filter(function (c) { return c.classList.contains("mastered"); })
          .map(function (c) { return c.id; });
        saveMastered(list);
        updateProgressUI();
      });
    }
  });
  if (chapters.length) localStorage.setItem(totalKey, String(chapters.length));

  function updateProgressUI() {
    var done = document.querySelectorAll(".chapter.mastered").length;
    var pct = chapters.length ? Math.round(done / chapters.length * 100) : 0;
    var bar = document.querySelector(".progress-wrap .bar i");
    var txt = document.querySelector(".progress-wrap .pct");
    if (bar) bar.style.width = pct + "%";
    if (txt) txt.textContent = pct + "%（" + done + "/" + chapters.length + "章）";
  }
  updateProgressUI();

  /* ---------- 3. 关键词搜索 ---------- */
  var searchInput = document.getElementById("searchInput");
  var noResult = document.querySelector(".no-result");
  var gradeBlocks = Array.prototype.slice.call(document.querySelectorAll(".grade-block"));

  function clearMarks(el) {
    el.querySelectorAll("mark[data-hl]").forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }
  function highlightText(el, kw) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.parentNode.closest("script,style,mark")) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.toLowerCase().indexOf(kw) !== -1
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(new RegExp("(" + kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"))
        .forEach(function (part) {
          if (!part) return;
          if (part.toLowerCase() === kw) {
            var m = document.createElement("mark");
            m.setAttribute("data-hl", "1");
            m.textContent = part;
            frag.appendChild(m);
          } else {
            frag.appendChild(document.createTextNode(part));
          }
        });
      node.parentNode.replaceChild(frag, node);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var kw = searchInput.value.trim().toLowerCase();
      // 重置
      chapters.forEach(function (ch) {
        clearMarks(ch);
        ch.style.display = "";
        if (!kw) setChapterOpen(ch, ch.classList.contains("was-open") ? true : false);
      });
      gradeBlocks.forEach(function (g) { g.style.display = ""; });

      if (!kw) {
        if (noResult) noResult.style.display = "none";
        return;
      }

      var hitTotal = 0;
      gradeBlocks.forEach(function (g) {
        var hit = 0;
        g.querySelectorAll(".chapter").forEach(function (ch) {
          var text = ch.textContent.toLowerCase();
          if (text.indexOf(kw) !== -1) {
            ch.style.display = "";
            setChapterOpen(ch, true);   // 命中自动展开
            highlightText(ch, kw);
            hit++; hitTotal++;
          } else {
            ch.style.display = "none";
          }
        });
        g.style.display = hit ? "" : "none";
      });
      if (noResult) noResult.style.display = hitTotal ? "none" : "block";
    });
  }

  /* ---------- 4. 侧边目录：滚动高亮 + 平滑定位 ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".sidebar a[href^='#']"));
  tocLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
        if (window.innerWidth <= 960) body.classList.remove("sidebar-open");
      }
    });
  });

  var spyObserver = null;
  if ("IntersectionObserver" in window && tocLinks.length) {
    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    gradeBlocks.forEach(function (g) { if (g.id) spyObserver.observe(g); });
  }

  /* ---------- 5. 顶部阅读进度条 + 返回顶部 ---------- */
  var progressBar = document.querySelector(".read-progress");
  var backTop = document.querySelector(".back-top");

  function onScroll() {
    var doc = document.documentElement;
    var scrolled = window.pageYOffset;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? scrolled / max : 0;
    if (progressBar) progressBar.style.width = (pct * 100).toFixed(1) + "%";
    if (backTop) backTop.classList.toggle("show", scrolled > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 6. 移动端侧边栏 ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var mask = document.querySelector(".sidebar-mask");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { body.classList.toggle("sidebar-open"); });
  }
  if (mask) {
    mask.addEventListener("click", function () { body.classList.remove("sidebar-open"); });
  }

  /* ---------- 7. 首页：读取各科掌握进度 ---------- */
  document.querySelectorAll(".subject-card[data-subject]").forEach(function (card) {
    var sub = card.getAttribute("data-subject");
    var done = [], total = 0;
    try { done = JSON.parse(localStorage.getItem("study:mastered:" + sub) || "[]"); } catch (e) {}
    total = parseInt(localStorage.getItem("study:total:" + sub) || "0", 10);
    if (total > 0 && done.length > 0) {
      var pct = Math.round(done.length / total * 100);
      var dot = card.querySelector(".learned-dot");
      if (dot) { dot.textContent = "已学 " + pct + "%"; dot.style.display = "inline-block"; }
    }
  });
})();
