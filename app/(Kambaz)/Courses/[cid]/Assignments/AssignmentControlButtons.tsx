import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa"; 
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
  onEdit,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
  onEdit: (assignmentId: string) => void; 
}) {
  return (
    <div className="d-flex align-items-center">
      <FaPencilAlt
        className="text-primary me-3 mb-1"
        role="button"
        title="Edit Assignment"
        onClick={() => onEdit(assignmentId)}
      />

      <FaTrash
        className="text-danger me-3 mb-1"
        role="button"
        title="Delete Assignment"
        onClick={() => deleteAssignment(assignmentId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 text-secondary" />
    </div>
  );
}