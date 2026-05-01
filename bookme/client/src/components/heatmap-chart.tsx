import { useEffect, useRef } from 'react';

interface HeatmapData {
  day: string;
  hour: number;
  value: number;
}

interface HeatmapChartProps {
  data: HeatmapData[];
}

export default function HeatmapChart({ data }: HeatmapChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple heatmap rendering
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8-19h
    const cellWidth = canvas.width / days.length;
    const cellHeight = canvas.height / hours.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.forEach((item) => {
      const dayIndex = days.indexOf(item.day);
      const hourIndex = hours.indexOf(item.hour);
      if (dayIndex === -1 || hourIndex === -1) return;

      const intensity = item.value / 100;
      const r = Math.floor(59 + (59 - 59) * intensity);
      const g = Math.floor(130 + (255 - 130) * intensity);
      const b = Math.floor(246 + (255 - 246) * intensity);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + intensity * 0.7})`;
      ctx.fillRect(dayIndex * cellWidth, hourIndex * cellHeight, cellWidth - 2, cellHeight - 2);
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={400}
      className="w-full max-w-[700px] h-auto rounded-lg border border-border"
    />
  );
}
