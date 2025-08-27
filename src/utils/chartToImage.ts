import { Chart } from "@/store/dashboardSlice";
import html2canvas from "html2canvas";

export interface ChartImage {
  id: string;
  title: string;
  data: string;
  width: number;
  height: number;
}

export const convertChartToImage = async (
  chartId: string
): Promise<string | null> => {
  try {
    const chartElement = document.querySelector(
      `[data-chart-id="${chartId}"]`
    ) as HTMLElement; //added as HTMLElement
    if (!chartElement) {
      console.warn(`Chart with id ${chartId} not found`);
      return null;
    }

    const canvas = await html2canvas(chartElement, {
      backgroundColor: "#ffffff", // белый фон
      scale: 2, // увеличиваем качество
      useCORS: true, // для внешних ресурсов
      allowTaint: true, // разрешаем "загрязненные" canvas
      removeContainer: false, // не удаляем контейнер
      imageTimeout: 0, // без таймаута
      logging: false,
    });
    const imageData = canvas.toDataURL("image/png", 0.9);
    return imageData;
  } catch (error) {
    console.error("Error converting chart to image:", error);
    return null;
  }
};

// Функция для конвертации всех графиков дашборда
export const convertAllChartsToImages = async (
  charts: Chart[]
): Promise<ChartImage[]> => {
  const chartImages: ChartImage[] = [];

  console.log("Начинаем конвертацию графиков:", charts.length);

  for (const chart of charts) {
    console.log(`Конвертируем график: ${chart.id}`);

    const imageData = await convertChartToImage(chart.id);

    if (imageData) {
      chartImages.push({
        id: chart.id,
        title: chart.title,
        data: imageData,
        width: 700,
        height: 350,
      });

      console.log(`✅ График ${chart.id} успешно конвертирован`);
    } else {
      console.log(`❌ Не удалось конвертировать график ${chart.id}`);
    }
  }

  console.log(
    `Конвертация завершена. Успешно: ${chartImages.length}/${charts.length}`
  );
  return chartImages;
};

// Вспомогательная функция для добавления задержки (если нужно)
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
