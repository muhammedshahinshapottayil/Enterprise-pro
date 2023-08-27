import React from "react";
import { Update } from "types/intefaces";
function TaskTableModal({
  modalDatas,
  onClosing,
}: {
  modalDatas: Update[] | null;
  onClosing: any;
}) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-slate-200 p-4 rounded-lg shadow-md">
          <button
            className="mt-2 px-2 py-1 bg-blue-500 text-white rounded-md float-right"
            onClick={onClosing}
          >
            Close
          </button>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 font-bold">Title</th>
                <th className="px-4 py-2 font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {modalDatas &&
                modalDatas.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskTableModal;
