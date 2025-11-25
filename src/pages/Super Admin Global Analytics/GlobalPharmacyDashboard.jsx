import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';
import styles from './PharmacyDashboard.module.css';
import { useAuth } from '../../hooks/useAuth';
import getAnalyticsOfSuperAdmin from '../../shared/api/getanaylticsofsuperadmin';

const PharmacyDashboard = () => {
  const { token } = useAuth();
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [analyticsData, setAnalyticsData] = useState(null);
  const [pharmacyDetails, setPharmacyDetails] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [pharmaciesData, setPharmaciesData] = useState([]);

  // ألوان متناسقة مع اللون الرئيسي #008994
  const COLORS = ['#008994', '#00BCD4', '#4DD0E1', '#B2EBF2'];

  // جلب البيانات من API
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getAnalyticsOfSuperAdmin(token);
        setAnalyticsData(data);

        if (data) {
          // تعيين بيانات النمو
          setUserGrowthData(data.userGrowth || []);

          // تعيين بيانات توزيع الإيرادات وتحويل value من string لـ number
          const revenueDistribution = (data.revenueDistribution || []).map(item => ({
            name: item.name,
            value: parseFloat(item.value)
          }));
          setRevenueData(revenueDistribution);

          // تعيين بيانات أفضل الصيدليات
          const topPharmacies = (data.topPharmacies || []).map(p => ({
            name: p.name,
            sales: p.sales
          }));
          setPharmaciesData(topPharmacies);

          // تعيين تفاصيل الصيدليات
          const pharmacies = (data.topPharmacies || []).map(p => ({
            id: p.id,
            name: p.name,
            location: p.location || 'غير محدد',
            status: p.status.charAt(0).toUpperCase() + p.status.slice(1),
            sales: p.sales,
            served: p.served,
            stockValue: p.stockValue,
            totalOrders: p.totalOrders
          }));
          setPharmacyDetails(pharmacies);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAnalytics();
    }
  }, [token]);

  // إحصائيات محسوبة
  const totalUsers = analyticsData?.platformSummary?.totalUsers || 0;
  const totalRevenue = analyticsData?.platformSummary?.totalRevenue || 0;
  const activePharmacies = analyticsData?.platformSummary?.activePharmacies || 0;
  const totalServed = analyticsData?.platformSummary?.totalServed || 0;
  // around to 3 decimal places
  
  // const avgOrderValue = analyticsData?.platformSummary?.avgOrderValue || 0;
  const avgOrderValue = analyticsData?.platformSummary?.avgOrderValue ? analyticsData.platformSummary.avgOrderValue.toFixed(3) : 0;
  
  const userGrowthPercentage = userGrowthData.length > 1 
    ? Math.round(((userGrowthData[userGrowthData.length - 1].users - userGrowthData[userGrowthData.length - 2].users) / userGrowthData[userGrowthData.length - 2].users) * 100)
    : 0;

  // دالة التصدير
  const handleExport = () => {
    const csvContent = [
      ['Name', 'Location', 'Status', 'Total Sales', 'Users Served'],
      ...pharmacyDetails.map(p => [
        p.name,
        p.location,
        p.status,
        `$${p.sales}`,
        p.served
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pharmacy-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // دالة إنشاء التقرير
  const handleGenerateReport = () => {
    const reportContent = `
===========================================
    GLOBAL ANALYTICS OVERVIEW REPORT
===========================================
Generated: ${new Date().toLocaleString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

-------------------------------------------
PLATFORM PERFORMANCE SUMMARY
-------------------------------------------
Total Users:              ${totalUsers.toLocaleString()}
Total Revenue:            $${totalRevenue.toLocaleString()}
Active Pharmacies:        ${activePharmacies}
Avg. Order Value:         $${avgOrderValue}
Total Users Served:       ${totalServed.toLocaleString()}

-------------------------------------------
PHARMACY BREAKDOWN BY STATUS
-------------------------------------------
Active:                   ${pharmacyDetails.filter(p => p.status.toLowerCase() === 'active').length}
Inactive:                 ${pharmacyDetails.filter(p => p.status.toLowerCase() === 'inactive').length}

-------------------------------------------
TOP 5 PHARMACIES BY SALES
-------------------------------------------
${pharmacyDetails
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5)
  .map((p, i) => `${i + 1}. ${p.name.padEnd(30)} $${p.sales.toLocaleString()}`)
  .join('\n')}

-------------------------------------------
DETAILED PHARMACY DATA
-------------------------------------------
${pharmacyDetails.map(p => `
Pharmacy: ${p.name}
Location: ${p.location}
Status:   ${p.status}
Sales:    $${p.sales.toLocaleString()}
Served:   ${p.served.toLocaleString()} users
Avg/User: $${Math.round(p.sales / p.served)}
-------------------------------------------`).join('\n')}

-------------------------------------------
REVENUE DISTRIBUTION
-------------------------------------------
Prescription:              45%  ($${Math.round(totalRevenue * 0.45).toLocaleString()})
OTC Products:              25%  ($${Math.round(totalRevenue * 0.25).toLocaleString()})
Wellness & Supplements:    20%  ($${Math.round(totalRevenue * 0.20).toLocaleString()})
Devices:                   10%  ($${Math.round(totalRevenue * 0.10).toLocaleString()})

-------------------------------------------
USER GROWTH TREND (Last 12 Months)
-------------------------------------------
${userGrowthData.map(d => `${d.month}:  ${d.users.toLocaleString()} users`).join('\n')}

===========================================
         END OF REPORT
===========================================
    `;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert('✅ Report generated successfully!\n\nThe report has been downloaded to your device.');
  };

  // دالة البحث والفلترة
  const getFilteredPharmacies = () => {
    let filtered = [...pharmacyDetails];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return '#10B981';
      case 'inactive': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p style={{margin: 0, fontWeight: '600', color: '#1F2937'}}>{payload[0].payload.month}</p>
          <p style={{margin: 0, color: '#3B82F6'}}>Users: {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const filteredPharmacies = getFilteredPharmacies();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Global Analytics Overview</h1>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn} onClick={handleExport}>
            📊 Export Data
          </button>
          <button className={styles.generateBtn} onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>
      </div>

      {/* Platform Performance */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Platform Performance</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Users</div>
            <div className={styles.statSubLabel}>Total registered users</div>
            <div className={styles.statValue}>{totalUsers.toLocaleString()}</div>
            <div className={styles.statChangeGreen}>+{userGrowthPercentage}% this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Revenue</div>
            <div className={styles.statSubLabel}>Total revenue generated</div>
            <div className={styles.statValue}>${(totalRevenue / 1000).toFixed(2)}K</div>
            <div className={styles.statChangeGreen}>+30% this month</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Active Pharmacies</div>
            <div className={styles.statSubLabel}>Number of currently active</div>
            <div className={styles.statValue}>{activePharmacies}</div>
            <div className={styles.statChangeGreen}>+8% this quarter</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Avg. Order Value</div>
            <div className={styles.statSubLabel}>Average value of orders</div>
            <div className={styles.statValue}>${avgOrderValue}</div>
            <div className={styles.statChangeRed}>-5% this month</div>
          </div>
        </div>
      </div>

      {/* Key Trends */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Trends</h2>
        <div className={styles.chartsGrid}>
          <div className={styles.chartCardWithBorder}>
            <h3 className={styles.chartTitle}>User Growth</h3>
            <p className={styles.chartSubtitle}>Monthly new registrations over the past year.</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{fontSize: '11px'}} />
                <YAxis stroke="#9CA3AF" style={{fontSize: '11px'}} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  dot={{r: 0}}
                  activeDot={{r: 5, fill: '#3B82F6'}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Revenue Distribution</h3>
            <p className={styles.chartSubtitle}>Breakdown of revenue across different product categories.</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  labelFormatter={(name) => name}
                />
                <Legend 
                  iconType="circle"
                  wrapperStyle={{fontSize: '11px', paddingTop: '15px'}}
                  iconSize={8}
                  dataKey="name"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pharmacy Performance Benchmarks */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Pharmacy Performance Benchmarks</h2>
        <div className={styles.benchmarkCard}>
          <h3 className={styles.chartTitle}>Top Pharmacies by Sales</h3>
          <p className={styles.chartSubtitle}>Best-performing of the top 5 pharmacies.</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={pharmaciesData} layout="vertical" margin={{left: 20, right: 30}}>
              <XAxis type="number" stroke="#9CA3AF" style={{fontSize: '11px'}} />
              <YAxis dataKey="name" type="category" width={100} stroke="#9CA3AF" style={{fontSize: '11px'}} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="sales" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Pharmacy Data */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Detailed Top Pharmacies Data</h2>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.chartTitle}>Top Pharmacy Details</h3>
            <p className={styles.chartSubtitle}>Comprehensive information on all platform pharmacies.</p>
          </div>
          
          {/* Filters and Search */}
          <div className={styles.filterContainer}>
            <input 
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.th} onClick={() => handleSort('name')}>
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className={styles.th} onClick={() => handleSort('location')}>
                    Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className={styles.th} onClick={() => handleSort('status')}>
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className={styles.th} onClick={() => handleSort('sales')}>
                    Total Sales {sortConfig.key === 'sales' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className={styles.th} onClick={() => handleSort('served')}>
                    Users Served {sortConfig.key === 'served' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPharmacies.length > 0 ? (
                  filteredPharmacies.map((pharmacy) => (
                    <tr key={pharmacy.id} className={styles.tableRow}>
                      <td className={styles.td}>{pharmacy.name}</td>
                      <td className={styles.td}>{pharmacy.location}</td>
                      <td className={styles.td}>
                        <span 
                          className={styles.statusBadge}
                          style={{ backgroundColor: getStatusColor(pharmacy.status) }}
                        >
                          {pharmacy.status}
                        </span>
                      </td>
                      <td className={styles.td}>${pharmacy.sales.toLocaleString()}</td>
                      <td className={styles.td}>{pharmacy.served.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.td} style={{textAlign: 'center', padding: '30px', color: '#9CA3AF'}}>
                      No pharmacies found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;