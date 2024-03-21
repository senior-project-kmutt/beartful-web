import style from "@/styles/profile/freelance/review/freelanceReviewScore.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IGetFreelanceReview } from "@/models/review";
import { formatDateDetailUser } from "@/core/tranform";

interface Props {
    data: IGetFreelanceReview
}

const ReviewItem = (props: Props) => {
    const { data } = props;

    return (
        <div className={style.reviewItem}>
            <div className={style.profile}>
                <img src={data.reviewerInfo.profileImage} />
                <div className="flex w-25 justify-between">
                    <div>
                        <p className={style.username}>{data.reviewerInfo.username}</p>
                        <p className={style.date}>{formatDateDetailUser(data.createdAt)} น.</p>
                    </div>
                    <div className={style.score}>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#E16428' }}></FontAwesomeIcon>
                        <p className={style.scoreText}>{data.score}.0</p>
                    </div>
                </div>
            </div>
            <p className={style.message}>{data.comment}</p>
        </div>
    );
};

export default ReviewItem;