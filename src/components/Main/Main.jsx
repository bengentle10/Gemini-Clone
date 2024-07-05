import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { intro } from '../../data/data'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult 
             ? <>
                <div className="greet">
                    <p><span>Hello, Bernard.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    {intro.map((item, index) => (
                        <div key= {index} className="card">
                            <p>{item.descrioption}</p>
                            <img src={item.image} alt="" />
                        </div>
                    ))}
                </div>
            </>
            : <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                     ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                     </div> 
                     : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                     }

                </div>
            </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input value={input} onKeyDown={(e) => {if(e.key === 'Enter') onSent()}} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Enter a prompt here" />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                       {input ?
                         <img onClick={() => {onSent()}} src= {assets.send_icon} alt="" /> :
                         null} 
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main