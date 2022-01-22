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
  },
  rainfall: {
    max: '#FF871F',
    min: '#00C5CC',
  },
  ph: {
    max: '#1FA5FF',
    min: '#FF5C5C',
  },
};

export const getColorByMetric = (type: string) => {
  if (type === 'temperature') return CHART_COLORS.temperature;
  if (type === 'rainfall') return CHART_COLORS.rainfall;
  return CHART_COLORS.ph;
};

/* const  data={{
  labels: ['Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'mars',
      data: [5, 6, 7],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',

      borderColor: ['rgba(255, 99, 132, 1)'],
    },
    {
      label: 'sun',
      data: [3, 2, 1],

      backgroundColor: ['rgba(255, 159, 64, 1)'],
      borderColor: ['rgba(255, 159, 64, 1)'],
    },
  ],

  temperature:{
    max: '#FFD15C',
    min: '#BFB7E1'
  }
}}
 */
