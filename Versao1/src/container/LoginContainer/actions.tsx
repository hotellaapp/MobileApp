import Api from '../../API/Api';



export function loginSucess(idClient: string) {
    return {
        type: "LOGIN_SUCCESS",
        result: idClient,
    };
}
export function loginFail(error: string) {
    return {
        type: "LOGIN_FAIL",
        result: error,
    };
}




export function login(code) {

    return async (dispatch) => {


        try {
            return await Api.login(code).then(
                response => {
                    if (!response.ok) {
                        return dispatch(loginFail(response.ok));
                    }

                    return response;

                }).then(user => {
                    const validade = JSON.parse(user._bodyText);

                    return dispatch(loginSucess(validade.status.trim()));

                }

                )


        } catch (err) {
            return dispatch(loginFail(err));
        }


    };
}
