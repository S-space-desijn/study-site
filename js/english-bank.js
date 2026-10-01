/* ============================================================
   初中英语题库 · 外研版（七至九年级，按年级 + 单元组织）
   ------------------------------------------------------------
   【每月更新说明】
   1. 在对应年级的数组中直接追加新题（id 保持唯一，格式：册-单元-序号）；
   2. 把下方 BANK_VERSION 改为当月（如 2026.10），更新 UPDATED_AT；
   3. 当月新增的模拟题，src 字段统一写 "模拟题·YYYY.MM"，
      页面“本月新题”会自动按 BANK_VERSION 筛选；
   4. 也可在文件末尾 MONTHLY_EXTRA 数组中追加当月补充题。
   字段说明：id 唯一编号 / g 年级 / unit 单元名 / kp 知识点
            type: single 单选 | judge 判断
            opts 选项(判断题可省略) / a 正确项索引 / exp 解析
            src: 真题改编 | 模拟题·YYYY.MM
   ============================================================ */

window.ENGLISH_BANK_META = {
  subject: "英语（外研版）",
  bankVersion: "2026.10",
  updatedAt: "2026-10-01",
  updateRule: "每月更新一次：追加新模拟题并更新 BANK_VERSION"
};
/* 通用练习引擎接口 */
window.QUIZ_SUBJECT = "english";
window.QUIZ_BANK_META = window.ENGLISH_BANK_META;

