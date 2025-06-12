import { Tabs } from "flowbite-react";

import MembersTable from "@/components/TeamTabs/MembersTable";
import { TabTheme } from "@/lib/themes";
import WorkplansTable from "@/components/TeamTabs/WorkplansTable";

const TeamTabs = () => {
  return (
    <Tabs
      theme={TabTheme}
      aria-label="Tabs with underline"
      style="underline"
      className=" w-full place-content-center  gap-x-[30%] "
    >
      <Tabs.Item active title="Profesores">
        <div className="grid place-items-center">
          <MembersTable />
        </div>
      </Tabs.Item>
      <Tabs.Item title="Planes">
        <div className="grid place-items-center">
          <WorkplansTable />
        </div>
      </Tabs.Item>
    </Tabs>
  );
};

export default TeamTabs;
