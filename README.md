const STORAGE_KEY = 'lawyer_agenda_data_v1';
const LOGIN_KEY = 'lawyer_agenda_login_v1';
const REMEMBER_KEY = 'lawyer_agenda_remember_v1';

const DEFAULT_USER = {
  username: 'محمد النزال',
  password: '6503536'
};

const state = {
  clients: [],
  cases: [],
  sessions: [],
  tasks: []
};

const elements = {
  loginScreen: document.getElementById('login-screen'),
  appScreen: document.getElementById('app-screen'),
  loginForm: document.getElementById('login-form'),
  loginMessage: document.getElementById('login-message'),
  lawyerUser: document.getElementById('lawyer-user'),
  lawyerPass: document.getElementById('lawyer-pass'),
  rememberMe: document.getElementById('remember-me'),
  sidebarUserName: document.getElementById('sidebar-user-name'),
  logoutBtn: document.getElementById('logout-btn'),
  currentDate: document.getElementById('current-date'),
  navItems: [...document.querySelectorAll('.nav-item')],
  sections: [...document.querySelectorAll('.page-section')],
  statClients: document.getElementById('stat-clients'),
  statCases: document.getElementById('stat-cases'),
  statSessions: document.getElementById('stat-sessions'),
  statTasks: document.getElementById('stat-tasks'),
  recentClients: document.getElementById('recent-clients'),
  upcomingSessions: document.getElementById('upcoming-sessions'),
  clientsTableBody: document.getElementById('clients-table-body'),
  casesTableBody: document.getElementById('cases-table-body'),
  sessionsTableBody: document.getElementById('sessions-table-body'),
  tasksList: document.getElementById('tasks-list'),
  reportCasesSummary: document.getElementById('report-cases-summary'),
  reportSessionsSummary: document.getElementById('report-sessions-summary'),
  reportTasksSummary: document.getElementById('report-tasks-summary'),

  clientForm: document.getElementById('client-form'),
  clientId: document.getElementById('client-id'),
  clientName: document.getElementById('client-name'),
  clientFile: document.getElementById('client-file'),
  clientPhone: document.getElementById('client-phone'),
  clientCaseType: document.getElementById('client-case-type'),
  cancelClient: document.getElementById('cancel-client'),
  newClientBtn: document.getElementById('new-client-btn'),

  caseForm: document.getElementById('case-form'),
  caseId: document.getElementById('case-id'),
  caseClient: document.getElementById('case-client'),
  caseTitle: document.getElementById('case-title'),
  caseType: document.getElementById('case-type'),
  caseStatus: document.getElementById('case-status'),
  cancelCase: document.getElementById('cancel-case'),
  newCaseBtn: document.getElementById('new-case-btn'),

  sessionForm: document.getElementById('session-form'),
  sessionId: document.getElementById('session-id'),
  sessionClient: document.getElementById('session-client'),
  sessionDate: document.getElementById('session-date'),
  sessionTime: document.getElementById('session-time'),
  sessionType: document.getElementById('session-type'),
  cancelSession: document.getElementById('cancel-session'),
  newSessionBtn: document.getElementById('new-session-btn'),

  taskForm: document.getElementById('task-form'),
  taskId: document.getElementById('task-id'),
  taskTitle: document.getElementById('task-title'),
  taskPriority: document.getElementById('task-priority'),
  cancelTask: document.getElementById('cancel-task'),
  newTaskBtn: document.getElementById('new-task-btn')
};

