import { deleteChart } from "@/store/dashboardSlice";
import DeleteIcon from "@public/trash-ICON.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";

const DeleteChartButton = ({
  dashboardId,
  chartId,
}: {
  dashboardId: string;
  chartId: string;
}) => {
  const dispatch = useDispatch();
  const handleDeleteChart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(dashboardId, chartId);
    dispatch(deleteChart({ id: dashboardId, chartId: chartId }));
  };
  return (
    <button
      onMouseDown={handleDeleteChart}
      className="absolute top-0 right-0 w-10 h-10"
    >
      <Image src={DeleteIcon} alt="delete" width={25} height={25} />
    </button>
  );
};

export default DeleteChartButton;
