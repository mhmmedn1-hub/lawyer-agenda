<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>أجندة المحامي | Lawyer Agenda</title>
    <meta
      name="description"
      content="بوابة محامي وموكل احترافية لإدارة القضايا، الجلسات، المهام، والملاحظات."
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="portal-screen" class="screen active">
      <div class="portal-shell">
        <div class="portal-panel glass">
          <div class="brand-block">
            <div class="brand-badge">⚖️</div>
            <h1>أجندة المحامي</h1>
            <p>بوابة محامي وموكل متكاملة لإدارة القضايا والمواعيد</p>
          </div>

          <div class="portal-grid">
            <div class="role-card glass">
              <div class="role-icon">👨‍💼</div>
              <h2>بوابة المحامي</h2>
              <p>إدارة الموكلين، القضايا، الجلسات، المهام، والتقارير.</p>

              <form id="lawyer-login-form" class="role-form" novalidate>
                <div class="field">
                  <label for="lawyer-user">اسم المستخدم</label>
                  <input id="lawyer-user" type="text" value="محمد النزال" placeholder="محمد النزال" autocomplete="username" />
                </div>

                <div class="field">
                  <label for="lawyer-pass">كلمة المرور</label>
                  <input id="lawyer-pass" type="password" value="6503536" placeholder="••••••••" autocomplete="current-password" />
                </div>

                <button type="submit" class="primary-btn full-width">دخول المحامي</button>
                <div id="lawyer-login-message" class="login-message" aria-live="polite"></div>
              </form>
            </div>

            <div class="role-card glass">
              <div class="role-icon">🧑‍⚖️</div>
              <h2>بوابة الموكل</h2>
              <p>عرض القضية، الجلسات القادمة، الملاحظات، وتحديثات الملف.</p>

              <form id="client-login-form" class="role-form" novalidate>
                <div class="field">
                  <label for="client-user">اسم العميل</label>
                  <input id="client-user" type="text" value="موكل 1" placeholder="موكل 1" autocomplete="username" />
                </div>

                <div class="field">
                  <label for="client-pass">كلمة المرور</label>
                  <input id="client-pass" type="password" value="123456" placeholder="••••••••" autocomplete="current-password" />
                </div>

                <button type="submit" class="secondary-btn full-width">دخول الموكل</button>
                <div id="client-login-message" class="login-message" aria-live="polite"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="lawyer-screen" class="screen">
      <aside class="sidebar glass">
        <div>
          <div class="sidebar-header">
            <div class="mini-logo">⚖️</div>
            <div>
              <h2>المحامي</h2>
              <small id="sidebar-user-name">محمد النزال</small>
            </div>
          </div>

          <nav class="nav" aria-label="التنقل الرئيسي">
            <button class="nav-item active" data-section="dashboard">لوحة القيادة</button>
            <button class="nav-item" data-section="clients">الموكلين</button>
            <button class="nav-item" data-section="cases">القضايا</button>
            <button class="nav-item" data-section="sessions">الجلسات</button>
            <button class="nav-item" data-section="tasks">المه��م</button>
            <button class="nav-item" data-section="reports">التقارير</button>
          </nav>
        </div>

        <div class="sidebar-footer">
          <button id="logout-btn" class="danger-btn">تسجيل الخروج</button>
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar glass">
          <div>
            <p class="eyebrow">إدارة قانونية متكاملة</p>
            <h3>أجندة المحامي</h3>
          </div>
          <div class="topbar-date" id="current-date"></div>
        </header>

        <section id="dashboard" class="page-section active">
          <div class="stats-grid">
            <div class="stat-card glass accent-blue">
              <span>إجمالي الموكلين</span>
              <strong id="stat-clients">0</strong>
            </div>
            <div class="stat-card glass accent-gold">
              <span>القضايا النشطة</span>
              <strong id="stat-cases">0</strong>
            </div>
            <div class="stat-card glass accent-green">
              <span>الجلسات هذا الأسبوع</span>
              <strong id="stat-sessions">0</strong>
            </div>
            <div class="stat-card glass accent-red">
              <span>المهام المعلقة</span>
              <strong id="stat-tasks">0</strong>
            </div>
          </div>

          <div class="panel-grid">
            <div class="panel glass">
              <div class="panel-head">
                <h4>أحدث الموكلين</h4>
              </div>
              <ul id="recent-clients" class="list-box"></ul>
            </div>

            <div class="panel glass">
              <div class="panel-head">
                <h4>الجلسات القادمة</h4>
              </div>
              <ul id="upcoming-sessions" class="list-box"></ul>
            </div>
          </div>
        </section>

        <section id="clients" class="page-section">
          <div class="section-header">
            <h3>إدارة الموكلين</h3>
            <button class="primary-btn small" id="new-client-btn">إضافة موكل</button>
          </div>

          <form id="client-form" class="card-form glass" novalidate>
            <input type="hidden" id="client-id" />
            <div class="form-grid two-columns">
              <div class="field">
                <label>اسم الموكل</label>
                <input type="text" id="client-name" required />
              </div>
              <div class="field">
                <label>رقم الملف</label>
                <input type="text" id="client-file" required />
              </div>
              <div class="field">
                <label>رقم الهاتف</label>
                <input type="tel" id="client-phone" />
              </div>
              <div class="field">
                <label>نوع القضية</label>
                <input type="text" id="client-case-type" />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="primary-btn">حفظ الموكل</button>
              <button type="button" id="cancel-client" class="secondary-btn">إلغاء</button>
            </div>
          </form>

          <div class="table-wrap glass">
            <table>
              <thead>
                <tr>
                  <th>اسم الموكل</th>
                  <th>رقم الملف</th>
                  <th>الهاتف</th>
                  <th>نوع القضية</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody id="clients-table-body"></tbody>
            </table>
          </div>
        </section>

        <section id="cases" class="page-section">
          <div class="section-header">
            <h3>إدارة القضايا</h3>
            <button class="primary-btn small" id="new-case-btn">إضافة قضية</button>
          </div>

          <form id="case-form" class="card-form glass" novalidate>
            <input type="hidden" id="case-id" />
            <div class="form-grid two-columns">
              <div class="field">
                <label>اسم الموكل</label>
                <select id="case-client"></select>
              </div>
              <div class="field">
                <label>عنوان القضية</label>
                <input type="text" id="case-title" required />
              </div>
              <div class="field">
                <label>نوع القضية</label>
                <select id="case-type">
                  <option value="مدنية">مدنية</option>
                  <option value="جنائية">جنائية</option>
                  <option value="شرعية">شرعية</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
              <div class="field">
                <label>الحالة</label>
                <select id="case-status">
                  <option value="نشطة">نشطة</option>
                  <option value="معلقة">معلقة</option>
                  <option value="مغلقة">مغلقة</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="primary-btn">حفظ القضية</button>
              <button type="button" id="cancel-case" class="secondary-btn">إلغاء</button>
            </div>
          </form>

          <div class="table-wrap glass">
            <table>
              <thead>
                <tr>
                  <th>العنوان</th>
                  <th>الموكل</th>
                  <th>النوع</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody id="cases-table-body"></tbody>
            </table>
          </div>
        </section>

        <section id="sessions" class="page-section">
          <div class="section-header">
            <h3>إدارة الجلسات</h3>
            <button class="primary-btn small" id="new-session-btn">إضافة جلسة</button>
          </div>

          <form id="session-form" class="card-form glass" novalidate>
            <input type="hidden" id="session-id" />
            <div class="form-grid two-columns">
              <div class="field">
                <label>الموكل</label>
                <select id="session-client"></select>
              </div>
              <div class="field">
                <label>تاريخ الجلسة</label>
                <input type="date" id="session-date" required />
              </div>
              <div class="field">
                <label>الوقت</label>
                <input type="time" id="session-time" required />
              </div>
              <div class="field">
                <label>نوع الجلسة</label>
                <input type="text" id="session-type" placeholder="مثال: تمهيدية" />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="primary-btn">حفظ الجلسة</button>
              <button type="button" id="cancel-session" class="secondary-btn">إلغاء</button>
            </div>
          </form>

          <div class="table-wrap glass">
            <table>
              <thead>
                <tr>
                  <th>اسم الموكل</th>
                  <th>التاريخ</th>
                  <th>الوقت</th>
                  <th>النوع</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody id="sessions-table-body"></tbody>
            </table>
          </div>
        </section>

        <section id="tasks" class="page-section">
          <div class="section-header">
            <h3>المهام والإشعارات</h3>
            <button class="primary-btn small" id="new-task-btn">إضافة مهمة</button>
          </div>

          <form id="task-form" class="card-form glass" novalidate>
            <input type="hidden" id="task-id" />
            <div class="form-grid two-columns">
              <div class="field">
                <label>عنوان المهمة</label>
                <input type="text" id="task-title" required />
              </div>
              <div class="field">
                <label>الأولوية</label>
                <select id="task-priority">
                  <option value="عالية">عالية</option>
                  <option value="متوسطة" selected>متوسطة</option>
                  <option value="منخفضة">منخفضة</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="primary-btn">حفظ المهمة</button>
              <button type="button" id="cancel-task" class="secondary-btn">إلغاء</button>
            </div>
          </form>

          <div class="task-list glass" id="tasks-list"></div>
        </section>

        <section id="reports" class="page-section">
          <div class="section-header">
            <h3>التقارير</h3>
          </div>

          <div class="reports-grid">
            <div class="glass report-box">
              <h4>ملخص القضايا</h4>
              <p id="report-cases-summary">0 قضية</p>
            </div>
            <div class="glass report-box">
              <h4>ملخص الجلسات</h4>
              <p id="report-sessions-summary">0 جلسة</p>
            </div>
            <div class="glass report-box">
              <h4>ملخص المهام</h4>
              <p id="report-tasks-summary">0 مهمة</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <div id="client-screen" class="screen">
      <div class="client-shell">
        <header class="client-topbar glass">
          <div>
            <p class="eyebrow">بوابة الموكل</p>
            <h3>مرحباً، <span id="client-user-label">الموكل</span></h3>
          </div>
          <button id="client-logout-btn" class="danger-btn">تسجيل الخروج</button>
        </header>

        <main class="client-dashboard">
          <div class="client-overview glass">
            <div class="overview-card accent-blue">
              <span>القضايا النشطة</span>
              <strong id="client-active-cases">0</strong>
            </div>
            <div class="overview-card accent-gold">
              <span>الجلسات القادمة</span>
              <strong id="client-next-sessions">0</strong>
            </div>
            <div class="overview-card accent-green">
              <span>المهام</span>
              <strong id="client-pending-tasks">0</strong>
            </div>
          </div>

          <div class="client-panels">
            <section class="glass client-panel">
              <div class="panel-head">
                <h4>ملفي الشخصي</h4>
              </div>
              <div id="client-profile" class="profile-box"></div>
            </section>

            <section class="glass client-panel">
              <div class="panel-head">
                <h4>قضيتي الحالية</h4>
              </div>
              <div id="client-cases-list" class="list-box"></div>
            </section>

            <section class="glass client-panel wide-panel">
              <div class="panel-head">
                <h4>الجلسات القادمة</h4>
              </div>
              <div id="client-sessions-list" class="list-box"></div>
            </section>
          </div>
        </main>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>


