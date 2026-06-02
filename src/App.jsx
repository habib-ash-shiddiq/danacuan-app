import { useState } from "react";

const transactions = [
  { id: 1, title: "QRIS Sales", category: "Business Income", amount: 3500000, type: "income", date: "Today", source: "QRIS" },
  { id: 2, title: "Inventory Purchase", category: "Inventory Cost", amount: 850000, type: "expense", date: "Today", source: "OCR Receipt" },
  { id: 3, title: "Supplier Payment", category: "Operational Expense", amount: 600000, type: "expense", date: "Yesterday", source: "Bank Transfer" },
  { id: 4, title: "Customer Transfer", category: "Business Income", amount: 1250000, type: "income", date: "Yesterday", source: "Bank Sync" },
  { id: 5, title: "Electricity Bill", category: "Utilities", amount: 300000, type: "expense", date: "2 days ago", source: "Manual Input" },
  { id: 6, title: "Employee Salary", category: "Salary Expense", amount: 1200000, type: "expense", date: "3 days ago", source: "Owner Approval" },
];

const budgets = [
  { name: "Inventory Cost", spent: 850000, limit: 2000000 },
  { name: "Operational Expense", spent: 600000, limit: 1500000 },
  { name: "Utilities", spent: 300000, limit: 800000 },
  { name: "Salary Expense", spent: 1200000, limit: 2500000 },
];

const goals = [
  { name: "Funding Readiness Score", current: 7800000, target: 10000000 },
  { name: "Business Emergency Fund", current: 3500000, target: 10000000 },
  { name: "Digital Expansion Fund", current: 5000000, target: 15000000 },
];

const healthScore = {
  score: 82,
  status: "Funding Ready",
  insight: "Your MSME cash flow is stable, but inventory and salary expenses need closer monitoring.",
  recommendation: "Keep business and personal money separated, reduce unnecessary operational expenses, and maintain consistent digital transaction records to improve funding readiness.",
};

const features = [
  {
    title: "OCR Receipt Scanner",
    desc: "Scan receipts and convert them into digital records.",
    icon: "📷",
  },
  {
    title: "Scam Alert",
    desc: "Detect suspicious QRIS or transfer activity.",
    icon: "🛡️",
  },
  {
    title: "Employee Access",
    desc: "Control staff roles and transaction permissions.",
    icon: "👥",
  },
  {
    title: "QRIS Sync",
    desc: "Connect QRIS transactions to business cash flow.",
    icon: "🔗",
  },
];

const learningTips = [
  {
    title: "Separate personal and business money",
    desc: "Avoid mixing owner spending with MSME cash flow.",
  },
  {
    title: "Check suspicious QR payments",
    desc: "Always verify QRIS name and transaction amount before approval.",
  },
  {
    title: "Prepare funding documents",
    desc: "Keep transaction records consistent before applying for financing.",
  },
];

const employeeAccess = [
  {
    name: "Owner",
    role: "Master Account",
    access: "Full approval access",
    icon: "👑",
  },
  {
    name: "Cashier",
    role: "Sales Recorder",
    access: "Can record QRIS sales",
    icon: "🧾",
  },
  {
    name: "Admin",
    role: "Receipt Uploader",
    access: "Can upload invoices and receipts",
    icon: "📷",
  },
];

const complianceItems = [
  {
    title: "KYC Verified",
    desc: "Business owner identity and business profile are verified.",
    icon: "✅",
  },
  {
    title: "Data Consent",
    desc: "Financial data is processed based on user permission.",
    icon: "🔐",
  },
  {
    title: "QRIS Monitoring",
    desc: "Digital transactions are monitored for business records.",
    icon: "📱",
  },
  {
    title: "Licensed Partners",
    desc: "Funding referrals are connected only to official financing partners.",
    icon: "🏦",
  },
];

const fundingFactors = [
  {
    title: "Cash Flow Stability",
    score: 84,
    desc: "Business cash flow is positive and stable this month.",
  },
  {
    title: "Transaction Consistency",
    score: 78,
    desc: "Digital records are mostly consistent, but some manual records still need improvement.",
  },
  {
    title: "Expense Control",
    score: 74,
    desc: "Inventory and salary expenses should be monitored more closely.",
  },
  {
    title: "Repayment Potential",
    score: 82,
    desc: "Business income shows potential to support future financing repayment.",
  },
];

