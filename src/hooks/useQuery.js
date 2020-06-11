import { useLocation } from "react-router-dom";
import { useState } from "react";

function useQuery(callback) {
    const [GETParams, setGETParams] = useState({});
    const newGETParams = {};
    const urlParams = new URLSearchParams(useLocation().search).entries();
    let urlParam = urlParams.next();
    let isChanged = false;

    while (!urlParam.done) {
        newGETParams[urlParam.value[0]] = urlParam.value[1];
        urlParam = urlParams.next();
    }

    if (Object.keys(newGETParams).length !== Object.keys(GETParams).length) {
        isChanged = true;
    } else {
        for (const key in newGETParams) {
            if (newGETParams.hasOwnProperty(key)) {
                if (newGETParams[key] != GETParams[key]) {
                    isChanged = true;
                    break;
                }
            }
        }
    }

    if (isChanged) {
        callback(newGETParams, GETParams);
        setGETParams(newGETParams);
    }
}

export default useQuery;