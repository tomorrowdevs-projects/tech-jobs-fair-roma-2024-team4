import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Habit } from '../types/Habit';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
  habits: Habit[];
}

const Chart = ({ habits }: ChartProps) => {
  // Prepara i dati del grafico usando le habits filtrate
  const labels = habits.map(habit => habit.title); // Usa i nomi delle habits come etichette

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Completamento Habit',
        data: habits.map(habit => habit.completionDates), // Esempio: usa la lunghezza del progresso per ogni habit
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Andamento delle Habit',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Chart;
