import type { User } from "@/lib/types.ts";

const RegisterTeacher = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData as string) as User;

  const showRegisterButton = user.userType === "assistant";

  const handleRegister = () => {
    window.open("/register", "_blank");
  };

  if (!showRegisterButton) {
    return null;
  }
  return (
    <button
      id="add-member"
      onClick={handleRegister}
      className="flex items-center justify-center w-40 h-12 gap-2 text-white transition duration-300 ease-in-out rounded-md bg-primary-dark hover:bg-primary-light group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-user-plus"
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
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
      </svg>
      Registrar
    </button>
  );
};

export default RegisterTeacher;
