import React, {PropTypes} from "react";
import Scored from "./boethius/src/Scored";

const Sheet = React.createClass({
    render () {
        return (
            <div className="sheet" style={{overflowY: "scroll", border: "1px solid black"}}>
                <canvas key="scoredCanvas" ref="scoredCanvas" height="1000" style={{width: "100%"}}></canvas>
            </div>
        );
    },

    scored: new Scored(),

    componentDidMount () {
        const scored = this.scored;
        scored.setup(this.refs.scoredCanvas);
        paper.view.center = paper.view.center.subtract(25, 50);

        var n = scored.note;
        // create lines
        var trebleLine = scored.line({voices: ["treble"]}, [
            scored.clef({value: "treble", measure: 0}), scored.key({value: "C", measure: 0}), scored.timeSig({value: "4/4", measure: 0})
        ]);
        var bassLine = scored.line({voices: ["bass"]}, [
            scored.clef({value: "bass", measure: 0}), scored.key({value: "C", measure: 0}), scored.timeSig({value: "4/4", measure: 0})
        ]);

        // create voices
        var soprano = scored.voice({name: "treble"}, [
            n({value:1, pitch: "c4"}), n({value:2, pitch: "d#4"}), n({value:2, pitch: "d#4"}), n({value:1, pitch: "e4"}), n({value:1, pitch: "f4"}),
    		n({value:1, pitch: "g4"}), n({value:1, pitch: "a4"}), n({value:1, pitch: "b4"}), n({value:1, pitch: "c5"}),
    		n({value:1, pitch: "d5"}), n({value:1, pitch: "e5"}), n({value:1, pitch: "f5"}), n({value:1, pitch: "g5"})
        ]);
        var bass = scored.voice({name: "bass"}, [
            n({value:1, pitch: "c4"}), n({value:1, pitch: "b3"}), n({value:1, pitch: "a3"}), n({value:1, pitch: "g3"}),
    		n({value:1, pitch: "f3"}), n({value:1, pitch: "e3"}), n({value:1, pitch: "d3"}), n({value:1, pitch: "c3"}),
    		n({value:1, pitch: "b2"}), n({value:1, pitch: "a2"}), n({value:1, pitch: "g2"}), n({value:1, pitch: "f2"})
        ]);

        var fourfour = scored.timeSig({value: "4/4", measure: 0});

        // create staves
        var system1 = scored.system({measures: 6, lineHeights: [0, 200]});
        var system2 = scored.system({measures: 6});

        var score = scored.score({length: 1000, systemHeights: [0, 350]}, [fourfour, system1, system2, trebleLine, bassLine]);

        // render it all as a score.
        return scored.render(score, {voices: [soprano, bass]});
    },

    componentWillUpdate () {
        return false;
    }
});

export default Sheet;
