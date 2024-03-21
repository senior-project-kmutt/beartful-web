import style from "@/styles/profile/freelance/review/freelanceReviewScore.module.scss"
import ReviewItem from "../Review/ReviewItem";
import { IGetFreelanceReview } from "@/models/review";

interface Props {
    title: string;
    reviewsData: IGetFreelanceReview[]
}

const FreelanceReviewList = (props: Props) => {
    const { title, reviewsData } = props
    return (
        <>
            <div id="add_artwork" className={style.main}>
                <h1 className="text-xl font-semibold mb-1">{title}</h1>
                <div className={style.overallScore}>
                    <span className="text-3xl font-bold"> 4.8 </span>
                    <span> จาก 5 คะแนน </span>
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