import React, { useEffect } from "react";
import {
  ActivityStatus,
  ActivityType,
  Modalities,
  type Activity,
  type Teacher,
} from "@/lib/types";
import * as teacherService from "@/services/teacherService";
import * as activityService from "@/services/activityService";
import * as uploadFilesService from "@/services/uploadFilesService";

interface ActivityFormProps {
  activityId?: string; // optional activity prop
  workplanId: string;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activityId,
  workplanId,
}) => {
  // Implement your component logic here
  const [isVirtual, setIsVirtual] = React.useState(false);
  const [colaborators, setColaborators] = React.useState<Teacher[]>([]);
  const [teachers, setTeachers] = React.useState<Teacher[]>([]);
  const [activity, setActivity] = React.useState<Activity | null>(null);

  const loadActivity = async () => {
    if (!activityId) return;
    const activity = await activityService.getActivityById(
      workplanId,
      activityId
    );
    setActivity(activity);
  };

  const loadTeachers = async () => {
    const teachers = await teacherService.getAllTeachers();
    setTeachers(teachers);
  };

  useEffect(() => {
    loadActivity();
    loadTeachers();
  }, []);

  useEffect(() => {
    if (activity) {
      // Set the date of the activity
      const date = new Date(activity.date);
      const dateInput = document.getElementById(
        "activityDate"
      ) as HTMLInputElement;
      dateInput.value = date.toISOString().split(".")[0];
      // Set the week of the activity
      const weekInput = document.getElementById(
        "activityWeek"
      ) as HTMLInputElement;
      weekInput.value = activity.week.toString();

      // Set the prevDays of the activity, if published disable the input
      const prevDaysInput = document.getElementById(
        "activityPrevDays"
      ) as HTMLInputElement;
      prevDaysInput.value = activity.prevDays.toString();
      if (activity.status === ActivityStatus.PUBLICADA) {
        prevDaysInput.disabled = true;
      }
      // Set the reminderInterval of the activity
      const reminderIntervalInput = document.getElementById(
        "activityReminderInterval"
      ) as HTMLInputElement;
      reminderIntervalInput.value = activity.reminderInterval.toString();

      // Set the link of the activity
      const linkInput = document.getElementById(
        "activityLink"
      ) as HTMLInputElement;
      linkInput.value = activity.link ?? "";

      // Set the type of the activity
      const typeInput = document.getElementById(
        "activityType"
      ) as HTMLSelectElement;
      typeInput.value = activity.type;

      // Set the modality of the activity
      const modalityInput = document.getElementById(
        "activityModality"
      ) as HTMLSelectElement;
      modalityInput.value = activity.modality;

      // Set the responsibles of the activity
      setColaborators(activity.responsibles);

      // Set the isVirtual state
      setIsVirtual(activity.modality === Modalities.VIRTUAL);

      // Set the name of the activity
      const nameInput = document.getElementById(
        "activityName"
      ) as HTMLInputElement;
      nameInput.value = activity.name;
    }
  }, [activity]);

  function handleModalityChange() {
    const modality = document.getElementById(
      "activityModality"
    ) as HTMLSelectElement;
    const validation = modality.value === Modalities.VIRTUAL;
    setIsVirtual(validation);
  }

  function handleAddColaborator() {
    const responsibles = document.getElementById(
      "activityResponsibles"
    ) as HTMLSelectElement;
    console.log(responsibles.value);
    const colaborator = teachers.find(
      (teacher) => teacher.id === responsibles.value
    );

    if (!colaborator) return;
    // Add the colaborator to the list if it is not already there
    if (!colaborators.includes(colaborator)) {
      setColaborators([...colaborators, colaborator]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("activityName") as string;
    let week = parseInt(data.get("activityWeek") as string);
    if (week < 0 || week > 16) {
      window.alert("La semana debe ser un número entre 1 y 16");
      return;
    }

    const date = new Date(data.get("activityDate") as string);
    let prevDays = parseInt(data.get("activityPrevDays") as string);
    if (prevDays < 0) {
      window.alert("Los días previos para publicar no pueden ser negativos");
      return;
    }

    let reminderInterval = parseInt(
      data.get("activityReminderInterval") as string
    );

    if (reminderInterval <= 0) {
      window.alert("El intervalo de recordatorio no puede ser negativo o cero");
      return;
    }

    if (reminderInterval > prevDays) {
      window.alert(
        "El intervalo de recordatorio no puede ser mayor a los días previos para publicar"
      );
      return;
    }
    const responsibles = colaborators;
    const type = data.get("activityType") as ActivityType;
    const modality = data.get("activityModality") as Modalities;

    const status = activity ? activity.status : ActivityStatus.PLANEADA;
    const link = data.get("activityLink") as string;
    const File = data.get("activityAttachment") as File;

    let attachmentFile = "";
    // Implement the file upload
    if (File.name) {
      attachmentFile = await uploadFilesService.uploadFile(File);
      console.log("Se guardo el URL: ", attachmentFile);
    }

    // Create the activity object
    if (activity) {
      // Call the function to update the activity
      updateActivity({
        ...activity,
        name,
        week,
        date,
        prevDays,
        reminderInterval,
        responsibles,
        type,
        modality,
        status,
        link,
        attachmentFile,
      });
    } else {
      // Call the function to create the activity
      createActivity({
        name,
        week,
        date,
        prevDays,
        reminderInterval,
        responsibles,
        type,
        modality,
        status,
        link,
        attachmentFile,
      });
    }
    if (window.confirm("Actividad creada exitosamente")) {
      // Redirect to the previous page
      window.history.back();
    }
  }
  async function createActivity(activity: Activity) {
    // Call the function to create the activity
    await activityService.createActivity(workplanId, activity);
    // Redirect to the previous page
  }
  async function updateActivity(activity: Activity) {
    // Call the function to update the activity
    await activityService.updateActivity(workplanId, activity);
  }

  return (
    <form
      className="flex flex-col w-[90%] sm:w-4/5 gap-5 p-10 h-[90%] bg-slate-100 rounded-xl overflow-y-scroll no-scrollbar"
      onSubmit={handleSubmit}
    >
      <section className="flex sm:flex-row flex-col justify-between gap-5 sm:gap-10">
        {/* Activity Name */}
        <div className="flex flex-col w-full ">
          <label htmlFor="activityName" className="hidden lgn:block">
            Nombre de la actividad
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
            <input
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityName"
              type="text"
              name="activityName"
              placeholder="Ingrese el nombre de la actividad"
              required
            />
          </div>
        </div>
        {/* Activity Type */}
        <div className="flex flex-col w-full ">
          <label htmlFor="activityType" className="hidden lgn:block">
            Índole
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M10 7h4" />
              <path d="M10 18v4l2 -1l2 1v-4" />
              <path d="M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2" />
            </svg>
            <select
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityType"
              name="activityType"
              required
            >
              {Object.values(ActivityType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <section className="flex sm:flex-row flex-col justify-between gap-5 sm:gap-10">
        {/* Activity Modality */}
        <div className="flex flex-col w-full">
          <label htmlFor="activityModality" className="hidden lgn:block">
            Modalidad
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M17.011 9.385v5.128l3.989 3.487v-12z" />
              <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z" />
            </svg>
            <select
              onChange={handleModalityChange}
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityModality"
              name="activityModality"
              required
            >
              {Object.values(Modalities).map((modality) => (
                <option key={modality} value={modality}>
                  {modality}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Activity Name */}
        <div className="flex flex-col w-full">
          <label htmlFor="activityLink" className="hidden lgn:block">
            Enlace de la actividad
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
            <input
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500 disabled:bg-zinc-200"
              id="activityLink"
              type="text"
              name="activityLink"
              placeholder="Ingrese el enlace"
              disabled={!isVirtual}
            />
          </div>
        </div>
      </section>
      <section className="flex sm:flex-row flex-col justify-between gap-5 sm:gap-10">
        {/* Fecha y hora de la actividad */}
        <div className="flex flex-col w-full">
          <label htmlFor="activityDate" className="hidden lgn:block">
            Fecha de la actividad
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M16 3l0 4" />
              <path d="M8 3l0 4" />
              <path d="M4 11l16 0" />
              <path d="M8 15h2v2h-2z" />
            </svg>
            <input
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityDate"
              type="datetime-local"
              name="activityDate"
              required
            />
            <input
              className=" w-1/3 py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500  border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityWeek"
              type="number"
              name="activityWeek"
              placeholder="Semana"
              required
            />
          </div>
        </div>

        {/* Archivo adjunto */}
        <div className="flex flex-col w-full">
          <label htmlFor="activityAttachment" className="hidden lgn:block">
            Archivo adjunto
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <input
              className="w-full h-[50px] bg-white place-content-center transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityAttachment"
              type="file"
              name="activityAttachment"
              accept=".pdf,.jpg,.png"
            />
          </div>
        </div>
      </section>
      <section className="flex sm:flex-row flex-col justify-between gap-5 sm:gap-10">
        {/* Cantidad de dias previos para publicar */}
        <div className="flex flex-col w-full">
          <label htmlFor="activityPrevDays" className="hidden lgn:block">
            Días previos para publicar
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M21 12a9 9 0 1 0 -9 9" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h8.4" />
              <path d="M11.578 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3c1.719 2.755 2.5 5.876 2.5 9" />
              <path d="M18 21v-7m3 3l-3 -3l-3 3" />
            </svg>
            <input
              className="w-full py-3 transition-all disabled:bg-zinc-200 duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityPrevDays"
              type="number"
              name="activityPrevDays"
              placeholder="Ingrese la cantidad de días"
              required
            />
          </div>
        </div>
        {/* Intervalo de recordatorio */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="activityReminderInterval"
            className="hidden lgn:block"
          >
            Intervalo de recordatorio
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
              <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
            </svg>
            <input
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityReminderInterval"
              type="number"
              name="activityReminderInterval"
              placeholder="Ingrese el intervalo"
              required
            />
          </div>
        </div>
      </section>
      <section className="flex sm:flex-row flex-col justify-between gap-5 sm:gap-10">
        {/* Selector de responsables */}
        <div className="flex flex-col w-full">
          <label htmlFor="activityResponsibles" className="hidden lgn:block">
            Responsables
          </label>
          <div className="relative flex flex-row items-center text-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 w-7"
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
              <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            <select
              onChange={handleAddColaborator}
              className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
              id="activityResponsibles"
              name="activityResponsibles"
              required
            >
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name + " - " + teacher.id}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Lista de responsables */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="activityResponsiblesList"
            className="hidden lgn:block"
          >
            Lista de responsables
          </label>
          <div className="relative flex flex-row items-center text-primary-dark ">
            <ul className="w-full h-32 px-6 py-3 overflow-y-scroll bg-white border rounded-lg text-zinc-500 pl-11 border-zinc-300 no-scrollbar">
              {colaborators.map((teacher) => (
                <li
                  key={teacher.id}
                  className="flex flex-row justify-between w-full pt-1 pb-2 border-b-2"
                >
                  {teacher.name + " - " + teacher.id}
                  <button
                    className="font-semibold right-2"
                    onClick={() =>
                      setColaborators(
                        colaborators.filter(
                          (colaborator) => colaborator !== teacher
                        )
                      )
                    }
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="flex sm:flex-row flex-col justify-end gap-5 sm:gap-10">
        <button
          type="submit"
          className="w-40 h-12 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light"
        >
          {activity ? "Actualizar" : "Crear"}
        </button>
      </section>
    </form>
  );
};

export default ActivityForm;
