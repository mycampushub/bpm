import { useState, useCallback } from 'react';

export interface ProcessMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  target?: number;
  category: 'performance' | 'quality' | 'cost' | 'time';
  description: string;
  lastUpdated: string;
}

export interface MetricHistory {
  date: string;
  value: number;
}

export const useProcessMetrics = () => {
  const [metrics, setMetrics] = useState<ProcessMetric[]>([
    {
      id: '1',
      name: 'Average Process Time',
      value: 3.5,
      unit: 'days',
      trend: 'down',
      changePercent: -15,
      target: 3.0,
      category: 'time',
      description: 'Average time to complete the entire process',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Process Efficiency',
      value: 87,
      unit: '%',
      trend: 'up',
      changePercent: 8,
      target: 90,
      category: 'performance',
      description: 'Percentage of processes completed without delays',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Error Rate',
      value: 2.3,
      unit: '%',
      trend: 'down',
      changePercent: -12,
      target: 2.0,
      category: 'quality',
      description: 'Percentage of processes with errors or rework',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Cost per Process',
      value: 125.50,
      unit: '$',
      trend: 'stable',
      changePercent: 2,
      target: 120.00,
      category: 'cost',
      description: 'Average cost to execute one process instance',
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [metricsHistory, setMetricsHistory] = useState<Record<string, MetricHistory[]>>({
    '1': [
      { date: '2024-01-01', value: 4.2 },
      { date: '2024-01-08', value: 4.0 },
      { date: '2024-01-15', value: 3.8 },
      { date: '2024-01-22', value: 3.5 }
    ],
    '2': [
      { date: '2024-01-01', value: 82 },
      { date: '2024-01-08', value: 84 },
      { date: '2024-01-15', value: 86 },
      { date: '2024-01-22', value: 87 }
    ],
    '3': [
      { date: '2024-01-01', value: 3.1 },
      { date: '2024-01-08', value: 2.8 },
      { date: '2024-01-15', value: 2.5 },
      { date: '2024-01-22', value: 2.3 }
    ],
    '4': [
      { date: '2024-01-01', value: 128.00 },
      { date: '2024-01-08', value: 126.50 },
      { date: '2024-01-15', value: 125.80 },
      { date: '2024-01-22', value: 125.50 }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateMetric = useCallback(async (id: string, updates: Partial<ProcessMetric>) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMetrics(prev => prev.map(metric =>
      metric.id === id
        ? { ...metric, ...updates, lastUpdated: new Date().toISOString() }
        : metric
    ));
    
    // Update history if value changed
    if (updates.value !== undefined) {
      setMetricsHistory(prev => ({
        ...prev,
        [id]: [
          ...(prev[id] || []),
          {
            date: new Date().toISOString().split('T')[0],
            value: updates.value!
          }
        ].slice(-30) // Keep last 30 data points
      }));
    }
    
    setIsLoading(false);
  }, []);

  const refreshMetrics = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call to refresh metrics
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate slight variations in metrics
    setMetrics(prev => prev.map(metric => {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const newValue = Math.max(0, metric.value * (1 + variation));
      const change = ((newValue - metric.value) / metric.value) * 100;
      
      return {
        ...metric,
        value: Number(newValue.toFixed(2)),
        changePercent: Number(change.toFixed(1)),
        trend: change > 2 ? 'up' : change < -2 ? 'down' : 'stable',
        lastUpdated: new Date().toISOString()
      };
    }));
    
    setIsLoading(false);
  }, []);

  const getMetricHistory = useCallback((metricId: string) => {
    return metricsHistory[metricId] || [];
  }, [metricsHistory]);

  const calculateTrend = useCallback((history: MetricHistory[]) => {
    if (history.length < 2) return 'stable';
    
    const recent = history.slice(-3);
    const isIncreasing = recent.every((point, index) => 
      index === 0 || point.value >= recent[index - 1].value
    );
    const isDecreasing = recent.every((point, index) => 
      index === 0 || point.value <= recent[index - 1].value
    );
    
    if (isIncreasing) return 'up';
    if (isDecreasing) return 'down';
    return 'stable';
  }, []);

  const createCustomMetric = useCallback(async (metricData: Omit<ProcessMetric, 'id' | 'lastUpdated'>) => {
    setIsLoading(true);
    
    const newMetric: ProcessMetric = {
      ...metricData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMetrics(prev => [...prev, newMetric]);
    setMetricsHistory(prev => ({
      ...prev,
      [newMetric.id]: [{ date: new Date().toISOString().split('T')[0], value: newMetric.value }]
    }));
    
    setIsLoading(false);
    return newMetric.id;
  }, []);

  const deleteMetric = useCallback(async (id: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMetrics(prev => prev.filter(metric => metric.id !== id));
    setMetricsHistory(prev => {
      const { [id]: deleted, ...rest } = prev;
      return rest;
    });
    
    setIsLoading(false);
  }, []);

  return {
    metrics,
    metricsHistory,
    isLoading,
    updateMetric,
    refreshMetrics,
    getMetricHistory,
    calculateTrend,
    createCustomMetric,
    deleteMetric
  };
};