"use client";
import { Dashboard } from "@/store/dashboardSlice";
import { convertAllChartsToImages } from "@/utils/chartToImage";
import { generateDashboardReport } from "@/utils/reportGenerator";
import { useState } from "react";
import { Modal } from "./Modal";
import { ReportSettingsForm } from "./ReportSettingsForm";

interface GenerateReportButtonProps {
  dashboard: Dashboard;
}

export const GenerateReportButton = ({
  dashboard,
}: GenerateReportButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError(null);
    setIsSettingsModalOpen(false); // закрываем модальное окно

    try {
      // Шаг 1: Конвертируем графики в изображения
      setProgress("Preparing charts...");
      console.log("🔄 Start converting charts");

      const chartImages = await convertAllChartsToImages(dashboard.charts);

      if (chartImages.length === 0) {
        throw new Error(
          "Failed to convert any charts. Make sure charts are displayed on the page."
        );
      }

      console.log(`✅ Converted ${chartImages.length} charts`);

      // Шаг 2: Генерируем Word документ
      setProgress("Creating document...");
      console.log("🔄 Создаем Word документ");

      await generateDashboardReport(dashboard, chartImages, {
        title: `Report for dashboard "${dashboard.name}"`,
        author: "System analyst",
        companyName: 'Hotel for animals "Paws"',
        period: `Report period: ${new Date().getFullYear()}`,
      });

      console.log("✅ Report successfully created and downloaded!");
      setProgress("Done!");

      // Сбрасываем состояние через 2 секунды
      setTimeout(() => {
        setIsGenerating(false);
        setProgress("");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Error creating report:", error);
      setError(error.message || "An error occurred while creating the report");
      setIsGenerating(false);
      setProgress("");
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Кнопка открытия настроек отчета */}
      <button
        onClick={handleOpenSettings}
        disabled={isGenerating || dashboard.charts.length === 0}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200
          ${
            isGenerating
              ? "bg-blue-400 cursor-not-allowed"
              : dashboard.charts.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 hover:shadow-md"
          }
          text-white text-sm
        `}
        title={
          dashboard.charts.length === 0
            ? "Add charts to create a report"
            : "Configure and create report"
        }
      >
        {isGenerating ? (
          <>
            {/* Спиннер */}
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs">Creating...</span>
          </>
        ) : (
          <>
            {/* Иконка документа */}
            <span className="text-base">📄</span>
            <span>Create report</span>
          </>
        )}
      </button>

      {/* Прогресс */}
      {progress && (
        <div className="text-xs text-blue-600 font-medium animate-pulse">
          {progress}
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 max-w-xs text-center">
          {error}
        </div>
      )}

      {/* Информация о графиках */}
      {!isGenerating && (
        <div className="text-xs text-gray-500">
          {dashboard.charts.length === 0
            ? "No charts for report"
            : `Charts: ${dashboard.charts.length}`}
        </div>
      )}

      {/* Модальное окно настроек отчета */}
      <Modal isOpen={isSettingsModalOpen} onClose={handleCloseSettings}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Report Settings
          </h2>
          <ReportSettingsForm
            dashboard={dashboard}
            onSubmit={handleGenerateReport}
            onCancel={handleCloseSettings}
          />
        </div>
      </Modal>
    </div>
  );
};