const setupChecklist = [
  {
    title: "Business Profile Setup",
    status: "Completed",
    icon: "🏪",
  },
  {
    title: "KYC Verification",
    status: "Verified",
    icon: "✅",
  },
  {
    title: "QRIS & Bank Sync",
    status: "Connected",
    icon: "🔗",
  },
  {
    title: "OCR Receipt Scanner",
    status: "Active",
    icon: "📷",
  },
  {
    title: "Employee Access",
    status: "Configured",
    icon: "👥",
  },
];


function formatIDR(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-xl relative pb-24">
        {activeTab === "home" && (
          <HomeScreen
            balance={balance}
            income={income}
            expense={expense}
            openAddModal={() => setShowAddModal(true)}
            openAiModal={() => setShowAiModal(true)}
          />
        )}

        {activeTab === "transactions" && (
          <TransactionsScreen
            openAddModal={() => setShowAddModal(true)}
            openApprovalModal={() => setShowApprovalModal(true)}
          />
        )}

        {activeTab === "budget" && <BudgetScreen />}

        {activeTab === "goals" && <GoalsScreen />}

        {activeTab === "profile" && <ProfileScreen />}

        {showAddModal && (
          <AddTransactionModal closeModal={() => setShowAddModal(false)} />
        )}

        {showAiModal && (
          <AiConsultationModal closeModal={() => setShowAiModal(false)} />
        )}

        {showApprovalModal && (
  <OwnerApprovalModal closeModal={() => setShowApprovalModal(false)} />
)}

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

function HomeScreen({ balance, income, expense, openAddModal, openAiModal }) {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 to-emerald-500 p-6 text-white rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1">
            <img
              src="/danacuan-logo.png"
              alt="DanaCuan Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">DanaCuan</h1>
            <p className="text-sm opacity-90">Kelola Dana, Raih Cuan</p>
          </div>
        </div>

        <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
          👤
        </div>
        </div>

        <div className="mt-7">
          <p className="text-sm opacity-80">Business Cash Balance</p>
          <h2 className="text-3xl font-bold">{formatIDR(balance)}</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-white/15 p-4 rounded-2xl">
            <p className="text-xs opacity-80">Business Income</p>
            <h3 className="font-bold">{formatIDR(income)}</h3>
          </div>

          <div className="bg-white/15 p-4 rounded-2xl">
            <p className="text-xs opacity-80">Business Expense</p>
            <h3 className="font-bold">{formatIDR(expense)}</h3>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="bg-slate-50 p-4 rounded-2xl">
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Monthly Operating Limit</p>
            <p className="text-sm text-slate-500">42%</p>
          </div>

          <div className="w-full bg-slate-200 h-3 rounded-full">
            <div className="bg-emerald-500 h-3 rounded-full w-[42%]"></div>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Operational expenses are still under the monthly control limit.
          </p>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Financial Health Score</p>
              <h3 className="text-3xl font-bold mt-1">{healthScore.score}/100</h3>
            </div>

            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-lg font-bold">
              {healthScore.score}
            </div>
          </div>

          <div className="mt-4 bg-white/10 p-3 rounded-2xl">
            <p className="text-xs opacity-70">Status</p>
            <p className="font-semibold">{healthScore.status}</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              ✨
            </div>
            <div>
              <p className="font-bold">AI Financial Insight</p>
              <p className="text-xs text-slate-500">Personalized money analysis</p>
            </div>
          </div>

          <p className="text-sm text-slate-700 mt-3">
            {healthScore.insight}
          </p>

          <div className="mt-3 bg-white p-3 rounded-xl">
            <p className="text-xs text-slate-500">Recommendation</p>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              {healthScore.recommendation}
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="w-full bg-blue-900 text-white py-3 rounded-2xl font-semibold"
        >
          + Add Transaction
        </button>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Smart MSME Features</h3>
            <p className="text-sm text-emerald-600 font-medium">Active</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-50 border border-slate-100 p-4 rounded-2xl"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <p className="font-semibold text-sm mt-3">{feature.title}</p>
                <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white">
              🤖
            </div>

            <div>
              <p className="font-bold text-blue-900">AI Finance Assistant</p>
              <p className="text-xs text-slate-500">
                Ask about cash flow, transaction safety, and funding readiness.
              </p>
            </div>
          </div>

          <div className="mt-4 bg-white p-3 rounded-xl">
            <p className="text-xs text-slate-500">Example Question</p>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              “Is my business ready to apply for financing?”
            </p>
          </div>

          <button
            onClick={openAiModal}
            className="w-full bg-blue-900 text-white py-3 rounded-2xl font-semibold mt-4"
          >
            Open AI Consultation
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Financial Literacy Tips</h3>
            <p className="text-sm text-emerald-600 font-medium">Learn</p>
          </div>

          <div className="space-y-3">
            {learningTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-slate-50 border border-slate-100 p-4 rounded-2xl"
              >
                <p className="font-semibold text-sm">{tip.title}</p>
                <p className="text-xs text-slate-500 mt-1">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>     
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Recent Business Records</h3>
            <p className="text-sm text-emerald-600 font-medium">See all</p>
          </div>

          <TransactionList limit={3} />
        </div>
      </div>
    </div>
  );
}

function TransactionsScreen({ openAddModal, openApprovalModal }) {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Business Transactions</h1>
      <p className="text-sm text-slate-500 mt-1">
        Monitor QRIS, cash flow, and MSME financial records.
      </p>

      <div className="mt-5 bg-gradient-to-r from-blue-900 to-emerald-500 p-5 rounded-3xl text-white">
        <p className="text-sm opacity-80">Today’s Digital Sales</p>
        <h2 className="text-3xl font-bold mt-1">Rp 4.750.000</h2>
        <p className="text-xs opacity-80 mt-2">
          Connected from QRIS and customer bank transfers.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-emerald-50 p-4 rounded-2xl">
          <p className="text-xs text-slate-500">QRIS Sync</p>
          <h3 className="font-bold text-emerald-700">Active</h3>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl">
          <p className="text-xs text-slate-500">Auto Category</p>
          <h3 className="font-bold text-blue-900">Enabled</h3>
        </div>
      </div>

      <div className="mt-4 bg-red-50 border border-red-100 p-4 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
            ⚠️
          </div>

          <div className="flex-1">
            <p className="font-bold text-red-700">Suspicious Transaction Alert</p>
            <p className="text-sm text-slate-700 mt-1">
              One outgoing supplier payment looks unusual. Owner approval is required before processing.
            </p>

            <button
              onClick={openApprovalModal}
              className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold mt-3"
            >
              Review Transaction
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={openAddModal}
        className="w-full bg-blue-900 text-white py-3 rounded-2xl font-semibold mt-4"
      >
        + Add Business Transaction
      </button>

      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Recorded Transactions</h3>
          <p className="text-sm text-emerald-600 font-medium">Auto-synced</p>
        </div>

        <TransactionList />
      </div>
    </div>
  );
}

