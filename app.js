/* ========================================
   FraudShield — Application Logic
   ======================================== */

// ========== Navigation & Routing ==========
function enterApp(page = 'dashboard') {
  document.getElementById('landing-page').classList.remove('active');
  document.getElementById('landing-page').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');
  navigateTo(page);
  initCharts();
}

function goToLanding() {
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('landing-page').classList.remove('hidden');
  document.getElementById('landing-page').classList.add('active');
}

function navigateTo(page, event) {
  if (event) event.preventDefault();

  // Update page content
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');

  // Update title
  const titles = {
    dashboard: 'Dashboard',
    predict: 'Predict Fraud',
    insights: 'Model Insights',
    about: 'About'
  };
  document.getElementById('page-title').textContent = titles[page] || 'Dashboard';

  // Close sidebar on mobile
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

function toggleMobileMenu() {
  const links = document.querySelector('.landing-nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
}

// ========== Chart.js Configuration ==========
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#1e2642',
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      borderColor: '#2a3654',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: { weight: '700', size: 13 },
      bodyFont: { size: 12 },
      callbacks: {}
    }
  }
};

let chartsInitialized = false;

function initCharts() {
  if (chartsInitialized) return;
  chartsInitialized = true;

  // Set global defaults
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = '#1e293b';
  Chart.defaults.font.family = "'Inter', sans-serif";

  createPerformanceChart();
  createDistributionChart();
  createFraudTypeChart();
  createRocChart();
  createFeaturesChart();
}

function createPerformanceChart() {
  const ctx = document.getElementById('chart-performance');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Random Forest', 'Gradient Boost', 'Decision Tree', 'KNN', 'SVM', 'Logistic Reg', 'Perceptron', 'Naive Bayes'],
      datasets: [
        {
          label: 'Accuracy',
          data: [99.7, 99.5, 99.2, 97.8, 94.3, 91.2, 89.4, 85.6],
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        },
        {
          label: 'Precision',
          data: [99.4, 99.2, 98.1, 96.5, 93.1, 90.5, 88.1, 84.2],
          backgroundColor: 'rgba(139, 92, 246, 0.7)',
          borderColor: '#8b5cf6',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        },
        {
          label: 'Recall',
          data: [98.8, 98.6, 98.3, 97.2, 94.8, 89.7, 87.6, 82.3],
          backgroundColor: 'rgba(6, 182, 212, 0.7)',
          borderColor: '#06b6d4',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        y: {
          beginAtZero: false,
          min: 75,
          max: 100,
          grid: { color: 'rgba(30,41,59,0.5)' },
          ticks: {
            callback: v => v + '%',
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 10 },
            maxRotation: 45
          }
        }
      },
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      }
    }
  });
}

