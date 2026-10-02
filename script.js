
function renderSite(){
  const d=SITE_DATA;
  document.title=d.brand.pageTitle;
  document.getElementById("metaDescription").content=d.brand.description;
  document.getElementById("brandDoctor").textContent=d.brand.doctorName;
  document.getElementById("brandSite").textContent=d.brand.siteName;
  document.getElementById("footerDoctor").textContent=d.brand.doctorName;
  document.getElementById("footerSite").textContent=d.brand.siteName;
  document.getElementById("heroBadge").textContent=d.hero.badge;
  document.getElementById("heroTitle").textContent=d.hero.title;
  document.getElementById("heroHighlight").textContent=d.hero.highlight;
  document.getElementById("heroText").textContent=d.hero.text;

  document.getElementById("statsGrid").innerHTML=d.stats.map(x=>`<div><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("");

  document.getElementById("aboutTag").textContent=d.about.tag;
  document.getElementById("aboutTitle").textContent=d.about.title;
  document.getElementById("aboutText").textContent=d.about.text;
  document.getElementById("aboutPoints").innerHTML=d.about.points.map(x=>`<div>✓ ${x}</div>`).join("");

  document.getElementById("conditionsGrid").innerHTML=d.conditions.map(x=>`<article class="info-card"><div class="card-icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");

  document.getElementById("articlesGrid").innerHTML=d.articles.map(x=>`<article class="article-card"><img src="assets/${x[0]}" alt=""><div><span>${x[1]}</span><h3>${x[2]}</h3><p>${x[3]}</p></div></article>`).join("");

  document.getElementById("faqList").innerHTML=d.faq.map(x=>`<details><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join("");
  document.getElementById("disclaimerText").textContent=d.disclaimer;
  document.getElementById("footerDescription").textContent=d.footer.description;
  document.getElementById("copyright").textContent=d.footer.copyright;

  const email=document.getElementById("emailLink");
  email.href=`mailto:${d.contact.email}`;
  const wa=document.getElementById("whatsappLink");
  const number=(d.contact.whatsapp||"").replace(/\D/g,"");
  if(number){
    wa.href=`https://wa.me/${number}?text=${encodeURIComponent(d.contact.whatsappMessage||"")}`;
  } else {
    wa.href="#contact";
  }
}
document.addEventListener("DOMContentLoaded", renderSite);

const nav = document.getElementById("mainNav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("active"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("active")));

function val(id){ return parseFloat(document.getElementById(id).value); }
function out(id, html){ document.getElementById(id).innerHTML = html; }

function calcBMI(){
  const w=val("bmiWeight"), h=val("bmiHeight")/100;
  if(!w || !h){ out("bmiResult","من فضلك أدخل الوزن والطول."); return; }
  const bmi=w/(h*h);
  let label="";
  if(bmi<18.5) label="أقل من نطاق الوزن المعتاد";
  else if(bmi<25) label="ضمن نطاق الوزن المعتاد";
  else if(bmi<30) label="زيادة في الوزن";
  else label="السمنة حسب تصنيف BMI";
  out("bmiResult",`<b style="font-size:22px;color:#087f5b">${bmi.toFixed(1)}</b><br>${label}<br><small>مؤشر BMI أداة تقديرية وليس تشخيصًا.</small>`);
}

function calcCalories(){
  const age=val("calAge"), w=val("calWeight"), h=val("calHeight"), sex=document.getElementById("calSex").value, activity=val("activity");
  if(!age||!w||!h){out("calResult","من فضلك أدخل العمر والوزن والطول.");return;}
  const bmr=sex==="male"?(10*w+6.25*h-5*age+5):(10*w+6.25*h-5*age-161);
  const tdee=Math.round(bmr*activity);
  out("calResult",`الاحتياج التقريبي للمحافظة على الوزن: <b style="color:#087f5b">${tdee} سعرة/اليوم</b><br><small>تقدير عام وليس خطة غذائية شخصية.</small>`);
}

function calcProtein(){
  const w=val("proteinWeight"), factor=val("proteinGoal");
  if(!w){out("proteinResult","من فضلك أدخل الوزن.");return;}
  out("proteinResult",`الاحتياج التقريبي: <b style="color:#087f5b">${Math.round(w*factor)} جم بروتين/اليوم</b><br><small>اختيار العامل المناسب يعتمد على الحالة الصحية والنشاط.</small>`);
}

function calcWater(){
  const w=val("waterWeight");
  if(!w){out("waterResult","من فضلك أدخل الوزن.");return;}
  const ml=Math.round(w*30);
  out("waterResult",`تقدير تقريبي: <b style="color:#087f5b">${(ml/1000).toFixed(1)} لتر/اليوم</b><br><small>الاحتياج الفعلي يتأثر بالحرارة والنشاط والحالة الصحية.</small>`);
}
