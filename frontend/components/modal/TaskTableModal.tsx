import { useState } from "react";
import { Update, UserTask } from "types/intefaces";
import UpdateModal from "./UpdatesModal";
function TaskTableModal({
  modalData,
  onClose,
}: {
  modalData: UserTask["data"] | null;
  onClose: any;
}) {
  const [modalDatas, setmodalDatas] = useState<Update[] | null>(null);
  const [modal, setmodal] = useState<Boolean>(false);
  const onOpen = (item: Update[]) => {
    setmodal(true);
    setmodalDatas(item);
  };
  const onClosing = () => {
    setmodal(false);
    setmodalDatas(null);
  };

  return (
    <div>
      {modal && <UpdateModal onClosing={onClosing} modalDatas={modalDatas} />}
      {!modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-200 p-4 rounded-lg shadow-md">
            <button
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded-md float-right"
              onClick={onClose}
            >
              Close
            </button>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-bold">Name</th>
                  <th className="px-4 py-2 font-bold">Employee ID</th>
                  <th className="px-4 py-2 font-bold">Task</th>
                </tr>
              </thead>
              <tbody>
                {modalData &&
                  modalData.map((item) => (
                    <tr key={item.emp_id}>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.emp_id}</td>
                      <td className="px-4 py-2">{item.task_name}</td>
                      <td className="px-4 py-2">
                        <button
                          className="inline-block px-4 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg"
                          onClick={() => {
                            onOpen(item.updates);
                          }}
                        >
                          More
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskTableModal;