function generateId(prefix) {
  if (window.crypto && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    state.clients = [
      { id: 'client-1', name: 'أحمد محمد', fileNo: 'MF-101', phone: '9665000001', caseType: 'مدنية' },
      { id: 'client-2', name: 'سارة علي', fileNo: 'MF-102', phone: '9665000002', caseType: 'شرعية' },
      { id: 'client-3', name: 'خالد حسن', fileNo: 'MF-103', phone: '9665000003', caseType: 'جنائية' }
    ];
    state.cases = [
      { id: 'case-1', clientId: 'client-1', title: 'دعوى استحقاق', type: 'مدنية', status: 'نشطة' },
      { id: 'case-2', clientId: 'client-2', title: 'دراسة دعوى شرعية', type: 'شرعية', status: 'معلقة' },
      { id: 'case-3', clientId: 'client-3', title: 'قضية جنائية', type: 'جنائية', status: 'نشطة' }
    ];
    state.sessions = [
      { id: 'session-1', clientId: 'client-1', date: getTodayOffset(1), time: '09:30', type: 'تمهيدية' },
      { id: 'session-2', clientId: 'client-2', date: getTodayOffset(3), time: '14:00', type: 'استماع' }
    ];
    state.tasks = [
      { id: 'task-1', title: 'مراجعة مستندات الموكل أحمد', priority: 'عالية', done: false },
      { id: 'task-2', title: 'إعداد مذكرة شرعية', priority: 'متوسطة', done: false },
      { id: 'task-3', title: 'تحديث ملف القضية', priority: 'منخفضة', done: true }
    ];
    saveData();
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    state.clients = Array.isArray(parsed.clients) ? parsed.clients : [];
    state.cases = Array.isArray(parsed.cases) ? parsed.cases : [];
    state.sessions = Array.isArray(parsed.sessions) ? parsed.sessions : [];
    state.tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
  } catch (error) {
    console.error('Failed to parse localStorage data', error);
    state.clients = [];
    state.cases = [];
    state.sessions = [];
    state.tasks = [];
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    clients: state.clients,
    cases: state.cases,
    sessions: state.sessions,
    tasks: state.tasks
  }));
}

