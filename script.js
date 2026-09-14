const data=[
["日","ひ / にち","দিন / সূর্য",["日本（にほん）— জাপান","日曜日（にちようび）— রবিবার"]],
["月","つき / げつ","চাঁদ / মাস",["月曜日（げつようび）— সোমবার","一か月（いっかげつ）— এক মাস"]],
["火","ひ / か","আগুন",["火曜日（かようび）— মঙ্গলবার","火（ひ）— আগুন"]],
["水","みず / すい","পানি",["水曜日（すいようび）— বুধবার","水（みず）— পানি"]],
["木","き / もく","গাছ / কাঠ",["木曜日（もくようび）— বৃহস্পতিবার","木（き）— গাছ"]],
["金","かね / きん","টাকা / সোনা",["金曜日（きんようび）— শুক্রবার","お金（おかね）— টাকা"]],
["土","つち / ど","মাটি",["土曜日（どようび）— শনিবার","土地（とち）— জমি"]],
["人","ひと / じん","মানুষ",["日本人（にほんじん）— জাপানি মানুষ","三人（さんにん）— তিনজন"]],
["山","やま / さん","পাহাড়",["山（やま）— পাহাড়","富士山（ふじさん）— ফুজি পাহাড়"]],
["川","かわ / せん","নদী",["川（かわ）— নদী","小川（おがわ）— ছোট নদী"]],
["上","うえ / じょう","উপরে",["上（うえ）— উপরে","上手（じょうず）— দক্ষ"]],
["下","した / か","নিচে",["下（した）— নিচে","地下（ちか）— ভূগর্ভ/বেসমেন্ট"]],
["中","なか / ちゅう","মাঝ / ভিতর",["中（なか）— ভিতর","中国（ちゅうごく）— চীন"]],
["大","おおきい / だい","বড়",["大きい（おおきい）— বড়","大学（だいがく）— বিশ্ববিদ্যালয়"]],
["小","ちいさい / しょう","ছোট",["小さい（ちいさい）— ছোট","小学校（しょうがっこう）— প্রাথমিক স্কুল"]],
["日","ひ / にち","দিন / সূর্য",["毎日（まいにち）— প্রতিদিন","休日（きゅうじつ）— ছুটির দিন"]],
["学","まなぶ / がく","শেখা / পড়াশোনা",["学生（がくせい）— ছাত্র","学校（がっこう）— স্কুল"]],
["生","いきる / せい","জীবন / জন্ম",["先生（せんせい）— শিক্ষক","学生（がくせい）— ছাত্র"]],
["食","たべる / しょく","খাওয়া / খাবার",["食べる（たべる）— খাওয়া","食事（しょくじ）— খাবার"]],
["見","みる / けん","দেখা",["見る（みる）— দেখা","意見（いけん）— মতামত"]]
];
let state=JSON.parse(localStorage.getItem("kb_state")||'{"learned":[],"fav":[],"correct":0,"answered":0}');
const $=s=>document.querySelector(s);
function save(){localStorage.setItem("kb_state",JSON.stringify(state));updateStats()}
function updateStats(){ $("#totalStat").textContent=data.length;$("#favStat").textContent=state.fav.length;$("#learnedStat").textContent=state.learned.length;$("#scoreStat").textContent=state.answered?Math.round(state.correct/state.answered*100)+"%":"0%";let p=Math.round(state.learned.length/data.length*100);$("#progressPct").textContent=p+"%";$("#progressText").textContent=`${state.learned.length} / ${data.length} Kanji শেখা হয়েছে`;$("#progressBar").style.width=p+"%";$(".progress-ring").style.setProperty("--p",p+"%")}
function showPage(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.page===id));if(id==="learn")render();if(id==="favorites")renderFav();if(id==="progress")updateStats();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>showPage(b.dataset.page));
function card(item,i){let [c,r,m,ex]=item, fav=state.fav.includes(i),learn=state.learned.includes(i);return `<div class="kcard" onclick="detail(${i})"><button class="fav" onclick="event.stopPropagation();toggleFav(${i})">${fav?"⭐":"☆"}</button><div class="kchar">${c}</div><div class="kmeaning">${m}</div><div class="reading">On/Kun: ${r}</div>${learn?'<div class="learned">✓ শেখা হয়েছে</div>':""}</div>`}
function render(){let q=($("#search").value||"").toLowerCase(),f=$("#filter").value;let arr=data.map((x,i)=>[x,i]).filter(([x,i])=>(f==="all"||(f==="learned"&&state.learned.includes(i))||(f==="new"&&!state.learned.includes(i)))&&(!q||x.join(" ").toLowerCase().includes(q)));$("#kanjiGrid").innerHTML=arr.map(([x,i])=>card(x,i)).join("")||"<p>কিছু পাওয়া যায়নি 😅</p>"}
$("#search").oninput=render;$("#filter").onchange=render;
function toggleFav(i){let a=state.fav,ix=a.indexOf(i);ix<0?a.push(i):a.splice(ix,1);save();render();renderFav()}
function renderFav(){$("#favGrid").innerHTML=state.fav.length?state.fav.map(i=>card(data[i],i)).join(""):"<p>এখনও কোনো Favorite নেই। ⭐ চাপ দিয়ে যোগ করুন।</p>"}
function detail(i){let [c,r,m,ex]=data[i],learn=state.learned.includes(i);$("#detailCard").innerHTML=`<div class="detail"><div class="detail-top"><div class="bigchar">${c}</div><div><span class="tag">JLPT N5</span><h2>${m}</h2><p>Reading: <b>${r}</b></p><p class="jp">${c}</p></div></div><hr><h3>উদাহরণ শব্দ</h3><div class="examples">${ex.map(e=>{let z=e.split("—");return `<div class="example"><div class="jp">${z[0]}</div><div class="bn">${z[1]||""}</div></div>`}).join("")}</div><div class="actions"><button class="action primary2" onclick="speak('${c}')">🔊 উচ্চারণ শুনুন</button><button class="action" onclick="toggleLearn(${i})">${learn?"✓ শেখা হয়েছে":"আমি শিখেছি ✓"}</button><button class="action" onclick="toggleFav(${i});detail(${i})">⭐ Favorite</button></div></div>`;showPage("detail")}
function toggleLearn(i){let ix=state.learned.indexOf(i);ix<0?state.learned.push(i):state.learned.splice(ix,1);save();detail(i)}
function speak(t){if("speechSynthesis"in window){let u=new SpeechSynthesisUtterance(t);u.lang="ja-JP";speechSynthesis.speak(u)}}
let qi=0,qscore=0;
function quiz(){let item=data[qi%data.length], correct=item[2], choices=[correct];while(choices.length<4){let x=data[Math.floor(Math.random()*data.length)][2];if(!choices.includes(x))choices.push(x)}choices.sort(()=>Math.random()-.5);$("#quizBox").innerHTML=`<div class="quiz-box"><p>প্রশ্ন ${qi+1} • Score: <span class="score">${qscore}</span></p><div class="quiz-char">${item[0]}</div><h3>এই Kanji-এর বাংলা অর্থ কোনটি?</h3><div class="options">${choices.map(x=>`<button class="option" onclick="answer(this,'${x.replaceAll("'","\\'")}','${correct.replaceAll("'","\\'")}')">${x}</button>`).join("")}</div></div>`}
function answer(btn,x,c){document.querySelectorAll(".option").forEach(b=>b.disabled=true);state.answered++;if(x===c){btn.classList.add("correct");state.correct++;qscore++;}else{btn.classList.add("wrong");document.querySelectorAll(".option").forEach(b=>{if(b.textContent===c)b.classList.add("correct")})}save();setTimeout(()=>{qi++;quiz()},700)}
function resetProgress(){if(confirm("সব progress মুছে ফেলবেন?")){state={learned:[],fav:[],correct:0,answered:0};save();render();renderFav()}}
$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");$("#themeBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙";localStorage.setItem("kb_dark",document.body.classList.contains("dark"))};
if(localStorage.getItem("kb_dark")==="true"){$("body").classList.add("dark");$("#themeBtn").textContent="☀️"}
quiz();updateStats();render();