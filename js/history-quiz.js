/* ============================================================
   历史（人教版）真题练习 / 错题集 / 本月新题
   依赖：js/history-bank.js
   错题持久化：localStorage（按题目稳定 id 存取）
   ============================================================ */
(function () {
  "use strict";

  var BANK = [].concat(window.HISTORY_BANK || [], window.HISTORY_MONTHLY_EXTRA || []);
  var META = window.HISTORY_BANK_META || {};
  var WRONG_KEY = "study:wrong:history";
  var DONE_KEY = "study:quizstat:history"; // 累计统计

  /* ---------- 工具 ---------- */
  function loadWrong() {
    try { return JSON.parse(localStorage.getItem(WRONG_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function saveWrong(arr) { localStorage.setItem(WRONG_KEY, JSON.stringify(arr)); }
  function loadStat() {
    try { return JSON.parse(localStorage.getItem(DONE_KEY) || '{"done":0,"right":0}'); }
    catch (e) { return { done: 0, right: 0 }; }
  }
  function saveStat(s) { localStorage.setItem(DONE_KEY, JSON.stringify(s)); }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  var byId = {};
  BANK.forEach(function (q) { byId[q.id] = q; });

  /* ---------- 页面切换 ---------- */
  var navBtns = $all("[data-tab]");
  var panels = { knowledge: $("#knowledge"), quiz: $("#quizPanel"), wrong: $("#wrongPanel") };
  function showTab(name) {
    Object.keys(panels).forEach(function (k) {
      if (!panels[k]) return;
      panels[k].hidden = (k !== name);
    });
    navBtns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === name); });
    if (name === "wrong") renderWrongBook();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  navBtns.forEach(function (b) {
    b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); });
  });

  /* ---------- 题库信息 ---------- */
  var infoEl = $("#bankInfo");
  if (infoEl) {
    var monthCount = BANK.filter(function (q) { return (q.src || "").indexOf(META.bankVersion) !== -1; }).length;
    infoEl.innerHTML = "题库版本 <b>" + esc(META.bankVersion) + "</b>（更新于 " + esc(META.updatedAt) +
      "）· 共 <b>" + BANK.length + "</b> 题 · 本月新增 <b>" + monthCount + "</b> 题";
  }

  /* ---------- 年级/单元联动 ---------- */
  var gradeSel = $("#qGrade"), unitSel = $("#qUnit");
  function grades() {
    var order = ["七年级上册","七年级下册","八年级上册","八年级下册","九年级上册","九年级下册"];
    var seen = {};
    BANK.forEach(function (q) { seen[q.g] = true; });
    return order.filter(function (g) { return seen[g]; });
  }
  function unitsOf(grade) {
    var u = [];
    BANK.forEach(function (q) { if (q.g === grade && u.indexOf(q.unit) === -1) u.push(q.unit); });
    return u;
  }
  grades().forEach(function (g) {
    var o = document.createElement("option"); o.value = g; o.textContent = g; gradeSel.appendChild(o);
  });
  function refreshUnits() {
    unitSel.innerHTML = '<option value="">全部单元（混合练习）</option>';
    unitsOf(gradeSel.value).forEach(function (u) {
      var o = document.createElement("option"); o.value = u; o.textContent = u; unitSel.appendChild(o);
    });
  }
  gradeSel.addEventListener("change", refreshUnits);
  refreshUnits();

  /* ---------- 练习状态 ---------- */
  var current = [];      // 当前套题
  var answered = {};     // id -> 是否答对
  var sessionRight = 0;

  var quizBody = $("#quizBody"), quizSummary = $("#quizSummary"), quizTitle = $("#quizTitle");

  function startQuiz(list, title) {
    current = list;
    answered = {};
    sessionRight = 0;
    quizTitle.textContent = title;
    renderQuiz();
    showTab("quiz");
  }

  function renderQuiz() {
    var total = current.length;
    var doneCount = Object.keys(answered).length;
    quizSummary.innerHTML = "进度 <b>" + doneCount + "</b>/" + total +
      " · 答对 <b>" + sessionRight + "</b> 题" +
      (total ? " · 正确率 <b>" + Math.round(sessionRight / Math.max(doneCount,1) * 100) + "%</b>" : "");

    if (!total) {
      quizBody.innerHTML = '<div class="no-result" style="display:block"><div class="big">📭</div>该范围暂无题目</div>';
      return;
    }
    quizBody.innerHTML = current.map(function (q, i) {
      return '<div class="quiz-q" data-id="' + esc(q.id) + '">' +
        '<div class="qq-head"><span class="qq-no">' + (i + 1) + '</span>' +
        '<span class="qq-tag">' + esc(q.g.replace("年级", "")) + ' · ' + esc(q.unit.split(" ")[0]) + '</span>' +
        '<span class="qq-kp">' + esc(q.kp) + '</span>' +
        '<span class="qq-src ' + ((q.src || "").indexOf("真题") !== -1 ? "is-real" : "is-mock") + '">' + esc(q.src) + '</span></div>' +
        '<div class="qq-stem">' + esc(q.q) + '</div>' +
        '<div class="qq-opts">' + renderOpts(q) + '</div>' +
        '<div class="qq-exp" hidden><div class="exp-row"><b>答案：</b>' + answerText(q) + '</div><div class="exp-row"><b>解析：</b>' + esc(q.exp || "略") + '</div></div>' +
        '</div>';
    }).join("");

    $all(".quiz-q", quizBody).forEach(function (card) {
      var q = byId[card.getAttribute("data-id")];
      var st = answered[q.id];
      $all(".qq-opt", card).forEach(function (btn) {
        var i = parseInt(btn.getAttribute("data-i"), 10);
        if (st !== undefined) {
          // 已作答：恢复对错状态并锁定
          if (i === q.a) btn.classList.add("right");
          if (!st.right && i === st.pick) btn.classList.add("wrong");
          btn.disabled = true;
          $(".qq-exp", card).hidden = false;
        } else {
          btn.addEventListener("click", function () {
            var idx = parseInt(btn.getAttribute("data-i"), 10);
            var right = (idx === q.a);
            answered[q.id] = { right: right, pick: idx };
            if (right) sessionRight++;
            markResult(card, q, idx);
            updateWrong(q, right);
            updateStat(right);
            renderQuiz();
          });
        }
      });
    });
  }

  function renderOpts(q) {
    if (q.type === "judge") {
      return '<button type="button" class="qq-opt" data-i="0">✓ 正确</button>' +
             '<button type="button" class="qq-opt" data-i="1">✗ 错误</button>';
    }
    var letters = ["A","B","C","D"];
    return q.opts.map(function (op, i) {
      return '<button type="button" class="qq-opt" data-i="' + i + '"><i>' + letters[i] + '</i>' + esc(op) + '</button>';
    }).join("");
  }
  function answerText(q) {
    if (q.type === "judge") return q.a === 0 ? "正确（√）" : "错误（×）";
    return ["A","B","C","D"][q.a] + ". " + esc(q.opts[q.a]);
  }
  function markResult(card, q, idx) {
    var opts = $all(".qq-opt", card);
    opts.forEach(function (b, i) {
      if (i === q.a) b.classList.add("right");
      if (i === idx && idx !== q.a) b.classList.add("wrong");
      b.disabled = true;
    });
    $(".qq-exp", card).hidden = false;
  }

  /* ---------- 错题集 ---------- */
  function updateWrong(q, right) {
    var wrong = loadWrong();
    var pos = wrong.indexOf(q.id);
    if (!right && pos === -1) { wrong.push(q.id); saveWrong(wrong); }
    if (right && pos !== -1) { wrong.splice(pos, 1); saveWrong(wrong); } // 订正后自动移出
    refreshWrongCount();
  }
  function refreshWrongCount() {
    $all(".wrong-count").forEach(function (el) { el.textContent = loadWrong().length; });
  }

  function renderWrongBook() {
    var wrap = $("#wrongBody");
    var wrong = loadWrong();
    var stat = loadStat();
    $("#wrongStat").innerHTML = "错题 <b>" + wrong.length + "</b> 道 · 累计练习 <b>" + stat.done +
      "</b> 题 · 累计答对 <b>" + stat.right + "</b> 题 · 总正确率 <b>" +
      (stat.done ? Math.round(stat.right / stat.done * 100) : 0) + "%</b>";

    if (!wrong.length) {
      wrap.innerHTML = '<div class="no-result" style="display:block"><div class="big">🎉</div>错题集还是空的，练习中答错的题会自动收录到这里</div>';
      return;
    }
    wrap.innerHTML = wrong.map(function (id, i) {
      var q = byId[id];
      if (!q) return "";
      return '<div class="quizq wrong-item" data-id="' + esc(q.id) + '">' +
        '<div class="qq-head"><span class="qq-no">' + (i + 1) + '</span>' +
        '<span class="qq-tag">' + esc(q.g) + '</span><span class="qq-kp">' + esc(q.kp) + '</span></div>' +
        '<div class="qq-stem">' + esc(q.q) + '</div>' +
        '<div class="qq-opts"><button type="button" class="qq-opt is-answer" disabled>' + answerText(q) + '</button></div>' +
        '<div class="qq-exp"><div class="exp-row"><b>解析：</b>' + esc(q.exp || "略") + '</div></div>' +
        '<div class="wrong-ops"><button type="button" class="btn-mini btn-remove" data-id="' + esc(q.id) + '">已掌握，移出错题集</button></div>' +
        '</div>';
    }).join("");
    $all(".btn-remove", wrap).forEach(function (b) {
      b.addEventListener("click", function () {
        var arr = loadWrong().filter(function (x) { return x !== b.getAttribute("data-id"); });
        saveWrong(arr); refreshWrongCount(); renderWrongBook();
      });
    });
  }

  function updateStat(right) {
    var s = loadStat();
    s.done += 1;
    if (right) s.right += 1;
    saveStat(s);
  }

  /* ---------- 练习入口按钮 ---------- */
  $("#btnStartUnit").addEventListener("click", function () {
    var g = gradeSel.value;
    var u = unitSel.value;
    var list = BANK.filter(function (q) { return (!g || q.g === g) && (!u || q.unit === u); });
    startQuiz(list, (g || "全部年级") + (u ? " · " + u : " · 单元综合练习"));
  });
  $("#btnRandom").addEventListener("click", function () {
    startQuiz(shuffle(BANK).slice(0, Math.min(20, BANK.length)), "随机 20 题 · 综合检测");
  });
  $("#btnMonth").addEventListener("click", function () {
    var list = BANK.filter(function (q) { return (q.src || "").indexOf(META.bankVersion) !== -1; });
    startQuiz(list, META.bankVersion + " 本月新题（模拟卷更新）");
  });
  $("#btnWrong").addEventListener("click", function () {
    var list = loadWrong().map(function (id) { return byId[id]; }).filter(Boolean);
    if (!list.length) { showTab("wrong"); return; }
    startQuiz(list, "错题重练（" + list.length + " 题）");
  });
  $("#btnClearWrong").addEventListener("click", function () {
    if (confirm("确定清空全部错题吗？此操作不可恢复。")) {
      saveWrong([]); refreshWrongCount(); renderWrongBook();
    }
  });

  refreshWrongCount();
})();