window.ENGLISH_BANK = [

/* ================= 七年级上册 ================= */
{ id:"7a-1-01", g:"七年级上册", unit:"be 动词、人称代词与指示代词",
  type:"single", kp:"be 动词",
  q:"My name is Daming and I ______ from Beijing.",
  opts:["am","is","are","be"], a:0, src:"真题改编",
  exp:"主语 I 后接 be 动词 am，is 用于第三人称单数，are 用于第二人称或复数。" },

{ id:"7a-1-02", g:"七年级上册", unit:"be 动词、人称代词与指示代词",
  type:"judge", kp:"指示代词",
  q:"“Those are my books.” 这个句子语法正确。",
  a:0, src:"真题改编",
  exp:"Those 为复数指示代词，后接 are 和复数名词 books，语法正确。" },

{ id:"7a-2-01", g:"七年级上册", unit:"名词单复数、there be 与 have got",
  type:"single", kp:"there be 句型",
  q:"There ______ a desk and two chairs in the room.",
  opts:["is","are","have","has"], a:0, src:"真题改编",
  exp:"there be 句型遵循就近原则，a desk 为单数，故用 is。" },

{ id:"7a-2-02", g:"七年级上册", unit:"名词单复数、there be 与 have got",
  type:"judge", kp:"名词单复数",
  q:"“I can see three sheeps on the farm.” 这个句子语法正确。",
  a:1, src:"真题改编",
  exp:"sheep 单复数同形，复数仍为 sheep，不加 s。" },

{ id:"7a-3-01", g:"七年级上册", unit:"情态动词 can、祈使句与现在进行时",
  type:"single", kp:"情态动词 can",
  q:"— ______ you play basketball? — Yes, I can.",
  opts:["Do","Can","Are","Must"], a:1, src:"真题改编",
  exp:"由答语 Yes, I can 可知，问句以情态动词 Can 开头。" },

{ id:"7a-3-02", g:"七年级上册", unit:"情态动词 can、祈使句与现在进行时",
  type:"single", kp:"现在进行时",
  q:"Look! The students ______ English in the classroom.",
  opts:["read","reads","are reading","is reading"], a:2, src:"真题改编",
  exp:"Look 提示动作正在进行，students 为复数，用 are reading。" },

{ id:"7a-4-01", g:"七年级上册", unit:"模块话题与功能句型（M1–M10）",
  type:"single", kp:"情景交际",
  q:"— Hello! Nice to meet you. — ______",
  opts:["Goodbye.","Nice to meet you, too.","See you later.","Thank you."], a:1, src:"真题改编",
  exp:"Nice to meet you 的回应为 Nice to meet you, too." },

/* ================= 七年级下册 ================= */
{ id:"7b-1-01", g:"七年级下册", unit:"名词性物主代词、方位介词与情态动词 could",
  type:"single", kp:"名词性物主代词",
  q:"This book is not mine. ______ is on the desk.",
  opts:["My","Mine","Me","I"], a:1, src:"真题改编",
  exp:"此处需名词性物主代词作主语，Mine 相当于 My book。" },

{ id:"7b-2-01", g:"七年级下册", unit:"一般将来时：be going to 与 will",
  type:"single", kp:"一般将来时",
  q:"It is going to rain. You ______ take an umbrella with you.",
  opts:["will","would","should","can"], a:2, src:"真题改编",
  exp:"根据语境建议带伞，should 表示建议，符合句意。" },

{ id:"7b-2-02", g:"七年级下册", unit:"一般将来时：be going to 与 will",
  type:"judge", kp:"be going to",
  q:"“I am going to visit my grandparents tomorrow.” 这个句子语法正确。",
  a:0, src:"真题改编",
  exp:"be going to + 动词原形表计划/打算，句意和语法均正确。" },

{ id:"7b-3-01", g:"七年级下册", unit:"一般过去时",
  type:"single", kp:"一般过去时",
  q:"— When ______ you ______ to the museum? — Last week.",
  opts:["did; go","do; go","did; went","does; go"], a:0, src:"真题改编",
  exp:"last week 为过去时间标志，疑问句用 did + 动词原形。" },

{ id:"7b-4-01", g:"七年级下册", unit:"模块话题与功能句型（M1–M12）",
  type:"single", kp:"情景交际",
  q:"— How was your weekend? — ______",
  opts:["It was great.","I am fine.","That sounds good.","Never mind."], a:0, src:"真题改编",
  exp:"How was your weekend 询问周末过得如何，回答 It was great." },

/* ================= 八年级上册 ================= */
{ id:"8a-1-01", g:"八年级上册", unit:"提建议、形容词比较级与最高级",
  type:"single", kp:"形容词比较级",
  q:"This story is ______ than that one. I like it better.",
  opts:["interesting","more interesting","most interesting","the most interesting"], a:1, src:"真题改编",
  exp:"than 提示用比较级，interesting 为多音节词，比较级为 more interesting。" },

{ id:"8a-1-02", g:"八年级上册", unit:"提建议、形容词比较级与最高级",
  type:"judge", kp:"形容词最高级",
  q:"“He is the tallest boy in his class.” 这个句子语法正确。",
  a:0, src:"真题改编",
  exp:"最高级前加 the，in his class 表范围，句法正确。" },

{ id:"8a-2-01", g:"八年级上册", unit:"副词、动词不定式与过去进行时",
  type:"single", kp:"动词不定式",
  q:"The teacher asked us ______ the window before leaving.",
  opts:["close","to close","closing","closed"], a:1, src:"真题改编",
  exp:"ask sb to do sth 为固定搭配，用动词不定式作宾语补足语。" },

{ id:"8a-2-02", g:"八年级上册", unit:"副词、动词不定式与过去进行时",
  type:"single", kp:"过去进行时",
  q:"What ______ you ______ at eight o'clock last night?",
  opts:["were; doing","did; do","was; doing","are; doing"], a:0, src:"真题改编",
  exp:"at eight o'clock last night 表过去某一时刻正在进行的动作，用过去进行时。" },

{ id:"8a-3-01", g:"八年级上册", unit:"情态动词 must / have to / may / might",
  type:"single", kp:"情态动词",
  q:"You ______ be quiet in the library. It's the rule.",
  opts:["may","might","must","can"], a:2, src:"真题改编",
  exp:"由 It's the rule 可知语气强，表必须，用 must。" },

{ id:"8a-4-01", g:"八年级上册", unit:"模块话题与功能句型（M1–M12）",
  type:"single", kp:"情景交际",
  q:"— Would you mind opening the window? — ______",
  opts:["No, I would.","Yes, of course.","Not at all.","Never mind."], a:2, src:"真题改编",
  exp:"Would you mind... 的否定回答用 Not at all 表示不介意。" },

/* ================= 八年级下册 ================= */
{ id:"8b-1-01", g:"八年级下册", unit:"系动词、感官动词与简单句句型",
  type:"single", kp:"感官动词",
  q:"The cake smells ______. I want to have a piece.",
  opts:["good","well","badly","terribly"], a:0, src:"真题改编",
  exp:"smell 为系动词，后接形容词作表语，good 符合句意。" },

{ id:"8b-2-01", g:"八年级下册", unit:"现在完成时（一）：概念与基本用法",
  type:"single", kp:"现在完成时",
  q:"I ______ already ______ the film. Let's talk about it.",
  opts:["have; seen","has; seen","had; seen","did; see"], a:0, src:"真题改编",
  exp:"already 为现在完成时标志，主语 I 用 have seen。" },

{ id:"8b-2-02", g:"八年级下册", unit:"现在完成时（一）：概念与基本用法",
  type:"judge", kp:"现在完成时",
  q:"“He has just finished his homework.” 这个句子语法正确。",
  a:0, src:"真题改编",
  exp:"just 与现在完成时连用，has finished 结构正确。" },

{ id:"8b-3-01", g:"八年级下册", unit:"现在完成时（二）：since/for 与 have been to / have gone to",
  type:"single", kp:"have been to / have gone to",
  q:"— Where is Mr. Smith? — He ______ to Beijing. He will be back tomorrow.",
  opts:["has been","has gone","went","goes"], a:1, src:"真题改编",
  exp:"have gone to 表去了某地未回，have been to 表去过已回，根据 will be back 用 has gone。" },

{ id:"8b-4-01", g:"八年级下册", unit:"宾语从句",
  type:"single", kp:"宾语从句",
  q:"Could you tell me ______ the nearest hospital is?",
  opts:["where","what","how","when"], a:0, src:"真题改编",
  exp:"根据句意询问地点，用 where 引导宾语从句，且用陈述语序。" },

{ id:"8b-4-02", g:"八年级下册", unit:"宾语从句",
  type:"judge", kp:"宾语从句语序",
  q:"“I don't know where does he live.” 这个句子语法正确。",
  a:1, src:"真题改编",
  exp:"宾语从句应用陈述语序，应为 where he lives。" },

{ id:"8b-5-01", g:"八年级下册", unit:"模块话题（M1–M10）",
  type:"single", kp:"完形填空式单选",
  q:"— Would you like some more tea? — ______, please. I'm still thirsty.",
  opts:["No, thanks","Yes","Of course not","You're welcome"], a:1, src:"真题改编",
  exp:"由 I'm still thirsty 可知需要更多，用 Yes, please。" },

/* ================= 九年级上册 ================= */
{ id:"9a-1-01", g:"九年级上册", unit:"六大时态综合辨析",
  type:"single", kp:"时态辨析",
  q:"By the end of last month, we ______ ten English songs.",
  opts:["learned","have learned","had learned","will learn"], a:2, src:"真题改编",
  exp:"by the end of last month 为过去完成时标志，用 had learned。" },

{ id:"9a-2-01", g:"九年级上册", unit:"被动语态",
  type:"single", kp:"被动语态",
  q:"The new library ______ last year. It is very modern.",
  opts:["built","was built","is built","builds"], a:1, src:"真题改编",
  exp:"last year 为过去时间，主语 The new library 与 build 为被动关系，用一般过去时被动语态。" },

{ id:"9a-2-02", g:"九年级上册", unit:"被动语态",
  type:"judge", kp:"被动语态",
  q:"“English is spoken by many people around the world.” 这个句子语法正确。",
  a:0, src:"真题改编",
  exp:"一般现在时被动语态 is spoken 使用正确，句意通顺。" },

{ id:"9a-3-01", g:"九年级上册", unit:"定语从句",
  type:"single", kp:"定语从句",
  q:"The man ______ is talking to our teacher is my uncle.",
  opts:["who","which","whose","whom"], a:0, src:"真题改编",
  exp:"先行词 The man 指人，在从句中作主语，用关系代词 who。" },

{ id:"9a-4-01", g:"九年级上册", unit:"构词法与冠词复习",
  type:"single", kp:"冠词",
  q:"There is ______ “u” and ______ “s” in the word “us”.",
  opts:["a; an","an; a","a; a","an; an"], a:0, src:"真题改编",
  exp:"u 以辅音音素开头用 a，s 以元音音素开头用 an。" },

{ id:"9a-5-01", g:"九年级上册", unit:"模块话题（M1–M10）",
  type:"single", kp:"词汇辨析",
  q:"— What do you think of the movie? — It's ______. I want to see it again.",
  opts:["boring","wonderful","terrible","awful"], a:1, src:"真题改编",
  exp:"由 I want to see it again 可知电影很棒，wonderful 符合语境。" },

/* ================= 九年级下册 ================= */
{ id:"9b-1-01", g:"九年级下册", unit:"定语从句进阶与状语从句",
  type:"single", kp:"状语从句",
  q:"______ it was raining heavily, the students still went to school on time.",
  opts:["Because","Although","Unless","If"], a:1, src:"真题改编",
  exp:"前后为让步关系，Although 引导让步状语从句，不与 but 连用。" },

{ id:"9b-2-01", g:"九年级下册", unit:"模块话题与中考要点（M1–M8）",
  type:"single", kp:"情景交际",
  q:"— Thank you for your help. — ______",
  opts:["That's all right.","All right.","You're welcome.","Both A and C."], a:3, src:"真题改编",
  exp:"That's all right 和 You're welcome 均可回应感谢。" },

/* ================= 中考专题 ================= */
{ id:"topic-1-01", g:"中考专题", unit:"八大时态总表",
  type:"single", kp:"一般现在时",
  q:"My father ______ to work by bus every day.",
  opts:["goes","went","has gone","will go"], a:0, src:"真题改编",
  exp:"every day 为一般现在时标志，主语为第三人称单数，用 goes。" },

{ id:"topic-1-02", g:"中考专题", unit:"八大时态总表",
  type:"judge", kp:"现在完成时与一般过去时辨析",
  q:"“I have seen the film yesterday.” 这个句子语法正确。",
  a:1, src:"真题改编",
  exp:"yesterday 为过去时间，不能与现在完成时连用，应改为 saw。" },

{ id:"topic-2-01", g:"中考专题", unit:"高频非谓语动词搭配",
  type:"single", kp:"非谓语动词",
  q:"The boy is looking forward to ______ his favourite star.",
  opts:["see","sees","seeing","saw"], a:2, src:"真题改编",
  exp:"look forward to 中 to 为介词，后接动名词 seeing。" },

{ id:"topic-3-01", g:"中考专题", unit:"不规则动词分类速记（AAA / AAB / ABA / ABB / ABC）",
  type:"single", kp:"不规则动词",
  q:"— Have you ______ your breakfast? — Yes, I have.",
  opts:["eat","ate","eaten","eating"], a:2, src:"真题改编",
  exp:"现在完成时疑问句用过去分词，eat 的过去分词为 eaten。" },

{ id:"topic-4-01", g:"中考专题", unit:"话题写作万能句型与模板",
  type:"single", kp:"感叹句",
  q:"______ beautiful flowers they are!",
  opts:["What","What a","How","How a"], a:0, src:"真题改编",
  exp:"感叹句中修饰复数名词 flowers 用 What，不加冠词。" },

/* ================= 模拟题·2026.10 ================= */
{ id:"7a-1-03", g:"七年级上册", unit:"be 动词、人称代词与指示代词",
  type:"single", kp:"人称代词",
  q:"______ am a student. ______ name is Lingling.",
  opts:["I; My","My; I","I; I","My; My"], a:0, src:"模拟题·2026.10",
  exp:"第一空作主语用主格 I，第二空修饰名词 name 用形容词性物主代词 My。" },

{ id:"7a-4-02", g:"七年级上册", unit:"模块话题与功能句型（M1–M10）",
  type:"judge", kp:"情景交际",
  q:"“How do you do?” 的恰当回应是 “How do you do?”。",
  a:0, src:"模拟题·2026.10",
  exp:"How do you do 为初次见面问候语，回答仍为 How do you do。" },

{ id:"7b-2-03", g:"七年级下册", unit:"一般将来时：be going to 与 will",
  type:"single", kp:"will 与 be going to",
  q:"— It's a secret. — OK. I ______ tell anyone.",
  opts:["won't","don't","doesn't","didn't"], a:0, src:"模拟题·2026.10",
  exp:"表示承诺/意愿用 will，否定为 won't。" },

{ id:"7b-4-02", g:"七年级下册", unit:"模块话题与功能句型（M1–M12）",
  type:"single", kp:"情景交际",
  q:"— I'm sorry I'm late. — ______",
  opts:["That's right.","It doesn't matter.","You're welcome.","All right."], a:1, src:"模拟题·2026.10",
  exp:"回应道歉用 It doesn't matter 表示没关系。" },

{ id:"8a-1-03", g:"八年级上册", unit:"提建议、形容词比较级与最高级",
  type:"single", kp:"提建议句型",
  q:"— I've got a headache. — You ______ see a doctor.",
  opts:["should","would","might","could"], a:0, src:"模拟题·2026.10",
  exp:"should 用于提建议，表示应该做某事。" },

{ id:"8a-4-02", g:"八年级上册", unit:"模块话题与功能句型（M1–M12）",
  type:"judge", kp:"情景交际",
  q:"“Let's go shopping.” 的恰当回应是 “Good idea.”。",
  a:0, src:"模拟题·2026.10",
  exp:"对 Let's... 的提议表示赞同可用 Good idea." },

{ id:"8b-1-02", g:"八年级下册", unit:"系动词、感官动词与简单句句型",
  type:"single", kp:"简单句句型",
  q:"He made me ______ the work alone.",
  opts:["do","to do","doing","done"], a:0, src:"模拟题·2026.10",
  exp:"make sb do sth 为固定搭配，用省略 to 的不定式。" },

{ id:"9a-1-02", g:"九年级上册", unit:"六大时态综合辨析",
  type:"judge", kp:"过去进行时",
  q:"“While I was reading, my mother came in.” 这个句子语法正确。",
  a:0, src:"模拟题·2026.10",
  exp:"while 引导过去进行时，主句用一般过去时，语法正确。" },

{ id:"9a-5-02", g:"九年级上册", unit:"模块话题（M1–M10）",
  type:"single", kp:"完形填空式单选",
  q:"The little boy was ______ tired ______ he fell asleep at once.",
  opts:["too; to","so; that","such; that","very; that"], a:1, src:"模拟题·2026.10",
  exp:"so...that 引导结果状语从句，tired 为形容词，用 so 修饰。" }

];

/* ============================================================
   当月补充题：每月可在此数组中直接追加，会自动并入总题库
   ============================================================ */
window.ENGLISH_MONTHLY_EXTRA = [];

/* 通用练习引擎数据接口 */
window.QUIZ_BANK = window.ENGLISH_BANK;
window.QUIZ_MONTHLY_EXTRA = window.ENGLISH_MONTHLY_EXTRA;
