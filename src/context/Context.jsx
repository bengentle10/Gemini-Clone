import { createContext, useState } from "react";
import runChart from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
       if (prompt != undefined) {
            response = await runChart(prompt)
       } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await runChart(input)
       }
        let responseArray = response.split("**")
        let newResponse = ""
        for(let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i%2 == 0) {
                newResponse += responseArray[i]
            } else {
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i < newResponseArray.length; i++) {
            const newWord = newResponseArray[i]
            delayPara(i, newWord + " ");
        }
        
        setLoading(false)
        setInput("")

    }

    const delayPara = async (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75*index)
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;