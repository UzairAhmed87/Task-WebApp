import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ChartPage() {
  const { items, meta } = useSelector((state) => state.data);
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 400 });

  const handleOpenTable = () => {
    window.open('/table', '_blank');
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const { offsetWidth } = chartContainerRef.current;
        const width = Math.min(offsetWidth, 800);
        const height = Math.max(300, width * 0.6);
        setChartDimensions({ width, height });
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Chart Page</h1>
      <div
        ref={chartContainerRef}
        className="bg-white flex justify-center p-4 sm:p-6 rounded-lg shadow-md w-full max-w-full overflow-x-auto"
      >
        <LineChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={items}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          {meta.map(({ field, axis, color, chartType }) => (
            <>
              {chartType === 'line' && (
                <YAxis yAxisId={`axis-${axis}`} orientation="left" stroke={color} />
              )}
              {chartType === 'bar' && (
                <YAxis yAxisId={`axis-${axis}`} orientation="right" stroke={color} />
              )}
            </>
          ))}
          <Tooltip />
          <Legend />
          {meta.map(({ field, axis, color, chartType }) => (
            chartType === 'line' ? (
              <Line
                key={field}
                yAxisId={`axis-${axis}`}
                type="monotone"
                dataKey={field}
                stroke={color}
              />
            ) : (
              <Bar
                key={field}
                yAxisId={`axis-${axis}`}
                dataKey={field}
                fill={color}
              />
            )
          ))}
        </LineChart>
      </div>
      <button
        onClick={handleOpenTable}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
      >
        See Table
      </button>
    </div>
  );
}

export default ChartPage;