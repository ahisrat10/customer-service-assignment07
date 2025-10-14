import React, { use, useState } from "react";
import { Calendar } from "lucide-react";

const priorityColors = {
  "High Priority": "text-red-600",
  "Medium Priority": "text-yellow-500",
  "Low Priority": "text-green-600",
};

const statusStyles = {
  Open: "bg-green-100 text-green-700",
  "In-Progress": "bg-yellow-100 text-yellow-700",
  Closed: "bg-gray-100 text-gray-600",
};

const AvailableTickets = ({
  ticketsPromise,
  inProgress,
  setInProgress,
  resolved,
  setResolved,
}) => {
  const ticketData = use(ticketsPromise);

  const [tickets, setTickets] = useState(ticketData);
  const [taskStatus, setTaskStatus] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);

  const handleSelectTicket = (ticket) => {
    
    if (taskStatus.find((t) => t.id === ticket.id)) return;
    if (resolvedTasks.find((t) => t.id === ticket.id)) return;

    setTaskStatus((prev) => [...prev, ticket]);
    setInProgress((prev) => prev + 1);
  };

  const handleComplete = (ticket) => {
   
    setResolvedTasks((prev) => [...prev, ticket]);
    setTickets((prev) => prev.filter((t) => t.id !== ticket.id));
    setTaskStatus((prev) => prev.filter((t) => t.id !== ticket.id));

    setInProgress((prev) => (prev > 0 ? prev - 1 : 0));
    setResolved((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-50 p-6 min-h-screen">
      <div className="flex gap-6">
       
        <div className="grid grid-cols-2 gap-[24px] flex-1">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleSelectTicket(ticket)}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 w-[510px] h-[148px] hover:shadow-md transition relative cursor-pointer"
            >
             
              <div className="flex justify-between items-start">
                <h2 className="text-[18px] font-medium text-gray-800">
                  {ticket.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusStyles[ticket.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              
              <p className="text-[16px] text-gray-600 mt-1 leading-snug line-clamp-2">
                {ticket.description}
              </p>

             
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <p className="text-gray-400 text-xs">#{ticket.id}</p>
                  <p
                    className={`text-xs font-semibold uppercase ${
                      priorityColors[ticket.priority] || "text-gray-500"
                    }`}
                  >
                    {ticket.priority}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-800 font-medium">
                    {ticket.customer}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{ticket.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="w-[358px] flex flex-col gap-6">
          
          <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Task Status
            </h2>
            {taskStatus.length > 0 ? (
              <ul className="space-y-3">
                {taskStatus.map((task) => (
                  <li key={task.id} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{task.title}</span>
                    <button
                      onClick={() => handleComplete(task)}
                      className="ml-3 bg-green-500 text-white hover:bg-green-600 
                                 px-3 py-1 text-sm font-semibold rounded-md"
                    >
                      Complete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                Select a ticket to add to Task Status.
              </p>
            )}
          </div>

          
          <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Resolved Task
            </h2>
            {resolvedTasks.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {resolvedTasks.map((task) => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No resolved tasks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTickets;
