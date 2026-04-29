import { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileText,
  Gauge,
  Home,
  Landmark,
  Moon,
  PiggyBank,
  Plus,
  ReceiptText,
  Settings,
  Sparkles,
  Sun,
  Trash2,
  WalletCards,
} from 'lucide-react';

const frequencyLabels = {
  weekly: 'Semanal',
  biweekly: 'Cada 2 semanas',
  monthly: 'Mensual',
  bimonthly: 'Cada 2 meses',
  quarterly: 'Trimestral',
  yearly: 'Anual',
};

const statusLabels = {
  paid: 'Pagado',
  pending: 'Pendiente',
  overdue: 'Vencido',
  current: 'Al dia',
  late: 'Atrasada',
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'movements', label: 'Movimientos', icon: ReceiptText },
  { id: 'calendar', label: 'Calendario', icon: CalendarDays },
  { id: 'cards', label: 'Tarjetas', icon: CreditCard },
  { id: 'irs', label: 'IRS', icon: Landmark },
  { id: 'budget', label: 'Presupuesto', icon: Gauge },
  { id: 'reports', label: 'Reportes', icon: FileText },
  { id: 'alerts', label: 'Alertas', icon: Bell },
  { id: 'settings', label: 'Config', icon: Settings },
];

const categoryPalette = {
  Fijos: '#007AFF',
  Suscripciones: '#38BDF8',
  Variables: '#FFCC00',
  Deudas: '#FF3B30',
  Ahorro: '#34C759',
  IRS: '#A855F7',
};

const initialData = {
  monthlyIncome: 12500,
  darkMode: false,
  expenses: [
    { id: 1, name: 'Alquiler / Hipoteca', category: 'Fijos', amount: 2330, frequency: 'monthly', dueDay: 1, status: 'pending', notes: '' },
    { id: 2, name: 'Servicios luz/agua/gas', category: 'Fijos', amount: 205, frequency: 'monthly', dueDay: 7, status: 'pending', notes: '' },
    { id: 3, name: 'Telefono', category: 'Fijos', amount: 309.37, frequency: 'monthly', dueDay: 12, status: 'pending', notes: '' },
    { id: 4, name: 'Internet', category: 'Fijos', amount: 105, frequency: 'monthly', dueDay: 15, status: 'pending', notes: '' },
    { id: 5, name: 'Camioneta / carro', category: 'Fijos', amount: 1060, frequency: 'monthly', dueDay: 18, status: 'pending', notes: '' },
    { id: 6, name: 'Salud', category: 'Fijos', amount: 43.86, frequency: 'monthly', dueDay: 5, status: 'pending', notes: '' },
    { id: 7, name: 'Ambar', category: 'Fijos', amount: 80, frequency: 'monthly', dueDay: 8, status: 'pending', notes: '' },
    { id: 8, name: 'Colegio Ambar', category: 'Fijos', amount: 96, frequency: 'monthly', dueDay: 9, status: 'pending', notes: '' },
    { id: 9, name: 'ChatGPT', category: 'Suscripciones', amount: 20, frequency: 'monthly', dueDay: 20, status: 'pending', notes: '' },
    { id: 10, name: 'Adobe', category: 'Suscripciones', amount: 69.99, frequency: 'monthly', dueDay: 22, status: 'pending', notes: '' },
    { id: 11, name: 'Microsoft', category: 'Suscripciones', amount: 12.99, frequency: 'monthly', dueDay: 11, status: 'pending', notes: '' },
    { id: 12, name: 'Gemini', category: 'Suscripciones', amount: 19.99, frequency: 'monthly', dueDay: 19, status: 'pending', notes: '' },
    { id: 13, name: 'Spotify', category: 'Suscripciones', amount: 21.99, frequency: 'monthly', dueDay: 6, status: 'pending', notes: '' },
    { id: 14, name: 'Disney', category: 'Suscripciones', amount: 33.96, frequency: 'monthly', dueDay: 26, status: 'pending', notes: '' },
    { id: 15, name: 'Gasolina', category: 'Variables', amount: 86, frequency: 'biweekly', dueDay: 4, status: 'pending', notes: 'Cada 2 semanas' },
    { id: 16, name: 'Mercado 1', category: 'Variables', amount: 0, frequency: 'bimonthly', dueDay: 10, status: 'pending', notes: 'Editable, cada 2 meses' },
    { id: 17, name: 'Mercado 2', category: 'Variables', amount: 0, frequency: 'quarterly', dueDay: 16, status: 'pending', notes: 'Proteinas, papel de bano y toallas absorbentes' },
    { id: 18, name: 'Comida fuera', category: 'Variables', amount: 0, frequency: 'monthly', dueDay: 21, status: 'pending', notes: '' },
    { id: 19, name: 'Compras personales', category: 'Variables', amount: 0, frequency: 'monthly', dueDay: 23, status: 'pending', notes: '' },
    { id: 20, name: 'Salidas', category: 'Variables', amount: 0, frequency: 'monthly', dueDay: 24, status: 'pending', notes: '' },
    { id: 21, name: 'Ahorro / inversion', category: 'Ahorro', amount: 0, frequency: 'monthly', dueDay: 2, status: 'pending', notes: '' },
    { id: 22, name: 'Fondo de emergencia', category: 'Ahorro', amount: 0, frequency: 'monthly', dueDay: 3, status: 'pending', notes: '' },
  ],
  cards: Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Tarjeta ${index + 1}`,
    bank: '',
    balance: 0,
    minimumPayment: 0,
    recommendedPayment: 0,
    apr: 0,
    closingDay: 15 + index,
    dueDay: 22 + index,
    status: 'current',
    notes: '',
  })),
  irs: {
    totalPending: 0,
    monthlyPayment: 0,
    dueDay: 15,
    remainingBalance: 0,
    status: 'pending',
    notes: '',
  },
  events: [
    { id: 101, name: 'Renta', amount: 2330, date: currentMonthDate(1), category: 'Fijos', status: 'pending', repeat: 'monthly', notes: '' },
    { id: 102, name: 'Gasolina', amount: 86, date: currentMonthDate(4), category: 'Variables', status: 'pending', repeat: 'biweekly', notes: '' },
    { id: 103, name: 'IRS', amount: 0, date: currentMonthDate(15), category: 'IRS', status: 'pending', repeat: 'monthly', notes: '' },
  ],
  budgets: [
    { id: 1, category: 'Mercado', limit: 800, spent: 0 },
    { id: 2, category: 'Gasolina', limit: 300, spent: 186.33 },
    { id: 3, category: 'Comida fuera', limit: 250, spent: 0 },
    { id: 4, category: 'Salidas', limit: 150, spent: 0 },
    { id: 5, category: 'Compras personales', limit: 250, spent: 0 },
    { id: 6, category: 'Suscripciones', limit: 150, spent: 178.92 },
    { id: 7, category: 'Otros', limit: 150, spent: 0 },
  ],
  history: [
    { id: 1, month: '2026-01', income: 11000, expenses: 5700, savings: 500, leftover: 4800, debtPaid: 900, biggestLeak: 'Vehiculo', note: 'Mes base' },
    { id: 2, month: '2026-02', income: 12200, expenses: 5850, savings: 700, leftover: 5650, debtPaid: 1200, biggestLeak: 'Vivienda', note: 'Mejor control' },
    { id: 3, month: '2026-03', income: 11800, expenses: 6100, savings: 450, leftover: 5250, debtPaid: 1000, biggestLeak: 'Suscripciones', note: 'Revisar servicios' },
  ],
};

function currentMonthDate(day) {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(Math.min(day, 28)).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${date}`;
}

