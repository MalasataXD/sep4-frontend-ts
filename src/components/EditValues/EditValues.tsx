import { useState } from "react";
import "./EditValues.css"

export function EditValues() {

    //inputs and errorState
    const [ temperature, setTemperature ] = useState<null | number>(null);
    const [ humidity, setHumidity ] = useState<null | number>(null);
    const [ errorState, setErrorState ] = useState("");


    return (
        <div className="Edit-values-card">
            <div className="Title"><b>Edit Values</b></div>
            <br/>
            <div className="Input-container">
                <input className="Input" placeholder="Temperature (°C)" type="number" onChange={
                    (event) => setTemperature(event.target.value === "" ? null : Number(event.target.value))}/>
                
                <input className="Input" placeholder="Humidity (%)" type="number" onChange={
                    (event) => setHumidity(event.target.value === "" ? null : Number(event.target.value))} />
                
                <button className="Save-button" onClick={() => handleClick()}> SAVE </button>
            </div>
            <div className="error-container hide" id="errorState">{errorState}</div>
        </div>
    )  


    async function handleClick(){
        // Post to web-API
        if (validation()) {
            try {
                const response = await fetch("http://localhost:8080/data", {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(
                        { 
                          temp: `${temperature}`,
                          humidity: `${humidity}`
                        }),
                })

                if (!response.ok) {
                    showErrorState();
                    setErrorState("Post failed!");
                }
                
            } catch (error) {
                showErrorState();
                setErrorState("server didn't respond!");
            }         
        }
    }

    function validation(){
        if (temperature === null || humidity === null) {
            showErrorState();
            setErrorState("There must be an input");
            return false;
        }
        if (temperature > 100 || temperature < -20) {
            showErrorState();
            setErrorState("Temperature must be between -20 and 100");
            return false;
        }
        if (humidity > 100 || humidity < 0) {
            showErrorState();
            setErrorState("Humidity must be between 0 and 100");
            return false;
        }
        hideErrorState()
        setErrorState("")
        return true;
    }

    function hideErrorState() {
        var element = document.getElementById("errorState");
        element?.classList.add("hide");
    }

    function showErrorState() {
        var element = document.getElementById("errorState");
        element?.classList.remove("hide");
    }
}

export default EditValues;