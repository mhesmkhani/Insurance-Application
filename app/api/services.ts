import axiosInstance from "~/api/axiosInstance";

class Services {
    async fetchAllForms() {
        try {
            const response = await axiosInstance.get(`/api/insurance/forms`);
            return response.data;
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async fetchStatesOfCountries(country: string) {
        try {
            const response = await axiosInstance.get(`/api/getStates?country=${country}`);
            return response.data;
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async fetchAllSubmissions() {
        try {
            const response = await axiosInstance.get(`/api/insurance/forms/submissions`);
            return response.data;
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
}

export default Services