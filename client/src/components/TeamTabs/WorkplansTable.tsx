import type { WorkPlan } from "@/lib/types.ts";
import * as workplanService from "@/services/workplanService";
import { useEffect, useState } from "react";

const WorkplansTable = () => {
  const [workPlans, setWorkPlans] = useState<WorkPlan[]>([]);

  const loadWorkPlans = async () => {
    const res = await workplanService.getAllWorkplans();
    setWorkPlans(res);
  };

  useEffect(() => {
    loadWorkPlans();
  }, []);

  return (
    <div className="w-[90%] overflow-hidden rounded-xl drop-shadow-md shadow-inner border border-black/10 shadow-white/10">
      {workPlans.length !== 0 ? (
        workPlans.map((workPlan: WorkPlan, index) => {
          const rowColorClass = index % 2 != 0 ? "bg-white" : "bg-zinc-200";
          return (
            <div
              key={index}
              className={`grid grid-cols-1 h-16 w-full items-center ${rowColorClass} px-2`}
            >
              <a
                className="flex flex-col w-full"
                href={`/workplan/${workPlan.id}`}
              >
                <span className="text-xl font-bold w-full">
                  {workPlan.name}
                </span>
                <span className="">{workPlan.description}</span>
              </a>
            </div>
          );
        })
      ) : (
        <div className=" p-5 font-bold">No hay planes de trabajo</div>
      )}
    </div>
  );
};

export default WorkplansTable;
