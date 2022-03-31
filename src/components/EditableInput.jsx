import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE,
    headers: {
        'x-api-key': process.env.REACT_APP_BACKEND_API_KEY,
        'content-type': 'application/json'
    }
})

function EditableInput() {
    const [url, seturl] = useState("")
    const [urlError, seturlError] = useState(null)
    const handleChange = (e) => {
        seturl(e.target.value)
    }
    const saveUrl = async () => {
        try {
            let gitLink = new URL(url)
            if (gitLink.href.length > 200) throw new Error('Url lentgh must be less than 200 characters.')
            const savedUrl = await axiosInstance.post('', JSON.stringify({ url: gitLink.href }))
            seturl(savedUrl.data.url)
        } catch (err) {
            console.warn(err)
            seturlError(err.message)
        }
    }

    const getUrl = useCallback(async () => {
        const retrievedUrl = await (await axiosInstance.get()).data
        seturl(retrievedUrl.url)
    }, [])

    useEffect(() => {
        getUrl()
    }, [getUrl])

    return (
        <div className='myInputDiv'>
            <input
                placeholder='<your app code repo link>'
                value={url}
                onChange={handleChange}
                data-testid="submit-url-link"
            />
            {urlError && <span>{urlError}</span>}
            <button onClick={saveUrl}>Save URL</button>
        </div>
    )
}

export default EditableInput