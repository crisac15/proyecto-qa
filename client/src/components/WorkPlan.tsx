import React, { act, useEffect, useState } from "react";
import {
  type WorkPlan,
  type Activity,
  ActivityStatus,
  type User,
  type Message,
} from "@/lib/types";
import ActivitesAccordion from "@/components/ActivitiesAccordion";
import * as workplanService from "@/services/workplanService";
import * as activityService from "@/services/activityService";
import * as messageService from "@/services/forumService";
import { uploadFile } from "@/services/uploadFilesService";

interface WorkPlanProps {
  id: string;
}

const WorkPlanDisplay: React.FC<WorkPlanProps> = ({ id }) => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;
  const isLeader = user.isLeader;
  const isTeacher = user.userType === "teacher";
  const isStudent = user.userType === "student";

  const showCreateActivityButton = isLeader;
  const showEditActivityButtons = isLeader;
  const showComments = isTeacher;

  const [workplan, setWorkplan] = useState<WorkPlan | null>(null);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [activityStatus, setActivityStatus] = useState<ActivityStatus | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>(
    selectedActivity?.forum?.messages || []
  );
  const [replingTo, setReplyingTo] = useState<Message | null>(null);

  const loadWorkplan = async () => {
    const res = await workplanService.getWorkplanById(id);
    setWorkplan(res);
    let sortedActivities = res.activities?.sort(
      (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
    );

    // In case the user is a student, filter the activities that are not canceled or planned
    if (isStudent) {
      sortedActivities = sortedActivities?.filter(
        (activity) =>
          activity.status !== ActivityStatus.CANCELADA &&
          activity.status !== ActivityStatus.PLANEADA
      );
    }
    setActivities(sortedActivities);
  };

  useEffect(() => {
    loadWorkplan();
  }, []);

  // clasify activities by week
  const activitiesByWeek: {
    [week: number]: Activity[];
  } = {};
  activities?.forEach((activity) => {
    if (activitiesByWeek[activity.week]) {
      activitiesByWeek[activity.week].push(activity);
    } else {
      activitiesByWeek[activity.week] = [activity];
    }
  });

  function handleAccordionToggle(week: number) {
    let updatedAccordions = [...openAccordions];
    if (updatedAccordions.includes(week)) {
      updatedAccordions = updatedAccordions.filter((w) => w !== week);
    } else {
      updatedAccordions.push(week);
    }
    setOpenAccordions(updatedAccordions);
    sessionStorage.setItem("openAccordions", JSON.stringify(updatedAccordions));
  }

  function handleActivityStatusChange(status: ActivityStatus) {
    if (selectedActivity) {
      setActivityStatus(status);
      selectedActivity.status = status;
      activityService.updateActivity(id, selectedActivity);
    }
  }
  function handleEditActivity() {
    // redirect to edit activity page
    window.location.href = id + "-edit-" + selectedActivity?.id;
  }

  function handleNewActivity() {
    // redirect to new activity page
    window.location.href = id + "-new-activity";
  }

  function handleDeletePlan() {
    workplanService.deleteWorkplan(id);
    if (typeof window !== "undefined") {
      window.history.back();
    }
  }

  function handleDownloadAttachment() {
    if (selectedActivity && selectedActivity.attachmentFile) {
      window.open(selectedActivity.attachmentFile, "_blank");
    }
  }

  function handleSetNextActivity() {
    // set the next activity to the selected activity
    // sort by date

    const sortedActivities = activities?.sort(
      (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
    );
    console.log(sortedActivities);
    // get the first activity that is not done yet and the date is after today
    const nextActivity = sortedActivities?.find(
      (activity) =>
        activity.status !== ActivityStatus.REALIZADA &&
        activity.status !== ActivityStatus.CANCELADA &&
        new Date(activity.date).getDate() > new Date().getDate()
    );
    if (nextActivity) {
      setSelectedActivity(nextActivity);
    }
  }

  function handleAddEvidence() {
    // open file picker
    if (selectedActivity) {
      console.log("adding evidence");
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*, video/*";
      input.onchange = async () => {
        if (input.files && selectedActivity) {
          const file = input.files[0];

          const url = await uploadFile(file);

          if (url) {
            selectedActivity.evidence = selectedActivity.evidence || [];
            selectedActivity.evidence.push(url);
            activityService.updateActivity(id, selectedActivity);
          }
          console.log("file uploaded");
          console.log(selectedActivity);
        }
      };
      input.click();
    }
    setSelectedActivity(selectedActivity);
  }

  function handleNotify() {
    if (selectedActivity) {
      selectedActivity.status = ActivityStatus.NOTIFICADA;
      activityService.updateActivity(id, selectedActivity, user.name);
      setSelectedActivity(selectedActivity);
    }
  }

  function handleCancelActivity() {
    if (!selectedActivity) return;
    selectedActivity!.status = ActivityStatus.CANCELADA;
    // open input for reason
    const reason = window.prompt("Motivo de cancelación");
    if (reason) {
      // save the reason in the observation and the date
      selectedActivity!.observation =
        reason + " [Cancelada el " + new Date().toDateString() + "]";
    }
    console.log(selectedActivity.observation);
    activityService.updateActivity(id, selectedActivity, user.name);
    setSelectedActivity(null);
  }

  const addMessage = async () => {
    if (selectedActivity) {
      const aid = selectedActivity.id || "";
      // get the message from the input
      const body = document.querySelector<HTMLInputElement>(
        'input[name="message"]'
      )?.value;
      // clear the input
      document.querySelector<HTMLInputElement>('input[name="message"]')!.value =
        "";

      // create the message
      if (!body) {
        // show error
        window.alert("El mensaje no puede estar vacío");
        return;
      }
      const newMessage: Message = {
        user: user.name,
        date: new Date(),
        content: body,
        replies: [],
      };
      if (replingTo && replingTo.id) {
        await messageService.replyMessage(id, aid, replingTo.id, newMessage);

        // update the message in the state
        const updatedMessages = messages.map((message) => {
          if (message.id === replingTo.id) {
            return {
              ...message,
              replies: [...message.replies, newMessage],
            };
          }
          return message;
        });
        setMessages(updatedMessages);
      } else {
        const message = await messageService.addMessage(id, aid, newMessage);

        if (message) {
          setMessages([...messages, message]);
        }
      }
    }
  };

  async function handleSetReplyingTo(message: Message) {
    if (replingTo === message) {
      setReplyingTo(null);
    } else {
      setReplyingTo(message);
    }
  }

  return (
    <article>
      <header className="flex justify-between mx-10 sm:mx-20 my-6 flex-col sm:flex-row gap-3 ">
        <div>
          <h1 className="text-3xl font-bold">{workplan?.name}</h1>
          <p className="text-lg">{workplan?.description}</p>
        </div>
        <aside className="flex gap-2">
          {showCreateActivityButton && (
            <button
              onClick={handleNewActivity}
              className="flex items-center justify-center h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark w-52 hover:bg-primary-light group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar-plus"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
              </svg>
              Nueva Actividad
            </button>
          )}
          {showCreateActivityButton && (
            <button
              onClick={handleDeletePlan}
              className="flex items-center justify-center h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark w-52 hover:bg-primary-light group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar-plus"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
              Eliminar Plan
            </button>
          )}
          <button
            onClick={handleSetNextActivity}
            className="flex items-center justify-center h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark w-52 hover:bg-primary-light group"
          >
            Proxima Actividad
          </button>
        </aside>
      </header>
      {/* Activities */}
      <div className="flex gap-10 mx-10 sm:mx-20">
        {ActivitesAccordion(
          selectedActivity,
          activitiesByWeek,
          handleAccordionToggle,
          openAccordions,
          setSelectedActivity,
          setActivityStatus,
          setMessages,
          setOpenAccordions
        )}
        {/* Activity Details */}
        <aside
          className={`my-6 w-full sm:w-8/12 h-[560px] rounded-lg overflow-y-scroll no-scrollbar shadow-md bg-white/75 ${
            selectedActivity === null ? "hidden" : "block"
          } sm:block z-20`}
        >
          {selectedActivity && (
            <div className="flex flex-col h-full gap-2 p-4 rounded-lg">
              <header>
                <div className="flex justify-between">
                  <div className="flex  place-items-center gap-2">
                    <button onClick={() => setSelectedActivity(null)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" hover:scale-110 transition-all duration-300 ease-in-out icon icon-tabler icon-tabler-arrow-left hover:opacity-60"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#000000"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 12l10 0" />
                        <path d="M4 12l4 4" />
                        <path d="M4 12l4 -4" />
                        <path d="M20 4l0 16" />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-bold align-middle truncate ">
                      {selectedActivity.name}
                    </h2>
                  </div>

                  <span className="px-2 py-1 text-lg border-2 rounded-full border-primary-light text-primary-light">
                    {selectedActivity.type}
                  </span>
                </div>
                <p className="-mt-2 text-xl text-gray-600">
                  {selectedActivity.date.toString().split("T")[0]}
                </p>
              </header>

              <section className="flex justify-between">
                <div>
                  <p className="text-xl font-bold ">Responsables:</p>
                  <ul>
                    {selectedActivity.responsibles.map((responsible) => (
                      <li key={responsible.id} className="text-lg">
                        {responsible.name + " - " + responsible.email}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleDownloadAttachment}
                  className={`flex gap-4 px-3 my-2 text-lg ${
                    selectedActivity.attachmentFile
                      ? " text-primary-light"
                      : " text-gray-500"
                  } border-2 rounded-md shadow-sm place-items-center border-black/10`}
                >
                  Archivo <br /> adjunto
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                    width="46"
                    height="46"
                    viewBox="0 0 24 24"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                    <path d="M12 17v-6"></path>
                    <path d="M9.5 14.5l2.5 2.5l2.5 -2.5"></path>
                  </svg>
                </button>
              </section>
              <section>
                <p className="text-xl font-bold">Descripción:</p>
                <p className="text-lg">{selectedActivity.observation}</p>
                <p className="text-lg ">{selectedActivity.modality}</p>
                {selectedActivity.modality === "Virtual" && (
                  <a
                    href={`https://${selectedActivity.link}`}
                    target="_blank"
                    className="text-lg text-primary-light hover:underline"
                  >
                    Enlace
                  </a>
                )}
              </section>
              {showEditActivityButtons && (
                <footer className="flex justify-center gap-3">
                  {selectedActivity.status === "Planeada" && (
                    <button
                      onClick={() =>
                        handleActivityStatusChange(ActivityStatus.PUBLICADA)
                      }
                      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M19 22v-6" />
                        <path d="M22 19l-3 -3l-3 3" />
                      </svg>
                      Publicar
                    </button>
                  )}
                  {(selectedActivity.status === "Notificada" ||
                    selectedActivity.status === "Publicada") && (
                    <button
                      onClick={handleNotify}
                      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 21h-9a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M11 15h1" />
                        <path d="M12 15v3" />
                        <path d="M19 16v3" />
                        <path d="M19 22v.01" />
                      </svg>
                      Notificar
                    </button>
                  )}
                  {(selectedActivity.status === "Notificada" ||
                    selectedActivity.status === "Publicada") && (
                    <button
                      onClick={() =>
                        handleActivityStatusChange(ActivityStatus.REALIZADA)
                      }
                      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M15 19l2 2l4 -4" />
                      </svg>
                      Realizar
                    </button>
                  )}
                  {selectedActivity.status === "Realizada" && (
                    <button
                      disabled
                      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out bg-gray-600 rounded-md group"
                    >
                      Realizada
                    </button>
                  )}
                  {selectedActivity.status !== "Cancelada" && (
                    <button
                      onClick={handleEditActivity}
                      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M19.001 15.5v1.5" />
                        <path d="M19.001 21v1.5" />
                        <path d="M22.032 17.25l-1.299 .75" />
                        <path d="M17.27 20l-1.3 .75" />
                        <path d="M15.97 17.25l1.3 .75" />
                        <path d="M20.733 20l1.3 .75" />
                      </svg>
                      Editar
                    </button>
                  )}
                  {selectedActivity.status !== "Cancelada" && (
                    <button
                      onClick={handleCancelActivity}
                      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out bg-red-800 rounded-md hover:brightness-125 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-calendar-x"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6.5" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M22 22l-5 -5" />
                        <path d="M17 22l5 -5" />
                      </svg>
                      Cancelar
                    </button>
                  )}
                </footer>
              )}
              {
                /* section for submitting evidences */
                selectedActivity.status === "Realizada" && (
                  <div>
                    <button
                      className=" bg-primary-dark text-white py-2 px-4 "
                      onClick={handleAddEvidence}
                    >
                      Subir evidencia
                    </button>

                    <ul>
                      {selectedActivity.evidence?.map((evidence) => (
                        <li key={evidence}>
                          -{" "}
                          <a
                            className=" text-primary-light underline"
                            href={evidence}
                            target="_blank"
                          >
                            evidencia{" "}
                            {selectedActivity?.evidence?.indexOf(evidence)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
              {showComments && (
                <div className=" w-full ">
                  <div className="flex relative">
                    <input
                      name="message"
                      className=" w-full border-gray-400  rounded-lg pr-24"
                      type="text"
                      placeholder={
                        replingTo
                          ? `Responder a ${replingTo.user}: ${replingTo.content}`
                          : "Añade un comentario"
                      }
                    />

                    <button
                      onClick={addMessage}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-e-md absolute right-0 h-full grid place-content-center transition-all duration-300 ease-in-out group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-send-2 group-hover:scale-110 transition-all duration-300 ease-in-out"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                        <path d="M6.5 12h14.5" />
                      </svg>
                    </button>
                  </div>

                  <div className=" mr-4 flex gap-2 flex-col">
                    {
                      // map comments
                      messages.map((message) => (
                        <article
                          key={message.id}
                          className="comment mx-2 flex w-full  p-2 flex-col gap-2"
                        >
                          <div className=" flex gap-4 ">
                            <img
                              className="object-cover object-center h-12 rounded-full aspect-square border-2 border-white/50 shadow-sm"
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                            />

                            <aside className=" flex flex-col w-full">
                              <header className="flex justify-between border-b-2 border-gray-300">
                                <section className="flex gap-6">
                                  <h2 className=" font-bold">{message.user}</h2>
                                  <h3>
                                    {message.date.toString().split("GMT")[0]}
                                  </h3>
                                </section>

                                <button
                                  onClick={() => handleSetReplyingTo(message)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`icon icon-tabler icon-tabler-send-2 ${
                                      replingTo === message
                                        ? "text-blue-500"
                                        : "text-gray-500 "
                                    }`}
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M9 14l-4 -4l4 -4" />
                                    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                                  </svg>
                                </button>
                              </header>
                              <p>{message.content}</p>
                            </aside>
                          </div>
                          <footer className=" gap-2">
                            {message.replies.map((reply) => (
                              <article
                                key={reply.date.toString()}
                                className="comment mx-2 flex w-full gap-4 p-2"
                              >
                                <img
                                  className="object-cover object-center h-12 rounded-full aspect-square border-2 border-white/50 shadow-sm"
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                />
                                <aside className=" flex flex-col w-full">
                                  <header className="flex justify-between border-b-2 border-gray-300">
                                    <section className="flex gap-6">
                                      <h2 className=" font-bold">
                                        {reply.user}
                                      </h2>
                                      <h3>
                                        {reply.date.toString().split("GMT")[0]}
                                      </h3>
                                    </section>
                                  </header>
                                  <p>{reply.content}</p>
                                </aside>
                              </article>
                            ))}
                          </footer>
                        </article>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};

export default WorkPlanDisplay;
