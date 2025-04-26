import { createContext } from "react";

type SidebarContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType>({ isSidebarOpen: true, toggleSidebar: () => { } });

