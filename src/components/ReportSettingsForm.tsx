"use client";
import { Dashboard } from "@/store/dashboardSlice";
import { useState } from "react";

interface ReportSettingsFormProps {
  dashboard: Dashboard;
  onSubmit: () => void;
  onCancel: () => void;
}

interface ReportSettings {
  reportTitle: string;
  author: string;
  dataPeriod: {
    start: string;
    end: string;
  };
  format: "word" | "pdf" | "excel";
  template: "standard" | "brief" | "detailed";
  includeAllCharts: boolean;
  selectedCharts: string[];
  imageSize: "small" | "medium" | "large";
}

export const ReportSettingsForm = ({
  dashboard,
  onSubmit,
  onCancel,
}: ReportSettingsFormProps) => {
  const [settings, setSettings] = useState<ReportSettings>({
    reportTitle: `Report for dashboard "${dashboard.name}"`,
    author: "System analyst",
    dataPeriod: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 30 days ago
      end: new Date().toISOString().split("T")[0], // today
    },
    format: "word",
    template: "standard",
    includeAllCharts: true,
    selectedCharts: [],
    imageSize: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report settings:", settings); // для демонстрации
    onSubmit(); // запускаем оригинальную генерацию отчета
  };

  const handleChartSelection = (chartId: string, checked: boolean) => {
    if (checked) {
      setSettings((prev) => ({
        ...prev,
        selectedCharts: [...prev.selectedCharts, chartId],
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        selectedCharts: prev.selectedCharts.filter((id) => id !== chartId),
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-black p-2"
    >
      {/* Report Title */}
      <div className="flex flex-col justify-between">
        <label
          htmlFor="report-title"
          className="text-sm font-medium text-gray-600 mb-1 italic"
        >
          Report title
        </label>
        <input
          type="text"
          id="report-title"
          value={settings.reportTitle}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, reportTitle: e.target.value }))
          }
          className="w-full border rounded-lg px-2 py-1.5"
          placeholder="Enter report title"
        />
      </div>

      {/* Author */}
      <div className="flex flex-col justify-between">
        <label
          htmlFor="author"
          className="text-sm font-medium text-gray-600 mb-1 italic"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          value={settings.author}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, author: e.target.value }))
          }
          className="w-full border rounded-lg px-2 py-1.5"
          placeholder="Enter author name"
        />
      </div>

      {/* Data Period */}
      <div className="flex flex-col justify-between">
        <label className="text-sm font-medium text-gray-600 mb-1 italic">
          Data period
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={settings.dataPeriod.start}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                dataPeriod: { ...prev.dataPeriod, start: e.target.value },
              }))
            }
            className="w-full border rounded-lg px-2 py-1.5"
          />
          <span className="text-gray-500 self-center">to</span>
          <input
            type="date"
            value={settings.dataPeriod.end}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                dataPeriod: { ...prev.dataPeriod, end: e.target.value },
              }))
            }
            className="w-full border rounded-lg px-2 py-1.5"
          />
        </div>
      </div>

      {/* Format */}
      <div className="flex flex-col justify-between">
        <label
          htmlFor="format"
          className="text-sm font-medium text-gray-600 mb-1 italic"
        >
          Report format
        </label>
        <select
          id="format"
          value={settings.format}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              format: e.target.value as "word" | "pdf" | "excel",
            }))
          }
          className="w-full border rounded-lg px-2 py-1.5"
        >
          <option value="word">Word (.docx)</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>
      </div>

      {/* Template */}
      <div className="flex flex-col justify-between">
        <label
          htmlFor="template"
          className="text-sm font-medium text-gray-600 mb-1 italic"
        >
          Report template
        </label>
        <select
          id="template"
          value={settings.template}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              template: e.target.value as "standard" | "brief" | "detailed",
            }))
          }
          className="w-full border rounded-lg px-2 py-1.5"
        >
          <option value="standard">Standard</option>
          <option value="brief">Brief</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>

      {/* Image Size */}
      <div className="flex flex-col justify-between">
        <label
          htmlFor="image-size"
          className="text-sm font-medium text-gray-600 mb-1 italic"
        >
          Chart image size
        </label>
        <select
          id="image-size"
          value={settings.imageSize}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              imageSize: e.target.value as "small" | "medium" | "large",
            }))
          }
          className="w-full border rounded-lg px-2 py-1.5"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Include All Charts */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="include-all-charts"
          checked={settings.includeAllCharts}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              includeAllCharts: e.target.checked,
              selectedCharts: e.target.checked ? [] : prev.selectedCharts,
            }))
          }
          className="w-4 h-4"
        />
        <label
          htmlFor="include-all-charts"
          className="text-sm font-medium text-gray-600"
        >
          Include all charts
        </label>
      </div>

      {/* Chart Selection (if not include all) */}
      {!settings.includeAllCharts && (
        <div className="flex flex-col justify-between">
          <label className="text-sm font-medium text-gray-600 mb-1 italic">
            Select charts to include
          </label>
          <div className="max-h-32 overflow-y-auto border rounded-lg p-2">
            {dashboard.charts.map((chart) => (
              <div key={chart.id} className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id={`chart-${chart.id}`}
                  checked={settings.selectedCharts.includes(chart.id)}
                  onChange={(e) =>
                    handleChartSelection(chart.id, e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <label
                  htmlFor={`chart-${chart.id}`}
                  className="text-sm text-gray-700"
                >
                  {chart.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 font-semibold rounded-lg py-2 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-lime-500 text-white font-semibold rounded-lg py-2 hover:bg-lime-600 transition"
        >
          Create report
        </button>
      </div>
    </form>
  );
};