function usd(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function toMonthly(amount, frequency) {
  const value = Number(amount || 0);
  const multipliers = {
    weekly: 52 / 12,
    biweekly: 26 / 12,
    monthly: 1,
    bimonthly: 1 / 2,
    quarterly: 1 / 3,
    yearly: 1 / 12,
  };
  return value * (multipliers[frequency] || 1);
}

function daysUntil(day) {
  const today = new Date();
  const due = new Date(today.getFullYear(), today.getMonth(), Number(day || 1));
  return Math.ceil((due - today) / 86400000);
}

function downloadFile(filename, content, type = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function inputNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

export default function App() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('apple-finance-studio');
    return stored ? JSON.parse(stored) : initialData;
  });
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(currentMonthDate(new Date().getDate()));

  useEffect(() => {
    localStorage.setItem('apple-finance-studio', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', data.darkMode);
  }, [data.darkMode]);

  const metrics = useMemo(() => buildMetrics(data), [data]);
  const alerts = useMemo(() => buildAlerts(data, metrics), [data, metrics]);
  const insights = useMemo(() => buildInsights(data, metrics), [data, metrics]);
  const charts = useMemo(() => buildCharts(data, metrics), [data, metrics]);

  const updateExpense = (id, patch) => {
    setData((prev) => ({
      ...prev,
      expenses: prev.expenses.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const addExpense = () => {
    setData((prev) => ({
      ...prev,
      expenses: [
        ...prev.expenses,
        { id: Date.now(), name: 'Nuevo gasto', category: 'Variables', amount: 0, frequency: 'monthly', dueDay: 1, status: 'pending', notes: '' },
      ],
    }));
  };

  const deleteExpense = (id) => {
    setData((prev) => ({ ...prev, expenses: prev.expenses.filter((item) => item.id !== id) }));
  };

  const updateCard = (id, patch) => {
    setData((prev) => ({ ...prev, cards: prev.cards.map((card) => (card.id === id ? { ...card, ...patch } : card)) }));
  };

  const updateBudget = (id, patch) => {
    setData((prev) => ({ ...prev, budgets: prev.budgets.map((budget) => (budget.id === id ? { ...budget, ...patch } : budget)) }));
  };

  const updateEvent = (id, patch) => {
    setData((prev) => ({ ...prev, events: prev.events.map((event) => (event.id === id ? { ...event, ...patch } : event)) }));
  };

  const deleteEvent = (id) => {
    setData((prev) => ({ ...prev, events: prev.events.filter((event) => event.id !== id) }));
  };

  const addEvent = () => {
    setData((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        { id: Date.now(), name: 'Nuevo pago', amount: 0, date: selectedDate, category: 'Otros', status: 'pending', repeat: 'monthly', notes: '' },
      ],
    }));
  };

  const saveMonth = () => {
    const month = new Date().toISOString().slice(0, 7);
    const entry = {
      id: Date.now(),
      month,
      income: data.monthlyIncome,
      expenses: metrics.totalExpenses,
      savings: metrics.savings,
      leftover: metrics.leftover,
      debtPaid: metrics.totalCardRecommended + data.irs.monthlyPayment,
      biggestLeak: metrics.biggestLeak.name,
      note: 'Guardado desde el dashboard',
    };
    setData((prev) => ({ ...prev, history: [entry, ...prev.history.filter((item) => item.month !== month)] }));
  };

  const exportMovements = () => {
    const rows = [['Nombre', 'Categoria', 'Monto', 'Frecuencia', 'Equivalente mensual', 'Dia', 'Estado', 'Notas']];
    data.expenses.forEach((item) => rows.push([item.name, item.category, item.amount, frequencyLabels[item.frequency], toMonthly(item.amount, item.frequency).toFixed(2), item.dueDay, item.status, item.notes]));
    downloadFile('movimientos-financieros.csv', rows.map((row) => row.map(csvCell).join(',')).join('\n'));
  };

  const exportSummary = () => {
    const rows = [
      ['Metrica', 'Valor'],
      ['Ingreso mensual', data.monthlyIncome],
      ['Gastos totales', metrics.totalExpenses.toFixed(2)],
      ['Gastos fijos', metrics.fixed.toFixed(2)],
      ['Gastos variables', metrics.variable.toFixed(2)],
      ['Suscripciones', metrics.subscriptions.toFixed(2)],
      ['Deuda tarjetas', metrics.totalCardDebt.toFixed(2)],
      ['IRS mensual', data.irs.monthlyPayment],
      ['Ahorro mensual', metrics.savings.toFixed(2)],
      ['Dinero sobrante', metrics.leftover.toFixed(2)],
      ['Porcentaje ahorro', `${metrics.savingsRate.toFixed(1)}%`],
    ];
    downloadFile('resumen-mensual.csv', rows.map((row) => row.map(csvCell).join(',')).join('\n'));
  };

  const downloadReport = () => {
    const report = `Reporte financiero mensual
Ingreso: ${usd(data.monthlyIncome)}
Gastos: ${usd(metrics.totalExpenses)}
Ahorro: ${usd(metrics.savings)}
Sobrante: ${usd(metrics.leftover)}
Mayor fuga: ${metrics.biggestLeak.name} (${usd(metrics.biggestLeak.value)})
Estado: ${metrics.financialState}

Consejos:
${insights.recommendations.map((item) => `- ${item}`).join('\n')}`;
    downloadFile('reporte-financiero-mensual.txt', report, 'text/plain;charset=utf-8;');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#111827] transition-colors duration-300 dark:bg-[#0F172A] dark:text-[#F8FAFC]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#007AFF]/10 blur-3xl dark:bg-[#38BDF8]/10" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#34C759]/10 blur-3xl dark:bg-[#22C55E]/10" />
      </div>

      <aside className="fixed left-5 top-5 bottom-5 z-30 hidden w-72 flex-col rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl dark:border-slate-700/40 dark:bg-[#111827]/80 lg:flex">
        <Brand />
        <nav className="mt-7 flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <NavButton key={item.id} item={item} active={activeView === item.id} onClick={() => setActiveView(item.id)} />
          ))}
        </nav>
        <button
          onClick={() => setData((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
          className="mt-4 flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:scale-[1.02] dark:bg-slate-800 dark:text-slate-100"
        >
          {data.darkMode ? 'Modo oscuro' : 'Modo claro'}
          {data.darkMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </aside>

      <main className="pb-28 lg:ml-80 lg:pb-8">
        <TopBar data={data} setData={setData} metrics={metrics} alerts={alerts} />
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          {activeView === 'dashboard' && (
            <Dashboard data={data} setData={setData} metrics={metrics} alerts={alerts} insights={insights} charts={charts} onSaveMonth={saveMonth} />
          )}
          {activeView === 'movements' && (
            <Movements data={data} updateExpense={updateExpense} addExpense={addExpense} deleteExpense={deleteExpense} />
          )}
          {activeView === 'calendar' && (
            <CalendarView data={data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} updateEvent={updateEvent} addEvent={addEvent} deleteEvent={deleteEvent} />
          )}
          {activeView === 'cards' && <CardsView data={data} metrics={metrics} updateCard={updateCard} />}
          {activeView === 'irs' && <IrsView data={data} setData={setData} metrics={metrics} />}
          {activeView === 'budget' && <BudgetView data={data} updateBudget={updateBudget} />}
          {activeView === 'reports' && (
            <ReportsView data={data} metrics={metrics} charts={charts} exportMovements={exportMovements} exportSummary={exportSummary} downloadReport={downloadReport} />
          )}
          {activeView === 'alerts' && <AlertsView alerts={alerts} insights={insights} />}
          {activeView === 'settings' && <SettingsView data={data} setData={setData} />}
        </div>
      </main>

      <nav className="soft-scroll fixed inset-x-3 bottom-3 z-40 flex gap-1 overflow-x-auto rounded-[26px] border border-white/70 bg-white/90 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700/40 dark:bg-[#111827]/90 lg:hidden">
        {navItems.map((item) => (
          <MobileNavButton key={item.id} item={item} active={activeView === item.id} onClick={() => setActiveView(item.id)} />
        ))}
      </nav>
    </div>
  );
}

function buildMetrics(data) {
  const expenseTotals = data.expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + toMonthly(item.amount, item.frequency);
    return acc;
  }, {});
  const totalCardDebt = data.cards.reduce((sum, card) => sum + Number(card.balance || 0), 0);
  const totalCardMinimums = data.cards.reduce((sum, card) => sum + Number(card.minimumPayment || 0), 0);
  const totalCardRecommended = data.cards.reduce((sum, card) => sum + Number(card.recommendedPayment || 0), 0);
  const fixed = expenseTotals.Fijos || 0;
  const subscriptions = expenseTotals.Suscripciones || 0;
  const variable = expenseTotals.Variables || 0;
  const savings = expenseTotals.Ahorro || 0;
  const debtPayments = totalCardMinimums + Number(data.irs.monthlyPayment || 0);
  const totalExpenses = fixed + subscriptions + variable + debtPayments;
  const leftover = Number(data.monthlyIncome || 0) - totalExpenses - savings;
  const savingsRate = data.monthlyIncome ? (savings / data.monthlyIncome) * 100 : 0;
  const groups = [
    { name: 'Vivienda y fijos', value: fixed },
    { name: 'Vehiculo', value: data.expenses.filter((item) => /carro|camioneta/i.test(item.name)).reduce((sum, item) => sum + toMonthly(item.amount, item.frequency), 0) },
    { name: 'Suscripciones', value: subscriptions },
    { name: 'Variables', value: variable },
    { name: 'Tarjetas', value: totalCardMinimums },
    { name: 'IRS', value: Number(data.irs.monthlyPayment || 0) },
  ].sort((a, b) => b.value - a.value);
  const biggestLeak = groups[0] || { name: 'Sin datos', value: 0 };
  const nextPayment = [...data.expenses.map((item) => ({ name: item.name, day: item.dueDay, amount: toMonthly(item.amount, item.frequency) })), ...data.cards.map((card) => ({ name: card.name, day: card.dueDay, amount: card.minimumPayment }))]
    .filter((item) => daysUntil(item.day) >= 0)
    .sort((a, b) => daysUntil(a.day) - daysUntil(b.day))[0];
  const financialState = leftover < 0 ? 'Rojo: gastando mas de lo que entra' : savingsRate < 10 ? 'Amarillo: ahorro por debajo del 10%' : 'Verde: mes bajo control';
  return { expenseTotals, fixed, subscriptions, variable, savings, totalCardDebt, totalCardMinimums, totalCardRecommended, debtPayments, totalExpenses, leftover, savingsRate, biggestLeak, nextPayment, financialState };
}

function buildAlerts(data, metrics) {
  const alerts = [];
  data.cards.forEach((card) => {
    const due = daysUntil(card.dueDay);
    if (due < 0 && Number(card.balance) > 0) alerts.push({ type: 'danger', title: `${card.name} vencida`, detail: `Pago limite fue hace ${Math.abs(due)} dias.`, category: 'Tarjetas' });
    if (due === 1 && Number(card.balance) > 0) alerts.push({ type: 'danger', title: `${card.name} vence manana`, detail: `Pago minimo: ${usd(card.minimumPayment)}.`, category: 'Tarjetas' });
    if (due >= 0 && due <= 7 && Number(card.balance) > 0) alerts.push({ type: 'warning', title: `${card.name} vence en ${due} dias`, detail: `Fecha limite dia ${card.dueDay}.`, category: 'Tarjetas' });
    if (card.balance > 0 && card.minimumPayment / card.balance < 0.02) alerts.push({ type: 'warning', title: `${card.name}: pago minimo bajo`, detail: 'El minimo es menor al 2% del balance.', category: 'Tarjetas' });
  });
  if (metrics.totalCardDebt > data.monthlyIncome * 0.3) alerts.push({ type: 'danger', title: 'Deuda alta vs ingreso', detail: 'Las tarjetas superan 30% del ingreso mensual.', category: 'Deudas' });
  const irsDue = daysUntil(data.irs.dueDay);
  if (data.irs.monthlyPayment > 0 && irsDue <= 7 && irsDue >= 0) alerts.push({ type: 'warning', title: 'IRS vence pronto', detail: `Pago mensual vence en ${irsDue} dias.`, category: 'IRS' });
  if (data.irs.monthlyPayment > 0 && irsDue < 0) alerts.push({ type: 'danger', title: 'IRS vencido', detail: `Pago mensual vencio hace ${Math.abs(irsDue)} dias.`, category: 'IRS' });
  if (data.irs.monthlyPayment > metrics.savings && data.irs.monthlyPayment > 0) alerts.push({ type: 'info', title: 'IRS afecta el ahorro', detail: 'El pago IRS es mayor que tu ahorro registrado.', category: 'IRS' });
  if (metrics.leftover > 0) alerts.push({ type: 'success', title: 'Sobrante disponible', detail: `Puedes asignar ${usd(metrics.leftover)} entre ahorro, deuda e inversion.`, category: 'Flujo' });
  if (!alerts.length) alerts.push({ type: 'success', title: 'Todo tranquilo', detail: 'No hay alertas criticas con los datos actuales.', category: 'Sistema' });
  return alerts;
}

function buildInsights(data, metrics) {
  const subscriptionsYear = metrics.subscriptions * 12;
  const vehicle = data.expenses.filter((item) => /carro|camioneta/i.test(item.name)).reduce((sum, item) => sum + toMonthly(item.amount, item.frequency), 0);
  const recommendations = [];
  const leaks = [
    `Tu mayor gasto es ${metrics.biggestLeak.name.toLowerCase()} con ${usd(metrics.biggestLeak.value)} al mes.`,
    `Tus suscripciones suman ${usd(metrics.subscriptions)} al mes, aproximadamente ${usd(subscriptionsYear)} al ano.`,
  ];
  if (vehicle > data.monthlyIncome * 0.2) leaks.push('Tu vehiculo representa un gasto alto frente al ingreso.');
  if (metrics.savings <= 0) leaks.push('No tienes ahorro registrado este mes.');
  if (metrics.totalCardDebt > data.monthlyIncome * 0.3) leaks.push('Tus deudas estan pesando mucho frente al ingreso mensual.');
  if (metrics.leftover < 0) leaks.push('Estas gastando mas de lo que entra.');
  if (metrics.savingsRate < 10) leaks.push('Tu ahorro esta por debajo del 10%.');
  if (metrics.savingsRate < 10) recommendations.push('Separa ahorro apenas entra el ingreso, aunque empieces con un monto pequeno.');
  if (metrics.totalCardDebt > data.monthlyIncome * 0.3) recommendations.push('Activa un plan de pago agresivo: mayor APR primero o snowball si necesitas impulso.');
  if (metrics.subscriptions > 150) recommendations.push('Cancela o pausa 1 o 2 servicios para bajar suscripciones por debajo de $150.');
  if (vehicle > data.monthlyIncome * 0.2) recommendations.push('Revisa refinanciamiento, seguro o alternativas para reducir el costo del vehiculo.');
  if (metrics.variable > data.monthlyIncome * 0.2) recommendations.push('Pon un limite semanal para gastos variables y revisalo cada domingo.');
  if (metrics.leftover > 0) recommendations.push('Divide el sobrante entre ahorro, deuda e inversion antes de gastarlo.');
  return { leaks, recommendations };
}

function buildCharts(data, metrics) {
  const categoryPie = Object.entries(metrics.expenseTotals)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)), color: categoryPalette[name] || '#94A3B8' }));
  const incomeVsExpenses = [
    { name: 'Ingreso', value: Number(data.monthlyIncome || 0) },
    { name: 'Gastos', value: Number(metrics.totalExpenses.toFixed(2)) },
    { name: 'Ahorro', value: Number(metrics.savings.toFixed(2)) },
    { name: 'Sobrante', value: Number(metrics.leftover.toFixed(2)) },
  ];
  const balanceLine = [...data.history].reverse().map((item) => ({ month: item.month.slice(5), balance: item.leftover, ahorro: item.savings }));
  const subscriptions = data.expenses.filter((item) => item.category === 'Suscripciones').map((item) => ({ name: item.name, value: toMonthly(item.amount, item.frequency) }));
  const cardDebt = data.cards.map((card) => ({ name: card.name, balance: Number(card.balance || 0), apr: Number(card.apr || 0) }));
  const flow = [
    { name: 'Ingreso', value: data.monthlyIncome },
    { name: 'Fijos', value: metrics.fixed },
    { name: 'Variables', value: metrics.variable },
    { name: 'Deudas', value: metrics.totalCardMinimums + data.irs.monthlyPayment },
    { name: 'Ahorro', value: metrics.savings },
    { name: 'Libre', value: metrics.leftover },
  ];
  return { categoryPie, incomeVsExpenses, balanceLine, subscriptions, cardDebt, flow };
}

