import { createContext, useState } from 'react';

export const ScreenContext = createContext();

export default function ScreenContextProvider({children}){

    const [desktopScreen, setDesktopScreen] = useState();

    function checarMedia() {
       if (window.matchMedia('(min-width: 1300px)').matches) {
          setDesktopScreen(true);
       } else {
          setDesktopScreen(false);
       }
    }

    window.addEventListener('load', checarMedia);
    window.addEventListener('resize', checarMedia);

    return (
        <ScreenContext.Provider value={{desktopScreen}}>
            {children}
        </ScreenContext.Provider>
    );
}