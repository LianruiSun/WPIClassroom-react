import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography, Grid, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import crosshairPlugin from 'chartjs-plugin-crosshair';
import WaterDropIcon from '@mui/icons-material/WaterDrop'; // Humidity
import ThermostatIcon from '@mui/icons-material/Thermostat'; // Temperature
import AirIcon from '@mui/icons-material/Air'; // CO2
import VisibilityIcon from '@mui/icons-material/Visibility'; // Light
import NoiseAwareIcon from '@mui/icons-material/NoiseAware'; // Noise
import GrainIcon from '@mui/icons-material/Grain'; // PM2.5
import SpeedIcon from '@mui/icons-material/Speed'; // Score
import SmokeFreeIcon from '@mui/icons-material/SmokeFree'; // VOC
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  crosshairPlugin // Register the crosshair plugin
);
const units = {
  score: '%',
  temp: '°F',
  humid: '%',
  co2: 'ppm',
  voc: 'ppb',
  pm25: 'µg/m³',
  noise: 'dB',
  light: 'lux',
};
const iconColors = {
  score: '#4CAF50',
  temp: '#FF5722',
  humid: '#03A9F4',
  co2: '#8BC34A',
  voc: '#9C27B0',
  pm25: '#FFC107',
  noise: '#FF9800',
  light: '#00BCD4',
};
const icons = {
  score: <SpeedIcon style={{ color: iconColors.score }} />,
  temp: <ThermostatIcon style={{ color: iconColors.temp }} />,
  humid: <WaterDropIcon style={{ color: iconColors.humid }} />,
  co2: <AirIcon style={{ color: iconColors.co2 }} />,
  voc: <SmokeFreeIcon style={{ color: iconColors.voc }} />,
  pm25: <GrainIcon style={{ color: iconColors.pm25 }} />,
  noise: <NoiseAwareIcon style={{ color: iconColors.noise }} />,
  light: <VisibilityIcon style={{ color: iconColors.light }} />,
};
const DataVis = ({ chartData }) => {
  // Assuming chartData is already in the correct format
  const labels = chartData.map(row => new Date(row.timestamp));
  const orderedKeys = ["score", "temp", "humid", "co2", "voc", "pm25", "noise", "light"];
  const dataForCharts = orderedKeys.map(key => ({
    label: key,
    icon: icons[key],
    data: {
      labels,
      datasets: [
        {
          label: key,
          data: chartData.map(row => row[key]),
          fill: false,
          borderColor: iconColors[key], // Set line color to match icon color
          tension: 0.1,
        },
      ],
    },
  }));
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Time Series Data Visualization
      </Typography>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {dataForCharts.map((chart, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#ffffff', // White background
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0', // Grey border
              }}
            >
              <Box display="flex" alignItems="center">
                {chart.icon && <Box mr={1}>{chart.icon}</Box>}
                <Typography variant="h6" gutterBottom>
                  {chart.label.charAt(0).toUpperCase() + chart.label.slice(1)}{' '}
                  <Typography component="span" variant="body2" sx={{ color: 'gray', fontSize: '0.75em' }}>
                    ({units[chart.label]})
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ height: 300 }}>
                <Line
                  data={chart.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        type: 'time',
                        time: {
                          unit: 'hour', // Show only the hour period
                          tooltipFormat: 'HH:mm',
                          displayFormats: {
                            hour: 'HH:mm',
                          },
                        },
                        title: {
                          display: true,
                          text: 'Timestamp',
                        },
                        grid: {
                          color: '#e0e0e0',
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: `${units[chart.label]}`, // Display unit in Y-axis title
                        },
                        ticks: {
                          callback: function (value) {
                            return `${value}`; // Show unit next to the Y-axis values
                          },
                        },
                        grid: {
                          color: '#e0e0e0',
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false, // Disable the legend to remove the checkbox
                      },
                      tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                          label: function (tooltipItem) {
                            return `${tooltipItem.raw} ${units[chart.label]}`;
                          },
                        },
                      },
                      crosshair: {
                        line: {
                          color: '#000000', // Black color for crosshair line
                          width: 1,
                          dashPattern: [5, 5], // Dotted line
                        },
                        sync: {
                          enabled: false // If you want all charts to sync with the crosshair, enable this
                        }
                      },
                    },
                    interaction: {
                      mode: 'nearest',
                      axis: 'x',
                      intersect: false,
                    },
                    hover: {
                      mode: 'nearest',
                      axis: 'x',
                      intersect: false,
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default DataVis;