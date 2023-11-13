import axios from "axios";
import { useEffect, useState } from "react"

const useAxios = ({ url, method, body = null, headers = null }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios({ method, url, headers, body });
            setResponse(response?.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [url, method, body, headers])

    return {
        response,
        loading,
        error
    }
}

export default useAxios;