function csvCell(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/25 dark:bg-[#38BDF8] dark:text-[#0F172A]">
        <WalletCards size={24} />
      </div>
      <div>
        <p className="text-lg font-bold tracking-tight">Finance Studio</p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Apple clean budget</p>
      </div>
    </div>
  );
}

function NavButton({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
        active ? 'bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/25 dark:bg-[#38BDF8] dark:text-[#0F172A]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={19} />
      <span>{item.label}</span>
    </button>
  );
}

function MobileNavButton({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button onClick={onClick} className={`flex h-14 min-w-16 flex-col items-center justify-center rounded-2xl px-2 text-[11px] font-semibold transition ${active ? 'bg-[#007AFF] text-white dark:bg-[#38BDF8] dark:text-[#0F172A]' : 'text-slate-500 dark:text-slate-400'}`}>
      <Icon size={19} />
      <span className="mt-1">{item.label.split(' ')[0]}</span>
    </button>
  );
}

function TopBar({ data, setData, metrics, alerts }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-[#F5F7FA]/80 px-4 py-4 backdrop-blur-2xl dark:border-slate-800 dark:bg-[#0F172A]/80 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="lg:hidden"><Brand /></div>
        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-[#007AFF] dark:text-[#38BDF8]">Control financiero personal</p>
          <h1 className="text-2xl font-bold tracking-tight">Tu dinero, claro y accionable</h1>
        </div>
        <div className="flex items-center gap-2">
          <Pill color={metrics.leftover >= 0 ? 'green' : 'red'}>{usd(metrics.leftover)} libre</Pill>
          <Pill color={alerts.some((item) => item.type === 'danger') ? 'red' : 'blue'}>{alerts.length} alertas</Pill>
          <button
            onClick={() => setData((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm transition hover:scale-105 dark:bg-slate-800 lg:hidden"
            aria-label="Cambiar modo"
          >
            {data.darkMode ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Dashboard({ data, setData, metrics, alerts, insights, charts, onSaveMonth }) {
  return (
    <div className="space-y-6 pt-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="overflow-hidden">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#007AFF] dark:text-[#38BDF8]">Dashboard principal</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Resumen del mes</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{metrics.financialState}. Mayor fuga: {metrics.biggestLeak.name}.</p>
            </div>
            <div className="rounded-[26px] bg-slate-100 p-3 dark:bg-slate-800">
              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Ingreso editable</label>
              <MoneyInput value={data.monthlyIncome} onChange={(value) => setData((prev) => ({ ...prev, monthlyIncome: value }))} large />
            </div>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Gastos totales" value={usd(metrics.totalExpenses)} icon={ReceiptText} tone="blue" />
            <StatCard title="Dinero sobrante" value={usd(metrics.leftover)} icon={CircleDollarSign} tone={metrics.leftover >= 0 ? 'green' : 'red'} />
            <StatCard title="% ahorro" value={`${metrics.savingsRate.toFixed(1)}%`} icon={PiggyBank} tone={metrics.savingsRate >= 10 ? 'green' : 'yellow'} />
            <StatCard title="Estado financiero" value={metrics.leftover >= 0 ? 'En control' : 'Ajustar'} icon={Sparkles} tone={metrics.leftover >= 0 ? 'green' : 'red'} />
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Proximo pago</h3>
            <CalendarDays size={20} className="text-[#007AFF] dark:text-[#38BDF8]" />
          </div>
          <div className="mt-5 rounded-[26px] bg-[#007AFF] p-5 text-white shadow-xl shadow-[#007AFF]/20 dark:bg-[#38BDF8] dark:text-[#0F172A]">
            <p className="text-sm font-semibold opacity-80">{metrics.nextPayment ? `Dia ${metrics.nextPayment.day}` : 'Sin pagos pendientes'}</p>
            <p className="mt-2 text-2xl font-bold">{metrics.nextPayment?.name || 'Todo listo'}</p>
            <p className="mt-6 text-3xl font-bold">{usd(metrics.nextPayment?.amount || 0)}</p>
          </div>
          <button onClick={onSaveMonth} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:scale-[1.01] dark:bg-white dark:text-slate-950">
            <CheckCircle2 size={19} /> Guardar mes en historico
          </button>
        </Panel>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Gastos fijos" value={usd(metrics.fixed)} icon={Home} tone="blue" />
        <StatCard title="Variables" value={usd(metrics.variable)} icon={WalletCards} tone="yellow" />
        <StatCard title="Suscripciones" value={usd(metrics.subscriptions)} icon={ReceiptText} tone="blue" />
        <StatCard title="Total deudas" value={usd(metrics.totalCardDebt)} icon={CreditCard} tone="red" />
        <StatCard title="IRS mensual" value={usd(data.irs.monthlyPayment)} icon={Landmark} tone="red" />
        <StatCard title="Ahorro mensual" value={usd(metrics.savings)} icon={PiggyBank} tone="green" />
        <StatCard title="Mayor fuga" value={metrics.biggestLeak.name} icon={AlertTriangle} tone="yellow" />
        <StatCard title="Pago recomendado tarjetas" value={usd(metrics.totalCardRecommended)} icon={CreditCard} tone="blue" />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <ChartPanel title="Gastos por categoria"><PieChartBox data={charts.categoryPie} /></ChartPanel>
        <ChartPanel title="Ingresos vs gastos"><BarChartBox data={charts.incomeVsExpenses} color="#007AFF" /></ChartPanel>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <h3 className="text-lg font-bold">Centro de Alertas</h3>
          <div className="mt-4 space-y-3">{alerts.slice(0, 4).map((alert, index) => <AlertItem key={index} alert={alert} />)}</div>
        </Panel>
        <Panel>
          <h3 className="text-lg font-bold">Donde se esta yendo tu dinero</h3>
          <div className="mt-4 space-y-3">{insights.leaks.slice(0, 5).map((item) => <InsightLine key={item}>{item}</InsightLine>)}</div>
        </Panel>
      </section>
    </div>
  );
}

function Movements({ data, updateExpense, addExpense, deleteExpense }) {
  return (
    <Page title="Movimientos" subtitle="Todos los gastos son editables y se convierten automaticamente a equivalente mensual.">
      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold">Gastos y recurrencias</h3>
          <button onClick={addExpense} className="flex items-center gap-2 rounded-2xl bg-[#007AFF] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#007AFF]/20 transition hover:scale-[1.02] dark:bg-[#38BDF8] dark:text-[#0F172A]"><Plus size={18} /> Nuevo</button>
        </div>
        <EditableExpenseTable data={data.expenses} updateExpense={updateExpense} deleteExpense={deleteExpense} />
      </Panel>
    </Page>
  );
}

function EditableExpenseTable({ data, updateExpense, deleteExpense }) {
  return (
    <div className="soft-scroll overflow-x-auto">
      <table className="w-full min-w-[960px] border-separate border-spacing-y-2 text-left text-sm">
        <thead className="text-xs uppercase text-slate-400">
          <tr><th>Nombre</th><th>Categoria</th><th>Monto</th><th>Frecuencia</th><th>Equiv. mensual</th><th>Dia</th><th>Estado</th><th>Notas</th><th></th></tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="rounded-2xl bg-slate-50 dark:bg-slate-800/70">
              <td className="rounded-l-2xl p-2"><TextInput value={item.name} onChange={(value) => updateExpense(item.id, { name: value })} /></td>
              <td className="p-2"><Select value={item.category} onChange={(value) => updateExpense(item.id, { category: value })} options={['Fijos', 'Suscripciones', 'Variables', 'Deudas', 'Ahorro', 'IRS', 'Otros']} /></td>
              <td className="p-2"><MoneyInput value={item.amount} onChange={(value) => updateExpense(item.id, { amount: value })} /></td>
              <td className="p-2"><Select value={item.frequency} onChange={(value) => updateExpense(item.id, { frequency: value })} options={Object.keys(frequencyLabels)} labels={frequencyLabels} /></td>
              <td className="p-2 font-bold">{usd(toMonthly(item.amount, item.frequency))}</td>
              <td className="p-2"><NumberInput value={item.dueDay} onChange={(value) => updateExpense(item.id, { dueDay: Math.max(1, Math.min(28, value)) })} /></td>
              <td className="p-2"><Select value={item.status} onChange={(value) => updateExpense(item.id, { status: value })} options={['pending', 'paid', 'overdue']} labels={statusLabels} /></td>
              <td className="p-2"><TextInput value={item.notes} onChange={(value) => updateExpense(item.id, { notes: value })} /></td>
              <td className="rounded-r-2xl p-2"><IconButton onClick={() => deleteExpense(item.id)} icon={Trash2} label="Eliminar" danger /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalendarView({ data, selectedDate, setSelectedDate, updateEvent, addEvent, deleteEvent }) {
  const days = calendarDays();
  const eventsByDay = data.events.reduce((acc, event) => {
    const day = Number(event.date?.slice(-2));
    acc[day] = [...(acc[day] || []), event];
    return acc;
  }, {});
  const selectedEvents = data.events.filter((event) => event.date === selectedDate);
  const upcoming = data.events
    .map((event) => ({ ...event, distance: Math.ceil((new Date(event.date) - new Date()) / 86400000) }))
    .filter((event) => event.distance >= 0 && event.distance <= 30)
    .sort((a, b) => a.distance - b.distance);
  const upcomingSeven = upcoming.filter((event) => event.distance <= 7);

  return (
    <Page title="Calendario financiero" subtitle="Crea, edita, elimina y marca pagos como pagados desde un calendario mensual visual.">
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">{new Date().toLocaleDateString('es-US', { month: 'long', year: 'numeric' })}</h3>
            <button onClick={addEvent} className="flex items-center gap-2 rounded-2xl bg-[#007AFF] px-4 py-3 text-sm font-bold text-white dark:bg-[#38BDF8] dark:text-[#0F172A]"><Plus size={18} /> Evento</button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase text-slate-400">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <button key={`${day}-${index}`} onClick={() => day && setSelectedDate(currentMonthDate(day))} className={`min-h-24 rounded-2xl border p-2 text-left transition hover:scale-[1.02] ${day ? 'bg-white dark:bg-slate-800' : 'bg-transparent'} ${selectedDate.endsWith(String(day).padStart(2, '0')) ? 'border-[#007AFF] dark:border-[#38BDF8]' : 'border-slate-100 dark:border-slate-700'}`}>
                {day && <span className="font-bold">{day}</span>}
                <div className="mt-1 space-y-1">
                  {(eventsByDay[day] || []).slice(0, 2).map((event) => (
                    <div key={event.id} className={`truncate rounded-lg px-2 py-1 text-[11px] font-bold ${event.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : event.status === 'overdue' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-sky-500/20 dark:text-sky-300'}`}>{event.name}</div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="text-lg font-bold">Pagos del dia</h3>
          <div className="mt-4 space-y-3">
            {selectedEvents.length ? selectedEvents.map((event) => <EventEditor key={event.id} event={event} updateEvent={updateEvent} deleteEvent={deleteEvent} />) : <EmptyState text="No hay pagos en esta fecha." />}
          </div>
          <h3 className="mt-6 text-lg font-bold">Proximos 7 dias</h3>
          <div className="mt-4 space-y-2">{upcomingSeven.length ? upcomingSeven.map((event) => <MiniRow key={event.id} title={event.name} value={usd(event.amount)} meta={`${event.distance} dias - ${statusLabels[event.status] || event.status}`} />) : <EmptyState text="No hay pagos en los proximos 7 dias." />}</div>
          <h3 className="mt-6 text-lg font-bold">Proximos 30 dias</h3>
          <div className="mt-4 space-y-2">{upcoming.slice(0, 7).map((event) => <MiniRow key={event.id} title={event.name} value={usd(event.amount)} meta={`${event.distance} dias - ${frequencyLabels[event.repeat] || event.repeat}`} />)}</div>
        </Panel>
      </div>
    </Page>
  );
}

function CardsView({ data, metrics, updateCard }) {
  const highestBalance = [...data.cards].sort((a, b) => b.balance - a.balance)[0];
  const highestApr = [...data.cards].sort((a, b) => b.apr - a.apr)[0];
  const nextDue = [...data.cards].filter((card) => card.balance > 0).sort((a, b) => daysUntil(a.dueDay) - daysUntil(b.dueDay))[0];
  return (
    <Page title="Tarjetas de credito" subtitle="Controla 6 tarjetas con balance, minimo, APR, corte, vencimiento, estado y notas.">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Deuda total" value={usd(metrics.totalCardDebt)} icon={CreditCard} tone="red" />
        <StatCard title="Pagos minimos" value={usd(metrics.totalCardMinimums)} icon={CircleDollarSign} tone="yellow" />
        <StatCard title="Pago recomendado" value={usd(metrics.totalCardRecommended)} icon={PiggyBank} tone="green" />
        <StatCard title="Mayor balance" value={highestBalance?.name || '-'} icon={AlertTriangle} tone="red" />
        <StatCard title="Mayor interes" value={`${highestApr?.apr || 0}%`} icon={Sparkles} tone="yellow" />
      </section>
      <Panel className="mt-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Detalle de tarjetas</h3>
          <Pill color="blue">Proxima: {nextDue?.name || 'sin balance'}</Pill>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {data.cards.map((card) => <CreditCardEditor key={card.id} card={card} updateCard={updateCard} />)}
        </div>
      </Panel>
    </Page>
  );
}

function IrsView({ data, setData, metrics }) {
  const updateIrs = (patch) => setData((prev) => ({ ...prev, irs: { ...prev.irs, ...patch } }));
  return (
    <Page title="IRS" subtitle="Administra balance, pago mensual, fecha de pago, estado y notas.">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Panel>
          <h3 className="text-lg font-bold">Plan IRS</h3>
          <div className="mt-4 space-y-4">
            <Field label="Monto total pendiente"><MoneyInput value={data.irs.totalPending} onChange={(value) => updateIrs({ totalPending: value })} /></Field>
            <Field label="Pago mensual"><MoneyInput value={data.irs.monthlyPayment} onChange={(value) => updateIrs({ monthlyPayment: value })} /></Field>
            <Field label="Fecha de pago mensual"><NumberInput value={data.irs.dueDay} onChange={(value) => updateIrs({ dueDay: Math.max(1, Math.min(28, value)) })} /></Field>
            <Field label="Balance restante"><MoneyInput value={data.irs.remainingBalance} onChange={(value) => updateIrs({ remainingBalance: value })} /></Field>
            <Field label="Estado"><Select value={data.irs.status} onChange={(value) => updateIrs({ status: value })} options={['pending', 'paid', 'overdue']} labels={statusLabels} /></Field>
            <Field label="Notas"><TextInput value={data.irs.notes} onChange={(value) => updateIrs({ notes: value })} /></Field>
          </div>
        </Panel>
        <Panel>
          <h3 className="text-lg font-bold">Impacto en el mes</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <StatCard title="IRS mensual" value={usd(data.irs.monthlyPayment)} icon={Landmark} tone="red" />
            <StatCard title="Balance restante" value={usd(data.irs.remainingBalance)} icon={ReceiptText} tone="yellow" />
            <StatCard title="Ahorro mensual" value={usd(metrics.savings)} icon={PiggyBank} tone="green" />
            <StatCard title="Impacto en ahorro" value={data.irs.monthlyPayment > metrics.savings ? 'Alto' : 'Manejable'} icon={AlertTriangle} tone={data.irs.monthlyPayment > metrics.savings ? 'red' : 'green'} />
          </div>
          <div className="mt-5 rounded-[26px] bg-slate-100 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Si el pago IRS reduce tu ahorro por debajo del 10%, conviene automatizar un ahorro minimo antes de otros gastos variables.</p>
          </div>
        </Panel>
      </div>
    </Page>
  );
}

function BudgetView({ data, updateBudget }) {
  return (
    <Page title="Presupuesto mensual" subtitle="Define limites por categoria y mira progreso con colores claros.">
      <Panel>
        <div className="grid gap-4 lg:grid-cols-2">
          {data.budgets.map((budget) => {
            const ratio = budget.limit ? budget.spent / budget.limit : 0;
            const tone = ratio > 1 ? 'red' : ratio > 0.8 ? 'yellow' : 'green';
            return (
              <div key={budget.id} className="rounded-[26px] bg-slate-50 p-4 dark:bg-slate-800/70">
                <div className="flex items-center justify-between gap-3">
                  <TextInput value={budget.category} onChange={(value) => updateBudget(budget.id, { category: value })} />
                  <Pill color={tone}>{Math.round(ratio * 100)}%</Pill>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Field label="Limite"><MoneyInput value={budget.limit} onChange={(value) => updateBudget(budget.id, { limit: value })} /></Field>
                  <Field label="Gastado"><MoneyInput value={budget.spent} onChange={(value) => updateBudget(budget.id, { spent: value })} /></Field>
                </div>
                <ProgressBar ratio={ratio} tone={tone} />
              </div>
            );
          })}
        </div>
      </Panel>
    </Page>
  );
}

function ReportsView({ data, metrics, charts, exportMovements, exportSummary, downloadReport }) {
  return (
    <Page title="Reportes" subtitle="Historico mensual, graficos y exportaciones en CSV.">
      <section className="grid gap-4 xl:grid-cols-2">
        <ChartPanel title="Balance mensual"><LineChartBox data={charts.balanceLine} /></ChartPanel>
        <ChartPanel title="Flujo de dinero"><AreaChartBox data={charts.flow} /></ChartPanel>
        <ChartPanel title="Suscripciones"><BarChartBox data={charts.subscriptions} color="#38BDF8" /></ChartPanel>
        <ChartPanel title="Deuda por tarjeta"><BarChartBox data={charts.cardDebt} dataKey="balance" color="#FF3B30" /></ChartPanel>
      </section>
      <Panel className="mt-4">
        <div className="flex flex-wrap gap-3">
          <ActionButton onClick={exportMovements} icon={Download}>Exportar movimientos CSV</ActionButton>
          <ActionButton onClick={exportSummary} icon={Download}>Exportar resumen CSV</ActionButton>
          <ActionButton onClick={downloadReport} icon={FileText}>Descargar reporte mensual</ActionButton>
        </div>
        <div className="soft-scroll mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-400"><tr><th>Mes</th><th>Ingreso</th><th>Gastos</th><th>Ahorro</th><th>Sobrante</th><th>Deuda pagada</th><th>Mayor fuga</th><th>Nota</th></tr></thead>
            <tbody>{data.history.map((item) => <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800"><td className="py-3 font-bold">{item.month}</td><td>{usd(item.income)}</td><td>{usd(item.expenses)}</td><td>{usd(item.savings)}</td><td>{usd(item.leftover)}</td><td>{usd(item.debtPaid)}</td><td>{item.biggestLeak}</td><td>{item.note}</td></tr>)}</tbody>
          </table>
        </div>
      </Panel>
    </Page>
  );
}

function AlertsView({ alerts, insights }) {
  return (
    <Page title="Centro de Alertas" subtitle="Recordatorios 7 dias antes, 3 dias, 1 dia, mismo dia y pagos vencidos.">
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel>
          <h3 className="text-lg font-bold">Alertas activas</h3>
          <div className="mt-4 space-y-3">{alerts.map((alert, index) => <AlertItem key={index} alert={alert} />)}</div>
        </Panel>
        <Panel>
          <h3 className="text-lg font-bold">Consejos automaticos</h3>
          <div className="mt-4 space-y-3">{insights.recommendations.map((item) => <InsightLine key={item}>{item}</InsightLine>)}</div>
        </Panel>
      </div>
    </Page>
  );
}

function SettingsView({ data, setData }) {
  return (
    <Page title="Configuracion" subtitle="Datos locales, modo oscuro y reinicio de ejemplo.">
      <Panel>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold">Persistencia local</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Todo se guarda en localStorage. No hay conexion bancaria.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton icon={data.darkMode ? Moon : Sun} onClick={() => setData((prev) => ({ ...prev, darkMode: !prev.darkMode }))}>Cambiar tema</ActionButton>
            <ActionButton icon={Trash2} onClick={() => setData(initialData)}>Restaurar ejemplo</ActionButton>
          </div>
        </div>
      </Panel>
    </Page>
  );
}

function CreditCardEditor({ card, updateCard }) {
  return (
    <div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/80">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><CreditCard size={20} /></div>
          <div><TextInput value={card.name} onChange={(value) => updateCard(card.id, { name: value })} className="font-bold" /><TextInput value={card.bank} placeholder="Banco" onChange={(value) => updateCard(card.id, { bank: value })} /></div>
        </div>
        <Pill color={card.status === 'late' ? 'red' : card.status === 'pending' ? 'yellow' : 'green'}>{statusLabels[card.status]}</Pill>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Balance total"><MoneyInput value={card.balance} onChange={(value) => updateCard(card.id, { balance: value })} /></Field>
        <Field label="Pago minimo"><MoneyInput value={card.minimumPayment} onChange={(value) => updateCard(card.id, { minimumPayment: value })} /></Field>
        <Field label="Pago recomendado"><MoneyInput value={card.recommendedPayment} onChange={(value) => updateCard(card.id, { recommendedPayment: value })} /></Field>
        <Field label="APR / interes"><NumberInput value={card.apr} onChange={(value) => updateCard(card.id, { apr: value })} suffix="%" /></Field>
        <Field label="Fecha de corte"><NumberInput value={card.closingDay} onChange={(value) => updateCard(card.id, { closingDay: Math.max(1, Math.min(28, value)) })} /></Field>
        <Field label="Fecha limite"><NumberInput value={card.dueDay} onChange={(value) => updateCard(card.id, { dueDay: Math.max(1, Math.min(28, value)) })} /></Field>
        <Field label="Estado"><Select value={card.status} onChange={(value) => updateCard(card.id, { status: value })} options={['current', 'pending', 'late']} labels={statusLabels} /></Field>
        <Field label="Notas"><TextInput value={card.notes} onChange={(value) => updateCard(card.id, { notes: value })} /></Field>
      </div>
    </div>
  );
}

function EventEditor({ event, updateEvent, deleteEvent }) {
  return (
    <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-800/70">
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <TextInput value={event.name} onChange={(value) => updateEvent(event.id, { name: value })} />
          <IconButton onClick={() => deleteEvent(event.id)} icon={Trash2} label="Eliminar evento" danger />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MoneyInput value={event.amount} onChange={(value) => updateEvent(event.id, { amount: value })} />
          <Select value={event.status} onChange={(value) => updateEvent(event.id, { status: value })} options={['pending', 'paid', 'overdue']} labels={statusLabels} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select value={event.repeat} onChange={(value) => updateEvent(event.id, { repeat: value })} options={Object.keys(frequencyLabels)} labels={frequencyLabels} />
          <TextInput value={event.category} onChange={(value) => updateEvent(event.id, { category: value })} />
        </div>
        <input type="date" value={event.date} onChange={(change) => updateEvent(event.id, { date: change.target.value })} className="w-full rounded-2xl border border-transparent bg-white px-3 py-2 text-sm font-bold outline-none focus:border-[#007AFF] dark:bg-slate-900 dark:focus:border-[#38BDF8]" />
        <TextInput value={event.notes} placeholder="Notas" onChange={(value) => updateEvent(event.id, { notes: value })} />
      </div>
    </div>
  );
}

function Page({ title, subtitle, children }) {
  return (
    <div className="space-y-4 pt-6">
      <div>
        <p className="text-sm font-semibold text-[#007AFF] dark:text-[#38BDF8]">Finance Studio</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Panel({ children, className = '' }) {
  return <section className={`glass rounded-[32px] p-5 sm:p-6 ${className}`}>{children}</section>;
}

function StatCard({ title, value, icon: Icon, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-[#007AFF] dark:bg-sky-500/15 dark:text-[#38BDF8]',
    green: 'bg-green-50 text-[#34C759] dark:bg-green-500/15 dark:text-[#22C55E]',
    red: 'bg-red-50 text-[#FF3B30] dark:bg-red-500/15 dark:text-[#EF4444]',
    yellow: 'bg-yellow-50 text-[#B45309] dark:bg-yellow-500/15 dark:text-[#FFCC00]',
  };
  return (
    <div className="rounded-[26px] bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-[#111827]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
        <div className={`grid h-10 w-10 place-items-center rounded-2xl ${tones[tone]}`}><Icon size={19} /></div>
      </div>
      <p className="mt-4 truncate text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function ChartPanel({ title, children }) {
  return <Panel><h3 className="mb-4 text-lg font-bold">{title}</h3><div className="h-80">{children}</div></Panel>;
}

function PieChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={105} innerRadius={58} paddingAngle={4}>
          {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
        <Tooltip formatter={(value) => usd(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarChartBox({ data, color = '#007AFF', dataKey = 'value' }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => usd(value)} />
        <Bar dataKey={dataKey} fill={color} radius={[12, 12, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function LineChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => usd(value)} />
        <Line type="monotone" dataKey="balance" stroke="#007AFF" strokeWidth={3} dot={{ r: 5 }} />
        <Line type="monotone" dataKey="ahorro" stroke="#34C759" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function AreaChartBox({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="money" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#007AFF" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#007AFF" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => usd(value)} />
        <Area type="monotone" dataKey="value" stroke="#007AFF" strokeWidth={3} fill="url(#money)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function Field({ label, children }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold uppercase text-slate-400">{label}</span>{children}</label>;
}

function TextInput({ value, onChange, placeholder = '', className = '' }) {
  return <input value={value || ''} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={`w-full rounded-2xl border border-transparent bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-[#007AFF] dark:bg-slate-900 dark:focus:border-[#38BDF8] ${className}`} />;
}

function MoneyInput({ value, onChange, large = false }) {
  return (
    <div className="flex items-center rounded-2xl bg-white px-3 py-2 dark:bg-slate-900">
      <span className="font-bold text-slate-400">$</span>
      <input type="number" value={value ?? 0} onChange={(event) => onChange(inputNumber(event.target.value))} className={`w-full bg-transparent px-2 font-bold outline-none ${large ? 'text-3xl tracking-tight' : 'text-sm'}`} />
    </div>
  );
}

function NumberInput({ value, onChange, suffix = '' }) {
  return (
    <div className="flex items-center rounded-2xl bg-white px-3 py-2 dark:bg-slate-900">
      <input type="number" value={value ?? 0} onChange={(event) => onChange(inputNumber(event.target.value))} className="w-full bg-transparent text-sm font-bold outline-none" />
      {suffix && <span className="text-sm font-bold text-slate-400">{suffix}</span>}
    </div>
  );
}

function Select({ value, onChange, options, labels = {} }) {
  return <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-transparent bg-white px-3 py-2 text-sm font-bold outline-none focus:border-[#007AFF] dark:bg-slate-900 dark:focus:border-[#38BDF8]">{options.map((option) => <option key={option} value={option}>{labels[option] || option}</option>)}</select>;
}

function IconButton({ icon: Icon, label, onClick, danger = false }) {
  return <button title={label} onClick={onClick} className={`grid h-10 w-10 place-items-center rounded-2xl transition hover:scale-105 ${danger ? 'bg-red-50 text-red-500 dark:bg-red-500/15' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}><Icon size={18} /></button>;
}

function ActionButton({ icon: Icon, onClick, children }) {
  return <button onClick={onClick} className="flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-950"><Icon size={18} />{children}</button>;
}

function Pill({ children, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-sky-500/15 dark:text-sky-300',
    green: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${colors[color]}`}>{children}</span>;
}

function AlertItem({ alert }) {
  const map = {
    success: { icon: CheckCircle2, color: 'green' },
    warning: { icon: AlertTriangle, color: 'yellow' },
    danger: { icon: AlertTriangle, color: 'red' },
    info: { icon: Bell, color: 'blue' },
  };
  const item = map[alert.type] || map.info;
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3 rounded-[24px] bg-slate-50 p-4 dark:bg-slate-800/70">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${item.color === 'red' ? 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300' : item.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300' : item.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300' : 'bg-blue-100 text-blue-700 dark:bg-sky-500/15 dark:text-sky-300'}`}><Icon size={19} /></div>
      <div>
        <div className="flex flex-wrap items-center gap-2"><p className="font-bold">{alert.title}</p><Pill color={item.color}>{alert.category}</Pill></div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{alert.detail}</p>
      </div>
    </div>
  );
}

function InsightLine({ children }) {
  return <div className="flex items-start gap-3 rounded-[22px] bg-slate-50 p-4 text-sm font-semibold text-slate-700 dark:bg-slate-800/70 dark:text-slate-200"><ChevronRight size={18} className="mt-0.5 shrink-0 text-[#007AFF] dark:text-[#38BDF8]" />{children}</div>;
}

function ProgressBar({ ratio, tone }) {
  const width = `${Math.min(100, Math.round(ratio * 100))}%`;
  const color = tone === 'red' ? 'bg-[#FF3B30] dark:bg-[#EF4444]' : tone === 'yellow' ? 'bg-[#FFCC00]' : 'bg-[#34C759] dark:bg-[#22C55E]';
  return <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width }} /></div>;
}

function MiniRow({ title, value, meta }) {
  return <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/70"><div><p className="font-bold">{title}</p><p className="text-xs text-slate-500 dark:text-slate-400">{meta}</p></div><p className="font-bold">{value}</p></div>;
}

function EmptyState({ text }) {
  return <div className="rounded-[24px] bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">{text}</div>;
}

function calendarDays() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const count = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return [...Array(first).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];
}
