import { Dashboard } from "@/store/dashboardSlice";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import saveAs from "file-saver";
import { ChartImage } from "./chartToImage";

interface ReportConfig {
  title: string;
  author: string;
  companyName: string;
  period: string;
}

export const generateDashboardReport = async (
  dashboard: Dashboard,
  chartImages: ChartImage[],
  config?: Partial<ReportConfig>
): Promise<void> => {
  // Настройки по умолчанию
  const reportConfig: ReportConfig = {
    title: dashboard.name || "Отчет по дашборду",
    author: "Пользователь системы",
    companyName: 'Отель для животных "Лапки"',
    period: "Годовой отчет 2024",
    ...config, // перезаписываем переданными настройками
  };
  console.log("Starting generating report...");
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Титульная страница
            ...createTitlePage(reportConfig),

            // Разрыв страницы
            createPageBreak(),

            // Разделы для каждого графика
            ...createChartSections(dashboard, chartImages),
          ],
        },
      ],
    });
    console.log("Converting document to file...");
    const blob = await Packer.toBlob(doc);
    // Генерируем имя файла
    const fileName = `${reportConfig.title.replace(
      /[^a-zA-Zа-яА-Я0-9]/g,
      "_"
    )}_${new Date().toISOString().split("T")[0]}.docx`;

    // Скачиваем файл
    console.log("Скачиваем файл:", fileName);
    saveAs(blob, fileName);

    console.log("✅ Отчет успешно создан и скачан!");
  } catch (error) {
    console.error("❌ Ошибка при создании отчета:", error);
    throw error;
  }
};

// Создание титульной страницы
const createTitlePage = (config: ReportConfig): Paragraph[] => {
  return [
    // Заголовок отчета
    new Paragraph({
      children: [
        new TextRun({
          text: config.title,
          bold: true,
          size: 32, // 16pt
          color: "2E74B5",
        }),
      ],
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),

    // Подзаголовок
    new Paragraph({
      children: [
        new TextRun({
          text: config.period,
          size: 24, // 12pt
          color: "5B9BD5",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),

    // Информация о компании
    new Paragraph({
      children: [
        new TextRun({
          text: config.companyName,
          bold: true,
          size: 20, // 10pt
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),

    // Автор отчета
    new Paragraph({
      children: [
        new TextRun({
          text: `Составил: ${config.author}`,
          size: 18, // 9pt
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),

    // Дата создания
    new Paragraph({
      children: [
        new TextRun({
          text: `Дата создания: ${new Date().toLocaleDateString("ru-RU")}`,
          size: 18, // 9pt
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
    }),

    // Краткое описание
    new Paragraph({
      children: [
        new TextRun({
          text: "Данный отчет содержит аналитическую информацию и визуализации ключевых показателей деятельности. Разделы для описаний и рекомендаций предназначены для заполнения аналитиком.",
          size: 20, // 10pt
        }),
      ],
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 400 },
    }),
  ];
};

// Создание разделов для графиков
const createChartSections = (
  dashboard: Dashboard,
  chartImages: ChartImage[]
): Paragraph[] => {
  const sections: Paragraph[] = [];

  // Добавляем заголовок раздела
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "АНАЛИТИЧЕСКИЕ ГРАФИКИ",
          bold: true,
          size: 28, // 14pt
          color: "2E74B5",
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 600 },
    })
  );

  // Для каждого графика создаем раздел
  chartImages.forEach((chartImage, index) => {
    const chart = dashboard.charts.find((c) => c.id === chartImage.id);

    if (chart) {
      sections.push(
        ...createSingleChartSection(chart.title, chartImage, index + 1)
      );
    }
  });

  return sections;
};

// Создание раздела для одного графика
const createSingleChartSection = (
  title: string,
  chartImage: ChartImage,
  sectionNumber: number
): Paragraph[] => {
  return [
    // Номер и заголовок графика
    new Paragraph({
      children: [
        new TextRun({
          text: `${sectionNumber}. ${title}`,
          bold: true,
          size: 24, // 12pt
          color: "2E74B5",
        }),
      ],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 600, after: 300 },
    }),

    // Изображение графика
    new Paragraph({
      children: [
        new ImageRun({
          data: chartImage.data,
          transformation: {
            width: 500,
            height: 300,
          },
          type: "png",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),

    // Подпись к графику
    new Paragraph({
      children: [
        new TextRun({
          text: `Рисунок ${sectionNumber}. ${title}`,
          size: 16, // 8pt
          italics: true,
          color: "7F7F7F",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),

    // Поле "Описание графика"
    ...createEmptySection(
      "Описание графика:",
      "Здесь следует описать, что показывает данный график, какие данные использованы, за какой период..."
    ),

    // Поле "Основные наблюдения"
    ...createEmptySection(
      "Основные наблюдения:",
      "Перечислите ключевые тенденции, выбросы, закономерности, которые видны на графике..."
    ),

    // Поле "Рекомендации"
    ...createEmptySection(
      "Рекомендации:",
      "На основе данных графика сформулируйте практические рекомендации для бизнеса..."
    ),

    // Разрыв страницы (кроме последнего графика)
    createPageBreak(),
  ];
};

// Создание пустого раздела для заполнения
const createEmptySection = (
  sectionTitle: string,
  placeholder: string
): Paragraph[] => {
  return [
    // Заголовок раздела
    new Paragraph({
      children: [
        new TextRun({
          text: sectionTitle,
          bold: true,
          size: 20, // 10pt
          color: "404040",
        }),
      ],
      spacing: { before: 300, after: 200 },
    }),

    // Поле для заполнения
    new Paragraph({
      children: [
        new TextRun({
          text: placeholder,
          size: 18, // 9pt
          color: "808080",
          italics: true,
        }),
      ],
      spacing: { after: 400 },
    }),

    // Пустые строки для заполнения
    new Paragraph({
      children: [new TextRun({ text: "_".repeat(100), color: "CCCCCC" })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "_".repeat(100), color: "CCCCCC" })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: "_".repeat(100), color: "CCCCCC" })],
      spacing: { after: 400 },
    }),
  ];
};

// Создание разрыва страницы
const createPageBreak = (): Paragraph => {
  return new Paragraph({
    children: [],
    pageBreakBefore: true,
  });
};
