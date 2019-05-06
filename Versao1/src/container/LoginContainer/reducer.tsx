const initialState = {
    name: 'undefined',
    idCliente: 'undefined',
    isLoggedIn: false,
};

export default function(state = initialState, action) {
	if (action.type === "LOGIN_SUCCESS") {
		return {
			...state,
			idClient: action.result,
			isLoggedIn : true,
		};
	}
	if (action.type === "LOGIN_FAIL") {
		return {
			...state,
			idClient: action.result,
		};
	}
	return state;
}
