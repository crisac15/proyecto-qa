import { Avatar, Dropdown, Navbar } from "flowbite-react";
import type { User } from "@/lib/types";
import { NavBarTheme } from "@/lib/themes";
import * as studentsService from "@/services/studentsService.ts";
import { useEffect, useState } from "react";
import type { Inbox, Notification } from "@/lib/types";

interface Props {
  currentRoute: "equipo" | "estudiantes" | "profesores";
}

const Header: React.FC<Props> = ({ currentRoute }) => {
  const [inbox, setInbox] = useState<Inbox>({
    notifications: [],
    readNotifications: [],
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [noRead, setNoRead] = useState(0);
  const [showNoRead, setShowNoRead] = useState(false);
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;
  const showRegister = user.userType == "assistant";
  const showProfile = user.userType == "teacher" || user.userType == "student";
  const showInbox = user.userType == "student";
  const showStudentTab = user.userType != "student";
  const showTeacherTab = user.userType != "student";

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const loadNotifications = async (inbox: Inbox) => {
    const notifications = await studentsService.getAllNotifications();
    console.log("notifications", notifications);
    console.log("inbox", inbox);
    // const notifications: Notification[] = [
    //   {
    //     title: "Notificación de prueba 1",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 2",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 3",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 4",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 5",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 6",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 7",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 8",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 9",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    //   {
    //     title: "Notificación de prueba 10",
    //     content: "Se ha creado una nueva actividad",
    //     postDate: new Date(),
    //   },
    // ];
    let formatedNotifications: Notification[] = [];
    notifications.forEach((notification) => {
      const read = inbox.readNotifications.includes(notification.id);
      if (inbox.notifications.includes(notification.id)) {
        formatedNotifications.push({ ...notification, read: read });
      }
    });

    setNoRead(inbox.notifications.length - inbox.readNotifications.length);
    setNotifications(formatedNotifications);
    console.log("notifications loaded", formatedNotifications);
  };

  const loadInbox = async () => {
    if (user.id && user.userType == "student") {
      const inbox = await studentsService.getStudentInbox(user.id);
      setInbox(inbox);
      loadNotifications(inbox);
    }
  };

  useEffect(() => {
    loadInbox();
    // Función para cargar las notificaciones
  }, []);

  const handleReadNotification = async (id: string) => {
    // check if the notification is already read
    if (inbox.readNotifications.includes(id) || !user.id) {
      return;
    }
    const newInbox = await studentsService.markNotificationAsRead(user.id, id);
    console.log(newInbox);

    setInbox(newInbox);
    loadNotifications(newInbox);
  };
  const handleToggleNoRead = () => {
    setShowNoRead(!showNoRead);

    // Toggle to show only unread notifications
    if (showNoRead) {
      loadNotifications(inbox);
    } else {
      const unread = notifications.filter((notification) => !notification.read);
      setNotifications(unread);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (!user.id) {
      return;
    }
    const newInbox = await studentsService.deleteNotification(user.id, id);

    setInbox(newInbox);
    loadNotifications(newInbox);
  };

  const handleDeleteReadNotifications = async () => {
    if (!user.id) {
      return;
    }
    const newInbox = await studentsService.deleteReadNotifications(user.id);

    setInbox(newInbox);
    loadNotifications(newInbox);
  };

  return (
    <Navbar fluid rounded className="bg-slate-50" theme={NavBarTheme}>
      <Navbar.Brand>
        <img
          src="/favicon copy.svg"
          className="h-20 mr-2"
          alt="Flowbite React Logo"
        />
        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white ">
          GuíaTEC
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {showInbox && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-bell mr-2 hover:scale-125 hover:text-primary-light text-black transition-all duration-300 ease-in-out "
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
                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>
            }
          >
            <Dropdown.Header>
              <header className="flex justify-between gap-6">
                <span className="font-bold text-sm ">Notificaciones</span>
                <aside className="flex gap-1 items-center">
                  <button
                    className={`flex relative items-center cursor-pointer ${
                      showNoRead ? "text-primary-light" : ""
                    } hover:text-primary-light hover:scale-110 transition-all duration-300 ease-in-out`}
                    onClick={handleToggleNoRead}
                  >
                    {!showNoRead && (
                      <>
                        <div className="absolute top-[-3px] right-0 rounded-full bg-primary-light text-white p-[7px]" />
                        <span className="absolute top-[-3px] right-1 text-xs text-white">
                          {noRead}
                        </span>
                      </>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                  </button>
                  <button onClick={handleDeleteReadNotifications}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-bell mr-2 hover:scale-110 hover:text-red-600  transition-all duration-300 ease-in-out "
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7h16" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      <path d="M10 12l4 4m0 -4l-4 4" />
                    </svg>
                  </button>
                </aside>
              </header>
            </Dropdown.Header>
            <div className="p-4 min-w-96  max-h-80 overflow-y-scroll no-scrollbar">
              {notifications.toReversed().map((notification, i) => (
                <article
                  key={i}
                  className="p-2 border-b  border-gray-200 last:border-0 flex w-full justify-around items-start"
                >
                  <aside>
                    <button
                      onClick={() => handleReadNotification(notification.id)}
                      className={`${
                        notification.read
                          ? "bg-gray-100 pointer-events-none"
                          : "bg-primary-light hover:bg-primary-light/80 hover:scale-110 transition-all duration-300 ease-in-out"
                      } rounded-full p-1`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`icon icon-tabler ${
                          notification.read ? "text-gray-500" : "text-white"
                        }`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                    </button>
                  </aside>
                  <main>
                    <div className="text-sm font-medium flex w-60 justify-between grow-1 ">
                      <span>{notification.title}</span>
                      <span className=" text-xs text-gray-500 pointer-events-none">
                        {notification.sender}
                      </span>
                    </div>
                    <div className="text-xs max-w-52">{notification.body}</div>
                    <div className="text-xs text-gray-500">
                      {notification.postDate.toString().split("GMT")[0].trim()}
                    </div>
                  </main>
                  <aside>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x text-gray-500 hover:text-red-500 transition-all duration-300 ease-in-out"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </aside>
                </article>
              ))}
            </div>
          </Dropdown>
        )}

        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={user.photo} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block text-sm">Sede: {user.campus}</span>
            <span className="block text-sm font-medium truncate">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item
            className={showRegister ? "grid" : "hidden"}
            href="/register"
          >
            Registrar profesor
          </Dropdown.Item>
          <Dropdown.Item
            className={showProfile ? "grid" : "hidden"}
            href={
              user.userType == "teacher"
                ? `/teacher/${user.id}`
                : `/student/${user.id}`
            }
          >
            Perfil
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/team" active={currentRoute === "equipo"}>
          Equipo
        </Navbar.Link>
        {showStudentTab && (
          <Navbar.Link href="/students" active={currentRoute === "estudiantes"}>
            Estudiantes
          </Navbar.Link>
        )}
        {showTeacherTab && (
          <Navbar.Link href="/teachers" active={currentRoute === "profesores"}>
            Profesores
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
