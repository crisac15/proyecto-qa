import type { Student, User } from "@/lib/types.ts";
import * as studentsService from "@/services/studentsService.ts";
import * as excelService from "@/services/excelService.ts";
import { useEffect, useState } from "react";

const StudentTable = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;
  const userCampus = user.campus;

  const showUploadButton = user.userType === "assistant";

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [confirmDownload, setConfirmDownload] = useState(false);
  const [listStudents, setStudents] = useState<Student[]>([]);
  const [sort, setSort] = useState<"carnet" | "name" | "campus">("carnet");

  // Load students from the database
  const loadStudents = async () => {
    const res = await studentsService.getAllStudents();
    const sortedStudents = res.sort((a, b) => a.campus.localeCompare(b.campus));
    setStudents(res);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // handle delete student
  function handleDelete(student: Student) {
    setSelectedStudent(student);
    setConfirmDelete(true);
  }

  // handle confirm delete student
  function handleConfirmDelete() {
    if (selectedStudent) {
      listStudents.splice(listStudents.indexOf(selectedStudent), 1);
    }
    setConfirmDelete(false);
    studentsService.deleteStudent(selectedStudent?.carnet as number);
  }

  // handle edit student
  function handleEdit(student: Student) {
    setEditStudent(student);
  }

  // handle save student
  function handleSave() {
    const updatedStudents = listStudents.map((student) => {
      if (student.carnet === editStudent?.carnet) {
        return {
          ...student,
          name: editStudent.name,
          email: editStudent.email,
          personalPNumber: editStudent.personalPNumber,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setEditStudent(null);
    studentsService.updateStudent(editStudent as Student);
  }

  // handle sort students by carnet, name or campus
  function handleSort() {
    const newSort =
      sort == "carnet" ? "name" : sort == "name" ? "campus" : "carnet";
    setSort(newSort);

    const sortedStudents = listStudents.sort((a, b) => {
      if (newSort === "carnet") {
        return a.carnet - b.carnet;
      } else if (newSort === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.campus.localeCompare(b.campus);
      }
    });

    setStudents(sortedStudents);
  }

  // handle download students from a campus or all students
  function handleDownload(option: "all" | "current") {
    if (option === "all") {
      setConfirmDownload(true);
      excelService.downloadAllStudents();
    } else {
      setConfirmDownload(true);
      excelService.downloadStudents(userCampus);
    }
    setConfirmDownload(false);
  }

  // handle upload students from an excel file
  function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx";
    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        await excelService.uploadStudents(file, userCampus);
        loadStudents();
      }
    };
    input.click();
  }

  if (user.userType === "student") {
    return (
      <div className="flex items-center justify-center h-full text-3xl font-semibold text-red-500">
        No tienes permisos para ver esta página
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between mx-10 sm:mx-20 my-6 flex-col sm:flex-row gap-3">
        <aside className="flex gap-3 flex-col sm:flex-row ">
          <div className="flex-row flex gap-3">
            {showUploadButton && (
              <button
                id="upload-excel"
                onClick={handleUpload}
                className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-upload"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M12 11v6"></path>
                  <path d="M9.5 13.5l2.5 -2.5l2.5 2.5"></path>
                </svg>
                Subir
              </button>
            )}
            <button
              id="download-excel"
              onClick={() => setConfirmDownload(true)}
              className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-download"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
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
              Descargar
            </button>
          </div>
          <button
            className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
            onClick={handleSort}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
              <path d="M3 9l4 -4l4 4m-4 -4v14" />
              <path d="M21 15l-4 4l-4 -4m4 4v-14" />
            </svg>
            {sort.charAt(0).toUpperCase() + sort.slice(1)}
          </button>
        </aside>
      </header>

      <div className="grid place-items-center ">
        <section className="w-[90%] overflow-hidden sm:rounded-xl sm:drop-shadow-md sm:shadow-inner flex flex-col sm:gap-0 gap-3 sm:border border-black/10 shadow-white/10">
          <header className="sm:grid items-center w-full h-16 grid-cols-6 px-2 bg-zinc-200 hidden">
            <span className="text-lg font-semibold ">Sede</span>
            <span className="text-lg font-semibold ">Carne</span>
            <span className="text-lg font-semibold ">Nombre</span>
            <span className="text-lg font-semibold ">Correo</span>
            <span className="text-lg font-semibold ">Teléfono</span>
            <span className="text-lg font-semibold ">Acciones</span>
          </header>
          {listStudents.map((student: Student, index) => {
            const rowColorClass = index % 2 === 0 ? "bg-white" : "bg-zinc-200";

            return (
              <div
                key={index}
                className={`grid grid-cols-2 sm:grid-cols-6 h-max gap-2 align-middle py-2 w-full items-center rounded-lg sm:rounded-none drop-shadow-md sm:drop-shadow-none shadow-inner border sm:border-none border-black/10 shadow-white/10 ${rowColorClass} px-2 divide-y-2 divide-black/20 sm:divide-y-0 space-y-1`}
              >
                <span className=" order-3 sm:order-none col-span-2 sm:col-span-1 border-t-2 border-t-black/20 sm:border-none ">
                  <span className="font-bold  sm:hidden">Campus: </span>
                  {student.campus}
                </span>
                <span className=" order-1 sm:order-none col-span-1 border-none ">
                  <span className="font-bold  sm:hidden">Carnet: </span>
                  {student.carnet}
                </span>
                <div className="order-4 sm:order-none col-span-2 sm:col-span-1 ">
                  <span className="font-bold  sm:hidden">Nombre: </span>
                  {/* Editable */}
                  {editStudent?.carnet === student.carnet ? (
                    <input
                      type="text"
                      className="pl-0 mr-1"
                      value={editStudent.name}
                      onChange={(e) =>
                        setEditStudent({
                          ...editStudent,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{student.name}</span>
                  )}
                </div>
                <div className="order-5 sm:order-none col-span-2 sm:col-span-1 ">
                  {/* Editable */}
                  <span className="font-bold  sm:hidden">Correo: </span>
                  {editStudent?.carnet === student.carnet ? (
                    <input
                      type="text"
                      className="pl-0 mr-1"
                      value={editStudent.email}
                      onChange={(e) =>
                        setEditStudent({
                          ...editStudent,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{student.email}</span>
                  )}
                </div>
                <div className="order-6 sm:order-none col-span-2 sm:col-span-1">
                  <span className="font-bold  sm:hidden">Teléfono: </span>
                  {/* Editable */}
                  {editStudent?.carnet === student.carnet ? (
                    <input
                      type="text"
                      className="pl-0 mr-1 "
                      value={editStudent.personalPNumber}
                      onChange={(e) =>
                        setEditStudent({
                          ...editStudent,
                          personalPNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{student.personalPNumber}</span>
                  )}
                </div>

                {/* Editable */}
                <div className="flex items-center gap-2 order-2 col-span-1 border-none justify-end sm:justify-start">
                  {editStudent?.carnet === student.carnet ? (
                    // Save button
                    <button onClick={handleSave}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-all duration-300 ease-out text-primary-light hover:brightness-150 hover:scale-110"
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
                        <path d="M5 12l5 5l10 -10"></path>
                      </svg>
                    </button>
                  ) : (
                    // Edit button
                    <button
                      onClick={() => handleEdit(student)}
                      disabled={userCampus !== student.campus}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          userCampus === student.campus
                            ? "text-primary-light hover:brightness-150 hover:scale-110"
                            : "text-gray-500"
                        }  transition-all  duration-300 ease-out`}
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
                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                        <path d="M16 5l3 3" />
                      </svg>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(student)}
                    disabled={userCampus !== student.campus}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        userCampus === student.campus
                          ? "text-red-600 hover:brightness-150 hover:scale-110"
                          : "text-gray-500"
                      }  transition-all  duration-300 ease-out`}
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 7l16 0"></path>
                      <path d="M10 11l0 6"></path>
                      <path d="M14 11l0 6"></path>
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      {confirmDelete && (
        <div
          className={
            "fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50"
          }
        >
          <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
            <h2 className="text-xl font-medium ">{`Está seguro de eliminar a ${selectedStudent?.name}?`}</h2>
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
      {confirmDownload && (
        <div
          className={
            "fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50"
          }
        >
          <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
            <h2 className="text-xl font-medium ">Formato del Archivo</h2>
            <div className="flex gap-5">
              <button
                onClick={() => handleDownload("all")}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  Todos
                </span>
              </button>
              <button
                onClick={() => handleDownload("current")}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  Sede actual
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
