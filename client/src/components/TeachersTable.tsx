import { useEffect, useState } from "react";
import type { Teacher, User } from "@/lib/types.ts";
import * as teachersService from "@/services/teacherService.ts";
import * as teamService from "@/services/teamService.ts";

const TeachersTable = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;
  const isAssistant = user.userType === "assistant";

  const showDeleteButton = isAssistant;
  const showIncludeButton = isAssistant;

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teamTeachers, setTeamTeachers] = useState<Teacher[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const loadTeachers = async () => {
    const res = await teachersService.getAllTeachers();
    const formattedTeachers = res.map((teacher) => {
      return {
        ...teacher,
        photo:
          teacher.photo ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png", // Default image
      };
    });
    setTeachers(formattedTeachers);
  };

  const loadMembers = async () => {
    const res = await teamService.getAllMembers();
    const formattedTeachers = res.map((teacher) => {
      return {
        ...teacher,
        photo:
          teacher.photo ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png", // Default image
      };
    });
    setTeamTeachers(formattedTeachers);
  };

  useEffect(() => {
    loadTeachers();
    loadMembers();
  }, []);

  // handle delete
  function handleDelete(teacher: Teacher) {
    setSelectedTeacher(teacher);
    setConfirmDelete(true);
  }

  function handleConfirmDelete() {
    if (selectedTeacher) {
      teachers.splice(teachers.indexOf(selectedTeacher), 1);
    }
    setConfirmDelete(false);
    // TODO: Implement delete teacher from database
  }

  function handleIncludeTeacher(teacher: Teacher) {
    setTeamTeachers((prevTeachers) => [...prevTeachers, teacher]);
    teamService.addMember(teacher.id, user.name);
  }

  return (
    <section className="w-[90%] overflow-hidden sm:rounded-xl sm:drop-shadow-md sm:shadow-inner flex flex-col sm:gap-0 gap-3 sm:border border-black/10 shadow-white/10">
      <header className="sm:grid items-center w-full h-16 grid-cols-8 grid-rows-1 px-2 bg-zinc-200 hidden">
        <span className="text-lg col-span-1 font-semibold">Codigo</span>
        <span className="text-lg col-span-1 font-semibold">Imagen</span>
        <span className="col-span-2 text-lg font-semibold">Nombre</span>
        <span className="col-span-2 text-lg font-semibold">Teléfono</span>
        <span className="col-span-2 text-lg font-semibold">Acciones</span>
      </header>
      {teachers.map((teacher: Teacher, index) => {
        const rowColorClass = index % 2 === 0 ? "bg-white" : "bg-zinc-200";

        return (
          <div
            key={index}
            className={`grid grid-cols-5 sm:grid-cols-8 h-max py-2 w-full items-center rounded-lg sm:rounded-none drop-shadow-md sm:drop-shadow-none shadow-inner border sm:border-none border-black/10 shadow-white/10 ${rowColorClass} px-2 divide-y-2 divide-black/20 sm:divide-y-0 space-y-1`}
          >
            <span className=" order-2 sm:order-none  col-span-2 sm:col-span-1 ">
              <span className="font-bold sm:hidden">ID: </span>
              {teacher.id}
            </span>
            <img
              className="object-cover object-center h-12 rounded-full aspect-square border-2 border-white/50 shadow-sm order-1 sm:order-none"
              src={teacher.photo}
              alt={teacher.name}
            />
            <span className="col-span-5 sm:col-span-2 order-5 sm:order-none pt-2 sm:p-0">
              <span className="font-bold sm:hidden">Nombre: </span>
              {teacher.name}
            </span>
            <span className="col-span-5 sm:col-span-2 order-5 sm:order-none pt-2 sm:p-0">
              <span className="font-bold sm:hidden">Teléfono: </span>
              {teacher.personalPNumber}
            </span>
            <div className="flex items-center col-span-2 gap-4 order-3 sm:order-none border-none justify-end sm:justify-start">
              <a href={`teacher/${teacher.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300 ease-out  text-primary-light hover:brightness-150 hover:scale-110"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
                  <path d="M12 9h.01"></path>
                  <path d="M11 12h1v4h1"></path>
                </svg>
              </a>
              {showDeleteButton && (
                <button onClick={() => handleDelete(teacher)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-600 transition-all duration-300 ease-out  hover:brightness-150 hover:scale-110"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M13 12v.01"></path>
                    <path d="M3 21h18"></path>
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5"></path>
                    <path d="M14 7h7m-3 -3l3 3l-3 3"></path>
                  </svg>
                </button>
              )}
              {!teamTeachers.find(
                (teamTeacher) => teamTeacher.id === teacher.id
              ) &&
                showIncludeButton && (
                  <button onClick={() => handleIncludeTeacher(teacher)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-all duration-300 ease-out  text-lime-600 hover:brightness-125 hover:scale-110"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                      <path d="M19 22v-6" />
                      <path d="M22 19l-3 -3l-3 3" />
                    </svg>
                  </button>
                )}
            </div>
          </div>
        );
      })}
      {confirmDelete && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50"
          }
        >
          <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
            <h2 className="text-xl font-medium ">{`Está seguro de eliminar a ${selectedTeacher?.name}?`}</h2>
            <div className="flex gap-5">
              <button
                onClick={handleConfirmDelete}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  Si
                </span>
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out bg-red-800 rounded-md hover:brightness-125 group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  No
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeachersTable;
