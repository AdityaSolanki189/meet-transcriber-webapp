import "./transcript.css";
import userImg from '../resources/user-logo.png';
function Transcript({name, text, timeStamp}) {

    const data = [
        {
            name: "Anurag Patil",
            shitHeSaid: "Ricardo rheticus. As Meru gira recorded earlier. They are Jesse Connor, can you " +
                    "do three second Roger decry 00072 They gotta get their current job maybe Ruka ar" +
                    "e a bit more fixable, and again, They are maybe a bit go away. Avi Taha Tommaso " +
                    "terasaki fnsa Whatever dismembered petani of Nagasaki was the border so inconsis" +
                    "tent to get in cases the problem",
            timeStamp: '0:53'
        }, {
            name: "Aditya Solanki",
            shitHeSaid: "might have to get old Ricky, aka Casentino analysis during this video,",
            timeStamp: '1:34'
        }, {
            name: "Aditya Nair",
            shitHeSaid: "push me to SEMA. Soto lucky, Jessica over in Korea Jody Barlow is dibber footsto" +
                    "ne as a highlight specificall thank you so much RBA carbon capture option open d" +
                    "irectly open in approximately one wood area to a niche agency the key highlight " +
                    "your tag which is a sample highlight the sector.",
            timeStamp: '4:40'
        }, {
            name: "Anurag Patil",
            shitHeSaid: "Gay important to highlight what happened sentiment highlight the sector, put so " +
                    "much just specify the openness, or what if not the key to Nevada party to push w" +
                    "as part of, highlight the key console emotion represent your task, which you Mar" +
                    "isota mirror area but it could not be trial assistance.",
            timeStamp: '5:03'
        }, {
            name: "Aditya Nair",
            shitHeSaid: "Yeah yeah tried it. Yeah, you bet mitofit Whoa, yeah Becky Jackie up natural rec" +
                    "ording and post or during or after the kangaroo playable Ragamala basically reco" +
                    "rdings or play chiringuito mapic is becoming a key player to EBA and then luggag" +
                    "e will be born.",
            timeStamp: '5:24'
        }
    ];
    return (
        <div>
            {/* {
                data.map(it =>
                    <div className="main-body">
                        <div className="photu">
                            <img src={ userImg } alt="" />
                        </div>
                        <div className="transcriptHolder">
                            <div className="name-n-time">
                                <h3>{it.name}</h3>
                                <p>{it.timeStamp}</p>
                            </div>
                            <div className="transcript">
                                <p>{it.shitHeSaid}</p>
                            </div>
                        </div>


                    </div>
                )
            } */}

            <div className="main-body">
                <div className="photu">
                    <img src={userImg} alt=""/>
                </div>
                <div className="transcriptHolder">
                    <div className="name-n-time">
                        <h3>{name}</h3>
                        <p>{timeStamp}</p>
                    </div>
                    <div className="transcript">
                        <p>{text}</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Transcript;