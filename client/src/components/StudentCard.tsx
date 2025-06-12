import React, { useState, useEffect } from "react";
import type { Student, User } from "@/lib/types.ts";
import * as studentsService from "@/services/studentsService";
import * as uploadFilesService from "@/services/uploadFilesService";

interface Props {
  studentID: string;
}

const StudentCard: React.FC<Props> = ({ studentID }) => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;
  const [student, setStudent] = useState<Student | null>(null);

  const canEdit = studentID === user.id;

  async function loadStudent() {
    const res = await studentsService.getStudentById(Number(studentID));
    const student: Student = res.student;
    const formattedStudent: Student = {
      ...student,
      photo:
        res.photo ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    };
    setStudent(formattedStudent);
  }

  useEffect(() => {
    loadStudent();
  }, []);

  const [editing, setEditing] = useState(false);

  // handle editing
  async function handleSave() {
    setEditing(!editing);
    if (editing) {
      if (student) {
        const personalPNumber = document.getElementById(
          "personalPNumber"
        ) as HTMLInputElement;
        if (personalPNumber) {
          student.personalPNumber = personalPNumber.value;
          await studentsService.updateStudent(student);
          loadStudent();
        }
      }
    }
  }

  const [confirmDelete, setConfirmDelete] = useState(false);

  // handle delete
  function handleDelete() {
    setConfirmDelete(true);
  }

  function handleConfirmDelete() {
    // delete student
    setConfirmDelete(false);
    if (typeof window !== "undefined") {
      window.history.back();
      // TODO: delete student
    }
  }

  function handleNewPhoto() {
    if (editing) {
      // Open file picker
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files && input.files[0]) {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = async () => {
            if (student) {
              const photoURL = await uploadFilesService.uploadFile(file);
              student.photo = photoURL;
              await studentsService.updateStudentPhoto(
                student.carnet,
                photoURL
              );
              loadStudent();
              const userUpdated = { ...user, photo: photoURL };
              localStorage.setItem("user", JSON.stringify(userUpdated));
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  }

  return (
    <article className=" overflow-y-scroll  lgn:overflow-hidden h-screen lgn:h-[80%] w-[90%] lgn:w-[75%] bg-slate-200 rounded-3xl p-5 flex flex-col lgn:flex-row   lgn:place-content-center items-center align-top gap-5 shadow-lg">
      <img
        onClick={handleNewPhoto}
        className="rounded-full h-[210px] aspect-square object-cover object-center border-2 border-white "
        src={student?.photo}
        alt={student?.name}
      />
      <aside className=" w-[90%] lgn:w-[60%] gap-5 flex flex-col items-center lgn:items-start ">
        <header className="flex flex-col items-center w-full gap-5 pb-3 border-b-2 border-zinc-400 lgn:flex-row lgn:justify-between lgn:items-top ">
          <div className="flex flex-col items-center order-2 lgn:items-start lgn:order-1">
            <h1 className="text-xl font-medium truncate">{student?.name}</h1>

            <h2 className="text-sm text-zinc-400">{student?.carnet}</h2>
          </div>
          {canEdit && (
            <div className="flex order-1 gap-3">
              <button
                onClick={handleSave}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  {editing ? "Guardar" : "Editar"}
                </span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center w-32 h-12 gap-2 text-white transition duration-300 ease-in-out bg-red-800 rounded-md hover:brightness-125 group"
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                  Eliminar
                </span>
              </button>
            </div>
          )}
        </header>
        <footer className="lgn:w-[80%] grid grid-cols-1 lgn:grid-cols-2 gap-x-3  gap-y-1 lgn:gap-y-2 place-items-center lgn:place-items-start">
          <h3 className="text-zinc-400">Correo</h3>
          <p className="py-2">{student?.email}</p>

          <h3 className="text-zinc-400">Telefono Celular</h3>
          {editing ? (
            <input
              type="tel"
              className="py-2 pl-0 mr-1 border-none"
              id="personalPNumber"
              defaultValue={student?.personalPNumber}
            />
          ) : (
            <p className="py-2">{student?.personalPNumber}</p>
          )}
        </footer>
      </aside>
      {/* confirm pop up */}
      {confirmDelete && (
        <div
          className={
            "absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50"
          }
        >
          <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
            <h2 className="text-xl font-medium">¿Está seguro?</h2>
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
    </article>
  );
};

export default StudentCard;