function getTodayOffset(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

function setCurrentDate() {
  const now = new Date();
  elements.currentDate.textContent = now.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showSection(name) {
  elements.sections.forEach((section) => {
    section.classList.toggle('active', section.id === name);
  });

  elements.navItems.forEach((button) => {
    button.classList.toggle('active', button.dataset.section === name);
  });
}

function showLoginScreen() {
  elements.loginScreen.classList.add('active');
  elements.appScreen.classList.remove('active');
}

function showAppScreen() {
  elements.loginScreen.classList.remove('active');
  elements.appScreen.classList.add('active');
}

function isLoggedIn() {
  return localStorage.getItem(LOGIN_KEY) === 'true';
}

function setLoggedIn(value) {
  localStorage.setItem(LOGIN_KEY, String(value));
}

function populateClientSelects() {
  const options = state.clients.map(client => `
    <option value="${client.id}">${client.name}</option>
  `).join('');

  elements.caseClient.innerHTML = options || '<option value="">لا يوجد موكل</option>';
  elements.sessionClient.innerHTML = options || '<option value="">لا يوجد موكل</option>';
}

function renderStats() {
  elements.statClients.textContent = String(state.clients.length);
  elements.statCases.textContent = String(state.cases.length);
  elements.statSessions.textContent = String(state.sessions.length);
  elements.statTasks.textContent = String(state.tasks.filter(task => !task.done).length);
}

function renderRecentClients() {
  const clients = state.clients.slice(0, 4);
  if (!clients.length) {
    elements.recentClients.innerHTML = '<li class="empty-state">لا يوجد موكلين حتى الآن</li>';
    return;
  }

  elements.recentClients.innerHTML = clients.map(client => `
    <li>
      <span>${client.name}</span>
      <small>${client.fileNo}</small>
    </li>
  `).join('');
}

function renderUpcomingSessions() {
  const sessions = [...state.sessions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  if (!sessions.length) {
    elements.upcomingSessions.innerHTML = '<li class="empty-state">لا توجد جلسات قادمة</li>';
    return;
  }

  elements.upcomingSessions.innerHTML = sessions.map(session => {
    const client = state.clients.find(item => item.id === session.clientId);
    return `
      <li>
        <span>${client ? client.name : 'موكل غير معروف'}</span>
        <small>${session.date} | ${session.time}</small>
      </li>
    `;
  }).join('');
}

function renderClientsTable() {
  if (!state.clients.length) {
    elements.clientsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">لا توجد بيانات</td></tr>';
    return;
  }

  elements.clientsTableBody.innerHTML = state.clients.map(client => `
    <tr>
      <td>${client.name}</td>
      <td>${client.fileNo}</td>
      <td>${client.phone || '—'}</td>
      <td>${client.caseType || '—'}</td>
      <td>
        <div class="table-actions">
          <button class="action-btn edit-btn" data-client-edit="${client.id}">تعديل</button>
          <button class="action-btn delete-btn" data-client-delete="${client.id}">حذف</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderCasesTable() {
  if (!state.cases.length) {
    elements.casesTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">لا توجد بيانات</td></tr>';
    return;
  }

  elements.casesTableBody.innerHTML = state.cases.map(caseItem => {
    const client = state.clients.find(item => item.id === caseItem.clientId);
    return `
      <tr>
        <td>${caseItem.title}</td>
        <td>${client ? client.name : '—'}</td>
        <td>${caseItem.type}</td>
        <td>${caseItem.status}</td>
        <td>
          <div class="table-actions">
            <button class="action-btn edit-btn" data-case-edit="${caseItem.id}">تعديل</button>
            <button class="action-btn delete-btn" data-case-delete="${caseItem.id}">حذف</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSessionsTable() {
  if (!state.sessions.length) {
    elements.sessionsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">لا توجد بيانات</td></tr>';
    return;
  }

  elements.sessionsTableBody.innerHTML = state.sessions.map(session => {
    const client = state.clients.find(item => item.id === session.clientId);
    return `
      <tr>
        <td>${client ? client.name : '—'}</td>
        <td>${session.date}</td>
        <td>${session.time}</td>
        <td>${session.type || '—'}</td>
        <td>
          <div class="table-actions">
            <button class="action-btn edit-btn" data-session-edit="${session.id}">تعديل</button>
            <button class="action-btn delete-btn" data-session-delete="${session.id}">حذف</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderTasks() {
  if (!state.tasks.length) {
    elements.tasksList.innerHTML = '<div class="empty-state">لا توجد مهام</div>';
    return;
  }

  elements.tasksList.innerHTML = state.tasks.map(task => `
    <div class="task-item">
      <div class="task-meta">
        <input type="checkbox" data-task-done="${task.id}" ${task.done ? 'checked' : ''} />
        <div>
          <strong style="text-decoration: ${task.done ? 'line-through' : 'none'};">${task.title}</strong>
        </div>
      </div>
      <div class="table-actions">
        <span class="priority-pill priority-${task.priority === 'عالية' ? 'high' : task.priority === 'متوسطة' ? 'medium' : 'low'}">${task.priority}</span>
        <button class="action-btn delete-btn" data-task-delete="${task.id}">حذف</button>
      </div>
    </div>
  `).join('');
}

function renderReports() {
  elements.reportCasesSummary.textContent = `${state.cases.length} قضية`;
  elements.reportSessionsSummary.textContent = `${state.sessions.length} جلسة`;
  elements.reportTasksSummary.textContent = `${state.tasks.length} مهمة`;
}

function renderAll() {
  populateClientSelects();
  renderStats();
  renderRecentClients();
  renderUpcomingSessions();
  renderClientsTable();
  renderCasesTable();
  renderSessionsTable();
  renderTasks();
  renderReports();
}

function resetClientForm() {
  elements.clientForm.reset();
  elements.clientId.value = '';
}

function resetCaseForm() {
  elements.caseForm.reset();
  elements.caseId.value = '';
}

function resetSessionForm() {
  elements.sessionForm.reset();
  elements.sessionId.value = '';
}

function resetTaskForm() {
  elements.taskForm.reset();
  elements.taskId.value = '';
}

function handleClientSubmit(event) {
  event.preventDefault();

  const id = elements.clientId.value || generateId('client');
  const payload = {
    id,
    name: elements.clientName.value.trim(),
    fileNo: elements.clientFile.value.trim(),
    phone: elements.clientPhone.value.trim(),
    caseType: elements.clientCaseType.value.trim()
  };

  if (!payload.name || !payload.fileNo) {
    alert('يرجى إدخال اسم الموكل ورقم الملف');
    return;
  }

  const existingIndex = state.clients.findIndex(item => item.id === id);
  if (existingIndex >= 0) {
    state.clients[existingIndex] = payload;
  } else {
    state.clients.push(payload);
  }

  saveData();
  renderAll();
  resetClientForm();
}

function handleCaseSubmit(event) {
  event.preventDefault();

  const id = elements.caseId.value || generateId('case');
  const payload = {
    id,
    clientId: elements.caseClient.value,
    title: elements.caseTitle.value.trim(),
    type: elements.caseType.value,
    status: elements.caseStatus.value
  };

  if (!payload.clientId || !payload.title) {
    alert('يرجى اختيار الموكل وكتابة عنوان القضية');
    return;
  }

  const existingIndex = state.cases.findIndex(item => item.id === id);
  if (existingIndex >= 0) {
    state.cases[existingIndex] = payload;
  } else {
    state.cases.push(payload);
  }

  saveData();
  renderAll();
  resetCaseForm();
}

function handleSessionSubmit(event) {
  event.preventDefault();

  const id = elements.sessionId.value || generateId('session');
  const payload = {
    id,
    clientId: elements.sessionClient.value,
    date: elements.sessionDate.value,
    time: elements.sessionTime.value,
    type: elements.sessionType.value.trim() || 'جلسة'
  };

  if (!payload.clientId || !payload.date || !payload.time) {
    alert('يرجى اختيار الموكل وتاريخ/وقت الجلسة');
    return;
  }

  const existingIndex = state.sessions.findIndex(item => item.id === id);
  if (existingIndex >= 0) {
    state.sessions[existingIndex] = payload;
  } else {
    state.sessions.push(payload);
  }

  saveData();
  renderAll();
  resetSessionForm();
}

function handleTaskSubmit(event) {
  event.preventDefault();

  const id = elements.taskId.value || generateId('task');
  const payload = {
    id,
    title: elements.taskTitle.value.trim(),
    priority: elements.taskPriority.value,
    done: false
  };

  if (!payload.title) {
    alert('يرجى كتابة عنوان المهمة');
    return;
  }

  const existingIndex = state.tasks.findIndex(item => item.id === id);
  if (existingIndex >= 0) {
    state.tasks[existingIndex] = {
      ...state.tasks[existingIndex],
      title: payload.title,
      priority: payload.priority
    };
  } else {
    state.tasks.push(payload);
  }

  saveData();
  renderAll();
  resetTaskForm();
}

function handleLogin(event) {
  event.preventDefault();

  const username = elements.lawyerUser.value.trim();
  const password = elements.lawyerPass.value.trim();

  if (username === DEFAULT_USER.username && password === DEFAULT_USER.password) {
    elements.loginMessage.textContent = 'تم تسجيل الدخول بنجاح';
    elements.loginMessage.style.color = '#baf5d7';
    setLoggedIn(true);
    localStorage.setItem(REMEMBER_KEY, String(elements.rememberMe.checked));
    elements.sidebarUserName.textContent = username;
    showAppScreen();
    renderAll();
    return;
  }

  elements.loginMessage.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
  elements.loginMessage.style.color = '#ffcfcf';
}

function logout() {
  setLoggedIn(false);
  elements.loginForm.reset();
  elements.loginMessage.textContent = '';
  showLoginScreen();
}

function initializeRememberedLogin() {
  const remembered = localStorage.getItem(REMEMBER_KEY) === 'true';
  if (remembered) {
    elements.lawyerUser.value = DEFAULT_USER.username;
    elements.lawyerPass.value = DEFAULT_USER.password;
    elements.rememberMe.checked = true;
  }

  if (isLoggedIn()) {
    elements.sidebarUserName.textContent = DEFAULT_USER.username;
    showAppScreen();
    renderAll();
  } else {
    showLoginScreen();
  }
}

function attachEvents() {
  elements.loginForm.addEventListener('submit', handleLogin);
  elements.logoutBtn.addEventListener('click', logout);

  elements.navItems.forEach((button) => {
    button.addEventListener('click', () => showSection(button.dataset.section));
  });

  elements.clientForm.addEventListener('submit', handleClientSubmit);
  elements.caseForm.addEventListener('submit', handleCaseSubmit);
  elements.sessionForm.addEventListener('submit', handleSessionSubmit);
  elements.taskForm.addEventListener('submit', handleTaskSubmit);

  elements.cancelClient.addEventListener('click', resetClientForm);
  elements.cancelCase.addEventListener('click', resetCaseForm);
  elements.cancelSession.addEventListener('click', resetSessionForm);
  elements.cancelTask.addEventListener('click', resetTaskForm);

  elements.newClientBtn.addEventListener('click', () => {
    resetClientForm();
    showSection('clients');
  });

  elements.newCaseBtn.addEventListener('click', () => {
    resetCaseForm();
    showSection('cases');
  });

  elements.newSessionBtn.addEventListener('click', () => {
    resetSessionForm();
    showSection('sessions');
  });

  elements.newTaskBtn.addEventListener('click', () => {
    resetTaskForm();
    showSection('tasks');
  });

  document.addEventListener('click', (event) => {
    const clientEdit = event.target.closest('[data-client-edit]');
    if (clientEdit) {
      const client = state.clients.find(item => item.id === clientEdit.dataset.clientEdit);
      if (!client) return;
      elements.clientId.value = client.id;
      elements.clientName.value = client.name;
      elements.clientFile.value = client.fileNo;
      elements.clientPhone.value = client.phone;
      elements.clientCaseType.value = client.caseType;
      showSection('clients');
    }

    const clientDelete = event.target.closest('[data-client-delete]');
    if (clientDelete) {
      const id = clientDelete.dataset.clientDelete;
      if (confirm('هل أنت متأكد من حذف هذا الموكل؟')) {
        state.clients = state.clients.filter(item => item.id !== id);
        saveData();
        renderAll();
      }
    }

    const caseEdit = event.target.closest('[data-case-edit]');
    if (caseEdit) {
      const caseItem = state.cases.find(item => item.id === caseEdit.dataset.caseEdit);
      if (!caseItem) return;
      elements.caseId.value = caseItem.id;
      elements.caseClient.value = caseItem.clientId;
      elements.caseTitle.value = caseItem.title;
      elements.caseType.value = caseItem.type;
      elements.caseStatus.value = caseItem.status;
      showSection('cases');
    }

    const caseDelete = event.target.closest('[data-case-delete]');
    if (caseDelete) {
      const id = caseDelete.dataset.caseDelete;
      if (confirm('هل أنت متأكد من حذف هذه القضية؟')) {
        state.cases = state.cases.filter(item => item.id !== id);
        saveData();
        renderAll();
      }
    }

    const sessionEdit = event.target.closest('[data-session-edit]');
    if (sessionEdit) {
      const session = state.sessions.find(item => item.id === sessionEdit.dataset.sessionEdit);
      if (!session) return;
      elements.sessionId.value = session.id;
      elements.sessionClient.value = session.clientId;
      elements.sessionDate.value = session.date;
      elements.sessionTime.value = session.time;
      elements.sessionType.value = session.type;
      showSection('sessions');
    }

    const sessionDelete = event.target.closest('[data-session-delete]');
    if (sessionDelete) {
      const id = sessionDelete.dataset.sessionDelete;
      if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
        state.sessions = state.sessions.filter(item => item.id !== id);
        saveData();
        renderAll();
      }
    }

    const taskDelete = event.target.closest('[data-task-delete]');
    if (taskDelete) {
      const id = taskDelete.dataset.taskDelete;
      if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
        state.tasks = state.tasks.filter(item => item.id !== id);
        saveData();
        renderAll();
      }
    }

    const taskDone = event.target.closest('[data-task-done]');
    if (taskDone) {
      const task = state.tasks.find(item => item.id === taskDone.dataset.taskDone);
      if (task) {
        task.done = taskDone.checked;
        saveData();
        renderAll();
      }
    }
  });
}

function init() {
  loadData();
  setCurrentDate();
  attachEvents();
  initializeRememberedLogin();
  showSection('dashboard');
}

init();
