var skills = [
  ["🌐", "HTML", "Frontend", 85, ""],
  ["🎨", "CSS", "Frontend", 75, ""],
  ["⚡", "JavaScript", "Frontend", 60, ""],
  ["🐙", "GitHub", "Tools", 65, ""],
  ["💻", "VS Code", "Tools", 85, ""],
  ["🛠️", "NC II – Computer Systems Servicing", "Certified", null, "Earned in Grade 12"],
  ["🤝", "Teamwork", "Soft Skills", 85, ""],
  ["🗣️", "Communication", "Soft Skills", 80, ""],
  ["🧩", "Problem Solving", "Soft Skills", 75, ""],
  ["🎖️", "Class President", "Soft Skills", null, "Grade 11 & Grade 12"]
];

var grid = document.getElementById('skillGrid');
skills.forEach(function (s) {
  var d = document.createElement('div');
  d.className = 'skill';
  d.dataset.c = s[2];
  var extra = s[3] !== null
    ? '<div class="bar"><i data-w="' + s[3] + '"></i></div>'
    : '<div class="muted" style="margin-top:.4rem">' + s[4] + '</div>';
  d.innerHTML = '<span>' + s[0] + '</span><b>' + s[1] + '</b><br><small>' + s[2] + '</small>' + extra;
  grid.appendChild(d);
});

document.getElementById('filters').addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (!b) return;
  document.querySelectorAll('#filters button').forEach(function (x) {
    x.classList.toggle('on', x === b);
  });
  document.querySelectorAll('.skill').forEach(function (s) {
    s.classList.toggle('hide', b.dataset.f !== 'All' && s.dataset.c !== b.dataset.f);
  });
});

var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (x) {
    if (x.isIntersecting) {
      x.target.classList.add('in');
      x.target.querySelectorAll('.bar i').forEach(function (i) {
        i.style.width = i.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function (r) { io.observe(r); });

var links = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', function () {
  var cur = 'home';
  document.querySelectorAll('section').forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  links.forEach(function (a) {
    a.classList.toggle('on', a.getAttribute('href') === '#' + cur);
  });
});

var tb = document.getElementById('theme');
tb.addEventListener('click', function () {
  var root = document.documentElement;
  var dark = root.dataset.theme === 'dark' ||
    (!root.dataset.theme && matchMedia('(prefers-color-scheme:dark)').matches);
  root.dataset.theme = dark ? 'light' : 'dark';
  tb.textContent = dark ? '🌙' : '☀️';
});

var modal = document.getElementById('certModal');
var certImg = document.getElementById('certImg');

document.querySelectorAll('.cert-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    certImg.src = btn.dataset.img;
    modal.classList.add('open');
  });
});

function closeCert() { modal.classList.remove('open'); }
document.getElementById('certClose').addEventListener('click', closeCert);
modal.addEventListener('click', function (e) { if (e.target === modal) closeCert(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCert(); });
