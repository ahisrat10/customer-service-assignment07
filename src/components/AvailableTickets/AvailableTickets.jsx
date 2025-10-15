import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const AvailableTickets = ({ ticketsPromise, inProgress, setInProgress, resolved, setResolved }) => {
  const [tickets, setTickets] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);

  
  useEffect(() => {
    ticketsPromise
      .then((data) => setTickets(data))
      .catch((err) => console.error("Failed to load tickets:", err));
  }, [ticketsPromise]);

  const handleSelectTicket = (ticket) => {
    if (taskStatus.find((t) => t.id === ticket.id)) return;
    if (resolvedTasks.find((t) => t.id === ticket.id)) return;

    setTaskStatus((prev) => [...prev, ticket]);
    setInProgress((prev) => prev + 1);

    toast.info("Task In Progress!"); 
  };

  const handleComplete = (ticket) => {
    setResolvedTasks((prev) => [...prev, ticket]);
    setTaskStatus((prev) => prev.filter((t) => t.id !== ticket.id));

    
    setTickets((prev) => prev.filter((t) => t.id !== ticket.id));

    setInProgress((prev) => (prev > 0 ? prev - 1 : 0));
    setResolved((prev) => prev + 1);

    toast.success("Task Completed!"); 
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-50 p-6 min-h-screen">
      <div className="flex gap-6">
       
        <div className="grid grid-cols-2 gap-[24px] flex-1">
          {tickets
            
            .filter((ticket) => !resolvedTasks.some((res) => res.id === ticket.id))
            .map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => handleSelectTicket(ticket)}
                className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 w-[510px] h-[148px] hover:shadow-md transition relative cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-[18px] font-medium text-gray-800">{ticket.title}</h2>
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
                    <p className="text-sm text-gray-800 font-medium">{ticket.customer}</p>
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Task Status</h2>
            {taskStatus.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {taskStatus.map((task) => (
                  <li key={task.id} className="flex flex-col gap-2">
                    <p className="text-gray-700 font-medium">{task.title}</p>
                    <button
                      onClick={() => handleComplete(task)}
                      className="mt-1 bg-green-500 text-white hover:bg-green-600 w-[326px] h-[40px] flex items-center justify-center text-[16px] font-semibold rounded-md"
                    >
                      Complete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Select a ticket to add to Task Status.</p>
            )}
          </div>

      
          <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Resolved Task</h2>
            {resolvedTasks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {resolvedTasks.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-gray-50 border border-gray-200 shadow-sm rounded-xl p-3"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-800">{ticket.title}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"
                      >
                        Resolved
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ticket.description}</p>
                    <div className="flex items-center justify-between text-xs mt-2 text-gray-500">
                      <span>#{ticket.id}</span>
                      <span>{ticket.customer}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No resolved tasks yet.</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AvailableTickets;
