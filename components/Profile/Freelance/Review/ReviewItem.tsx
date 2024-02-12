import style from "@/styles/profile/freelance/review/freelanceReviewScore.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = () => {

    return (
        <div className={style.reviewItem}>
            <div className={style.profile}>
                <img src="../ssi1/picture/user1.gif" />
                <div className="flex w-25 justify-between">
                    <div>
                        <p className={style.username}> customer name</p>
                        <p className={style.date}> 05/02/2024</p>
                    </div>
                    <div className={style.score}>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#E16428' }}></FontAwesomeIcon>
                        <p className={style.scoreText}>5.0</p>
                    </div>
                </div>
            </div>
            <p className={style.message}>แมวๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ</p>
        </div>
    );
};

export default ReviewItem;