/**
 * SkillMatch LP - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

  // ===== タブ切り替え =====
  window.switchTab = function (tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === 'tab-' + tabName);
    });
  };

  // ===== FAQアコーディオン =====
  window.toggleFaq = function (btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.classList.contains('open');

    // 他のFAQを閉じる
    document.querySelectorAll('.faq-item').forEach(el => {
      el.querySelector('.faq-q').classList.remove('open');
      el.querySelector('.faq-a').classList.remove('show');
    });

    // クリックしたものを開く（既に開いていたら閉じる）
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('show');
    }
  };

  // ===== スティッキーCTA表示制御 =====
  const stickyCta = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');

  function updateStickyCta() {
    if (!hero || !stickyCta) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  }

  window.addEventListener('scroll', updateStickyCta, { passive: true });
  updateStickyCta();

  // ===== Intersection Observer - フェードイン =====
  const fadeElements = document.querySelectorAll(
    '.problem-card, .solution-item, .diff-card, .benefit-item, .flow-step, .quality-item, .faq-item'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => observer.observe(el));

  // ===== スムーススクロール =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
