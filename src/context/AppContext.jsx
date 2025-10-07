import React, { createContext, useContext, useState } from "react";


const AppContext = createContext(null);
const initialState = {
	user: null,
};

export function AppProvider({ children }) {
	const [state, setState] = useState(initialState);


	const getStateWithKey = (key) => {
		return state[key];
	};

	const updateStateKeyWithValue = (key, value) => {
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


export const useApp = () => useContext(AppContext);
