import React, {useEffect, useState} from "react";
import "./Metronome.css"

export const Metronome = () => {
        //most likely will need a state that holds the integer of the current bpm.
        const [bpm, setBpm] = useState(120)
        //will need a state that holds onto the beat per measure
        const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
        //will need a state that holds the string for tempo text
        const [tempoText, setTempoText] = useState("Moderate")


        //a tempo marking handler will be needed to update the state of the tempo
        const handleDecreaseBpm = () => {
            if (bpm <= 20) { return }
            let newBpm = bpm
            newBpm--;
            setBpm(newBpm)
        }

        const handleIncreaseBpm = () => {
            if (bpm >= 400) { return }
            let newBpm = bpm
            newBpm++;
            setBpm(newBpm)
        }

        //slider updates the state for bpm as well
        const handleSlider = (event) => {
            let newBpm = event.target.value 
            setBpm(newBpm)
        }

        const handleDecreaseBeats = () => {
            if (beatsPerMeasure <= 1) { return }
            let newBeats = beatsPerMeasure
            newBeats--;
            setBeatsPerMeasure(newBeats)
        }

        
        const handleIncreaseBeats = () => {
            if (beatsPerMeasure >= 16) { return }
            let newBeats = beatsPerMeasure
            newBeats++;
            setBeatsPerMeasure(newBeats)
        }

        //I need a function that will read the state of the bpm and set the tempo text based on defined conditions.
        const updateTempoText = () => {
            if (bpm <= 45) {
                setTempoText("Grave")
            }
            if (bpm > 45 && bpm <= 60 ) {
                setTempoText("Lento")
            }
            if (bpm > 60 && bpm <= 76) {
                setTempoText("Adagio")
            }
            if (bpm > 76 && bpm <= 108) {
                setTempoText("Andante")
            }
            if (bpm > 108 && bpm <= 120) {
                setTempoText("Moderato")
            }
            if (bpm > 120 && bpm <= 168) {
                setTempoText("Allegro")
            }
            if (bpm > 168 && bpm <= 200) {
                setTempoText("Presto")
            }
            if (bpm > 200 && bpm <= 300) {
                setTempoText("Prestissimo")
            }
            if (bpm > 300 && bpm <= 400) {
                setTempoText("OH LAWD")
            }
        }

        useEffect(() => {
            updateTempoText()
        }, [bpm])



    return (
        <body>
            <div className="container">
                <div className="metronome">
                    <div className="bpm-display">
                        <span className="tempo">{bpm}</span>
                        <span className="bpm">BPM</span>
                    </div>
                    <div className="tempo-text">{tempoText}</div>
                    <div className="tempo-settings">
                        <div className="adjust-tempo-btn decrease-tempo" onClick={handleDecreaseBpm}>-</div>
                        <input type="range" min="20" max="400" step="1" className="slider" value={bpm} onChange={handleSlider}></input>
                        <div className="adjust-tempo-btn increase-tempo" onClick={handleIncreaseBpm}>+</div>
                    </div>
                        <div className="start-stop">START</div>
                        <div className="measures">
                            <div className="subtract-beats stepper" onClick={handleDecreaseBeats}>-</div>
                            <div className="measure-count">{beatsPerMeasure}</div>
                            <div className="add-beats stepper" onClick={handleIncreaseBeats}>+</div>
                        </div>
                        <span className="beats-per-measure-text">Beats per measure</span>
                    
                </div>
            </div>
        </body>
    )

}