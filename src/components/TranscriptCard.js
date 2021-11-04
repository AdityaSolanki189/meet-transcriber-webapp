import './TranscriptCard.css';
import userImg from '../resources/user-logo.png'

const TranscriptCard = () => {
    const name = "Anurag Patil";
    const timeStamp = "0:50"
    const shitHeSaid = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro nulla temporibus autem veritatis sapiente vero eaque ad corrupti a libero, expedita ipsum ex nesciunt veniam, magnam aliquam tenetur ratione delectus sunt. Reprehenderit a nulla modi, esse corrupti ex eligendi voluptatem corporis sapiente, blanditiis voluptatibus reiciendis debitis ipsum? Repellendus porro, eaque ad repudiandae quis cum alias eveniet. Obcaecati, labore ex!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum recusandae consequuntur asperiores labore fuga, libero, ipsa quidem molestiae animi tempore nulla sapiente odio. Nam doloribus, accusamus eaque consectetur ipsum ex? "
    return (
        <div className="card-view">
            <div className="photu">
                <img src={userImg} alt="" />
            </div>
            <div className="transcriptHolder">
                <div className="name-n-time">
                    <h3>{name}</h3>
                    <p>{timeStamp}</p>
                </div>
                <div className="transcript-card-wali-transcript">
                    <p>{shitHeSaid}</p>
                </div>
            </div>
        </div>
    );
}

export default TranscriptCard;