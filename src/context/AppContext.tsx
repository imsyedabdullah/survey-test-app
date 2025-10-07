import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

type AppState = {
	user: User | null;
};

type AppContextType = {
	getStateWithKey: <K extends keyof AppState>(key: K) => AppState[K];
	updateStateKeyWithValue: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
	resetState: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
	user: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<AppState>(initialState);

	const getStateWithKey = <K extends keyof AppState>(key: K): AppState[K] => {
		return state[key];
	};

	const updateStateKeyWithValue = <K extends keyof AppState>(key: K, value: AppState[K]) => {
		setState((prev) => ({ ...prev, [key]: value }));
	};

	const resetState = () => {
		setState(initialState);
	};

	return (
		<AppContext.Provider value={{ getStateWithKey, updateStateKeyWithValue, resetState }}>
			{children}
		</AppContext.Provider>
	);
}

export const useApp = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used within an AppProvider');
	}
	return context;
};
