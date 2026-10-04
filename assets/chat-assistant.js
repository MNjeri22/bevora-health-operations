/* Bevora's guided website assistant: no messages are transmitted or stored. */
(() => {
  if (document.querySelector(".bevora-chat")) return;
  const answers = {
    services: {text:"Bevora supports clinical documentation, authorizations, billing, credentialing, intake and scheduling, compliance, accreditation readiness, training, and workflow automation. You can choose one service or combine several.", links:[["Explore services","/services/"]]},
    areas: {text:"We offer remote support across the United States, with priority markets in Maryland, Pennsylvania and Delaware, and selected U.K. markets. Tell us your location so we can discuss availability.",links:[["View service areas","/service-areas/"],["Ask about your location","/contact/"]]},
    call: {text:"Start with a free 20-minute operations discussion. Share your organization's needs through our contact form so we can discuss a practical starting point.",links:[["Book Your Free Call","/contact/"]]},
    pricing: {text:"Pricing and start dates depend on the services, scope, onboarding and system access your organization needs. Contact Bevora to discuss a tailored scope.",links:[["Discuss your needs","/contact/"]]},
    contact: {text:"Reach Bevora at admin@bevorahealth.com or +1 (215) 792-0894.",links:[["Email Bevora","mailto:admin@bevorahealth.com"],["Call Bevora","tel:+12157920894"],["Contact form","/contact/"]]},
    systems: {text:"Bevora can assess your existing systems and work with access arrangements approved by your organization. The discussion helps determine the most practical workflow.",links:[["Discuss your systems","/contact/"]]},
    providers: {text:"We support startups, growing practices, group practices, outpatient programs, PRP, SUD, IOP/PHP, medication-management practices and community behavioral-health organizations.",links:[["Who we serve","/who-we-serve/"]]},
    accreditation: {text:"Bevora helps organize policies, evidence, records, trackers and quality workflows for accreditation readiness. Accreditation decisions remain with the accrediting body.",links:[["Accreditation support","/services/#accreditation-support"]]},
    billing: {text:"Bevora supports billing administration, claims follow-up, denials and reconciliation. Payers make reimbursement decisions.",links:[["Billing support","/services/#billing"]]},
    documentation: {text:"We can assess documentation backlogs, organize priorities and support administrative workflows while preserving required clinical review.",links:[["Documentation support","/services/#documentation"]]},
    intake: {text:"Bevora supports referral tracking, intake coordination, appointment scheduling and related administrative workflows.",links:[["Intake and scheduling","/services/#intake"]]},
    credentialing: {text:"Bevora supports credentialing and enrollment administration, including application tracking and payer follow-up.",links:[["Credentialing support","/services/#credentialing"]]},
    authorizations: {text:"Bevora supports authorization submissions, utilization workflows and deadline tracking. Payers make approval decisions.",links:[["Authorization support","/services/#authorizations"]]},
    training: {text:"Training support includes documentation, workflows, onboarding, administrative processes and refresher training.",links:[["Training support","/services/#training"]]},
    automation: {text:"Bevora helps coordinate workflow alerts, trackers, dashboards and administrative automation.",links:[["Workflow automation","/services/#automation"]]},
    fallback: {text:"I can help with Bevora's services, locations, systems and free call. For a specific question, our team can help through the contact page.",links:[["Ask the Bevora team","/contact/"],["Read FAQs","/faq/"]]}
  };
  const chooseAnswer = (message) => {
    const text = message.toLowerCase();
    const rules = [
      ["call",/book|consult|free|assessment|meeting/],["pricing",/price|pricing|cost|fee|start date|how soon/],
      ["contact",/contact|email|phone|human|person|team member/],["areas",/where|location|country|countries|maryland|pennsylvania|delaware|london|manchester|liverpool|nationwide|united|\buk\b|\bus\b|coverage|service area/],
      ["accreditation",/accredit|carf|joint commission/],["billing",/bill|claim|revenue|denial/],
      ["documentation",/document|note|record|backlog/],["credentialing",/credential|enroll/],
      ["authorizations",/authoriz|authoris|utilization|utilisation/],["intake",/intake|schedul|referral/],
      ["automation",/automat|tracker|dashboard/],["training",/train|onboard/],
      ["systems",/system|software|platform|icanotes|sharenote|simplepractice/],
      ["providers",/who|startup|practice|provider|program/],["services",/service|offer|support|help|hello|\bhi\b/]
    ];
    return answers[rules.find(([,pattern]) => pattern.test(text))?.[0] || "fallback"];
  };
  const root = document.createElement("div");
  root.className = "bevora-chat";
  root.innerHTML = '<button class="bevora-chat-launcher" type="button" aria-label="Chat with Bevora" aria-expanded="false" aria-controls="bevora-chat-panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-10A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5Z"/><path d="M7 10h10M7 14h7"/></svg></button><section class="bevora-chat-panel" id="bevora-chat-panel" aria-labelledby="bevora-chat-title" hidden><div class="bevora-chat-header"><div><strong id="bevora-chat-title">Bevora Assistant</strong><small>Automated website guide</small></div><button class="bevora-chat-close" type="button" aria-label="Close chat">×</button></div><div class="bevora-chat-log" role="log" aria-live="polite" aria-relevant="additions" tabindex="0"></div><div class="bevora-chat-options" aria-label="Quick questions"></div><form class="bevora-chat-form"><label class="bevora-chat-label" for="bevora-chat-input">Your question</label><input id="bevora-chat-input" autocomplete="off" maxlength="300" placeholder="Ask about our services…" required><button type="submit" aria-label="Send question">Send</button></form><small class="bevora-chat-privacy">Please do not share patient or confidential information.</small></section>';
  document.body.append(root);
  const launcher=root.querySelector(".bevora-chat-launcher"),panel=root.querySelector(".bevora-chat-panel"),close=root.querySelector(".bevora-chat-close"),log=root.querySelector(".bevora-chat-log"),form=root.querySelector("form"),input=root.querySelector("input");
  const append = (text, user=false, links=[]) => {
    const bubble=document.createElement("div");bubble.className="bevora-chat-message"+(user?" bevora-chat-user":"");
    const content=document.createElement("p");content.textContent=text;bubble.append(content);
    links.forEach(([label,url])=>{const a=document.createElement("a");a.textContent=label;a.href=url;bubble.append(a)});
    log.append(bubble);log.scrollTop=log.scrollHeight;
  };
  append("Hi! How can I help you explore Bevora's operational support?");
  [["Our services","services"],["Where we serve","areas"],["Book a free call","call"],["Contact the team","contact"]].forEach(([label,key])=>{
    const button=document.createElement("button");button.type="button";button.textContent=label;
    button.addEventListener("click",()=>{append(label,true);const answer=answers[key];append(answer.text,false,answer.links)});
    root.querySelector(".bevora-chat-options").append(button);
  });
  const setOpen=(open)=>{panel.hidden=!open;launcher.setAttribute("aria-expanded",String(open));(open?close:launcher).focus();};
  launcher.addEventListener("click",()=>setOpen(panel.hidden));close.addEventListener("click",()=>setOpen(false));
  root.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden){event.stopPropagation();setOpen(false)}});
  form.addEventListener("submit",event=>{
    event.preventDefault();const question=input.value.trim();if(!question)return;
    append(question,true);input.value="";const answer=chooseAnswer(question);append(answer.text,false,answer.links);
  });
})();
