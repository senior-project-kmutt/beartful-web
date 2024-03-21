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
            <div>
                <div className="flex w-25 justify-between">
                    <div className={style.profile}>
                        <div className="flex items-center">
                            <div className={style.profile_image}>
                                <img src={data.reviewerInfo.profileImage} />
                            </div>
                            <div>
                                <p className={style.username}>{data.reviewerInfo.username}</p>
                                <p className={style.date}>{formatDateDetailUser(data.createdAt)} น.</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className={style.profile_image}></div>
                            <div>
                                <p>{data.comment}</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.score}>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{ color: '#E16428' }}></FontAwesomeIcon>
                        <p className={style.scoreText}>{data.score}.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;