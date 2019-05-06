
class Api {

  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  static headersTPlain() {
    return {
      'Accept': 'text/plain',
      'Content-type': 'text/plain'
    }
  }

  static get(route: string) {
    return this.xhr(route, '', 'GET');
  }

  static put(route: string, params: string) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route: string, params: string) {
    return this.xhr(route, params, 'POST')
  }

  static postTPlain(route: string, params: string) {
    return this.xhr(route, params, 'POST')
  }

  static login(params: string) {
    return this.xhrText('client/login', params, 'POST')
  }

  static delete(route: string, params: string) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route: string, params: string, verb: string) {
    const host = 'https://hotella.herokuapp.com/api/'
    const url = `${host}${route}`
    let options: any = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers()
    return fetch(url, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => json.results);
  }

  static xhrText(route: string, params: string, verb: string) {
    const host = 'https://hotella.herokuapp.com/api/'
    const url = `${host}${route}`
    let options: any = Object.assign({ method: verb }, params ? { body: params } : null);
    options.headers = Api.headersTPlain()
    return fetch(url, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
          console.log(json);
        return json
      }
      console.log(json);
      return json.then(err => { throw err });
    }).then(json => json.results);
  }
}
export default Api;