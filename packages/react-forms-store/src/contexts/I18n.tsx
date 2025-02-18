import React, {ReactNode, createContext, useContext} from 'react';

export type TimeZone = Intl.DateTimeFormatOptions['timeZone'];

type I18NContextType = {
    timezone: TimeZone;
};

const I18NContext = createContext<I18NContextType | undefined>(undefined);

export const useI18NContext = () => {
    const context = useContext(I18NContext);
    if (!context) {
        throw new Error('useI18NContext must be used within an I18NProvider');
    }
    return context;
};

type I18NProviderProps = {
    children: ReactNode;
    timezone: TimeZone;
};

export const I18NProvider: React.FC<I18NProviderProps> = ({
    children,
    timezone,
}) => {
    return (
        <I18NContext.Provider value={{timezone}}>
            {children}
        </I18NContext.Provider>
    );
};
