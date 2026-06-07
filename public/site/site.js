(function(){
  /* ===== Global Bio/AI animated background ===== */
  if(!document.getElementById('molexai-bg-canvas')){
    const c=document.createElement('canvas');
    c.id='molexai-bg-canvas';
    c.setAttribute('aria-hidden','true');
    c.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:.55;mix-blend-mode:screen';
    (document.body||document.documentElement).insertBefore(c,document.body?document.body.firstChild:null);
    const bgStyle=document.createElement('style');
    bgStyle.textContent='main,section,nav,footer,header{position:relative;z-index:1}';
    document.head.appendChild(bgStyle);
    const ctx=c.getContext('2d');
    let w,h,parts=[],helix=[],t0=performance.now();
    function resize(){
      const dpr=Math.min(devicePixelRatio||1,2);
      w=c.width=innerWidth*dpr;h=c.height=innerHeight*dpr;
      c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const n=Math.min(90,Math.floor(innerWidth*innerHeight/16000));
      parts=Array.from({length:n},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+0.6,p:Math.random()*Math.PI*2}));
      helix=Array.from({length:5},(_,i)=>({x:innerWidth*(0.1+i*0.2),amp:60+Math.random()*40,speed:0.4+Math.random()*0.6,phase:Math.random()*Math.PI*2}));
    }
    function draw(now){
      const t=(now-t0)/1000;
      ctx.clearRect(0,0,innerWidth,innerHeight);
      /* DNA helix strands (biology) */
      helix.forEach(s=>{
        ctx.lineWidth=1;
        for(let strand=0;strand<2;strand++){
          ctx.beginPath();
          for(let y=0;y<=innerHeight;y+=8){
            const x=s.x+Math.sin(y*0.012+t*s.speed+s.phase+(strand?Math.PI:0))*s.amp;
            if(y===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
          }
          ctx.strokeStyle=strand?'rgba(125,249,200,0.18)':'rgba(0,229,160,0.22)';
          ctx.stroke();
        }
        for(let y=0;y<=innerHeight;y+=40){
          const xa=s.x+Math.sin(y*0.012+t*s.speed+s.phase)*s.amp;
          const xb=s.x+Math.sin(y*0.012+t*s.speed+s.phase+Math.PI)*s.amp;
          ctx.beginPath();ctx.moveTo(xa,y);ctx.lineTo(xb,y);
          ctx.strokeStyle='rgba(0,229,160,0.12)';ctx.stroke();
          ctx.beginPath();ctx.arc(xa,y,1.6,0,Math.PI*2);ctx.fillStyle='rgba(125,249,200,0.7)';ctx.fill();
          ctx.beginPath();ctx.arc(xb,y,1.6,0,Math.PI*2);ctx.fillStyle='rgba(0,229,160,0.7)';ctx.fill();
        }
      });
      /* Neural network particles (AI) */
      parts.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;
        const pulse=0.6+0.4*Math.sin(t*2+p.p);
        ctx.beginPath();ctx.arc(p.x,p.y,p.r*pulse,0,Math.PI*2);
        ctx.fillStyle='rgba(0,229,160,'+(0.55*pulse)+')';ctx.fill();
      });
      for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){
        const dx=parts[i].x-parts[j].x,dy=parts[i].y-parts[j].y,d=Math.hypot(dx,dy);
        if(d<150){
          ctx.strokeStyle='rgba(0,229,160,'+(0.18*(1-d/150))+')';
          ctx.lineWidth=0.6;ctx.beginPath();
          ctx.moveTo(parts[i].x,parts[i].y);ctx.lineTo(parts[j].x,parts[j].y);ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }
    addEventListener('resize',resize);
    resize();requestAnimationFrame(draw);
  }

  /* ===== Make hero / first section fill viewport ===== */
  if(!document.getElementById('molexai-fullpage-style')){
    const fp=document.createElement('style');
    fp.id='molexai-fullpage-style';
    fp.textContent='main>section:first-of-type,.hero{min-height:100vh}';
    document.head.appendChild(fp);
  }


  const pages = [
    ['index.html','🏠','Home'],['products.html','🧪','Products'],['technology.html','⚡','Technology'],
    ['pipeline.html','🔬','Use Cases'],['market.html','📊','Market'],['about.html','🧬','About'],
    ['team.html','👥','Team'],['roadmap.html','🗺️','Roadmap'],['pricing.html','💎','Pricing'],
    ['api-docs.html','{}','API Docs'],['blog.html','✍️','Blog'],['careers.html','💼','Careers'],
    ['press.html','📰','Press'],['privacy.html','🛡️','Privacy'],['terms.html','📜','Terms'],
    ['cookies.html','🍪','Cookies'],['data-processing.html','🔐','Data Processing'],['contact.html','✉️','Contact']
  ];
  if(!document.getElementById('molexai-global-style')){
    const style=document.createElement('style');
    style.id='molexai-global-style';
    style.textContent=`
      .nav-toggle{display:inline-flex!important;width:40px;height:40px;align-items:center;justify-content:center;border:1px solid var(--border-strong,rgba(0,229,160,.35));border-radius:8px;background:rgba(0,229,160,.06);transition:background .2s,border-color .2s,transform .2s;cursor:pointer;flex:0 0 auto}
      .nav-toggle:hover{background:rgba(0,229,160,.13);border-color:var(--primary,#00E5A0);transform:translateY(-1px)}
      .nav-toggle span{width:18px;height:1.5px;background:var(--primary,#00E5A0);position:relative;display:block}
      .nav-toggle span:before,.nav-toggle span:after{content:"";position:absolute;left:0;width:18px;height:1.5px;background:var(--primary,#00E5A0)}
      .nav-toggle span:before{top:-6px}.nav-toggle span:after{top:6px}
      .mobile-menu{position:fixed;top:74px;right:16px;left:auto;z-index:1000;background:rgba(2,8,24,.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border-strong,rgba(0,229,160,.35));border-radius:14px;padding:14px;box-shadow:0 30px 90px rgba(0,0,0,.65),0 0 28px rgba(0,229,160,.12);display:none;flex-direction:column;gap:4px;width:min(360px,calc(100vw - 32px));max-height:calc(100vh - 96px);overflow:auto}
      .mobile-menu.open{display:flex;animation:menuIn .22s ease both}
      @keyframes menuIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
      .mobile-menu a{padding:11px 14px;border-radius:8px;color:var(--text,#F0F8FF);font-size:14.5px;font-weight:500;display:flex;align-items:center;gap:12px;transition:background .2s,color .2s;text-decoration:none}
      .mobile-menu a:hover,.mobile-menu a.active{background:rgba(0,229,160,.1);color:var(--primary,#00E5A0)}
      .mobile-menu a .ico{font-size:16px;width:22px;text-align:center;flex:0 0 22px}
      .footer-contact-panel{margin:10px 0 30px;padding:24px;border:1px solid var(--border-strong,rgba(0,229,160,.35));border-radius:16px;background:linear-gradient(135deg,rgba(0,229,160,.08),rgba(0,102,255,.04));box-shadow:0 18px 60px rgba(0,0,0,.22)}
      .footer-contact-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:18px;flex-wrap:wrap}
      .footer-contact-title{font-family:var(--display,"Orbitron",sans-serif);font-size:15px;letter-spacing:.16em;color:var(--primary,#00E5A0);text-transform:uppercase}
      .footer-contact-founder{font-family:var(--mono,"JetBrains Mono",monospace);font-size:12px;color:var(--text-muted,#7BA4C8);letter-spacing:.06em}
      .footer-contact-grid{display:grid;grid-template-columns:1.35fr .8fr 1fr;gap:14px}
      .footer-contact-item{padding:16px;border:1px solid var(--border,rgba(0,229,160,.15));border-radius:12px;background:rgba(2,8,24,.38)}
      .footer-contact-label{font-family:var(--mono,"JetBrains Mono",monospace);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--primary,#00E5A0);margin-bottom:8px}
      .footer-contact-value,.footer-contact-value a{color:var(--text,#F0F8FF);font-size:14px;line-height:1.55;word-break:break-word}
      .footer-contact-value a:hover{color:var(--primary,#00E5A0)}
      @media(max-width:760px){.mobile-menu{left:16px;right:16px;width:auto}.footer-contact-grid{grid-template-columns:1fr}.footer-contact-panel{padding:18px}}
    `;
    document.head.appendChild(style);
  }

  /* ===== Force HTTPS everywhere ===== */
  if(location.protocol==='http:'&&!/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname)){
    location.replace(location.href.replace(/^http:/,'https:'));
  }
  if(!document.querySelector('meta[http-equiv="Content-Security-Policy"]')){
    const csp=document.createElement('meta');
    csp.setAttribute('http-equiv','Content-Security-Policy');
    csp.setAttribute('content','upgrade-insecure-requests');
    document.head.appendChild(csp);
  }

  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const nav=document.querySelector('nav.nav');
  const navInner=document.querySelector('.nav-inner');

  /* ===== Unified hero nav across ALL pages (same as landing) =====
     - 5 links: Home, Products, Technology, About, Roadmap
     - No hamburger / mobile menu button anywhere */
  const heroNavItems=[
    ['index.html','Home'],
    ['products.html','Products'],
    ['technology.html','Technology'],
    ['about.html','About'],
    ['roadmap.html','Roadmap']
  ];
  document.querySelectorAll('#navToggle, .nav-toggle').forEach(el=>el.remove());
  document.querySelectorAll('#mobileMenu, .mobile-menu').forEach(el=>el.remove());
  const navLinks=document.querySelector('.nav-links');
  if(navLinks){
    navLinks.innerHTML=heroNavItems.map(([href,label])=>{
      const active=href.toLowerCase()===current?' class="active"':'';
      return `<a href="${href}"${active}>${label}</a>`;
    }).join('');
  }
  /* Keep nav-links visible on smaller screens too so the experience matches landing */
  if(!document.getElementById('molexai-navlinks-style')){
    const ns=document.createElement('style');
    ns.id='molexai-navlinks-style';
    ns.textContent='@media(max-width:760px){.nav-links{display:flex!important;gap:14px}.nav-links a{font-size:12px}.nav-right .beta-pill{display:none}}';
    document.head.appendChild(ns);
  }



  document.querySelectorAll('footer').forEach(footer=>{
    if(footer.querySelector('.footer-contact-panel')) return;
    const container=footer.querySelector('.container')||footer;
    const panel=document.createElement('div');
    panel.className='footer-contact-panel';
    panel.innerHTML=`
      <div class="footer-contact-head">
        <div class="footer-contact-title">MolexAI Headquarters</div>
        <div class="footer-contact-founder">​</div>
      </div>
      <div class="footer-contact-grid">
        <div class="footer-contact-item"><div class="footer-contact-label">Address</div><div class="footer-contact-value">D No 1-1478, Rudrampeta<br>Anantapur, Ananthapur<br>Andhra Pradesh 515004, India</div></div>
        <div class="footer-contact-item"><div class="footer-contact-label">Phone</div><div class="footer-contact-value"><a href="tel:+919712131662">+91 97121 31662</a></div></div>
        <div class="footer-contact-item"><div class="footer-contact-label">Email</div><div class="footer-contact-value"><a href="mailto:hello@molexai.online">hello@molexai.online</a></div></div>
      </div>`;
    const bottom=container.querySelector('.footer-bottom');
    if(bottom) container.insertBefore(panel,bottom); else container.appendChild(panel);
    if(bottom){
      const first=bottom.children[0];
      if(first&&/©/.test(first.textContent||'')) first.textContent='© 2026 MolexAI Inc. All rights reserved.';
      Array.from(bottom.children).forEach((child,idx)=>{
        if(idx>0&&/(hello@molexai\.app|97121|Rudrampeta|Anantapur|515004)/i.test(child.textContent||'')&&!child.classList.contains('right')) child.remove();
      });
    }
  });

  /* ===== Favicon + OG image (logo) ===== */
  (function(){
    const base=(location.pathname.includes('/site/')?'':'site/');
    const fav=document.querySelector('link[rel="icon"]')||document.createElement('link');
    fav.rel='icon';fav.type='image/svg+xml';fav.href=base+'logo.svg';
    if(!fav.parentNode) document.head.appendChild(fav);
    const apple=document.querySelector('link[rel="apple-touch-icon"]')||document.createElement('link');
    apple.rel='apple-touch-icon';apple.href=base+'logo.svg';
    if(!apple.parentNode) document.head.appendChild(apple);
    const setMeta=(prop,val,attr='property')=>{
      let m=document.querySelector(`meta[${attr}="${prop}"]`);
      if(!m){m=document.createElement('meta');m.setAttribute(attr,prop);document.head.appendChild(m);}
      m.setAttribute('content',val);
    };
    const ogUrl=location.origin+'/'+base+'og-image.svg';
    setMeta('og:image',ogUrl);
    setMeta('og:image:width','1200');
    setMeta('og:image:height','630');
    setMeta('twitter:image',ogUrl,'name');
  })();

  /* ===== Unified page hero for non-landing pages ===== */
  (function(){
    const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(file===''||file==='index.html') return;
    if(document.querySelector('.page-hero.molexai-unified')) return;
    const titles={
      'products.html':['Our Products','Four AI products that cover the entire drug discovery pipeline'],
      'technology.html':['Our Technology','BioNeMo, H100 GPUs, NIM microservices, Parabricks, CUDA and cuDNN'],
      'pipeline.html':['Use Cases','Real workflows for oncology, rare disease, antibody design and beyond'],
      'market.html':['The Market','A $200B opportunity to compress 12 years of discovery into 18 months'],
      'about.html':['About MolexAI','Building the future of medicine from Anantapur, India'],
      'team.html':['Our Team','Engineers, scientists and operators united by one mission'],
      'roadmap.html':['Product Roadmap','Where MolexAI is heading next — quarter by quarter'],
      'pricing.html':['Pricing','Plans that scale from solo researcher to global pharma'],
      'blog.html':['MolexAI Blog','Notes from the platform — research, engineering and product'],
      'careers.html':['Careers','Build medicine that doesn’t exist yet'],
      'press.html':['Press & Media','MolexAI in the news'],
      'api-docs.html':['API Documentation','Programmatic access to every MolexAI capability'],
      'contact.html':['Contact Us','Talk to the team — demos, partnerships, support'],
      'privacy.html':['Privacy Policy','How we collect, use and protect your data'],
      'terms.html':['Terms of Service','The contract between you and MolexAI'],
      'cookies.html':['Cookie Policy','How MolexAI uses cookies'],
      'data-processing.html':['Data Processing Addendum','GDPR, DPDP and customer-controlled processing']
    };
    const [t,s]=titles[file]||[(document.title||'MolexAI').split('—')[0].trim(),''];
    /* Remove existing inline page-hero so all pages share the same look */
    document.querySelectorAll('section.page-hero').forEach(el=>el.remove());
    const styleId='molexai-unified-hero-style';
    if(!document.getElementById(styleId)){
      const st=document.createElement('style');st.id=styleId;
      st.textContent=`
        .page-hero.molexai-unified{position:relative;padding:150px 0 70px;text-align:center;overflow:hidden;min-height:55vh;display:flex;align-items:center;justify-content:center}
        .page-hero.molexai-unified::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 80% at 50% 0%,rgba(0,229,160,.16),transparent 70%),radial-gradient(40% 60% at 80% 100%,rgba(0,102,255,.18),transparent 70%);z-index:0}
        .page-hero.molexai-unified .container{position:relative;z-index:2}
        .page-hero.molexai-unified .eyebrow{display:inline-block;font-family:var(--mono,"JetBrains Mono",monospace);font-size:11px;letter-spacing:.28em;color:var(--primary,#00E5A0);padding:6px 14px;border:1px solid var(--border-strong,rgba(0,229,160,.35));border-radius:999px;background:rgba(0,229,160,.06);margin-bottom:22px;text-transform:uppercase}
        .page-hero.molexai-unified h1{font-family:var(--display,"Orbitron",sans-serif);font-weight:800;font-size:clamp(36px,5.4vw,68px);line-height:1.05;letter-spacing:-.01em;margin-bottom:18px;color:var(--text,#F0F8FF)}
        .page-hero.molexai-unified .glow-text{background:linear-gradient(135deg,#00E5A0,#7DF9C8);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 28px rgba(0,229,160,.4)}
        .page-hero.molexai-unified p.sub{color:var(--text-muted,#7BA4C8);font-size:17px;max-width:680px;margin:0 auto 30px}
        .page-hero.molexai-unified .crumbs{display:inline-flex;gap:10px;align-items:center;font-family:var(--mono,monospace);font-size:11px;color:var(--text-muted,#7BA4C8);letter-spacing:.2em;text-transform:uppercase}
        .page-hero.molexai-unified .crumbs a{color:var(--primary,#00E5A0)}
        .page-hero.molexai-unified .crumbs span{opacity:.5}
      `;
      document.head.appendChild(st);
    }
    const hero=document.createElement('section');
    hero.className='page-hero molexai-unified';
    const words=t.split(' ');const last=words.pop();
    const titleHtml=words.length?`${words.join(' ')} <span class="glow-text">${last}</span>`:`<span class="glow-text">${last}</span>`;
    hero.innerHTML=`<div class="container">
      <div class="eyebrow">MolexAI · ${(t).toUpperCase()}</div>
      <h1>${titleHtml}</h1>
      <p class="sub">${s}</p>
      <div class="crumbs"><a href="index.html">Home</a><span>/</span>${t}</div>
    </div>`;
    const nav=document.querySelector('nav.nav');
    if(nav&&nav.parentNode) nav.parentNode.insertBefore(hero,nav.nextSibling);
    else document.body.insertBefore(hero,document.body.firstChild);
  })();

  /* ===== 4 sub-sections on all pages except landing and about ===== */
  (function(){
    const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(file===''||file==='index.html'||file==='about.html') return;
    if(document.querySelector('.molexai-subsections')) return;
    const styleId='molexai-subsections-style';
    if(!document.getElementById(styleId)){
      const st=document.createElement('style');st.id=styleId;
      st.textContent=`
        .molexai-subsections{padding:80px 0;position:relative}
        .molexai-subsections .sub-head{text-align:center;margin-bottom:50px}
        .molexai-subsections .sub-eye{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.28em;color:var(--primary,#00E5A0);text-transform:uppercase;margin-bottom:12px}
        .molexai-subsections .sub-title{font-family:var(--display,"Orbitron",sans-serif);font-weight:800;font-size:clamp(28px,4vw,46px);line-height:1.1;color:var(--text,#F0F8FF)}
        .molexai-subsections .sub-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .molexai-subsections .sub-card{padding:24px;border:1px solid var(--border,rgba(0,229,160,.15));border-radius:14px;background:linear-gradient(180deg,rgba(6,15,42,.65),rgba(2,8,24,.65));transition:transform .25s,border-color .25s,box-shadow .25s}
        .molexai-subsections .sub-card:hover{transform:translateY(-4px);border-color:var(--primary,#00E5A0);box-shadow:0 18px 50px rgba(0,229,160,.18)}
        .molexai-subsections .sub-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(0,229,160,.18),rgba(0,102,255,.12));border:1px solid var(--border-strong,rgba(0,229,160,.35));font-size:22px;margin-bottom:16px}
        .molexai-subsections .sub-card h3{font-family:var(--display,"Orbitron",sans-serif);font-weight:700;font-size:17px;margin-bottom:8px;color:var(--text,#F0F8FF)}
        .molexai-subsections .sub-card p{color:var(--text-muted,#7BA4C8);font-size:14px;line-height:1.55}
        @media(max-width:1024px){.molexai-subsections .sub-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.molexai-subsections .sub-grid{grid-template-columns:1fr}}
      `;
      document.head.appendChild(st);
    }
    const cardsByPage={
      'products.html':['Explore the Suite','Four products, one platform',[['🎯','TargetIQ','Identify novel druggable targets from omics data with foundation models.'],['🧪','MolGen','Generative chemistry that designs new molecules conditioned on your target.'],['🛡️','ADMET Predict','Predict absorption, distribution, metabolism, excretion and toxicity in seconds.'],['⚡','BindSim','GPU-accelerated docking and binding affinity at unprecedented scale.']]],
      'technology.html':['Under the Hood','The NVIDIA-powered stack that makes MolexAI fast',[['🧬','BioNeMo','Foundation models for proteins, DNA and small molecules.'],['⚡','H100 GPUs','Tensor-core acceleration for training and inference at scale.'],['🧱','NIM Microservices','Deploy any model as a production-grade API in minutes.'],['🚀','Parabricks · CUDA · cuDNN','Genomics, primitives and deep-learning kernels tuned for biology.']]],
      'pipeline.html':['Where MolexAI Shines','Real customer workflows already running',[['🧠','Oncology','From novel kinase target to lead series in under 90 days.'],['🧬','Rare Disease','Repurpose and design molecules for ultra-small patient populations.'],['🦠','Antibody Design','De-novo antibody discovery with structure-aware generation.'],['🌾','AgriBio','Crop-protection and microbiome design powered by the same stack.']]],
      'market.html':['Why Now','A once-in-a-generation shift in drug discovery',[['📈','$200B TAM','Global drug R&D spend looking for 10× efficiency.'],['🧪','12 → 1.5 yrs','We compress preclinical timelines by an order of magnitude.'],['🤝','Pharma Demand','Top-20 pharma actively piloting GenAI discovery tools.'],['🌍','Global Reach','Cloud-native deployment in every major region.']]],
      'team.html':['Inside MolexAI','The people building the platform',[['🧬','Research','PhDs in computational biology, chemistry and structural ML.'],['⚙️','Engineering','Distributed systems, GPU kernels and developer tooling.'],['🎨','Design','Product surfaces that scientists actually want to use.'],['🤝','Go-to-Market','Partnerships with biotech, pharma and academia worldwide.']]],
      'roadmap.html':['What’s Shipping','Highlights from the next four quarters',[['🚀','Q3 2026','Public beta of MolGen-2 with multi-target conditioning.'],['🧠','Q4 2026','Federated learning for partner-private datasets.'],['🧪','Q1 2027','Wet-lab integration with Strateos and Emerald Cloud Lab.'],['🌐','Q2 2027','GA launch with SOC 2 Type II and HIPAA compliance.']]],
      'pricing.html':['What You Get','Every plan includes the core platform',[['💎','Unlimited Models','Run every MolexAI model at any plan tier.'],['🛰️','Global Compute','H100 clusters in US, EU and APAC regions.'],['🔒','Workspace Isolation','Your data never trains shared models.'],['🤝','Human Support','Direct Slack channel with our research team.']]],
      'blog.html':['Browse by Topic','What we write about',[['🔬','Research','Deep dives into the models that power MolexAI.'],['⚙️','Engineering','How we run GPU infrastructure at startup scale.'],['🧪','Tutorials','End-to-end walkthroughs on real targets.'],['📰','Company','Hiring, milestones and behind-the-scenes notes.']]],
      'careers.html':['Why Join Us','A startup with a real mission',[['🌍','Remote-First','Work from anywhere; quarterly team weeks in India.'],['💎','Equity','Meaningful ownership for every full-time hire.'],['🧠','Learning Budget','$3k/yr for books, courses and conferences.'],['🤝','Mission','Build the tools that cure the next generation of disease.']]],
      'press.html':['Resources','Everything press needs in one place',[['🖼️','Brand Kit','Logos, color tokens and product screenshots.'],['📄','Fact Sheet','Company at a glance — funding, team, traction.'],['🎙️','Founder Quotes','Pre-cleared quotes for fast-turnaround stories.'],['📬','Contact','Reach press@molexai.online for interviews and embargoes.']]],
      'api-docs.html':['API Surface','What you can build with MolexAI',[['🎯','Targets API','Query and rank druggable targets programmatically.'],['🧪','Generate API','Design molecules conditioned on a target and constraints.'],['🛡️','ADMET API','Score arbitrary molecules across 20+ ADMET endpoints.'],['⚡','Docking API','High-throughput docking on managed H100 clusters.']]],
      'contact.html':['Talk To Us','Pick the channel that fits',[['🤝','Sales','For demos, evaluations and enterprise procurement.'],['🛠️','Support','Existing customers — break/fix and how-to questions.'],['🤝','Partnerships','Pharma, CRO, cloud and tooling integrations.'],['📰','Press','Story ideas, interviews and embargoed news.']]],
      'privacy.html':['Privacy at MolexAI','The principles behind the policy',[['🔒','Encrypted','TLS 1.3 in transit, AES-256 at rest.'],['🧪','Workspace Isolation','Your research data never leaves your tenant.'],['🤝','No Selling','We never sell or rent your personal data.'],['📬','Your Rights','Access, export and delete on request — 30-day SLA.']]],
      'terms.html':['Key Commitments','What you can expect from MolexAI',[['📜','Plain Language','Terms written to be read, not just accepted.'],['🛡️','Acceptable Use','Strict no-bioweapons and no-dual-use guardrails.'],['🤝','You Own Your IP','Inputs and outputs belong to you.'],['⚖️','Fair Liability','Reasonable, capped, mutually agreed.']]],
      'cookies.html':['Cookies We Use','Minimal by design',[['🔒','Strictly Necessary','Login session and CSRF protection only.'],['📊','Analytics','Privacy-respecting product analytics — opt-out anytime.'],['📣','Marketing','Off by default; only set if you explicitly opt in.'],['⚙️','Your Controls','Clear, manage or block cookies in your browser settings.']]],
      'data-processing.html':['Inside the DPA','Operational guarantees for enterprise',[['🌍','Regional Hosting','Pick your region — US, EU or APAC.'],['🤝','Sub-processors','Transparent, customer-approved list.'],['🛡️','Security','SOC 2 Type II in progress; HIPAA on Enterprise.'],['📬','SCCs','Standard Contractual Clauses for cross-border flows.']]]
    };
    const data=cardsByPage[file];
    if(!data) return;
    const [head,sub,cards]=data;
    const sec=document.createElement('section');
    sec.className='molexai-subsections';
    sec.innerHTML=`<div class="container">
      <div class="sub-head">
        <div class="sub-eye">Explore More</div>
        <div class="sub-title">${head}</div>
        <p style="color:var(--text-muted,#7BA4C8);margin-top:10px">${sub}</p>
      </div>
      <div class="sub-grid">
        ${cards.map(([i,t,d])=>`<div class="sub-card"><div class="sub-ico">${i}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
      </div>
    </div>`;
    const footer=document.querySelector('footer');
    if(footer&&footer.parentNode) footer.parentNode.insertBefore(sec,footer);
    else document.body.appendChild(sec);
  })();

  /* ===== 6 deep-dive sections on Products, Technology and Roadmap ===== */
  (function(){
    const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    const sets={
      'products.html':{
        eye:'The MolexAI Product Suite',
        head:'Six pillars that turn a target into a clinical candidate',
        sections:[
          {t:'TargetIQ — Find the Right Target',
           img:'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80',
           p:'TargetIQ ingests bulk RNA-seq, single-cell and proteomics data and ranks druggable proteins by disease relevance, tractability and novelty. Foundation-model embeddings catch targets that classical differential-expression pipelines miss.',
           pts:['Multi-omics ingestion (RNA-seq, scRNA-seq, proteomics)','Druggability scoring with ESM-2 + AlphaFold features','Built-in literature evidence and patent landscape']},
          {t:'MolGen — Generative Chemistry',
           img:'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&auto=format&fit=crop&q=80',
           p:'MolGen designs entirely new small molecules conditioned on your target pocket, ADMET constraints and IP whitespace. A diffusion + reinforcement-learning loop optimises for synthesizability and predicted potency.',
           pts:['Pocket-conditioned 3D molecule generation','Multi-objective RL on potency + ADMET','Synthesizability scoring with retrosynthesis traces']},
          {t:'ADMET Predict — Drug-Like in Seconds',
           img:'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&auto=format&fit=crop&q=80',
           p:'Score any SMILES across 20+ ADMET endpoints in under a second per molecule. Trained on millions of measured assay points and continuously refreshed with customer-contributed data (with consent).',
           pts:['hERG, CYP450, Caco-2, plasma protein binding','Calibrated uncertainty for every prediction','Batch API for million-molecule libraries']},
          {t:'BindSim — GPU Docking at Scale',
           img:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=80',
           p:'GPU-accelerated docking and free-energy perturbation that turns a 3-week MD campaign into an overnight run. Powered by Parabricks-style kernels tuned for H100 tensor cores.',
           pts:['1M+ poses / hour / GPU','Flexible-receptor and induced-fit modes','Automated triage to FEP for top hits']},
          {t:'PathFinder — Mechanism & Biomarkers',
           img:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
           p:'PathFinder traces a lead compound back through the biological network to surface mechanism-of-action hypotheses and predictive biomarkers — critical for translating a hit into a clinical strategy.',
           pts:['Pathway enrichment over Reactome + custom KGs','In-silico biomarker discovery from public cohorts','Auto-generated mechanism diagrams']},
          {t:'Workbench — One Workspace for the Team',
           img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
           p:'A collaborative workspace that ties every MolexAI product together. Track campaigns, share results with med-chem and biology, and export ready-to-order compound lists to Enamine, WuXi or your CRO of choice.',
           pts:['Campaigns, projects, notebooks and audit logs','Role-based access with HIPAA-ready architecture','Direct ordering integrations with major CROs']}
        ]
      },
      'technology.html':{
        eye:'Inside the Stack',
        head:'Six technologies that make MolexAI fast, accurate and safe',
        sections:[
          {t:'NVIDIA BioNeMo Foundation Models',
           img:'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200&auto=format&fit=crop&q=80',
           p:'We build on NVIDIA BioNeMo for protein, DNA and small-molecule foundation models. Pre-trained checkpoints give us state-of-the-art embeddings out of the box; fine-tuning on customer-licensed data unlocks domain-specific accuracy.',
           pts:['ESM-2, MegaMolBART, DiffDock and OpenFold in production','Customer-specific LoRA adapters trained in hours','Versioned model registry with reproducible eval suites']},
          {t:'H100 GPU Acceleration',
           img:'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&auto=format&fit=crop&q=80',
           p:'Every training and inference workload runs on NVIDIA H100 Tensor Core GPUs with NVLink and NDR InfiniBand. Mixed-precision FP8 kernels deliver 4× the throughput of the previous generation at the same accuracy.',
           pts:['Multi-node H100 clusters with NVLink Switch','FP8 transformer engine for inference','Per-tenant GPU isolation for compliance']},
          {t:'NVIDIA NIM Microservices',
           img:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
           p:'Every MolexAI model ships as an NVIDIA NIM microservice — a pre-tuned, secure, OpenAPI-compatible container that scales horizontally without ops overhead. Drop the same NIM into your VPC or our managed cloud.',
           pts:['One-command deploy to any Kubernetes cluster','Optimised TensorRT-LLM execution','Built-in observability and rate limiting']},
          {t:'NVIDIA Parabricks Genomics',
           img:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
           p:'Parabricks gives us GPU-accelerated alignment and variant calling — analysis that takes a CPU cluster 30 hours runs in under an hour, so omics-driven target ID stays in lockstep with the chemistry team.',
           pts:['GATK-equivalent accuracy, 50× faster','Whole-genome and RNA pipelines','Streams directly into TargetIQ']},
          {t:'CUDA & cuDNN Primitives',
           img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
           p:'Custom CUDA kernels and cuDNN-powered layers underpin our docking, FEP and diffusion-sampling code paths. Where off-the-shelf libraries fall short, we write the kernel.',
           pts:['Hand-tuned kernels for pose scoring','cuDNN-accelerated 3D convolutions for cryo-EM','Open-sourced reference implementations']},
          {t:'Security, Compliance & Federated Learning',
           img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80',
           p:'SOC 2 Type II in progress, HIPAA architecture available today, and an opt-in federated learning protocol so partners can co-train shared models without ever exposing raw data.',
           pts:['TLS 1.3 in transit, AES-256 at rest','Per-tenant KMS-backed encryption keys','Federated averaging with differential-privacy bounds']}
        ]
      },
      'roadmap.html':{
        eye:'The Road Ahead',
        head:'Six milestones on our path to general-purpose drug discovery AI',
        sections:[
          {t:'Q3 2026 — MolGen-2 Public Beta',
           img:'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&auto=format&fit=crop&q=80',
           p:'A new 3B-parameter generative chemistry model with multi-target conditioning, scaffold preservation and on-the-fly synthesizability scoring. Public beta opens to all Lab-tier customers in Q3 2026.',
           pts:['Multi-target conditioning (polypharmacology)','Scaffold-hop with IP whitespace constraints','One-click handoff to Enamine REAL space']},
          {t:'Q4 2026 — Federated Learning GA',
           img:'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200&auto=format&fit=crop&q=80',
           p:'Train shared MolexAI models on partner-private datasets without raw data ever leaving the partner VPC. Differential-privacy budgets and per-partner contribution dashboards ship in the same release.',
           pts:['Federated averaging across 10+ partners','DP-guaranteed gradient updates','Per-partner attribution and revenue share']},
          {t:'Q1 2027 — Wet-Lab Integration',
           img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80',
           p:'Native integrations with Strateos and Emerald Cloud Lab let you close the design-make-test-analyze loop without leaving MolexAI. Results stream back into the model for the next iteration automatically.',
           pts:['One-click protocol submission','Live assay telemetry in Workbench','Auto-retrain on returned wet-lab data']},
          {t:'Q2 2027 — SOC 2 Type II & HIPAA GA',
           img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80',
           p:'Enterprise launch backed by SOC 2 Type II, HIPAA, GDPR and India DPDP compliance. Regional deployments in US, EU and APAC with customer-managed encryption keys.',
           pts:['Customer-managed KMS keys','Per-region data residency guarantees','Independent third-party pen-test reports']},
          {t:'Q3 2027 — Antibody & Biologics Suite',
           img:'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80',
           p:'Expanding MolexAI from small molecules into antibodies, peptides and ADCs. Structure-aware generative design powered by next-gen BioNeMo protein models and our own optimisation stack.',
           pts:['De-novo antibody CDR design','Developability and immunogenicity scoring','ADC linker-payload co-optimisation']},
          {t:'Q4 2027 — Clinical AI & DGX Cloud',
           img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
           p:'Deploying on NVIDIA DGX Cloud and integrating NVIDIA Clara for clinical-trial design, patient stratification and translational biomarker discovery — closing the loop from molecule to patient.',
           pts:['DGX Cloud-native training for trillion-parameter models','Clara-powered trial enrichment','Public benchmarks co-published with NVIDIA Healthcare']}
        ]
      }
    };
    const data=sets[file];
    if(!data) return;
    if(document.querySelector('.molexai-deep-sections')) return;
    if(!document.getElementById('molexai-deep-style')){
      const st=document.createElement('style');st.id='molexai-deep-style';
      st.textContent=`
        .molexai-deep-sections{padding:90px 0 40px;position:relative}
        .molexai-deep-sections .deep-head{text-align:center;max-width:780px;margin:0 auto 60px}
        .molexai-deep-sections .deep-eye{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.28em;color:var(--primary,#00E5A0);text-transform:uppercase;margin-bottom:14px}
        .molexai-deep-sections .deep-title{font-family:var(--display,"Orbitron",sans-serif);font-weight:800;font-size:clamp(28px,4.2vw,48px);line-height:1.1;color:var(--text,#F0F8FF)}
        .molexai-deep-sections .deep-row{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center;margin-bottom:90px}
        .molexai-deep-sections .deep-row.flip{direction:rtl}
        .molexai-deep-sections .deep-row.flip > *{direction:ltr}
        .molexai-deep-sections .deep-img{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--border-strong,rgba(0,229,160,.35));box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 30px rgba(0,229,160,.12);aspect-ratio:4/3}
        .molexai-deep-sections .deep-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s}
        .molexai-deep-sections .deep-img:hover img{transform:scale(1.04)}
        .molexai-deep-sections .deep-img::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,229,160,.22),transparent 55%);mix-blend-mode:screen;pointer-events:none}
        .molexai-deep-sections .deep-num{display:inline-block;font-family:var(--mono,monospace);font-size:11px;letter-spacing:.28em;color:var(--primary,#00E5A0);padding:5px 12px;border:1px solid var(--border-strong,rgba(0,229,160,.35));border-radius:999px;background:rgba(0,229,160,.06);text-transform:uppercase;margin-bottom:16px}
        .molexai-deep-sections .deep-h{font-family:var(--display,"Orbitron",sans-serif);font-weight:700;font-size:clamp(22px,2.6vw,32px);color:var(--text,#F0F8FF);margin-bottom:14px;line-height:1.15}
        .molexai-deep-sections .deep-p{color:var(--text-muted,#7BA4C8);font-size:15px;line-height:1.65;margin-bottom:18px}
        .molexai-deep-sections .deep-pts{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
        .molexai-deep-sections .deep-pts li{position:relative;padding-left:26px;color:var(--text,#F0F8FF);font-size:14px;line-height:1.5}
        .molexai-deep-sections .deep-pts li::before{content:"";position:absolute;left:0;top:7px;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#00E5A0 40%,transparent 70%);box-shadow:0 0 10px rgba(0,229,160,.6)}
        @media(max-width:880px){
          .molexai-deep-sections .deep-row,.molexai-deep-sections .deep-row.flip{grid-template-columns:1fr;direction:ltr;gap:24px;margin-bottom:60px}
          .molexai-deep-sections{padding:60px 0 20px}
        }
      `;
      document.head.appendChild(st);
    }
    const sec=document.createElement('section');
    sec.className='molexai-deep-sections';
    const rows=data.sections.map((s,i)=>`
      <div class="deep-row${i%2?' flip':''}">
        <div class="deep-img"><img src="${s.img}" alt="${s.t}" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/molex${i}/1200/900'"/></div>
        <div>
          <span class="deep-num">0${i+1} · ${data.eye}</span>
          <h3 class="deep-h">${s.t}</h3>
          <p class="deep-p">${s.p}</p>
          <ul class="deep-pts">${s.pts.map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>`).join('');
    sec.innerHTML=`<div class="container">
      <div class="deep-head">
        <div class="deep-eye">${data.eye}</div>
        <div class="deep-title">${data.head}</div>
      </div>
      ${rows}
    </div>`;
    const footer=document.querySelector('footer');
    if(footer&&footer.parentNode) footer.parentNode.insertBefore(sec,footer);
    else document.body.appendChild(sec);
  })();
})();
