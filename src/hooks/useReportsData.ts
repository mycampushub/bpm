import { useDataManager } from './useDataManager';

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'performance' | 'compliance' | 'efficiency' | 'usage' | 'custom';
  category: string;
  data: any;
  charts: ChartConfig[];
  insights: string[];
  recommendations: string[];
  lastGenerated: string;
  scheduleEnabled: boolean;
  scheduleFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ChartConfig {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'area' | 'donut';
  title: string;
  data: any[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
}

const initialReports: Report[] = [
  {
    id: 'report_1',
    name: 'Process Performance Dashboard',
    description: 'Comprehensive analysis of process execution metrics and KPIs',
    type: 'performance',
    category: 'Operations',
    data: {
      totalProcesses: 156,
      activeProcesses: 134,
      averageCompletionTime: '2.5 hours',
      successRate: '94.2%'
    },
    charts: [
      {
        id: 'chart_1',
        type: 'bar',
        title: 'Process Completion Times',
        data: [
          { name: 'Order Processing', value: 45, target: 60 },
          { name: 'Customer Onboarding', value: 120, target: 150 },
          { name: 'Invoice Approval', value: 30, target: 45 }
        ],
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      },
      {
        id: 'chart_2',
        type: 'line',
        title: 'Monthly Process Volume',
        data: [
          { month: 'Jan', processes: 245 },
          { month: 'Feb', processes: 267 },
          { month: 'Mar', processes: 298 },
          { month: 'Apr', processes: 312 }
        ]
      }
    ],
    insights: [
      'Order processing efficiency improved by 15% this quarter',
      'Customer onboarding shows consistent completion times',
      'Invoice approval process has potential for automation'
    ],
    recommendations: [
      'Implement automated validation for order processing',
      'Consider parallel processing for customer onboarding',
      'Deploy RPA for routine invoice approvals'
    ],
    lastGenerated: '2024-01-15T09:30:00Z',
    scheduleEnabled: true,
    scheduleFrequency: 'weekly',
    recipients: ['manager@company.com', 'analyst@company.com'],
    status: 'active',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    createdBy: 'Analytics Team'
  },
  {
    id: 'report_2',
    name: 'Compliance Monitoring Report',
    description: 'Track compliance status across all business processes',
    type: 'compliance',
    category: 'Governance',
    data: {
      complianceScore: '96.8%',
      totalChecks: 847,
      passedChecks: 820,
      failedChecks: 27,
      riskLevel: 'Low'
    },
    charts: [
      {
        id: 'chart_3',
        type: 'pie',
        title: 'Compliance Status Distribution',
        data: [
          { name: 'Compliant', value: 820, color: '#10b981' },
          { name: 'Non-Compliant', value: 27, color: '#ef4444' }
        ]
      }
    ],
    insights: [
      'Overall compliance rate maintains above 95% target',
      'Most violations related to documentation gaps',
      'Financial processes show highest compliance scores'
    ],
    recommendations: [
      'Implement automated documentation checks',
      'Provide additional training on compliance requirements',
      'Review and update compliance policies quarterly'
    ],
    lastGenerated: '2024-01-14T14:20:00Z',
    scheduleEnabled: true,
    scheduleFrequency: 'monthly',
    recipients: ['compliance@company.com', 'legal@company.com'],
    status: 'active',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    createdBy: 'Compliance Team'
  }
];

const validateReport = (item: Partial<Report>): string | null => {
  if (!item.name?.trim()) return 'Report name is required';
  if (!item.type) return 'Report type is required';
  if (!item.category?.trim()) return 'Category is required';
  return null;
};

export const useReportsData = () => {
  const reportManager = useDataManager<Report>({
    storageKey: 'reports',
    initialData: initialReports,
    validator: validateReport
  });

  const generateReport = async (reportId: string) => {
    const report = reportManager.getById(reportId);
    if (!report) return false;

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const now = new Date().toISOString();
    return reportManager.update(reportId, {
      lastGenerated: now,
      data: {
        ...report.data,
        lastUpdate: now,
        generationTime: '2.3 seconds'
      }
    });
  };

  const scheduleReport = (reportId: string, frequency: Report['scheduleFrequency'], recipients: string[]) => {
    return reportManager.update(reportId, {
      scheduleEnabled: true,
      scheduleFrequency: frequency,
      recipients
    });
  };

  const updateReportData = (reportId: string, newData: any) => {
    return reportManager.update(reportId, {
      data: newData,
      lastGenerated: new Date().toISOString()
    });
  };

  const addChart = (reportId: string, chart: Omit<ChartConfig, 'id'>) => {
    const report = reportManager.getById(reportId);
    if (!report) return false;

    const newChart: ChartConfig = {
      ...chart,
      id: `chart_${Date.now()}`
    };

    const updatedCharts = [...report.charts, newChart];
    return reportManager.update(reportId, { charts: updatedCharts });
  };

  const updateChart = (reportId: string, chartId: string, updates: Partial<ChartConfig>) => {
    const report = reportManager.getById(reportId);
    if (!report) return false;

    const updatedCharts = report.charts.map(chart =>
      chart.id === chartId ? { ...chart, ...updates } : chart
    );

    return reportManager.update(reportId, { charts: updatedCharts });
  };

  const deleteChart = (reportId: string, chartId: string) => {
    const report = reportManager.getById(reportId);
    if (!report) return false;

    const updatedCharts = report.charts.filter(chart => chart.id !== chartId);
    return reportManager.update(reportId, { charts: updatedCharts });
  };

  const exportReport = async (reportId: string, format: 'pdf' | 'excel' | 'csv') => {
    const report = reportManager.getById(reportId);
    if (!report) return null;

    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1500));

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `${report.name.replace(/\s+/g, '_')}_${timestamp}.${format}`;

    // Create download
    const exportData = {
      report,
      exportedAt: new Date().toISOString(),
      format
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return filename;
  };

  const shareReport = async (reportId: string, recipients: string[], message?: string) => {
    const report = reportManager.getById(reportId);
    if (!report) return false;

    // Simulate sharing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update recipients
    const allRecipients = [...new Set([...report.recipients, ...recipients])];
    return reportManager.update(reportId, { recipients: allRecipients });
  };

  return {
    ...reportManager,
    generateReport,
    scheduleReport,
    updateReportData,
    addChart,
    updateChart,
    deleteChart,
    exportReport,
    shareReport
  };
};