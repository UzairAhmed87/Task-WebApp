import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ChartPage() {
  const { items, meta } = useSelector((state) => state.data);
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 600,
    height: 400,
  });

  const handleOpenTable = () => {
    window.open("/table", "_blank");
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

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl text-center sm:text-2xl font-bold mb-4">
        Chart Page
      </h1>
      <div
        ref={chartContainerRef}
        className="bg-white flex flex-col items-center mx-auto p-4 sm:p-6 rounded-lg shadow-md w-full max-w-full overflow-x-auto"
      >
        <LineChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={items}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval={0}
            angle={chartDimensions.width < 600 ? -45 : 0}
            padding={
              chartDimensions.width < 500
                ? { left: 20, right: 20 }
                : { left: 40, right: 40 }
            }
            tick={{ fontSize: chartDimensions.width < 600 ? 10 : 12 }}
            dy={15}
          />
          {meta.map(({ field, axis, color }) => (
  <YAxis
    key={field}
    yAxisId={`axis-${axis}`}
    orientation={axis === 3 ? "right" : "left"}
    stroke={color}
  />
))}
          {[...meta]
            .sort((a) => (a.chartType === "bar" ? -1 : 1))
            .map(({ field, axis, color, chartType }) =>
              chartType === "line" ? (
                <Line
                  key={field}
                  yAxisId={`axis-${axis}`}
                  type="natural"
                  dataKey={field}
                  stroke={color}
                />
              ) : (
                <Bar
                  key={field}
                  yAxisId={`axis-${axis}`}
                  dataKey={field}
                  fill={color}
                  barSize={50}
                />
              )
            )}
            <Tooltip />
          <Legend height={15} />
        </LineChart>
        
        <button
          onClick={handleOpenTable}
          className=" bg-blue-500 flex justify-center text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          See Table
        </button>
      </div>
    </div>
  );
}

export default ChartPage;
