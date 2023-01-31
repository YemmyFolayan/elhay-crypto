import React from 'react';
import Chart from 'react-apexcharts';

export const Graph = props => {
  const series = [
    {
      name: 'Guests',
      data: [19, 22, 20, 26, 23, 15],
    },
  ];
  const options = {
    colors: ['#3FBFA0'],
    chart: {
      toolbar: {
        show: false,
      },
      // height: "100%",
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: props.tooltip ? false : true,
    },
    stroke: {
      show: true,
      curve: 'straight',
      lineCap: 'square',
      colors: ['#3FBFA0'],
      width: 2,
      dashArray: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.7,
        stops: [0, 90, 100],
        colors: ['#3FBFA0'],
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },

      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ['sdfsdf', 'sfdfds', 'sdfsdf', 'sdfsf', 'sdfsdf', 'asdfsdf'],
    },
    grid: {
      show: false,
      borderColor: '#000000',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };
  return (
    <Chart
      type="area"
      series={series}
      options={options}
      width="100%"
      height="100%"
    />
  );
};
