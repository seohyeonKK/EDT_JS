(()=>{"use strict";class t{status="대기중";name=null;list=null;setStatus(t){this.status=t}getStatus(){return this.status}setName(t){this.name=t}getName(){return this.name}setList(t){this.list=t}getList(){return this.list}constructor(t){this.name=t,this.list=this.addChefList()}cooking(t){return new Promise((e=>{this.status="요리중",this.updateChefList(t),setTimeout((()=>{this.status="대기중",this.updateChefList(null),e(t)}),t.getTime())}))}addChefList(){const t=document.createElement("li"),e=document.createTextNode(`${this.name} 대기중`);return t.append(e),document.getElementById("cooking").appendChild(t),t}updateChefList(t){"대기중"===this.status?this.list.textContent=`${this.name} 대기중`:this.list.textContent=`${this.name} 주문${t.getNo()} ${t.getName()} 요리중`}}let e=1;class s{no=0;name=null;time=0;setNo(t){this.no=t}getNo(){return this.no}setName(t){this.name=t}getName(){return this.name}setTime(t){this.time=t}getTime(){return this.time}constructor(t){this.name=t,this.time="순대국"===t?1e3:2e3,this.no=e++}}class i{name=null;time=0;list=null;status="대기중";setStatus(t){this.status=t}getStatus(){return this.status}setTime(t){this.time=t}getTime(){return this.time}setName(t){this.name=t}getName(){return this.name}setList(t){this.list=t}getList(){return this.list}constructor(t,e){this.time=t,this.name=e,this.list=this.addServerList(),this.status="대기중"}serving(t){return new Promise((e=>{this.status="서빙",this.updateServerList(t),setTimeout((()=>{this.status="대기중",this.updateServerList(null),e()}),this.time)}))}addServerList(){const t=document.createElement("li"),e=document.createTextNode(`${this.name} 대기중`);return t.append(e),document.getElementById("serving").appendChild(t),t}updateServerList(t){"대기중"===this.status?this.list.textContent=`${this.name} 대기중`:this.list.textContent=`${this.name} 주문${t.getNo()} ${t.getName()} 서빙중`}}let n=[new t("장금이"),new t("백주부")],a=[new i(1e3,"수지"),new i(2e3,"철수")],u=[],r=[];function h(t){u.push(t),o(),async function(){const t=await m(n),e=u.shift();o();const s=await t.cooking(e);r.push(s),async function(){const t=await m(a),e=r.shift();await t.serving(e)}()}()}async function m(t){return new Promise((e=>{const s=setInterval((()=>{const i=t.find((t=>"대기중"===t.getStatus()));i&&(clearInterval(s),e(i))}),100)}))}function o(){document.getElementById("order").innerHTML=u.map((t=>`<li>주문${t.getNo()} : ${t.getName()}</li>`)).join("")}document.getElementById("soondae-soup").addEventListener("click",(()=>h(new s("순대국")))),document.getElementById("hangover-soup").addEventListener("click",(()=>h(new s("해장국"))))})();
//# sourceMappingURL=main.955e49bcfb2230778a7a.js.map