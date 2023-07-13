//__________________________________________Weather API Config__________________________________________//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class API {
    constructor() {
        this.API_KEY = 'a04e68b564fb4838931192929231107';
    }
    getAPI_KEY() {
        return this.API_KEY;
    }
    setAPI_KEY(API_KEY) {
        this.API_KEY = API_KEY;
    }
}
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = new API();
        const url = `http://api.weatherapi.com/v1/current.json?key=${api.getAPI_KEY()}&q=${city}`;
        const response = yield fetch(url);
        const data = yield response.json();
        return data;
    });
}
//___________________________________________________________________________________//
