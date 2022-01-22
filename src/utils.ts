export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const CHART_COLORS = {
  temperature: {
    max: '#FF871F',
    min: '#00C5CC',
    avg: '#00667e'
  },
  rainfall: {
    max: '#B4A0F8',
    min: '#FF9B70',
    avg: '#E47011'
  },
  ph: {
    max: '#1FA5FF',
    min: '#FF5C5C',
    avg: '#00667e'
  },
};

export const getColorByMetric = (type: string) => {
  if (type === 'temperature') return CHART_COLORS.temperature;
  if (type === 'rainFall') return CHART_COLORS.rainfall;
  return CHART_COLORS.ph;
};
