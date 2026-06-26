const z="challenge-manager-mvp-v1",K={fairy_tale:"AI 동화",poem_art:"시화",blog:"블로그",instagram:"인스타"},L={draft:"작성중",open:"모집중",closed:"모집 종료",completed:"종료",active:"참가중",dropped:"중도 포기",submitted:"제출 완료",reviewing:"검수 중",approved:"승인",rejected:"반려",needs_check:"추가 확인",scheduled:"지급 예정",held:"지급 보류",paid:"지급 완료",excluded:"지급 제외",unregistered:"미등록",pending:"검수 대기"},it={not_billable:"과금 대상 아님",billing_scheduled:"청구 예정",billed:"청구 완료",paid:"수금 완료",waived:"무료/면제"},W="/assets/ai-fairy-preview.gif",yt="/assets/poem-art-preview.gif",wt="/assets/blog-bike-preview.gif",kt="/assets/instagram-preview.gif",At="/assets/app-pet.gif",X="2026-07-01",Z="2026-07-22",q="2026-07-01",E="2026-07-22",R="AI 동화 전자책 1권 완성 챌린지",tt="AI 동화 창작이 아직 어색한 분들도 22일 동안 글과 이미지를 매일 쌓아가며, 나만의 전자책 1권을 완성하는 실전형 챌린지입니다.",x="orli99165597@gmail.com",O="5322",k=3e4,H=2e4,$="회비 30,000원, 22일 하루도 빠짐없이 인증 완료 시 20,000원 환급",j="미드저니 유료 계정과 GPT 사용 준비 필수, 제미나이 또는 클로드 선택 활용 가능";function F(t="fairy_tale"){const e={fairy_tale:{title:R,description:"AI 동화 창작이 아직 어색한 분들도 22일 동안 글과 이미지를 매일 쌓아가며, 나만의 전자책 1권을 완성하는 실전형 챌린지입니다.",reward_description:`${$}, ${j}`},poem_art:{title:"22일 시화집 완성 챌린지",description:"시화 창작이 익숙한 분들이 22일 동안 짧은 시와 이미지를 쌓아가며, 나만의 시화 전자책을 완성하는 실전형 챌린지입니다.",reward_description:`${$}, ${j}`},blog:{title:"22일 블로그 글쓰기 챌린지",description:"22일 동안 블로그 글을 꾸준히 작성하고 링크와 완료 캡처를 제출하며, 나만의 글쓰기 흐름을 완성하는 챌린지입니다.",reward_description:$},instagram:{title:"22일 인스타 릴스 제작 챌린지",description:"22일 동안 인스타 릴스를 제작하고 업로드 기록을 남기며, 짧은 영상 콘텐츠 감각을 키우는 챌린지입니다.",reward_description:$}};return e[t]||e.fairy_tale}const Ct={open:"success",active:"success",approved:"success",paid:"success",completed:"success",submitted:"primary",reviewing:"primary",scheduled:"primary",pending:"warning",needs_check:"warning",held:"warning",closed:"warning",rejected:"danger",excluded:"danger",dropped:"danger"},at=document.querySelector("#app");let r=Dt();var lt;let p={page:r.session?((lt=g())==null?void 0:lt.role)==="admin"?"admin":"home":"auth",authMode:"login",challengeFilter:"all",selectedChallengeId:null,selectedMissionId:null,selectedSubmissionId:null,adminPage:"dashboard",selectedAdminSubmissionId:null};function h(t){return`${t}_${Math.random().toString(36).slice(2,10)}_${Date.now().toString(36)}`}function ct(){return new Date().toISOString().slice(0,10)}function nt(t,e){const n=new Date(`${t}T00:00:00`);return n.setDate(n.getDate()+e),n.toISOString().slice(0,10)}function _(){return new Date().toLocaleString("ko-KR",{hour12:!1})}function It(t,e="23:59:00"){return new Date(`${t}T${e}+09:00`)}function c(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Dt(){const t=localStorage.getItem(z);if(t){const u=JSON.parse(t);return Ft(u)}ct();const e=h("challenge"),n=h("challenge"),s=h("challenge"),i=h("challenge"),a=h("user"),d=h("user"),o={session:null,users:[{id:a,email:"admin@demo.com",password:"admin123",nickname:"운영자",role:"admin",created_at:_()},{id:h("user"),email:x,password:O,nickname:"운영자",role:"admin",created_at:_()},{id:d,email:"user@demo.com",password:"user123",nickname:"참가자",role:"user",created_at:_()}],challenges:[{id:e,type:"fairy_tale",title:R,description:tt,start_date:X,end_date:Z,daily_deadline_time:"23:59:00",entry_fee:k,is_paid:!0,status:"open",reward_description:`${$}, ${j}`},{id:n,type:"poem_art",title:"22일 시화집 완성 챌린지",description:F("poem_art").description,start_date:q,end_date:E,daily_deadline_time:"23:59:00",entry_fee:k,is_paid:!0,status:"open",reward_description:`${$}, ${j}`},{id:s,type:"blog",title:"22일 블로그 글쓰기 챌린지",description:F("blog").description,start_date:q,end_date:E,daily_deadline_time:"23:59:00",entry_fee:k,is_paid:!0,status:"open",reward_description:$},{id:i,type:"instagram",title:"22일 인스타 릴스 제작 챌린지",description:F("instagram").description,start_date:q,end_date:E,daily_deadline_time:"23:59:00",entry_fee:k,is_paid:!0,status:"open",reward_description:$}],missions:[],participations:[],submissions:[],attachments:[],likes:[],rewards:[],payoutAccounts:[],auditLogs:[],signupNotifications:[],adminNotes:[]};o.missions=[...o.challenges.flatMap(S)];const l={id:h("participation"),user_id:d,challenge_id:e,payment_status:"paid",status:"active",joined_at:_(),total_score:0,rank:null};return o.participations.push(l),localStorage.setItem(z,JSON.stringify(o)),o}function qt(t=ct()){const e=F("poem_art");return{id:h("challenge"),type:"poem_art",title:e.title,description:e.description,start_date:t,end_date:nt(t,21),daily_deadline_time:"23:59:00",entry_fee:k,is_paid:!0,status:"open",reward_description:e.reward_description}}function Ft(t){let e=!1;Array.isArray(t.auditLogs)||(t.auditLogs=[],e=!0),Array.isArray(t.signupNotifications)||(t.signupNotifications=[],e=!0),Array.isArray(t.adminNotes)||(t.adminNotes=[],e=!0);const n=t.users.find(i=>i.email===x);if(n?(n.role!=="admin"||n.password!==O)&&(n.role="admin",n.password=O,n.nickname=n.nickname||"운영자",e=!0):(t.users.push({id:h("user"),email:x,password:O,nickname:"운영자",role:"admin",created_at:_()}),e=!0),!t.challenges.some(i=>i.type==="poem_art")){const i=qt();t.challenges.push(i),t.missions.push(...S(i)),e=!0}const s=t.challenges.filter(i=>i.type==="fairy_tale"&&i.title===R);if(s.length>1){const i=s.find(l=>t.participations.some(u=>u.challenge_id===l.id))||s[0],a=new Set(s.filter(l=>l.id!==i.id).map(l=>l.id)),d=new Set(t.participations.filter(l=>a.has(l.challenge_id)).map(l=>l.id)),o=new Set(t.submissions.filter(l=>d.has(l.participation_id)).map(l=>l.id));t.challenges=t.challenges.filter(l=>!a.has(l.id)),t.missions=t.missions.filter(l=>!a.has(l.challenge_id)),t.participations=t.participations.filter(l=>!a.has(l.challenge_id)),t.submissions=t.submissions.filter(l=>!d.has(l.participation_id)),t.attachments=t.attachments.filter(l=>!o.has(l.submission_id)),t.likes=t.likes.filter(l=>!o.has(l.submission_id)),t.rewards=t.rewards.filter(l=>!d.has(l.participation_id)),e=!0}return t.challenges.filter(i=>i.type==="fairy_tale").forEach(i=>{i.title!==R&&(i.title=R,e=!0),i.description!==tt&&(i.description=tt,e=!0);const a=i.type==="fairy_tale"?`${$}, ${j}`:$;(i.entry_fee!==k||i.reward_description!==a)&&(i.entry_fee=k,i.is_paid=!0,i.reward_description=a,e=!0),(i.start_date!==X||i.end_date!==Z)&&(i.start_date=X,i.end_date=Z,t.missions=t.missions.filter(d=>d.challenge_id!==i.id),t.missions.push(...S(i)),e=!0)}),t.challenges.filter(i=>i.type==="youtube"||i.type==="instagram").forEach(i=>{i.type!=="instagram"&&(i.type="instagram",e=!0),i.title!=="22일 인스타 릴스 제작 챌린지"&&(i.title="22일 인스타 릴스 제작 챌린지",e=!0),i.description!=="22일 동안 인스타 릴스 링크와 업로드 완료 캡처를 제출하는 크리에이터 챌린지입니다."&&(i.description="22일 동안 인스타 릴스 링크와 업로드 완료 캡처를 제출하는 크리에이터 챌린지입니다.",e=!0)}),t.challenges.filter(i=>i.type==="blog").forEach(i=>{i.title!=="22일 블로그 글쓰기 챌린지"&&(i.title="22일 블로그 글쓰기 챌린지",e=!0),i.description!=="22일 동안 블로그 글 링크와 작성 완료 캡처를 제출해 글쓰기 흐름을 완성합니다."&&(i.description="22일 동안 블로그 글 링크와 작성 완료 캡처를 제출해 글쓰기 흐름을 완성합니다.",e=!0)}),t.challenges.forEach(i=>{const a=["fairy_tale","poem_art"].includes(i.type)?`${$}, ${j}`:$;(i.entry_fee!==k||!i.is_paid||i.reward_description!==a)&&(i.entry_fee=k,i.is_paid=!0,i.reward_description=a,e=!0),(i.start_date!==q||i.end_date!==E)&&(i.start_date=q,i.end_date=E,t.missions=t.missions.filter(d=>d.challenge_id!==i.id),t.missions.push(...S(i)),e=!0)}),t.challenges.filter(i=>{if(i.type!=="poem_art")return!1;const a=t.missions.filter(d=>d.challenge_id===i.id);return!i.title.includes("22일")||a.length!==22||!a.some(d=>d.day_number===21&&d.title.includes("전자책"))}).forEach(i=>{i.title="22일 시화집 완성 챌린지",i.description="20일 동안 짧은 시와 어울리는 이미지를 쌓고, 마지막 2일은 전자책으로 정리합니다.",i.end_date=nt(i.start_date,21),t.missions=t.missions.filter(a=>a.challenge_id!==i.id),t.missions.push(...S(i)),e=!0}),t.challenges.forEach(i=>{const a=F(i.type);a&&(i.description!==a.description&&(i.description=a.description,e=!0),i.reward_description!==a.reward_description&&(i.reward_description=a.reward_description,e=!0))}),t.participations.forEach(i=>{i.payment_status==="pending"&&(i.payment_status="billing_scheduled",e=!0),i.payment_status==="none"&&(i.payment_status="not_billable",e=!0)}),e&&localStorage.setItem(z,JSON.stringify(t)),t}function b(){localStorage.setItem(z,JSON.stringify(r))}function D(t,e,n=""){var s;r.auditLogs=r.auditLogs||[],r.auditLogs.unshift({id:h("audit"),action:t,target:e,detail:n,actor:((s=g())==null?void 0:s.email)||"system",created_at:_()}),r.auditLogs=r.auditLogs.slice(0,80)}function jt(t){r.signupNotifications=r.signupNotifications||[],r.signupNotifications.unshift({id:h("notice"),user_id:t.id,email:t.email,nickname:t.nickname,recipient:x,created_at:_(),read:!1}),r.signupNotifications=r.signupNotifications.slice(0,30),D("신규 회원 가입",t.email,`${t.nickname||"참가자"}님이 가입했습니다.`)}function S(t){const e=[];for(let s=1;s<=22;s+=1){let i="일일 미션",a="결과물을 제출하세요.",d=0,o=!1,l=!1,u=!1;t.type==="fairy_tale"&&(s<=20?(i=`${s}일차: 2쪽 작성`,a="오늘 분량 2쪽을 작성하고 텍스트, 이미지, 캡처 중 1개 이상을 제출하세요.",d=2):s===21?(i="21일차: 전체 페이지 업스케일",a="전체 페이지 업스케일 완료 캡처 또는 결과 파일을 제출하세요.",l=!0):(i="22일차: PDF 제작 및 출판 준비",a="최종 PDF 파일을 제출하세요.",u=!0)),t.type==="blog"&&(i=`${s}일차: 블로그 글 제출`,a="블로그 글 URL과 작성 완료 캡처 이미지를 제출하세요.",o=!0,l=!0),t.type==="poem_art"&&(s<=20?(i=`${s}일차: 시 1편과 이미지 1장`,a="오늘의 시와 어울리는 시화 이미지 또는 제작 캡처를 제출하세요.",d=1,l=!0):s===21?(i="21일차: 전자책 구성 정리",a="시화 순서, 표지, 목차, 작가 소개, 페이지 구성을 정리한 캡처 또는 편집본을 제출하세요.",l=!0):(i="22일차: 전자책 PDF 제출",a="정리한 시화 전자책의 최종 PDF 파일을 제출하세요.",u=!0)),t.type==="instagram"&&(i=`${s}일차: 인스타 릴스 제출`,a="인스타 릴스 URL과 업로드 완료 캡처 이미지를 제출하세요.",o=!0,l=!0),e.push({id:h("mission"),challenge_id:t.id,day_number:s,title:i,description:a,deadline_at:`${nt(t.start_date,s-1)}T${t.daily_deadline_time}+09:00`,required_page_count:d,required_link:o,required_capture:l,required_file:u})}return e}function g(){return r.users.find(t=>{var e;return t.id===((e=r.session)==null?void 0:e.userId)})}function pt(t=(e=>(e=g())==null?void 0:e.id)()){return r.participations.filter(n=>n.user_id===t)}function f(t){return r.challenges.find(e=>e.id===t)}function N(t){return r.missions.find(e=>e.id===t)}function C(t){return r.participations.find(e=>e.id===t)}function U(t){return r.submissions.find(e=>e.id===t)}function M(t,e=(n=>(n=g())==null?void 0:n.id)()){return r.participations.find(s=>s.challenge_id===t&&s.user_id===e)}function V(t){return r.missions.filter(e=>e.challenge_id===t).sort((e,n)=>e.day_number-n.day_number)}function st(t){return r.submissions.filter(e=>e.participation_id===t)}function T(t,e){return r.submissions.find(n=>n.participation_id===t&&n.mission_id===e)}function ut(t){return r.attachments.filter(e=>e.submission_id===t)}function mt(t){return r.likes.filter(e=>e.submission_id===t)}function Pt(t,e=(n=>(n=g())==null?void 0:n.id)()){return r.likes.some(s=>s.submission_id===t&&s.user_id===e)}function Lt(t){return st(t).filter(e=>e.status==="approved").sort((e,n)=>new Date(n.submitted_at_iso||n.submitted_at)-new Date(e.submitted_at_iso||e.submitted_at))[0]}function P(t){const e=V(t.challenge_id),s=st(t.id).filter(i=>i.status==="approved").length;return e.length?Math.round(s/e.length*100):0}function St(t){const e=r.participations.filter(l=>l.challenge_id===t),n=new Set(e.map(l=>l.id)),s=r.submissions.filter(l=>n.has(l.participation_id)),i=s.filter(l=>["submitted","reviewing","needs_check"].includes(l.status)).length,a=s.filter(l=>l.status==="approved").length,d=s.filter(l=>l.is_late).length,o=e.length?Math.round(e.reduce((l,u)=>l+P(u),0)/e.length):0;return{participants:e.length,submissions:s.length,waiting:i,approved:a,late:d,completionAverage:o}}function Et(t){return t.type==="fairy_tale"?"22일 모두 인증 + 최종 PDF":t.type==="poem_art"?"22일 모두 인증 + 시화 전자책":(t.type==="blog"||t.type==="instagram","22일 모두 인증")}function xt(t){return t.type==="fairy_tale"?"22일 동안 하루도 빠짐없이 매일 제작한 동화 페이지와 이미지 캡처를 인증하고, 마지막 날 최종 전자책 PDF를 제출합니다.":t.type==="poem_art"?"22일 동안 하루도 빠짐없이 매일 작성한 시와 이미지 결과물을 인증하고, 마지막 날 시화 전자책 PDF를 제출합니다.":t.type==="blog"?"22일 동안 하루도 빠짐없이 매일 발행한 블로그 글 링크와 작성 완료 캡처를 제출합니다.":t.type==="instagram"?"22일 동안 하루도 빠짐없이 매일 업로드한 인스타 릴스 링크와 업로드 완료 캡처를 제출합니다.":"22일 동안 하루도 빠짐없이 매일 결과물 링크 또는 캡처를 제출합니다."}function Tt(t){const e=f(t.challenge_id);return(e==null?void 0:e.type)==="poem_art"?t.day_number<=20?"시화 제작":"전자책 정리":t.day_number<=20?"본문 제작":t.day_number===21?"전체 업스케일":"PDF/출판 준비"}function ht(t,e=null,n=!0){if(t.type!=="fairy_tale")return"";const s=V(t.id);return`
    <section class="${n?"panel ":""}roadmap-panel">
      <div class="section-title compact">
        <div>
          <h3>22일 완성 보드</h3>
          <p>AI 동화 전자책 1권을 목표로 한 진행 구조입니다.</p>
        </div>
      </div>
      <div class="roadmap-media-layout">
        <figure class="fairy-preview large">
          <a href="${W}" target="_blank" rel="noreferrer" title="GIF 크게 보기">
            <img src="${W}" alt="AI 동화 챌린지 미리보기" loading="lazy" />
          </a>
        </figure>
        <div class="roadmap">
          ${[{label:"1-20일",title:"매일 2쪽씩 쓰기",description:"제목, 본문, 장면 설명을 쌓아 동화 초안을 완성합니다."},{label:"21일",title:"전체 페이지 업스케일",description:"이미지, 문장 표현, 페이지 구성을 한 번에 점검합니다."},{label:"22일",title:"전자책 PDF 완성",description:"최종 PDF, 표지/목차/소개글, 전자책 소개 자료를 정리합니다."}].map(a=>`
            <div class="roadmap-step">
              <span>${a.label}</span>
              <strong>${a.title}</strong>
              <p>${a.description}</p>
            </div>
          `).join("")}
        </div>
      </div>
      ${e?`
        <div class="mission-strip">
          ${s.map(a=>{const d=T(e.id,a.id);return`<span class="${(d==null?void 0:d.status)==="approved"?"done":d?"sent":"todo"}" title="${c(a.title)}">${a.day_number}</span>`}).join("")}
        </div>
      `:""}
    </section>
  `}function rt(t=null){const e=t?f(t):r.challenges[0];if(!e)return"";const n=St(e.id);return`
    <section class="panel pulse-panel">
      <div class="section-title compact">
        <div>
          <h3>운영 인사이트</h3>
          <p>${c(e.title)} 기준</p>
        </div>
      </div>
      <div class="grid four">
        <div class="metric"><span>참가자</span><strong>${n.participants}</strong></div>
        <div class="metric"><span>검수 대기</span><strong>${n.waiting}</strong></div>
        <div class="metric"><span>승인 제출</span><strong>${n.approved}</strong></div>
        <div class="metric"><span>평균 완주율</span><strong>${n.completionAverage}%</strong></div>
      </div>
      <div class="pulse-list">
        <span>마감은 KST 23:59 기준으로 기록됩니다.</span>
        <span>지각 제출은 따로 남겨 운영자가 환급 판단에 참고합니다.</span>
        <span>좋아요는 랭킹 점수에 반영됩니다.</span>
      </div>
    </section>
  `}function gt(t){const e=f(t.challenge_id),n=V(e.id),s=It(e.start_date,"00:00:00"),a=Math.floor((new Date-s)/864e5)+1,d=Math.min(Math.max(a,1),n.length);return n.find(o=>o.day_number===d)||n[0]}function Y(t){return new Date(t.deadline_at).toLocaleString("ko-KR",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1})}function J(t){return new Date>new Date(t.deadline_at)}function y(t,e=""){return`<span class="badge ${Ct[t]||""}">${c(L[t]||t)}${e?` ${c(e)}`:""}</span>`}function ft(t){return`<span class="badge ${t==="paid"||t==="waived"||t==="not_billable"?"success":t==="billed"?"primary":"warning"}">${c(it[t]||t)}</span>`}function Nt(t){return["paid","waived","not_billable"].includes(t.payment_status)}function Q(t){return`<span class="badge primary">${K[t]||t}</span>`}function w(t,e={}){p={...p,page:t,...e},A()}function B(t,e={}){p={...p,page:"admin",adminPage:t,...e},A()}function Mt(){r.session=null,b(),p={...p,page:"auth",authMode:"login"},A()}function A(){const t=g();if(!t){at.innerHTML=`
      ${Ot()}
      ${et(null)}
    `,de();return}at.innerHTML=`
    <div class="app-shell">
      ${Gt(t)}
      ${Rt()}
      ${p.page==="admin"?"":et(t)}
    </div>
  `,oe(),le()}function et(t,e="fixed"){const n=t?t.role==="admin"?"operatorGuide":"challenges":"auth",s=t?t.role==="admin"?"운영 설명 열기":"챌린지 보기":"챌린지 도우미";return`
    <button class="floating-pet${e==="sidebar"?" in-sidebar":""}" data-pet-target="${n}" type="button" aria-label="${s}" title="${s}">
      <img src="${At}" alt="" loading="lazy" />
    </button>
  `}function Gt(t){const e=t.role==="admin";return`
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">C</span>
        <span>챌린지 매니저</span>
      </div>
      <nav class="nav">
        ${(e?[["admin","관리자"],["home","사용자 화면"]]:[["home","홈"],["challenges","챌린지"],["ranking","랭킹"],["mypage","마이페이지"]]).map(([s,i])=>`<button data-nav="${s}" class="${p.page===s?"active":""}">${i}</button>`).join("")}
      </nav>
      <div class="user-strip">
        <span class="badge ${e?"warning":"primary"}">${e?"관리자":"사용자"}</span>
        <strong>${c(t.nickname)}</strong>
        <button class="secondary-btn" data-action="logout">로그아웃</button>
      </div>
    </header>
  `}function Rt(t){return p.page==="admin"?Yt():p.page==="home"?dt():p.page==="challenges"?Bt():p.page==="challengeDetail"?zt(p.selectedChallengeId):p.page==="mission"?Ht(p.selectedChallengeId):p.page==="submit"?Jt(p.selectedMissionId):p.page==="submissionDetail"?_t(p.selectedSubmissionId):p.page==="ranking"?Kt(p.selectedChallengeId):p.page==="mypage"?Ut():p.page==="account"?Vt():dt()}function Ot(){const t=p.authMode==="login";return`
    <main class="auth-layout">
      <section class="auth-hero">
        <div class="auth-brandline">
          <span class="brand-mark">C</span>
          <strong>챌린지 매니저</strong>
        </div>
        <h1>운영과 인증을 한 화면에서</h1>
        <p>참가 신청, 회비 확인, 매일 제출, 검수, 환급 관리까지 한 흐름으로 확인합니다.</p>
        <div class="auth-flow">
          <div><span>01</span><strong>참가 신청</strong><p>수강생이 챌린지를 선택합니다.</p></div>
          <div><span>02</span><strong>미션 제출</strong><p>매일 결과물을 남깁니다.</p></div>
          <div><span>03</span><strong>운영 검수</strong><p>관리자가 승인과 환급을 관리합니다.</p></div>
        </div>
      </section>
      <section class="auth-panel">
        <span class="badge primary">운영/인증</span>
        <h2>${t?"로그인":"참가자 계정 만들기"}</h2>
        <p class="help-text">관리자는 운영 화면으로, 참가자는 미션 화면으로 이동합니다.</p>
        <div class="auth-tabs">
          <button class="${t?"active":""}" data-auth-tab="login">로그인</button>
          <button class="${t?"":"active"}" data-auth-tab="signup">참가자 계정 만들기</button>
        </div>
        <form class="form" id="authForm">
          <div class="field">
            <label>이메일</label>
            <input name="email" type="email" required placeholder="email@example.com" />
          </div>
          ${t?"":`
            <div class="field">
              <label>닉네임</label>
              <input name="nickname" required placeholder="사용할 닉네임" />
            </div>
          `}
          <div class="field">
            <label>비밀번호</label>
            <input name="password" type="password" required placeholder="비밀번호" />
          </div>
          <button class="primary-btn" type="submit">${t?"로그인":"가입하기"}</button>
          <p id="authMessage" class="error-text"></p>
        </form>
        <div class="demo-accounts">
          <strong>테스트 계정</strong>
          <div><span>관리자</span><code>${x} / ${O}</code></div>
          <div><span>예비 관리자</span><code>admin@demo.com / admin123</code></div>
          <div><span>참가자</span><code>user@demo.com / user123</code></div>
        </div>
      </section>
    </main>
  `}function dt(){const n=pt().filter(a=>a.status==="active")[0],s=n?gt(n):null,i=n?f(n.challenge_id):null;return`
    <main class="page">
      <section class="section-title">
        <div>
          <h2>오늘의 챌린지</h2>
          <p>오늘 해야 할 미션과 진행 중인 챌린지를 확인하세요.</p>
        </div>
        <button class="primary-btn" data-nav="challenges">챌린지 찾기</button>
      </section>

      ${s&&i?`
        <section class="mission-card">
          <div class="mission-top">
            <div>
              ${Q(i.type)}
              <h3>${c(s.title)}</h3>
              <p>${c(i.title)} · 마감 ${Y(s)}</p>
            </div>
            ${T(n.id,s.id)?y(T(n.id,s.id).status):'<span class="badge warning">미제출</span>'}
          </div>
          <div class="progress"><span style="width:${P(n)}%"></span></div>
          <p class="help-text">완주율 ${P(n)}%</p>
          <div class="card-actions">
            <button class="primary-btn" data-action="open-mission" data-challenge-id="${i.id}">오늘의 미션 보기</button>
            <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${i.id}">랭킹 보기</button>
          </div>
        </section>
      `:`
        <section class="empty">참여 중인 챌린지가 없습니다. 챌린지를 선택하고 오늘의 미션을 시작하세요.</section>
      `}

      ${i?rt(i.id):rt()}

      ${i?ht(i,n):""}

      <section class="panel">
        <div class="section-title">
          <div>
            <h2>추천 챌린지</h2>
            <p>완성물까지 이어지는 챌린지만 노출합니다.</p>
          </div>
        </div>
        <div class="grid three">
          ${r.challenges.map(vt).join("")}
        </div>
      </section>
    </main>
  `}function vt(t){const e=M(t.id),n=t.type==="fairy_tale"?{src:W,className:"fairy-preview",title:"GIF 크게 보기",alt:"AI 동화 챌린지 미리보기"}:t.type==="poem_art"?{src:yt,className:"fairy-preview poem-preview",title:"이미지 크게 보기",alt:"시화집 챌린지 미리보기"}:t.type==="blog"?{src:wt,className:"fairy-preview blog-preview",title:"이미지 크게 보기",alt:"블로그 글쓰기 챌린지 미리보기"}:t.type==="instagram"?{src:kt,className:"fairy-preview instagram-preview",title:"GIF 크게 보기",alt:"인스타 릴스 챌린지 미리보기"}:null;return`
    <article class="challenge-card">
      ${n?`
        <figure class="${n.className} card">
          <a href="${n.src}" target="_blank" rel="noreferrer" title="${n.title}">
            <img src="${n.src}" alt="${n.alt}" loading="lazy" />
          </a>
        </figure>
      `:""}
      <div class="card-head">
        ${Q(t.type)}
        ${y(t.status)}
      </div>
      <h3>${c(t.title)}</h3>
      <p>${c(t.description)}</p>
      <div class="card-meta">
        <span>기간: ${t.start_date} - ${t.end_date}</span>
        <span>회비: ${t.entry_fee.toLocaleString()}원</span>
        <span>완주 환급: ${H.toLocaleString()}원</span>
        ${["fairy_tale","poem_art"].includes(t.type)?"<span>AI 도구: 미드저니 유료 계정, GPT 필수, 제미나이/클로드 선택</span>":""}
        <span>참가자: ${r.participations.filter(s=>s.challenge_id===t.id).length}명</span>
      </div>
      ${e?`<div class="progress"><span style="width:${P(e)}%"></span></div>`:""}
      <div class="card-actions">
        <button class="primary-btn" data-action="challenge-detail" data-challenge-id="${t.id}">${e?"상세/미션":"자세히"}</button>
        <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${t.id}">랭킹</button>
      </div>
    </article>
  `}function Bt(){const t=[["all","전체"],["fairy_tale","AI 동화"],["poem_art","시화"],["blog","블로그"],["instagram","인스타"],["paid","유료"]],e=r.challenges.filter(n=>p.challengeFilter==="all"?!0:p.challengeFilter==="paid"?n.is_paid:p.challengeFilter==="free"?!n.is_paid:n.type===p.challengeFilter);return`
    <main class="page">
      <section class="section-title">
        <div>
          <h2>챌린지 목록</h2>
          <p>참가할 챌린지를 선택하세요.</p>
        </div>
      </section>
      <div class="filters">
        ${t.map(([n,s])=>`<button class="${p.challengeFilter===n?"active":""}" data-filter="${n}">${s}</button>`).join("")}
      </div>
      <div class="grid three">
        ${e.map(vt).join("")||'<div class="empty">해당 조건의 챌린지가 없습니다.</div>'}
      </div>
    </main>
  `}function zt(t){const e=f(t);if(!e)return'<main class="page"><div class="empty">챌린지를 찾을 수 없습니다.</div></main>';const n=M(e.id),s=V(e.id),i=r.participations.filter(a=>a.challenge_id===e.id).length;return`
    <main class="page">
      <section class="detail-layout">
        <div class="panel">
          ${Q(e.type)}
          <h2>${c(e.title)}</h2>
          <p class="help-text">${c(e.description)}</p>
          <div class="detail-summary">
            <div class="metric"><span>참가비</span><strong>${e.entry_fee.toLocaleString()}원</strong></div>
            <div class="metric"><span>성공 기준</span><strong>${c(Et(e))}</strong></div>
            <div class="metric"><span>참가자</span><strong>${i}/100</strong></div>
            <div class="metric"><span>기간</span><strong>${s.length}일</strong></div>
            <div class="metric"><span>완주 환급</span><strong>${H.toLocaleString()}원</strong></div>
            <div class="metric"><span>일정</span><strong>${e.start_date.slice(5)} - ${e.end_date.slice(5)}</strong></div>
          </div>
          <div class="detail-info-grid">
            <div class="detail-info-card">
              <h3>매일 인증 방법 (인증 안내)</h3>
              <p>${c(xt(e))}</p>
            </div>
            <div class="detail-info-card">
              <h3>환급 안내</h3>
              <p>22일 동안 하루도 빠짐없이 인증하고 최종 결과물이 승인되면 20,000원 환급 조건을 충족합니다.</p>
            </div>
            ${["fairy_tale","poem_art"].includes(e.type)?`
              <div class="detail-info-card">
                <h3>AI 준비물</h3>
                <p>미드저니 유료 계정과 GPT 사용 준비는 필수이며, 제미나이 또는 클로드는 선택적으로 활용할 수 있습니다.</p>
              </div>
            `:""}
          </div>
          ${ht(e,n,!1)}
          <h3>미션 일정</h3>
          <div class="timeline">
            ${s.map(a=>`
              <div class="timeline-item">
                <strong>${a.day_number}일차</strong>
                <div>
                  <b>${c(a.title)}</b>
                  <p class="help-text">${Tt(a)} · ${c(a.description)} · 마감 ${Y(a)}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        <aside class="panel">
          <h3>참가 정보</h3>
          <div class="card-meta">
            <span>상태: ${y(e.status)}</span>
            <span>환급 조건: ${c(e.reward_description)}</span>
            <span>참가자: ${r.participations.filter(a=>a.challenge_id===e.id).length}명</span>
          </div>
          ${n?`
            <div class="notice">이미 참가 중입니다. 오늘의 미션을 제출하고 완주율을 올려보세요.</div>
            <div class="card-actions">
              <button class="primary-btn" data-action="open-mission" data-challenge-id="${e.id}">오늘의 미션 보기</button>
              <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${e.id}">랭킹 보기</button>
            </div>
          `:`
            <button class="primary-btn" data-action="join-challenge" data-challenge-id="${e.id}">참가하기</button>
            <p class="help-text">유료 챌린지는 관리자 결제 확인 후 제출할 수 있습니다.</p>
          `}
        </aside>
      </section>
    </main>
  `}function Ht(t){const e=f(t),n=M(t);if(!e||!n)return'<main class="page"><div class="empty">참가 정보가 없습니다.</div></main>';if(e.is_paid&&!Nt(n))return`
      <main class="page">
        <section class="panel">
          <h2>결제 확인 대기</h2>
          <p class="help-text">유료 챌린지는 운영자가 결제 상태를 확인한 뒤 제출할 수 있습니다.</p>
          <button class="secondary-btn" data-action="challenge-detail" data-challenge-id="${e.id}">상세로 돌아가기</button>
        </section>
      </main>
    `;const s=gt(n),i=T(n.id,s.id),a=J(s);return`
    <main class="page">
      <section class="mission-card">
        <div class="mission-top">
          <div>
            ${Q(e.type)}
            <h2>${c(s.title)}</h2>
            <p>${c(s.description)}</p>
          </div>
          ${i?y(i.status,i.is_late?"지각":""):a?'<span class="badge warning">마감 지남</span>':'<span class="badge primary">제출 가능</span>'}
        </div>
        <div class="grid four">
          <div class="metric"><span>일차</span><strong>${s.day_number}</strong></div>
          <div class="metric"><span>마감</span><strong>${Y(s)}</strong></div>
          <div class="metric"><span>필수 링크</span><strong>${s.required_link?"필수":"선택"}</strong></div>
          <div class="metric"><span>필수 파일</span><strong>${s.required_file?"PDF":"없음"}</strong></div>
        </div>
        <div class="quality-panel">
          <strong>오늘 제출 기준</strong>
          <div class="quality-list">
            <span>제목과 본문 또는 설명이 함께 있어야 합니다.</span>
            <span>${e.type==="fairy_tale"?"동화 페이지는 장면 설명까지 남기면 검수가 빠릅니다.":e.type==="poem_art"?"시와 이미지가 한 화면에서 함께 확인되면 검수가 빠릅니다.":"외부 링크는 공개 접근이 가능해야 합니다."}</span>
            <span>${s.required_file?"최종 PDF 파일을 첨부해야 합니다.":"캡처 이미지는 진행 증빙으로 보관됩니다."}</span>
          </div>
        </div>
        <div class="card-actions">
          ${(i==null?void 0:i.status)==="approved"?`
            <button class="secondary-btn" data-action="submission-detail" data-submission-id="${i.id}">제출 상세</button>
          `:`
            <button class="primary-btn" data-action="open-submit" data-mission-id="${s.id}">${i?"수정/재제출":"제출하기"}</button>
          `}
          <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${e.id}">랭킹 보기</button>
        </div>
      </section>
    </main>
  `}function Jt(t){const e=N(t),n=f(e==null?void 0:e.challenge_id),s=M(n==null?void 0:n.id),i=T(s==null?void 0:s.id,t);return!e||!n||!s?'<main class="page"><div class="empty">제출할 미션을 찾을 수 없습니다.</div></main>':(i==null?void 0:i.status)==="approved"?_t(i.id):`
    <main class="page">
      <section class="section-title">
        <div>
          <h2>${c(e.title)}</h2>
          <p>${c(n.title)} · 마감 ${Y(e)}</p>
        </div>
      </section>
      <form class="panel form" id="submissionForm">
        <input type="hidden" name="missionId" value="${e.id}" />
        <div class="notice ${J(e)?"warning":""}">
          ${J(e)?"현재 제출하면 지각 제출로 기록됩니다.":"필수 항목을 확인한 뒤 제출하세요."}
        </div>
        <div class="submit-checklist">
          <strong>제출 전 체크</strong>
          <label><input type="checkbox" name="quality_check" value="readable" /> 운영자가 바로 확인할 수 있게 제목과 설명을 정리했습니다.</label>
          <label><input type="checkbox" name="quality_check" value="proof" /> 링크, 캡처, PDF 중 오늘 필요한 증빙을 빠뜨리지 않았습니다.</label>
          <label><input type="checkbox" name="quality_check" value="publishable" /> AI 동화/시화 챌린지는 최종 책이나 PDF로 묶일 수 있는 흐름을 유지했습니다.</label>
        </div>
        <div class="field">
          <label>제출 제목</label>
          <input name="title" required value="${c((i==null?void 0:i.title)||"")}" />
        </div>
        <div class="field">
          <label>설명 또는 본문</label>
          <textarea name="body">${c((i==null?void 0:i.body)||"")}</textarea>
        </div>
        <div class="field">
          <label>링크 ${e.required_link?"(필수)":"(선택)"}</label>
          <input name="link_url" value="${c((i==null?void 0:i.link_url)||"")}" placeholder="https://..." />
        </div>
        <div class="field">
          <label>캡처 이미지 ${e.required_capture?"(필수)":"(선택)"}</label>
          <input name="capture_images" type="file" accept="image/png,image/jpeg,image/webp" multiple />
          <p class="help-text">최대 5장, 장당 10MB 이하를 권장합니다. 데모에서는 파일명만 저장합니다.</p>
        </div>
        <div class="field">
          <label>PDF 파일 ${e.required_file?"(필수)":"(선택)"}</label>
          <input name="pdf_file" type="file" accept="application/pdf" />
        </div>
        <div class="actions-row">
          <button class="primary-btn" type="submit">제출하기</button>
          <button class="secondary-btn" type="button" data-action="open-mission" data-challenge-id="${n.id}">취소</button>
        </div>
        <p id="submissionMessage" class="error-text"></p>
      </form>
    </main>
  `}function _t(t){var v;const e=U(t);if(!e)return'<main class="page"><div class="empty">제출물을 찾을 수 없습니다.</div></main>';const n=C(e.participation_id),s=f(n.challenge_id),i=N(e.mission_id),a=ut(e.id),d=mt(e.id).length,o=n.user_id===g().id,l=Pt(e.id),u=e.status==="approved"&&!o?`<button class="secondary-btn" data-action="toggle-like" data-submission-id="${e.id}">${l?"좋아요 취소":"좋아요"}</button>`:"";return`
    <main class="page">
      <section class="panel">
        <div class="section-title">
          <div>
            <h2>${c(e.title)}</h2>
            <p>${c(s.title)} · ${c(i.title)}</p>
          </div>
          ${y(e.status,e.is_late?"지각":"")}
        </div>
        <div class="grid two">
          <div>
            <h3>제출 내용</h3>
            <p class="help-text">${c(e.body||"본문 없음")}</p>
            ${e.link_url?`<p><a href="${c(e.link_url)}" target="_blank" rel="noreferrer">${c(e.link_url)}</a></p>`:""}
          </div>
          <div>
            <h3>첨부</h3>
            <div class="file-list">
              ${a.map(I=>`<div class="file-pill"><span>${c(I.type)} · ${c(I.file_url)}</span></div>`).join("")||'<p class="help-text">첨부 없음</p>'}
            </div>
          </div>
        </div>
        ${(v=e.quality_checks)!=null&&v.length?`
          <div class="quality-panel">
            <strong>제출 전 체크 완료</strong>
            <div class="quality-list">
              ${e.quality_checks.map(I=>`<span>${c(I)}</span>`).join("")}
            </div>
          </div>
        `:""}
        <div class="notice">
          사용자 반응 ${d}개
          ${u}
        </div>
        ${e.rejection_reason?`<div class="notice danger">반려 사유: ${c(e.rejection_reason)}</div>`:""}
        <div class="card-actions">
          <button class="secondary-btn" data-action="open-mission" data-challenge-id="${s.id}">미션으로</button>
          ${e.status==="rejected"&&e.resubmit_count<1?`<button class="primary-btn" data-action="open-submit" data-mission-id="${i.id}">재제출</button>`:""}
        </div>
      </section>
    </main>
  `}function bt(t){const n=r.participations.filter(s=>s.challenge_id===t).map(s=>{const i=st(s.id).filter(u=>u.status==="approved"),a=i.filter(u=>!u.is_late),d=i.reduce((u,v)=>u+Number(v.admin_score||0),0),o=i.reduce((u,v)=>u+mt(v.id).length,0),l=i.length*10+a.length*5+d+o;return{participation:s,approvedCount:i.length,onTimeCount:a.length,adminScore:d,likeCount:o,total:l}});return n.sort((s,i)=>i.total!==s.total?i.total-s.total:i.onTimeCount!==s.onTimeCount?i.onTimeCount-s.onTimeCount:i.approvedCount!==s.approvedCount?i.approvedCount-s.approvedCount:new Date(s.participation.joined_at)-new Date(i.participation.joined_at)),n.forEach((s,i)=>{s.participation.total_score=s.total,s.participation.rank=i+1}),b(),n}function Kt(t=null){var i;const e=t||((i=r.challenges[0])==null?void 0:i.id),n=f(e),s=n?bt(n.id):[];return`
    <main class="page">
      <section class="section-title">
        <div>
          <h2>랭킹</h2>
          <p>승인 제출 수, 정시 제출 수, 관리자 점수, 좋아요를 합산합니다.</p>
        </div>
        <select id="rankingChallenge">
          ${r.challenges.map(a=>`<option value="${a.id}" ${a.id===e?"selected":""}>${c(a.title)}</option>`).join("")}
        </select>
      </section>
      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>닉네임</th>
                <th>총점</th>
                <th>승인</th>
                <th>정시</th>
                <th>관리자 점수</th>
                <th>좋아요</th>
                <th>제출물</th>
              </tr>
            </thead>
            <tbody>
              ${s.map((a,d)=>{const o=r.users.find(u=>u.id===a.participation.user_id),l=Lt(a.participation.id);return`
                  <tr>
                    <td>${d+1}</td>
                    <td>${c((o==null?void 0:o.nickname)||"-")}</td>
                    <td><strong>${a.total}</strong></td>
                    <td>${a.approvedCount}</td>
                    <td>${a.onTimeCount}</td>
                    <td>${a.adminScore}</td>
                    <td>${a.likeCount}</td>
                    <td>${l?`<button class="secondary-btn" data-action="submission-detail" data-submission-id="${l.id}">보기</button>`:"-"}</td>
                  </tr>
                `}).join("")||'<tr><td colspan="8">랭킹 데이터가 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `}function Ut(){const t=pt(),e=r.payoutAccounts.find(s=>s.user_id===g().id),n=r.rewards.filter(s=>t.some(i=>i.id===s.participation_id));return`
    <main class="page">
      <section class="section-title">
        <div>
          <h2>마이페이지</h2>
          <p>참여 챌린지, 제출 상태, 환급, 계좌를 확인하세요.</p>
        </div>
        <button class="primary-btn" data-nav="account">계좌 등록</button>
      </section>
      <div class="grid three">
        <div class="metric"><span>참여 챌린지</span><strong>${t.length}</strong></div>
        <div class="metric"><span>제출 수</span><strong>${r.submissions.filter(s=>t.some(i=>i.id===s.participation_id)).length}</strong></div>
        <div class="metric"><span>계좌 상태</span><strong>${L[(e==null?void 0:e.status)||"unregistered"]}</strong></div>
      </div>
      <section class="panel">
        <h3>내 챌린지</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>챌린지</th><th>결제</th><th>완주율</th><th>점수</th><th>액션</th></tr></thead>
            <tbody>
              ${t.map(s=>{const i=f(s.challenge_id);return`<tr>
                  <td>${c(i.title)}</td>
                  <td>${ft(s.payment_status)}</td>
                  <td>${P(s)}%</td>
                  <td>${s.total_score||0}</td>
                  <td><button class="secondary-btn" data-action="open-mission" data-challenge-id="${i.id}">미션</button></td>
                </tr>`}).join("")||'<tr><td colspan="5">참여 중인 챌린지가 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <h3>환급 상태</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>챌린지</th><th>유형</th><th>환급액</th><th>상태</th></tr></thead>
            <tbody>
              ${n.map(s=>{const i=C(s.participation_id);return`<tr><td>${c(f(i.challenge_id).title)}</td><td>${s.reward_type}</td><td>${s.amount}</td><td>${y(s.status)}</td></tr>`}).join("")||'<tr><td colspan="4">환급 내역이 없습니다.</td></tr>'}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `}function Vt(){const t=r.payoutAccounts.find(e=>e.user_id===g().id);return`
    <main class="page">
      <section class="section-title">
        <div>
          <h2>상금 수령 계좌</h2>
          <p>환급금을 받기 위한 계좌를 등록하세요.</p>
        </div>
        ${y((t==null?void 0:t.status)||"unregistered")}
      </section>
      <form class="panel form" id="accountForm">
        <div class="field"><label>예금주명</label><input name="account_holder" required value="${c((t==null?void 0:t.account_holder)||"")}" /></div>
        <div class="field"><label>은행명</label><input name="bank_name" required value="${c((t==null?void 0:t.bank_name)||"")}" /></div>
        <div class="field"><label>계좌번호</label><input name="account_number" required placeholder="${t?`등록됨: ****${t.account_number_last4}`:"숫자만 입력"}" /></div>
        <div class="field"><label>연락처</label><input name="phone" required value="${c((t==null?void 0:t.phone)||"")}" /></div>
        <label class="help-text"><input type="checkbox" name="consent" required /> 개인정보 수집 및 이용에 동의합니다.</label>
        ${t!=null&&t.rejection_reason?`<div class="notice danger">반려 사유: ${c(t.rejection_reason)}</div>`:""}
        <button class="primary-btn" type="submit">계좌 저장</button>
        <p id="accountMessage" class="success-text"></p>
      </form>
    </main>
  `}function Yt(){return`
    <main class="page wide">
      <section class="admin-layout">
        <aside class="sidebar">
          ${[["dashboard","대시보드"],["operatorGuide","운영 설명"],["challenges","챌린지 관리"],["participants","참가자 관리"],["submissions","제출 검수"],["rankings","랭킹 관리"],["rewards","환급 정산"],["accounts","계좌 검수"],["auditLogs","감사 로그"]].map(([t,e])=>`<button class="${p.adminPage===t?"active":""}" data-admin-nav="${t}">${e}</button>`).join("")}
          ${et(g(),"sidebar")}
        </aside>
        <section>
          ${Qt()}
        </section>
      </section>
    </main>
  `}function Qt(){return p.adminPage==="dashboard"?ot():p.adminPage==="operatorGuide"?Wt():p.adminPage==="challenges"?Xt():p.adminPage==="participants"?Zt():p.adminPage==="submissions"?te():p.adminPage==="rankings"?ie():p.adminPage==="rewards"?ne():p.adminPage==="accounts"?se():p.adminPage==="auditLogs"?ae():ot()}function Wt(){return`
    <div class="section-title">
      <div>
        <h2>운영 설명</h2>
        <p>고객에게 설명할 때 바로 사용할 수 있는 쉬운 안내 문장입니다.</p>
      </div>
    </div>
    <section class="panel operator-guide-hero">
      <span class="badge primary">고객 안내 핵심</span>
      <h3>30,000원을 내고, 22일 동안 하루도 빠짐없이 인증하면, 20,000원을 환급받을 수 있습니다.</h3>
      <p>이 문장을 기준으로 참가비, 인증, 환급 조건을 설명하면 고객이 덜 헷갈립니다.</p>
    </section>
    <section class="operator-guide-grid">
      ${[{title:"챌린지 한 줄 설명",body:"30,000원으로 참여하고, 22일 동안 하루도 빠짐없이 매일 인증하면 20,000원을 환급받는 창작 챌린지입니다."},{title:"매일 인증 방법",body:"매일 만든 결과물을 캡처나 링크로 올립니다. AI 동화와 시화는 마지막 날 완성한 전자책 PDF까지 제출합니다."},{title:"환급 조건",body:"22일 모두 인증하고 최종 결과물이 승인되어야 20,000원 환급 대상이 됩니다. 하루라도 빠지면 환급 대상에서 제외될 수 있습니다."},{title:"AI 준비물",body:"AI 동화와 시화는 미드저니 유료 계정과 GPT 사용 준비가 필요합니다. 제미나이 또는 클로드는 선택으로 활용할 수 있습니다."},{title:"운영자가 확인하는 것",body:"참가비 확인, 매일 제출 여부, 제출물 승인 여부, 계좌 검수, 환급 상태를 차례대로 확인합니다."},{title:"고객에게 쉽게 말하기",body:"어려운 말보다 '매일 올려주세요', '22일 모두 해야 환급됩니다', '마지막에는 PDF를 냅니다'처럼 짧게 설명합니다."}].map(e=>`
        <div class="detail-info-card">
          <h3>${e.title}</h3>
          <p>${e.body}</p>
        </div>
      `).join("")}
    </section>
    <section class="panel">
      <h3>자주 받을 질문</h3>
      <div class="simple-list">
        <div class="list-row"><span><strong>하루 빠지면 환급되나요?</strong><small>22일 모두 인증해야 환급 대상입니다.</small></span></div>
        <div class="list-row"><span><strong>미드저니가 꼭 필요한가요?</strong><small>AI 동화와 시화는 미드저니 유료 계정 준비가 필요합니다.</small></span></div>
        <div class="list-row"><span><strong>제미나이나 클로드도 꼭 써야 하나요?</strong><small>아니요. 제미나이와 클로드는 선택 활용입니다.</small></span></div>
        <div class="list-row"><span><strong>최종 제출물은 무엇인가요?</strong><small>AI 동화와 시화는 최종 전자책 PDF를 제출합니다.</small></span></div>
      </div>
    </section>
  `}function ot(){const t=r.submissions.filter(d=>["submitted","reviewing","needs_check"].includes(d.status)).length,e=r.submissions.filter(d=>["submitted","reviewing","needs_check"].includes(d.status)).slice(-5).reverse(),n=["scheduled","held","paid","excluded"].map(d=>({status:d,count:r.rewards.filter(o=>o.status===d).length})),s=r.challenges.slice(-4).reverse(),i=(r.signupNotifications||[]).slice(0,5),a=(r.adminNotes||[]).slice(0,5);return`
    <div class="section-title"><div><h2>관리자 대시보드</h2><p>오늘 처리해야 할 운영 항목입니다.</p></div></div>
    <div class="grid four">
      <div class="metric"><span>챌린지</span><strong>${r.challenges.length}</strong></div>
      <div class="metric"><span>참가자</span><strong>${r.participations.length}</strong></div>
      <div class="metric"><span>검수 대기</span><strong>${t}</strong></div>
      <div class="metric"><span>계좌 검수</span><strong>${r.payoutAccounts.filter(d=>d.status==="pending").length}</strong></div>
    </div>
    <section class="admin-dashboard-grid">
      <div class="panel">
        <h3>최근 검토 대기 인증</h3>
        <div class="simple-list">
          ${e.map(d=>{const o=C(d.participation_id),l=r.users.find(I=>I.id===(o==null?void 0:o.user_id)),u=o?f(o.challenge_id):null,v=N(d.mission_id);return`<button class="list-row" data-action="select-admin-submission" data-submission-id="${d.id}">
              <span><strong>${c((l==null?void 0:l.nickname)||"-")}</strong><small>${c((u==null?void 0:u.title)||"-")} · ${(v==null?void 0:v.day_number)||"-"}일차</small></span>
              ${y(d.status)}
            </button>`}).join("")||'<div class="empty small">검토 대기 인증이 없습니다.</div>'}
        </div>
      </div>
      <div class="panel">
        <h3>환급 상태 요약</h3>
        <div class="status-summary">
          ${n.map(d=>`<div><span>${L[d.status]}</span><strong>${d.count}</strong></div>`).join("")}
        </div>
      </div>
    </section>
    <section class="panel">
      <h3>신규 회원 알림</h3>
      <p class="help-text">실제 이메일 발송 연결 시 알림 받을 이메일: ${x}</p>
      <div class="simple-list">
        ${i.map(d=>`<div class="list-row">
          <span><strong>${c(d.nickname||"참가자")}</strong><small>${c(d.email)} · ${c(d.created_at)}</small></span>
          <span class="badge primary">가입</span>
        </div>`).join("")||'<div class="empty small">신규 회원 알림이 없습니다.</div>'}
      </div>
    </section>
    <section class="panel">
      <h3>운영 메모</h3>
      <form class="admin-note-form" id="adminNoteForm">
        <input name="note" placeholder="예: 홍길동님 입금 확인 필요, 7일차 인증 재확인" required />
        <button class="secondary-btn" type="submit">메모 추가</button>
      </form>
      <div class="simple-list">
        ${a.map(d=>`<div class="list-row">
          <span><strong>${c(d.body)}</strong><small>${c(d.created_at)} · ${c(d.author||"관리자")}</small></span>
        </div>`).join("")||'<div class="empty small">아직 운영 메모가 없습니다.</div>'}
      </div>
    </section>
    <section class="panel">
      <h3>최근 챌린지</h3>
      <div class="simple-list">
        ${s.map(d=>`<button class="list-row" data-action="challenge-detail" data-challenge-id="${d.id}">
          <span><strong>${c(d.title)}</strong><small>${K[d.type]} · ${d.start_date} - ${d.end_date}</small></span>
          ${y(d.status)}
        </button>`).join("")}
      </div>
    </section>
  `}function Xt(){const t=F("fairy_tale");return`
    <div class="section-title"><div><h2>챌린지 관리</h2><p>모든 챌린지는 회비 30,000원, 22일 하루도 빠짐없이 인증 완료 시 20,000원 환급 조건으로 운영합니다.</p></div></div>
    <section class="panel">
      <form class="form" id="challengeForm">
        <div class="grid two">
          <div class="field"><label>제목</label><input name="title" required value="${c(t.title)}" /></div>
          <div class="field"><label>유형</label><select name="type"><option value="fairy_tale">AI 동화</option><option value="poem_art">시화</option><option value="blog">블로그</option><option value="instagram">인스타</option></select></div>
          <div class="field"><label>시작일</label><input name="start_date" type="date" value="${q}" required /></div>
          <div class="field"><label>회비</label><input name="entry_fee" type="number" min="0" value="${k}" /></div>
        </div>
        <div class="field"><label>설명</label><textarea name="description" required>${c(t.description)}</textarea></div>
        <div class="field"><label>조건 설명</label><input name="reward_description" required value="${c(t.reward_description)}" /></div>
        <button class="primary-btn" type="submit">챌린지 생성</button>
      </form>
    </section>
    <section class="panel">
      <div class="table-wrap"><table>
        <thead><tr><th>제목</th><th>유형</th><th>기간</th><th>정원</th><th>고객/그룹</th><th>예상 회비</th><th>환급 상태</th><th>상태</th></tr></thead>
        <tbody>${r.challenges.map(e=>{const n=r.participations.filter(a=>a.challenge_id===e.id),i=r.rewards.filter(a=>n.some(d=>d.id===a.participation_id)).filter(a=>["scheduled","held"].includes(a.status)).length;return`<tr>
            <td>${c(e.title)}<br><span class="help-text">검토 대기 ${r.submissions.filter(a=>{const d=C(a.participation_id);return(d==null?void 0:d.challenge_id)===e.id&&["submitted","reviewing","needs_check"].includes(a.status)}).length}건</span></td>
            <td>${K[e.type]}</td>
            <td>${e.start_date} - ${e.end_date}</td>
            <td>${n.length}/100</td>
            <td>개별 참가</td>
            <td>${(n.length*e.entry_fee).toLocaleString()}원</td>
            <td>${i?`${i}건 대기`:"대기 없음"}</td>
            <td>${y(e.status)}</td>
          </tr>`}).join("")}</tbody>
      </table></div>
    </section>
  `}function Zt(){return`
    <div class="section-title"><div><h2>참가자 관리</h2><p>참가비 상태와 완주율을 관리합니다.</p></div></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>사용자</th><th>챌린지</th><th>참가비 상태</th><th>완주율</th><th>액션</th></tr></thead>
      <tbody>
        ${r.participations.map(t=>{const e=r.users.find(s=>s.id===t.user_id),n=f(t.challenge_id);return`<tr>
            <td>${c((e==null?void 0:e.nickname)||"-")}</td>
            <td>${c(n.title)}</td>
            <td>
              <select class="compact-select" data-action="payment-status" data-participation-id="${t.id}">
                ${Object.entries(it).map(([s,i])=>`<option value="${s}" ${t.payment_status===s?"selected":""}>${i}</option>`).join("")}
              </select>
            </td>
            <td>${P(t)}%</td>
            <td>${ft(t.payment_status)}</td>
          </tr>`}).join("")||'<tr><td colspan="5">참가자가 없습니다.</td></tr>'}
      </tbody>
    </table></div></section>
  `}function te(){const t=r.submissions.slice().sort((n,s)=>new Date(s.submitted_at_iso||s.submitted_at)-new Date(n.submitted_at_iso||n.submitted_at)),e=U(p.selectedAdminSubmissionId)||t[0];return`
    <div class="section-title"><div><h2>제출 검수</h2><p>제출물을 확인하고 승인, 반려, 추가 확인 처리합니다.</p></div></div>
    <section class="split">
      <div class="panel">
        <div class="table-wrap"><table>
          <thead><tr><th>제출자</th><th>챌린지</th><th>미션</th><th>상태</th><th>액션</th></tr></thead>
          <tbody>
            ${t.map(n=>{const s=C(n.participation_id),i=r.users.find(o=>o.id===s.user_id),a=f(s.challenge_id),d=N(n.mission_id);return`<tr>
                <td>${c((i==null?void 0:i.nickname)||"-")}</td>
                <td>${c(a.title)}</td>
                <td>${d.day_number}일차</td>
                <td>${y(n.status,n.is_late?"지각":"")}</td>
                <td><button class="secondary-btn" data-action="select-admin-submission" data-submission-id="${n.id}">보기</button></td>
              </tr>`}).join("")||'<tr><td colspan="5">제출물이 없습니다.</td></tr>'}
          </tbody>
        </table></div>
      </div>
      <div class="panel">
        ${e?ee(e):'<div class="empty">선택된 제출물이 없습니다.</div>'}
      </div>
    </section>
  `}function ee(t){var s;const e=N(t.mission_id),n=ut(t.id);return`
    <h3>${c(t.title)}</h3>
    <p class="help-text">${c(e.title)} · ${t.submitted_at}</p>
    ${y(t.status,t.is_late?"지각":"")}
    <p>${c(t.body||"")}</p>
    ${t.link_url?`<p><a href="${c(t.link_url)}" target="_blank" rel="noreferrer">${c(t.link_url)}</a></p>`:""}
    <div class="file-list">${n.map(i=>`<div class="file-pill">${c(i.type)} · ${c(i.file_url)}</div>`).join("")||'<p class="help-text">첨부 없음</p>'}</div>
    ${(s=t.quality_checks)!=null&&s.length?`
      <div class="quality-panel">
        <strong>제출자가 확인한 기준</strong>
        <div class="quality-list">
          ${t.quality_checks.map(i=>`<span>${c(i)}</span>`).join("")}
        </div>
      </div>
    `:""}
    <form class="form" id="reviewForm">
      <input type="hidden" name="submissionId" value="${t.id}" />
      <div class="field"><label>관리자 점수</label><input name="admin_score" type="number" min="0" max="20" value="${t.admin_score||0}" /></div>
      <div class="field"><label>반려 사유</label><textarea name="rejection_reason">${c(t.rejection_reason||"")}</textarea></div>
      <div class="actions-row">
        <button class="primary-btn" name="result" value="approved">승인</button>
        <button class="danger-btn" name="result" value="rejected">반려</button>
        <button class="secondary-btn" name="result" value="needs_check">추가 확인</button>
      </div>
    </form>
  `}function ie(){return`
    <div class="section-title"><div><h2>랭킹 관리</h2><p>챌린지별 점수와 순위를 확인합니다.</p></div></div>
    ${r.challenges.map(t=>{const e=bt(t.id);return`<section class="panel">
        <h3>${c(t.title)}</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>순위</th><th>사용자</th><th>총점</th><th>승인</th><th>정시</th><th>좋아요</th></tr></thead>
          <tbody>${e.map((n,s)=>{const i=r.users.find(a=>a.id===n.participation.user_id);return`<tr><td>${s+1}</td><td>${c((i==null?void 0:i.nickname)||"-")}</td><td>${n.total}</td><td>${n.approvedCount}</td><td>${n.onTimeCount}</td><td>${n.likeCount}</td></tr>`}).join("")||'<tr><td colspan="6">데이터 없음</td></tr>'}</tbody>
        </table></div>
      </section>`}).join("")}
  `}function ne(){return re(),`
    <div class="section-title"><div><h2>환급 관리</h2><p>22일 하루도 빠짐없이 인증한 참가자의 20,000원 환급 상태를 관리합니다.</p></div></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>사용자</th><th>챌린지</th><th>유형</th><th>환급액</th><th>상태</th><th>액션</th></tr></thead>
      <tbody>${r.rewards.map(t=>{const e=C(t.participation_id),n=r.users.find(i=>i.id===e.user_id),s=f(e.challenge_id);return`<tr>
          <td>${c((n==null?void 0:n.nickname)||"-")}</td>
          <td>${c(s.title)}</td>
          <td>${t.reward_type}</td>
          <td>${t.amount}</td>
          <td>${y(t.status)}</td>
          <td class="actions-row">
            ${["scheduled","held","paid","excluded"].map(i=>`<button class="secondary-btn" data-action="reward-status" data-reward-id="${t.id}" data-status="${i}">${L[i]}</button>`).join("")}
          </td>
        </tr>`}).join("")||'<tr><td colspan="6">환급 데이터가 없습니다.</td></tr>'}</tbody>
    </table></div></section>
  `}function se(){return`
    <div class="section-title"><div><h2>계좌 검수</h2><p>환급금 지급을 위한 계좌 상태를 관리합니다.</p></div></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>사용자</th><th>예금주</th><th>은행</th><th>계좌</th><th>상태</th><th>액션</th></tr></thead>
      <tbody>${r.payoutAccounts.map(t=>{const e=r.users.find(n=>n.id===t.user_id);return`<tr>
          <td>${c((e==null?void 0:e.nickname)||"-")}</td>
          <td>${c(t.account_holder)}</td>
          <td>${c(t.bank_name)}</td>
          <td>****${c(t.account_number_last4)}</td>
          <td>${y(t.status)}</td>
          <td class="actions-row">
            <button class="primary-btn" data-action="account-status" data-account-id="${t.id}" data-status="approved">승인</button>
            <button class="danger-btn" data-action="account-status" data-account-id="${t.id}" data-status="rejected">반려</button>
          </td>
        </tr>`}).join("")||'<tr><td colspan="6">등록된 계좌가 없습니다.</td></tr>'}</tbody>
    </table></div></section>
  `}function ae(){return`
    <div class="section-title"><div><h2>감사 로그</h2><p>관리자가 처리한 검수, 환급, 계좌 변경 기록을 확인합니다.</p></div></div>
    <section class="panel">
      <div class="table-wrap"><table>
        <thead><tr><th>시간</th><th>관리자</th><th>작업</th><th>대상</th><th>내용</th></tr></thead>
        <tbody>${(r.auditLogs||[]).map(e=>`<tr>
          <td>${c(e.created_at)}</td>
          <td>${c(e.actor)}</td>
          <td>${c(e.action)}</td>
          <td>${c(e.target)}</td>
          <td>${c(e.detail)}</td>
        </tr>`).join("")||'<tr><td colspan="5">아직 기록된 작업이 없습니다.</td></tr>'}</tbody>
      </table></div>
    </section>
  `}function re(){r.participations.forEach(t=>{var s;const e=r.rewards.find(i=>i.participation_id===t.id);if(e){e.reward_type="환급",e.amount=H,e.memo="22일 완주 환급";return}P(t)<100||r.rewards.push({id:h("reward"),participation_id:t.id,reward_type:"환급",amount:H,status:"scheduled",paid_at:"",memo:"22일 완주 환급",updated_by:((s=g())==null?void 0:s.id)||""})}),b()}function de(){var t;document.querySelectorAll("[data-auth-tab]").forEach(e=>{e.addEventListener("click",()=>{p.authMode=e.dataset.authTab,A()})}),(t=document.querySelector("#authForm"))==null||t.addEventListener("submit",e=>{e.preventDefault();const n=new FormData(e.currentTarget),s=String(n.get("email")).trim(),i=String(n.get("password")),a=document.querySelector("#authMessage");if(p.authMode==="signup"){const o=String(n.get("nickname")).trim();if(r.users.some(u=>u.email===s)){a.textContent="이미 가입된 이메일입니다.";return}const l={id:h("user"),email:s,password:i,nickname:o,role:"user",created_at:_()};r.users.push(l),jt(l),r.session={userId:l.id},b(),w("home");return}const d=r.users.find(o=>o.email===s&&o.password===i);if(!d){a.textContent="이메일 또는 비밀번호를 확인하세요.";return}r.session={userId:d.id},b(),w(d.role==="admin"?"admin":"home")})}function oe(){var t,e;document.querySelectorAll("[data-nav]").forEach(n=>{n.addEventListener("click",()=>w(n.dataset.nav))}),(t=document.querySelector("[data-pet-target]"))==null||t.addEventListener("click",n=>{const s=n.currentTarget.dataset.petTarget;s==="operatorGuide"?B("operatorGuide"):w(s)}),(e=document.querySelector("[data-action='logout']"))==null||e.addEventListener("click",Mt)}function le(){var t,e,n,s,i,a,d;document.querySelectorAll("[data-admin-nav]").forEach(o=>{o.addEventListener("click",()=>B(o.dataset.adminNav))}),document.querySelectorAll("[data-filter]").forEach(o=>{o.addEventListener("click",()=>{p.challengeFilter=o.dataset.filter,A()})}),document.querySelectorAll("[data-action]").forEach(o=>{const l=o.dataset.action;l==="challenge-detail"&&o.addEventListener("click",()=>w("challengeDetail",{selectedChallengeId:o.dataset.challengeId})),l==="open-mission"&&o.addEventListener("click",()=>w("mission",{selectedChallengeId:o.dataset.challengeId})),l==="open-submit"&&o.addEventListener("click",()=>w("submit",{selectedMissionId:o.dataset.missionId})),l==="submission-detail"&&o.addEventListener("click",()=>w("submissionDetail",{selectedSubmissionId:o.dataset.submissionId})),l==="toggle-like"&&o.addEventListener("click",()=>be(o.dataset.submissionId)),l==="open-ranking"&&o.addEventListener("click",()=>w("ranking",{selectedChallengeId:o.dataset.challengeId})),l==="join-challenge"&&o.addEventListener("click",()=>pe(o.dataset.challengeId)),l==="select-admin-submission"&&o.addEventListener("click",()=>B("submissions",{selectedAdminSubmissionId:o.dataset.submissionId})),l==="mark-paid"&&o.addEventListener("click",()=>ve(o.dataset.participationId)),l==="reward-status"&&o.addEventListener("click",()=>$e(o.dataset.rewardId,o.dataset.status)),l==="account-status"&&o.addEventListener("click",()=>ye(o.dataset.accountId,o.dataset.status))}),document.querySelectorAll("[data-action='payment-status']").forEach(o=>{o.addEventListener("change",()=>_e(o.dataset.participationId,o.value))}),(t=document.querySelector("#submissionForm"))==null||t.addEventListener("submit",ue),(e=document.querySelector("#accountForm"))==null||e.addEventListener("submit",me),(n=document.querySelector("#adminNoteForm"))==null||n.addEventListener("submit",he),(s=document.querySelector("#challengeForm"))==null||s.addEventListener("submit",ge),(i=document.querySelector("#challengeForm select[name='type']"))==null||i.addEventListener("change",o=>{ce(o.currentTarget.form,o.currentTarget.value)}),(a=document.querySelector("#reviewForm"))==null||a.addEventListener("submit",fe),(d=document.querySelector("#rankingChallenge"))==null||d.addEventListener("change",o=>w("ranking",{selectedChallengeId:o.target.value}))}function ce(t,e){const n=F(e);t.elements.title.value=n.title,t.elements.description.value=n.description,t.elements.reward_description.value=n.reward_description,t.elements.entry_fee.value=k,t.elements.start_date.value=q}function pe(t){if(M(t))return;const e=f(t);r.participations.push({id:h("participation"),user_id:g().id,challenge_id:t,payment_status:e.is_paid?"billing_scheduled":"not_billable",status:"active",joined_at:_(),total_score:0,rank:null}),b(),w("challengeDetail",{selectedChallengeId:t})}function ue(t){t.preventDefault();const e=new FormData(t.currentTarget),n=N(String(e.get("missionId"))),s=f(n.challenge_id),i=M(s.id),a=document.querySelector("#submissionMessage"),d=String(e.get("title")).trim(),o=String(e.get("body")).trim(),l=String(e.get("link_url")).trim(),u=t.currentTarget.querySelector("input[name='capture_images']").files,v=t.currentTarget.querySelector("input[name='pdf_file']").files[0],I=e.getAll("quality_check");if(I.length<3){a.textContent="제출 전 체크 3가지를 모두 확인하세요.";return}if(n.required_link&&!l){a.textContent="필수 링크를 입력하세요.";return}if(s.type==="blog"&&l&&!/^https?:\/\//i.test(l)){a.textContent="블로그 링크는 http:// 또는 https://로 시작해야 합니다.";return}if(s.type==="instagram"&&l&&!/(instagram\.com|instagr\.am)/i.test(l)){a.textContent="인스타 링크는 instagram.com 또는 instagr.am을 포함해야 합니다.";return}if(n.required_capture&&u.length<1){a.textContent="필수 캡처 이미지를 업로드하세요.";return}if(u.length>5){a.textContent="캡처 이미지는 최대 5장까지 업로드할 수 있습니다.";return}if(n.required_file&&!v){a.textContent="PDF 파일을 업로드하세요.";return}let m=T(i.id,n.id);const $t=(m==null?void 0:m.status)==="rejected";m||(m={id:h("submission"),participation_id:i.id,mission_id:n.id,resubmit_count:0},r.submissions.push(m)),m.title=d,m.body=o,m.link_url=l,m.file_url=(v==null?void 0:v.name)||m.file_url||"",m.submitted_at=_(),m.submitted_at_iso=new Date().toISOString(),m.status="submitted",m.is_late=J(n),m.quality_checks=I,m.rejection_reason="",m.admin_score=0,m.reviewed_by="",m.reviewed_at="",$t&&(m.resubmit_count+=1),r.attachments=r.attachments.filter(G=>G.submission_id!==m.id),Array.from(u).forEach(G=>{r.attachments.push({id:h("attachment"),submission_id:m.id,type:"capture",file_url:G.name,file_size:G.size,mime_type:G.type,caption:"캡처 이미지"})}),v&&r.attachments.push({id:h("attachment"),submission_id:m.id,type:"pdf",file_url:v.name,file_size:v.size,mime_type:v.type,caption:"PDF 파일"}),b(),w("submissionDetail",{selectedSubmissionId:m.id})}function me(t){t.preventDefault();const e=new FormData(t.currentTarget),n=String(e.get("account_number")).trim();let s=r.payoutAccounts.find(i=>i.user_id===g().id);s||(s={id:h("account"),user_id:g().id},r.payoutAccounts.push(s)),s.account_holder=String(e.get("account_holder")).trim(),s.bank_name=String(e.get("bank_name")).trim(),s.account_number_encrypted=btoa(n),s.account_number_last4=n.slice(-4),s.phone=String(e.get("phone")).trim(),s.consented_at=_(),s.status="pending",s.rejection_reason="",b(),A()}function he(t){var s,i;t.preventDefault();const e=new FormData(t.currentTarget),n=String(e.get("note")).trim();n&&(r.adminNotes=r.adminNotes||[],r.adminNotes.unshift({id:h("note"),body:n,author:((s=g())==null?void 0:s.nickname)||((i=g())==null?void 0:i.email)||"관리자",created_at:_()}),r.adminNotes=r.adminNotes.slice(0,50),D("운영 메모 작성","관리자 대시보드",n),b(),A())}function ge(t){t.preventDefault();const e=new FormData(t.currentTarget),n=String(e.get("type")),s=String(e.get("start_date")),i={id:h("challenge"),type:n,title:String(e.get("title")).trim(),description:String(e.get("description")).trim(),start_date:s,end_date:E,daily_deadline_time:"23:59:00",entry_fee:k,is_paid:!0,status:"open",reward_description:["fairy_tale","poem_art"].includes(n)?`${$}, ${j}`:$};r.challenges.push(i),r.missions.push(...S(i)),D("챌린지 생성",i.title,`${K[n]} · ${s} 시작`),b(),B("challenges")}function fe(t){t.preventDefault();const e=new FormData(t.currentTarget),n=U(String(e.get("submissionId"))),s=t.submitter.value,i=String(e.get("rejection_reason")).trim();if(s==="rejected"&&!i){alert("반려 사유를 입력하세요.");return}n.status=s,n.rejection_reason=s==="rejected"?i:"",n.admin_score=s==="approved"?Math.max(0,Math.min(20,Number(e.get("admin_score")||0))):0,n.reviewed_by=g().id,n.reviewed_at=_(),D("제출 검수",n.title,L[s]||s),b(),B("submissions",{selectedAdminSubmissionId:n.id})}function ve(t){const e=C(t);e.payment_status="paid";const n=f(e.challenge_id);D("참가비 확인",n.title,"결제 완료 처리"),b(),A()}function _e(t,e){const n=C(t);if(!n)return;const s=f(n.challenge_id);n.payment_status=e,D("참가비 상태 변경",s.title,it[e]||e),b(),A()}function be(t){const e=U(t);if(!e||e.status!=="approved")return;if(C(e.participation_id).user_id===g().id){alert("본인 제출물에는 좋아요를 누를 수 없습니다.");return}const s=r.likes.find(i=>i.submission_id===t&&i.user_id===g().id);s?r.likes=r.likes.filter(i=>i.id!==s.id):r.likes.push({id:h("like"),submission_id:t,user_id:g().id,created_at:_()}),b(),w("submissionDetail",{selectedSubmissionId:t})}function $e(t,e){const n=r.rewards.find(a=>a.id===t);if(!n)return;if(e==="paid"){const a=C(n.participation_id),d=r.payoutAccounts.find(o=>o.user_id===a.user_id);if(!d||d.status!=="approved"){alert("승인된 계좌가 있어야 지급 완료 처리할 수 있습니다.");return}n.paid_at=_()}n.status=e,n.updated_by=g().id;const s=C(n.participation_id),i=f(s.challenge_id);D("환급 상태 변경",i.title,L[e]||e),b(),A()}function ye(t,e){const n=r.payoutAccounts.find(i=>i.id===t);if(!n)return;n.status=e,n.rejection_reason=e==="rejected"?"계좌 정보를 다시 확인해주세요.":"",n.reviewed_by=g().id,n.reviewed_at=_();const s=r.users.find(i=>i.id===n.user_id);D("계좌 검수",(s==null?void 0:s.email)||n.account_holder,L[e]||e),b(),A()}A();