function BudgetScreen() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Cash Flow Control</h1>
      <p className="text-sm text-slate-500 mt-1">
        Monitor operational spending and protect business cash flow.
      </p>

      <div className="mt-5 bg-gradient-to-r from-blue-900 to-emerald-500 p-5 rounded-3xl text-white">
        <p className="text-sm opacity-80">Net Cash Flow This Month</p>
        <h2 className="text-3xl font-bold mt-1">Rp 1.800.000</h2>
        <p className="text-xs opacity-80 mt-2">
          Cash flow is positive, but expenses should remain controlled.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {budgets.map((item) => {
          const percentage = Math.round((item.spent / item.limit) * 100);

          return (
            <div key={item.name} className="bg-slate-50 p-4 rounded-2xl">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {formatIDR(item.spent)} / {formatIDR(item.limit)}
                  </p>
                </div>

                <p
                  className={`text-sm font-semibold ${
                    percentage > 75 ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {percentage}%
                </p>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full">
                <div
                  className={`h-3 rounded-full ${
                    percentage > 75 ? "bg-red-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                {percentage > 75
                  ? "Warning: this expense category is close to the limit."
                  : "This expense category is still under control."}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 bg-blue-50 border border-blue-100 p-4 rounded-2xl">
        <p className="font-bold text-blue-900">AI Cash Flow Note</p>
        <p className="text-sm text-slate-700 mt-1">
          Inventory and salary expenses are the biggest cost drivers this month. Keep records consistent to improve funding readiness.
        </p>
      </div>
    </div>
  );
}

function GoalsScreen() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Funding Readiness</h1>
      <p className="text-sm text-slate-500 mt-1">
        Check how prepared your MSME is to access financing.
      </p>

      <div className="mt-5 bg-gradient-to-r from-blue-900 to-emerald-500 p-5 rounded-3xl text-white">
        <p className="text-sm opacity-80">Business Readiness Score</p>
        <h2 className="text-4xl font-bold mt-2">82/100</h2>
        <p className="text-sm opacity-90 mt-2">
          Your business is considered funding-ready, but operational expenses still need monitoring.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100);

          return (
            <div key={goal.name} className="bg-slate-50 p-4 rounded-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{goal.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatIDR(goal.current)} / {formatIDR(goal.target)}
                  </p>
                </div>

                <p className="text-sm font-bold text-emerald-600">
                  {percentage}%
                </p>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full mt-3">
                <div
                  className="bg-emerald-500 h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 bg-yellow-50 border border-yellow-100 p-4 rounded-2xl">
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Readiness Factors</h3>
          <p className="text-sm text-emerald-600 font-medium">AI Analysis</p>
        </div>

        <div className="space-y-3">
          {fundingFactors.map((factor) => (
            <div
              key={factor.title}
              className="bg-slate-50 border border-slate-100 p-4 rounded-2xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{factor.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{factor.desc}</p>
                </div>

                <p className="text-sm font-bold text-emerald-600">
                  {factor.score}/100
                </p>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full mt-3">
                <div
                  className="bg-emerald-500 h-3 rounded-full"
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 bg-yellow-50 border border-yellow-100 p-4 rounded-2xl"></div>
        <p className="font-bold text-yellow-700">Improvement Needed</p>
        <p className="text-sm text-slate-700 mt-1">
          Keep transaction records consistent and reduce unnecessary expenses before applying for funding.
        </p>
      </div>

      <button className="w-full bg-blue-900 text-white py-3 rounded-2xl font-semibold mt-6">
        Connect to Financing Partner
      </button>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="p-5">
    <div className="flex flex-col items-center mt-6">
      <div className="w-36 h-36 bg-white rounded-3xl shadow-md flex items-center justify-center p-3 overflow-hidden">
        <img
          src="/tallo-coffee.png"
          alt="TALLO Coffee"
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold mt-4">TALLO Coffee</h1>
      <p className="text-sm text-slate-500">MSME Business Account</p>
    </div>

      <div className="mt-8 space-y-3">
        <ProfileItem title="Business Type" value="Food & Beverage" />
        <ProfileItem title="Account Role" value="Owner / Master Account" />
        <ProfileItem title="Monthly Revenue" value="Rp 25.000.000" />
        <ProfileItem title="Business Health" value="82/100" />
        <ProfileItem title="Funding Status" value="Funding Ready" />
        <ProfileItem title="Employee Access" value="3 Active Users" />
      </div>

      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Business Setup Checklist</h3>
          <p className="text-sm text-emerald-600 font-medium">Ready</p>
        </div>

        <div className="space-y-3">
          {setupChecklist.map((item) => (
            <div
              key={item.title}
              className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {item.icon}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-slate-500">{item.status}</p>
              </div>

              <div className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                ✓
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 bg-blue-50 border border-blue-100 p-4 rounded-2xl">
        <p className="font-bold text-blue-900">Security Status</p>
        <p className="text-sm text-slate-700 mt-1">
          Biometric verification and dual authorization are active for outgoing transactions.
        </p>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Employee Access</h3>
          <p className="text-sm text-emerald-600 font-medium">Role-based</p>
        </div>

        <div className="space-y-3">
          {employeeAccess.map((employee) => (
            <div
              key={employee.name}
              className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {employee.icon}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-sm">{employee.name}</p>
                <p className="text-xs text-slate-500">{employee.role}</p>
              </div>

              <p className="text-xs text-slate-500 text-right max-w-[100px]">
                {employee.access}
              </p>
            </div>
          ))}
        </div>
</div>

<div className="mt-5 bg-red-50 border border-red-100 p-4 rounded-2xl">
  <p className="font-bold text-red-700">Owner Approval Required</p>
  <p className="text-sm text-slate-700 mt-1">
    High-value outgoing transactions must be approved by the owner before processing.
  </p>
</div>
<div className="mt-5">
  <div className="flex justify-between items-center mb-3">
    <h3 className="font-bold">Compliance & Trust</h3>
    <p className="text-sm text-emerald-600 font-medium">Protected</p>
  </div>

  <div className="space-y-3">
    {complianceItems.map((item) => (
      <div
        key={item.title}
        className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3"
      >
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          {item.icon}
        </div>

        <div>
          <p className="font-semibold text-sm">{item.title}</p>
          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}

function TransactionList({ limit }) {
  const shownTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="space-y-3">
      {shownTransactions.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white border border-slate-100 p-3 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.type === "income" ? "bg-emerald-50" : "bg-red-50"
              }`}
            >
              {item.type === "income" ? "💰" : "🛒"}
            </div>

            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-slate-500">
                {item.category} • {item.date}
              </p>

              <p className="text-[11px] text-blue-900 font-medium mt-1">
                Source: {item.source}
              </p>
            </div>
          </div>

          <p
            className={`font-semibold ${
              item.type === "income" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {item.type === "income" ? "+" : "-"}
            {formatIDR(item.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProfileItem({ title, value }) {
  return (
    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function AddTransactionModal({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="w-full max-w-sm bg-white rounded-t-3xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Add Transaction</h2>
            <p className="text-sm text-slate-500">
              Record MSME income, expenses, or receipt-based transactions.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="w-9 h-9 bg-slate-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">
              Transaction Name
            </label>
            <input
              type="text"
              placeholder="Example: QRIS Sales, Supplier Payment"
              className="w-full mt-2 p-3 rounded-2xl bg-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Amount
            </label>
            <input
              type="number"
              placeholder="Example: 50000"
              className="w-full mt-2 p-3 rounded-2xl bg-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Category
            </label>
            <select className="w-full mt-2 p-3 rounded-2xl bg-slate-100 outline-none">
              <option>Business Income</option>
              <option>Inventory Cost</option>
              <option>Operational Expense</option>
              <option>Supplier Payment</option>
              <option>Utilities</option>
              <option>Salary Expense</option>
              <option>Loan Payment</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-emerald-50 text-emerald-700 py-3 rounded-2xl font-semibold">
              Income
            </button>

            <button className="bg-red-50 text-red-600 py-3 rounded-2xl font-semibold">
              Expense
            </button>
          </div>

          <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-2xl font-semibold">
            📷 Scan Receipt with OCR
          </button>

          <button
            onClick={closeModal}
            className="w-full bg-blue-900 text-white py-3 rounded-2xl font-semibold"
          >
            Save Business Record
          </button>
        </div>
      </div>
    </div>
  );
}

function AiConsultationModal({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="w-full max-w-sm bg-white rounded-t-3xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">AI Finance Assistant</h2>
            <p className="text-sm text-slate-500">
              Ask about cash flow, transaction safety, or funding readiness.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="w-9 h-9 bg-slate-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="bg-slate-100 p-3 rounded-2xl">
            <p className="text-xs text-slate-500">Business Owner</p>
            <p className="text-sm font-medium mt-1">
              Is my business ready to apply for financing?
            </p>
          </div>

          <div className="bg-blue-900 text-white p-3 rounded-2xl">
            <p className="text-xs opacity-70">DanaCuan AI</p>
            <p className="text-sm mt-1">
              Your business score is 82/100. Cash flow is stable, but inventory and salary expenses should be monitored before applying for financing.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl">
            <p className="text-xs text-slate-500">Recommended Action</p>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              Keep QRIS records consistent, separate personal and business money, and review supplier payments weekly.
            </p>
          </div>

          <input
            type="text"
            placeholder="Ask DanaCuan AI..."
            className="w-full p-3 rounded-2xl bg-slate-100 outline-none"
          />

          <button
            onClick={closeModal}
            className="w-full bg-blue-900 text-white py-3 rounded-2xl font-semibold"
          >
            Send Question
          </button>
        </div>
      </div>
    </div>
  );
}

function OwnerApprovalModal({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="w-full max-w-sm bg-white rounded-t-3xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Owner Approval</h2>
            <p className="text-sm text-slate-500">
              Review suspicious outgoing transaction before approval.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="w-9 h-9 bg-slate-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 bg-red-50 border border-red-100 p-4 rounded-2xl">
          <p className="text-xs text-slate-500">Flagged Transaction</p>
          <h3 className="font-bold text-red-700 mt-1">Supplier Payment</h3>
          <p className="text-sm text-slate-700 mt-1">
            Rp 600.000 to unfamiliar supplier account.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-xs text-slate-500">Risk Reason</p>
            <p className="text-sm font-semibold mt-1">
              New account destination and unusual payment timing detected.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
            <p className="text-xs text-slate-500">Security Check</p>
            <p className="text-sm font-semibold text-blue-900 mt-1">
              Biometric verification and owner confirmation required.
            </p>
          </div>

          <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-semibold">
            Approve with Biometrics
          </button>

          <button
            onClick={closeModal}
            className="w-full bg-red-50 text-red-600 py-3 rounded-2xl font-semibold"
          >
            Reject Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "transactions", label: "Trans", icon: "📄" },
    { id: "budget", label: "Cashflow", icon: "📊" },
    { id: "goals", label: "Funding", icon: "🏦" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-slate-200 px-3 py-2">
      <div className="flex justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center text-xs px-2 py-1 rounded-xl ${
              activeTab === tab.id
                ? "text-emerald-600 font-bold"
                : "text-slate-400"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}