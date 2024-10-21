import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Legend,
    Tooltip
);

const MixedChart = () => {
    const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
        datasets: [
            {
                type: 'bar',
                label: 'Bar Dataset 1',
                data: [35, 44, 24, 34],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Bar Dataset 2',
                data: [51, 6, 49, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Bar Dataset 3',
                data: [15, 25, 30, 50],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: 'Bar Dataset 4',
                data: [60, 50, 15, 25],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }, {
                type: 'bar',
                label: 'Bar Dataset 4',
                data: [15, 30, 10, 18],
                backgroundColor: 'rgba(153, 102, 0, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                type: 'line',
                label: 'Line Dataset',
                data: [20, 44, 30, 25, 20, 50],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} height={200} />;
};

export default MixedChart;
