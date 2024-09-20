import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Habit } from '../types/Habit';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const generateDateRange = (startDate: Date, endDate: Date) => {
    const dateArray: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().split('T')[0]); // Formatta come "YYYY-MM-DD"
        currentDate.setDate(currentDate.getDate() + 1); // Passa al giorno successivo
    }

    return dateArray;
};

const getCompletionData = (habits: Habit[], startDate: Date, endDate: Date) => {
    const allCompletionData: { [habitId: string]: { [date: string]: number } } = {};
    const dateRange = generateDateRange(startDate, endDate); // Ottieni tutte le date nel range

    habits.forEach(habit => {
        allCompletionData[habit.id] = {}; // Inizializza il dataset per ogni habit

        habit.completionDates.forEach(date => {
            const formattedDate = date.toISOString().split('T')[0];
            allCompletionData[habit.id][formattedDate] = 1; // Presenza di completamento
        });
    });

    // Creare un array di dati per il grafico
    const completionDatasets = habits.map(habit => {
        const dataPoints = dateRange.map(date => allCompletionData[habit.id][date] || 0); // Imposta a 0 se non ci sono completamenti

        return {
            label: habit.title,
            data: dataPoints,
            borderColor: randomColor(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        };
    });

    return {
        datasets: completionDatasets,
        labels: dateRange,
    };
};

const HabitCompletionChart = ({ habits }: { habits: Habit[] }) => {
    const startDate = new Date();
    startDate.setDate(1); // Imposta la data di inizio (ad esempio, l'inizio del mese corrente)
    startDate.setHours(0, 0, 0, 0); // Resetta l'ora per evitare problemi di confronto

    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Imposta la fine del mese
    endDate.setDate(0); // Imposta il giorno all'ultimo del mese

    const { datasets, labels } = getCompletionData(habits, startDate, endDate);

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Andamento Completamento Habits',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default HabitCompletionChart;