function createDistributionChart() {
  const ctx = document.getElementById('chart-distribution');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Legitimate', 'Fraudulent'],
      datasets: [{
        data: [6354407, 8213],
        backgroundColor: ['rgba(16, 185, 129, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        borderColor: ['#10b981', '#ef4444'],
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      ...chartDefaults,
      cutout: '68%',
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyleWidth: 10,
            font: { size: 12, weight: '600' }
          }
        },
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.parsed / total) * 100).toFixed(2);
              return `${ctx.label}: ${ctx.parsed.toLocaleString()} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

function createFraudTypeChart() {
  const ctx = document.getElementById('chart-fraud-type');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['TRANSFER', 'CASH_OUT', 'PAYMENT', 'DEBIT', 'CASH_IN'],
      datasets: [{
        label: 'Fraud Cases',
        data: [4116, 4097, 0, 0, 0],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.4)',
          'rgba(16, 185, 129, 0.4)',
          'rgba(16, 185, 129, 0.4)'
        ],
        borderColor: [
          '#ef4444',
          '#f59e0b',
          '#10b981',
          '#10b981',
          '#10b981'
        ],
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      scales: {
        x: {
          grid: { color: 'rgba(30,41,59,0.5)' },
          ticks: { font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11, weight: '600' } }
        }
      }
    }
  });
}

function createRocChart() {
  const ctx = document.getElementById('chart-roc');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Random Forest', 'Gradient Boost', 'Decision Tree', 'KNN', 'SVM', 'Logistic Reg', 'Perceptron', 'Naive Bayes'],
      datasets: [{
        label: 'ROC-AUC Score',
        data: [99.9, 99.8, 99.2, 99.1, 98.2, 96.8, 94.5, 93.1],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#0a0e1a',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2
      }]
    },
    options: {
      ...chartDefaults,
      scales: {
        y: {
          min: 90,
          max: 100,
          grid: { color: 'rgba(30,41,59,0.5)' },
          ticks: {
            callback: v => v + '%',
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 10 },
            maxRotation: 45
          }
        }
      },
      plugins: {
        ...chartDefaults.plugins,
        tooltip: {
          ...chartDefaults.plugins.tooltip,
          callbacks: {
            label: ctx => `ROC-AUC: ${ctx.parsed.y}%`
          }
        }
      }
    }
  });
}

function createFeaturesChart() {
  const ctx = document.getElementById('chart-features');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['amount', 'oldbalanceOrg', 'newbalanceOrig', 'balance_change', 'relativeAmountOrig', 'oldbalanceDest', 'newbalanceDest', 'step', 'type'],
      datasets: [{
        label: 'Importance',
        data: [0.28, 0.22, 0.18, 0.12, 0.08, 0.05, 0.04, 0.02, 0.01],
        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, ctx.chart.width, 0);
          g.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          g.addColorStop(1, 'rgba(139, 92, 246, 0.8)');
          return g;
        },
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'y',
      scales: {
        x: {
          grid: { color: 'rgba(30,41,59,0.5)' },
          ticks: { font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { size: 11, weight: '600', family: "'JetBrains Mono', monospace" }
          }
        }
      }
    }
  });
}

// ========== Prediction Logic ==========
function handlePredict(event) {
  event.preventDefault();

  // Hide error
  const errorEl = document.getElementById('form-error');
  errorEl.classList.add('hidden');

  // Gather values
  const type = document.getElementById('txn-type').value;
  const amount = parseFloat(document.getElementById('txn-amount').value);
  const oldBalOrig = parseFloat(document.getElementById('txn-old-balance-orig').value);
  const newBalOrig = parseFloat(document.getElementById('txn-new-balance-orig').value);
  const oldBalDest = parseFloat(document.getElementById('txn-old-balance-dest').value);
  const newBalDest = parseFloat(document.getElementById('txn-new-balance-dest').value);
  const step = parseInt(document.getElementById('txn-step').value) || 1;

  // Validate
  if (!type) {
    showError('Please select a transaction type.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    showError('Please enter a valid transaction amount.');
    return;
  }
  if (isNaN(oldBalOrig) || isNaN(newBalOrig) || isNaN(oldBalDest) || isNaN(newBalDest)) {
    showError('Please fill in all balance fields.');
    return;
  }

  // Show loading
  showState('loading');

  // Simulate ML prediction (using heuristics based on the actual dataset patterns)
  setTimeout(() => {
    const result = simulatePrediction(type, amount, oldBalOrig, newBalOrig, oldBalDest, newBalDest, step);
    displayResult(result);
  }, 1800 + Math.random() * 1200);
}

function simulatePrediction(type, amount, oldBalOrig, newBalOrig, oldBalDest, newBalDest, step) {
  // Engineered features (matching the project's feature engineering)
  const balanceChange = oldBalOrig - newBalOrig;
  const relativeAmount = amount / (oldBalOrig + 1e-5);

  let fraudScore = 0;
  const factors = [];

  // Type-based scoring (fraud only occurs in TRANSFER and CASH_OUT)
  if (type === 'TRANSFER' || type === 'CASH_OUT') {
    fraudScore += 0.2;
    factors.push({
      text: `Transaction type "${type}" is associated with fraud`,
      level: 'medium'
    });
  } else {
    fraudScore -= 0.3;
    factors.push({
      text: `Transaction type "${type}" has zero historical fraud cases`,
      level: 'low'
    });
  }

  // Amount-based scoring
  if (amount > 200000) {
    fraudScore += 0.25;
    factors.push({ text: `Very high transaction amount ($${amount.toLocaleString()})`, level: 'high' });
  } else if (amount > 50000) {
    fraudScore += 0.12;
    factors.push({ text: `High transaction amount ($${amount.toLocaleString()})`, level: 'medium' });
  }

  // Balance change analysis — fraud often drains entire balance
  if (Math.abs(balanceChange - amount) < 1 && oldBalOrig > 0) {
    fraudScore += 0.25;
    factors.push({ text: 'Entire sender balance was transferred out', level: 'high' });
  }

  // Relative amount — if amount ≈ entire balance, suspicious
  if (relativeAmount > 0.95 && oldBalOrig > 100) {
    fraudScore += 0.15;
    factors.push({ text: 'Amount is nearly 100% of sender balance', level: 'high' });
  }

  // Receiver balance anomaly — fraud destination often starts at 0
  if (oldBalDest === 0 && amount > 10000) {
    fraudScore += 0.1;
    factors.push({ text: 'Receiver had zero starting balance', level: 'medium' });
  }

  // New balance of sender is 0 (common fraud pattern)
  if (newBalOrig === 0 && oldBalOrig > 0) {
    fraudScore += 0.15;
    factors.push({ text: 'Sender balance dropped to zero', level: 'high' });
  }

  // Add some randomness for realism
  fraudScore += (Math.random() * 0.08 - 0.04);

  // Clamp between 0 and 1
  const probability = Math.max(0.01, Math.min(0.99, fraudScore));
  const isFraud = probability >= 0.45;

  // Add safe factor if not fraud
  if (!isFraud && factors.filter(f => f.level === 'low').length === 0) {
    factors.push({ text: 'Transaction patterns consistent with legitimate activity', level: 'low' });
  }

  let riskLevel;
  if (probability >= 0.7) riskLevel = 'High';
  else if (probability >= 0.4) riskLevel = 'Medium';
  else riskLevel = 'Low';

  const confidence = isFraud
    ? (70 + probability * 28).toFixed(1)
    : (70 + (1 - probability) * 28).toFixed(1);

  return {
    isFraud,
    probability: probability * 100,
    riskLevel,
    confidence: parseFloat(confidence),
    factors,
    processingTime: (180 + Math.random() * 120).toFixed(0)
  };
}

function displayResult(result) {
  showState('display');

  const verdictIcon = document.getElementById('verdict-icon');
  const verdictText = document.getElementById('verdict-text');
  const verdictSub = document.getElementById('verdict-sub');
  const gaugeCircle = document.getElementById('gauge-circle');
  const gaugeValue = document.getElementById('gauge-value');
  const detailRisk = document.getElementById('detail-risk');
  const detailConfidence = document.getElementById('detail-confidence');
  const detailTime = document.getElementById('detail-time');

  if (result.isFraud) {
    verdictIcon.className = 'verdict-icon verdict-fraud';
    verdictIcon.innerHTML = '⚠️';
    verdictText.textContent = 'Fraud Detected';
    verdictText.style.color = '#f87171';
    verdictSub.textContent = 'This transaction exhibits patterns consistent with fraudulent activity.';
    gaugeCircle.style.stroke = '#ef4444';
  } else {
    verdictIcon.className = 'verdict-icon verdict-safe';
    verdictIcon.innerHTML = '✓';
    verdictText.textContent = 'Transaction Safe';
    verdictText.style.color = '#34d399';
    verdictSub.textContent = 'This transaction appears to be legitimate based on our analysis.';
    gaugeCircle.style.stroke = '#10b981';
  }

  // Animate gauge
  const pct = result.probability;
  const offset = 314 * (1 - pct / 100);
  setTimeout(() => {
    gaugeCircle.style.strokeDashoffset = offset;
    gaugeValue.textContent = pct.toFixed(1) + '%';
    gaugeValue.style.color = result.isFraud ? '#f87171' : '#34d399';
  }, 100);

  // Risk level badge
  const riskColors = { High: '#f87171', Medium: '#fbbf24', Low: '#34d399' };
  detailRisk.innerHTML = `<span style="color:${riskColors[result.riskLevel]};font-weight:800;">${result.riskLevel}</span>`;
  detailConfidence.textContent = result.confidence + '%';
  detailTime.textContent = result.processingTime + ' ms';

  // Risk factors
  const factorsContainer = document.getElementById('risk-factors');
  factorsContainer.innerHTML = '';
  result.factors.forEach(f => {
    const icons = { high: '🔴', medium: '🟡', low: '🟢' };
    const classes = { high: 'risk-factor-high', medium: 'risk-factor-medium', low: 'risk-factor-low' };
    factorsContainer.innerHTML += `
      <div class="risk-factor">
        <div class="risk-factor-icon ${classes[f.level]}">${icons[f.level]}</div>
        <span>${f.text}</span>
      </div>
    `;
  });
}

function showState(state) {
  document.getElementById('result-empty').classList.add('hidden');
  document.getElementById('result-loading').classList.add('hidden');
  document.getElementById('result-display').classList.add('hidden');

  if (state === 'empty') document.getElementById('result-empty').classList.remove('hidden');
  if (state === 'loading') document.getElementById('result-loading').classList.remove('hidden');
  if (state === 'display') document.getElementById('result-display').classList.remove('hidden');
}

function showError(message) {
  const errorEl = document.getElementById('form-error');
  document.getElementById('form-error-text').textContent = message;
  errorEl.classList.remove('hidden');
}

function resetForm() {
  document.getElementById('predict-form').reset();
  document.getElementById('form-error').classList.add('hidden');
  showState('empty');
  // Reset gauge
  const gaugeCircle = document.getElementById('gauge-circle');
  if (gaugeCircle) gaugeCircle.style.strokeDashoffset = 314;
}

function resetPrediction() {
  showState('empty');
  // Reset gauge
  const gaugeCircle = document.getElementById('gauge-circle');
  if (gaugeCircle) gaugeCircle.style.strokeDashoffset = 314;
}

// ========== Tooltips ==========
document.addEventListener('mouseover', function(e) {
  const target = e.target.closest('[data-tooltip]');
  if (target) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = target.getAttribute('data-tooltip');
    tooltip.classList.remove('hidden');
    const rect = target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
  }
});

document.addEventListener('mouseout', function(e) {
  const target = e.target.closest('[data-tooltip]');
  if (target) {
    document.getElementById('tooltip').classList.add('hidden');
  }
});

// ========== Intersection Observer for animations ==========
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature-card, .model-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});
