import { useState } from "react";
import { SidebarContext } from "./SidebarContext";
import { useEffect } from "react";

export default function SidebarContextProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth >= 960; // Assuming 'md' breakpoint is 960px
            setIsSidebarOpen(isLargeScreen);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}