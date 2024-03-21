import style from "@/styles/profile/freelance/review/freelanceReviewScore.module.scss"
import ReviewItem from "../Review/ReviewItem";
import { IGetFreelanceReview } from "@/models/review";
import StarRating from "./StarRating";
import { calculatePercentage } from "@/core/tranform";

interface Props {
    title: string;
    reviewsData: IGetFreelanceReview[];
    averageScore: number
}

const FreelanceReviewList = (props: Props) => {
    const { title, reviewsData, averageScore } = props
    return (
        <>
            <div id="add_artwork" className={style.main}>
                <h1 className="text-xl font-semibold mb-1">{title}</h1>
                <div className={style.overallScore}>
                    <span className="text-3xl font-bold">{averageScore}</span>
                    <span> จาก 5 คะแนน </span>
                </div>
                <div style={{ width: '110px' }}>
                    <StarRating percent={calculatePercentage(5, averageScore)}></StarRating>
                </div>
                {reviewsData.map(item => (
                    <>
                        <ReviewItem data={item} />
                    </>
                ))}
            </div>
        </>
    );
};

export default FreelanceReviewList;